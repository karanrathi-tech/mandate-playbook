require "json"

require_relative "json_response"
require_relative "whatsapp_client"

module MandatePlaybook
  class Routes
    def initialize(server, database)
      @server = server
      @database = database
    end

    def mount
      mount_state
      mount_database_info
      mount_launch
      mount_task_sync
      mount_whatsapp_notification
    end

    private

    def mount_state
      @server.mount_proc "/api/state" do |request, response|
        proxy(response, "GET", "state") if require_method(request, response, "GET")
      rescue StandardError => error
        failure(response, error)
      end
    end

    def mount_database_info
      @server.mount_proc "/api/database-info" do |_request, response|
        status, body = @database.request("GET", "state")
        data = JSON.parse(body)
        if status.between?(200, 299)
          JsonResponse.write(response, {
            database: "Supabase PostgreSQL",
            project: "kembhnhobuwnesafikzf",
            counts: {
              mandates: data.fetch("mandates").length,
              employees: data.fetch("employees").length,
              tasks: data.fetch("tasks").length,
            },
          })
        else
          JsonResponse.write(response, body, status: status)
        end
      rescue StandardError => error
        failure(response, error)
      end
    end

    def mount_launch
      @server.mount_proc "/api/checklists/launch" do |request, response|
        proxy(response, "POST", "launch", JSON.parse(request.body.to_s)) if require_method(request, response, "POST")
      rescue JSON::ParserError => error
        JsonResponse.write(response, { error: error.message }, status: 400)
      rescue StandardError => error
        failure(response, error)
      end
    end

    def mount_task_sync
      @server.mount_proc "/api/tasks/sync" do |request, response|
        proxy(response, "PUT", "sync", JSON.parse(request.body.to_s)) if require_method(request, response, "PUT")
      rescue JSON::ParserError => error
        JsonResponse.write(response, { error: error.message }, status: 400)
      rescue StandardError => error
        failure(response, error)
      end
    end

    def mount_whatsapp_notification
      @server.mount_proc "/api/notifications/whatsapp" do |request, response|
        unless require_method(request, response, "POST")
          next
        end

        body = JSON.parse(request.body.to_s)
        if body["action"] == "status"
          result = WhatsappClient.new.message_status(message_id: body["messageId"])
          status = result[:status].to_s.downcase
          if %w[delivered read failed undelivered canceled].include?(status)
            warn JSON.generate({ event: "whatsapp_delivery", provider: result[:provider], messageId: result[:messageId], status: status, delivered: result[:delivered], errorCode: result[:errorCode], error: result[:error] })
          end
          JsonResponse.write(response, result)
          next
        end

        owner_name = body["ownerName"].to_s.strip[0, 100]
        task_name = body["taskName"].to_s.strip[0, 200]
        due_date = body["dueDate"].to_s.strip[0, 30]
        message = body["message"].to_s.strip[0, 500]
        if owner_name.empty? || task_name.empty? || due_date.empty?
          JsonResponse.write(response, { error: "Task owner, task name, and due date are required." }, status: 400)
          next
        end

        result = WhatsappClient.new.send_message(
          owner_name: owner_name,
          task_name: task_name,
          due_date: due_date,
          message: message,
        )
        JsonResponse.write(response, result)
      rescue JSON::ParserError => error
        JsonResponse.write(response, { error: error.message }, status: 400)
      rescue StandardError => error
        JsonResponse.write(response, { error: error.message }, status: 502)
      end
    end

    def proxy(response, method, action, payload = nil)
      status, body = @database.request(method, action, payload)
      JsonResponse.write(response, body, status: status)
    end

    def require_method(request, response, expected)
      return true if request.request_method == expected
      JsonResponse.write(response, { error: "Method not allowed." }, status: 405)
      false
    end

    def failure(response, error)
      JsonResponse.write(response, { error: error.message }, status: 502)
    end
  end
end
