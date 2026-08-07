require "json"
require "net/http"
require "uri"

require_relative "config"

module MandatePlaybook
  class SupabaseClient
    REQUESTS = {
      "GET" => Net::HTTP::Get,
      "POST" => Net::HTTP::Post,
      "PUT" => Net::HTTP::Put,
    }.freeze

    def initialize(token: Config.api_token, endpoint: Config::SUPABASE_FUNCTION_URL)
      @token = token
      @endpoint = URI(endpoint)
    end

    def request(method, action, payload = nil)
      uri = @endpoint.dup
      uri.query = URI.encode_www_form(action: action)
      request = REQUESTS.fetch(method).new(uri)
      request["X-Mandate-Playbook-Token"] = @token
      request["Content-Type"] = "application/json"
      request.body = JSON.generate(payload) if payload

      result = Net::HTTP.start(uri.host, uri.port, use_ssl: true, open_timeout: 10, read_timeout: 30) do |http|
        http.request(request)
      end
      [result.code.to_i, result.body]
    end
  end
end
