require "json"

module MandatePlaybook
  module JsonResponse
    def self.write(response, body, status: 200)
      response.status = status
      response["Content-Type"] = "application/json; charset=utf-8"
      response["Cache-Control"] = "no-store"
      response.body = body.is_a?(String) ? body : JSON.generate(body)
    end
  end
end
