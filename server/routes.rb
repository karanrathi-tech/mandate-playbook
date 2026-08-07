require "json"

require_relative "json_response"

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
