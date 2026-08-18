require_relative "config"
require_relative "meta_whatsapp_client"
require_relative "twilio_whatsapp_client"

module MandatePlaybook
  class WhatsappClient
    def send_message(**attributes)
      case provider
      when "twilio"
        TwilioWhatsappClient.new.send_message(**attributes).merge(provider: "twilio")
      when "meta"
        MetaWhatsappClient.new.send_message(**attributes)
      else
        raise "WHATSAPP_PROVIDER must be either `twilio` or `meta`."
      end
    end

    private

    def provider
      (Config.value("WHATSAPP_PROVIDER") || "twilio").strip.downcase
    end
  end
end
