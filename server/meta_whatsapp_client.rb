require "json"
require "net/http"
require "uri"

require_relative "config"

module MandatePlaybook
  class MetaWhatsappClient
    def send_message(owner_name:, task_name:, due_date:, message:)
      access_token = required("META_WHATSAPP_ACCESS_TOKEN")
      phone_number_id = required("META_WHATSAPP_PHONE_NUMBER_ID")
      template_name = required("META_WHATSAPP_TEMPLATE_NAME")
      language = Config.value("META_WHATSAPP_TEMPLATE_LANGUAGE") || "en_US"
      graph_version = required("META_WHATSAPP_GRAPH_VERSION")
      recipient = Config.value("META_WHATSAPP_TO") || Config.value("WHATSAPP_TO") || "+917045706453"

      uri = URI("https://graph.facebook.com/#{graph_version}/#{URI.encode_www_form_component(phone_number_id)}/messages")
      request = Net::HTTP::Post.new(uri)
      request["Authorization"] = "Bearer #{access_token}"
      request["Content-Type"] = "application/json"
      request.body = JSON.generate({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipient.gsub(/\D/, ""),
        type: "template",
        template: {
          name: template_name,
          language: { code: language },
          components: [{
            type: "body",
            parameters: [owner_name, task_name, due_date, default_message(message)].map do |text|
              { type: "text", text: text }
            end,
          }],
        },
      })

      response = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 10, read_timeout: 30) do |http|
        http.request(request)
      end
      result = JSON.parse(response.body)
      unless response.code.to_i.between?(200, 299)
        detail = result.dig("error", "error_user_msg") || result.dig("error", "message")
        raise(detail || "Meta WhatsApp delivery failed.")
      end

      { delivered: false, provider: "meta", messageId: result.dig("messages", 0, "id"), status: "accepted" }
    end

    private

    def required(name)
      value = Config.value(name)
      raise "Meta WhatsApp is not configured: #{name} is missing." if value.to_s.strip.empty?
      value
    end

    def default_message(message)
      text = message.to_s.strip
      text.empty? ? "Please review this task and update its status." : text
    end
  end
end
