module MandatePlaybook
  module Config
    ROOT = File.expand_path("..", __dir__)
    PUBLIC_ROOT = File.join(ROOT, "public")
    TOKEN_PATH = File.join(ROOT, ".mandate-playbook-token")
    SUPABASE_FUNCTION_URL = "https://kembhnhobuwnesafikzf.supabase.co/functions/v1/mandate-playbook-api"

    def self.port
      Integer(ENV.fetch("PORT", "8766"))
    end

    def self.api_token
      ENV["MANDATE_PLAYBOOK_API_TOKEN"] || File.read(TOKEN_PATH).strip
    end
  end
end
