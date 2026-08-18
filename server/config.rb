module MandatePlaybook
  module Config
    ROOT = File.expand_path("..", __dir__)
    PUBLIC_ROOT = File.join(ROOT, "public")
    TOKEN_PATH = File.join(ROOT, ".mandate-playbook-token")
    SUPABASE_FUNCTION_URL = "https://kembhnhobuwnesafikzf.supabase.co/functions/v1/mandate-playbook-api"

    def self.local_environment
      @local_environment ||= begin
        path = File.join(ROOT, ".env.local")
        if File.file?(path)
          File.readlines(path, chomp: true).each_with_object({}) do |line, values|
            stripped = line.strip
            next if stripped.empty? || stripped.start_with?("#") || !stripped.include?("=")

            key, value = stripped.split("=", 2)
            value = value.to_s.strip
            value = value[1...-1] if value.length >= 2 && %w[' "].include?(value[0]) && value[-1] == value[0]
            values[key.strip] = value
          end
        else
          {}
        end
      end
    end

    def self.value(name)
      ENV[name] || local_environment[name]
    end

    def self.port
      Integer(ENV.fetch("PORT", "8766"))
    end

    def self.api_token
      ENV["MANDATE_PLAYBOOK_API_TOKEN"] || File.read(TOKEN_PATH).strip
    end
  end
end
