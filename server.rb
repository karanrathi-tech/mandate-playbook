#!/usr/bin/env ruby

require "webrick"

require_relative "server/config"
require_relative "server/routes"
require_relative "server/supabase_client"

if ARGV.delete("--check")
  status, body = MandatePlaybook::SupabaseClient.new.request("GET", "state")
  data = JSON.parse(body)
  abort(body) unless status.between?(200, 299)
  puts JSON.generate({ mandates: data.fetch("mandates").length, employees: data.fetch("employees").length, tasks: data.fetch("tasks").length, database: "Supabase PostgreSQL" })
  exit 0
end

server = WEBrick::HTTPServer.new(
  BindAddress: "127.0.0.1",
  Port: Integer(ENV.fetch("PORT", "8766")),
  DocumentRoot: MandatePlaybook::Config::PUBLIC_ROOT,
  AccessLog: [],
  Logger: WEBrick::Log.new($stderr, WEBrick::Log::WARN),
)

MandatePlaybook::Routes.new(server, MandatePlaybook::SupabaseClient.new).mount

trap("INT") { server.shutdown }
trap("TERM") { server.shutdown }

puts "Mandate Playbook running at http://127.0.0.1:#{server.config[:Port]}/"
puts "Database: Supabase PostgreSQL"
server.start
