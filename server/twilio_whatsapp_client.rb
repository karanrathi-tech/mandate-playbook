require "base64"
require "json"
require "net/http"
require "uri"

require_relative "config"

module MandatePlaybook
  class TwilioWhatsappClient
    API_BASE = "https://api.twilio.com/2010-04-01/Accounts"

    def send_message(owner_name:, task_name:, due_date:, message:)
      account_sid = required("TWILIO_ACCOUNT_SID")
      auth_token = required("TWILIO_AUTH_TOKEN")
      content_sid = required("TWILIO_WHATSAPP_CONTENT_SID")
      from = Config.value("TWILIO_WHATSAPP_FROM")
      messaging_service_sid = Config.value("TWILIO_MESSAGING_SERVICE_SID")
      raise "Add a Twilio WhatsApp sender or Messaging Service SID." if blank?(from) && blank?(messaging_service_sid)

      uri = URI("#{API_BASE}/#{URI.encode_www_form_component(account_sid)}/Messages.json")
      request = Net::HTTP::Post.new(uri)
      request["Authorization"] = "Basic #{Base64.strict_encode64("#{account_sid}:#{auth_token}")}" 
      request["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"
      form = {
        "To" => whatsapp_address(Config.value("TWILIO_WHATSAPP_TO") || "+917045706453"),
        "ContentSid" => content_sid,
        "ContentVariables" => JSON.generate({
          "1" => owner_name,
          "2" => task_name,
          "3" => due_date,
          "4" => blank?(message) ? "Please review this task and update its status." : message,
        }),
      }
      if !blank?(messaging_service_sid)
        form["MessagingServiceSid"] = messaging_service_sid
      else
        form["From"] = whatsapp_address(from)
      end
      request.body = URI.encode_www_form(form)

      response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 10, read_timeout: 30) do |http|
        http.request(request)
      end
      result = JSON.parse(response.body)
      unless response.code.to_i.between?(200, 299)
        raise(result["message"] || "Twilio WhatsApp delivery failed.")
      end

      { delivered: %w[delivered read].include?(result["status"]), messageId: result["sid"], status: result["status"] }
    end

    private

    def required(name)
      value = Config.value(name)
      raise "Twilio WhatsApp is not configured: #{name} is missing." if blank?(value)
      value
    end

    def blank?(value)
      value.nil? || value.to_s.strip.empty?
    end

    def whatsapp_address(value)
      number = value.to_s.gsub(/[^\d+]/, "")
      number = "+#{number}" unless number.start_with?("+")
      "whatsapp:#{number}"
    end
  end
end
