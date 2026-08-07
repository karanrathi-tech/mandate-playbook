# Mandate Playbook

Mandate Playbook is separated into browser, server, domain, and database layers.
The browser entry point is no longer a packaged multi-megabyte `index.html`.

## Project structure

```text
public/
  index.html                         Small browser entry point
  js/mandate-playbook-controller.js Browser interaction and view state
  styles/                            Design tokens and component styles
  assets/                            Fonts, sounds, and isolated runtimes
server/
  config.rb                          Runtime configuration
  routes.rb                          HTTP API routes
  supabase_client.rb                 Supabase Edge Function client
  json_response.rb                   JSON response helper
server.rb                            Small server entry point
lib/mandate-playbook/                Framework-independent domain layer
database/postgres/                   PostgreSQL schema and migrations
db/                                  Typed database schema/repository work
tests/                               Automated checks
legacy/original-bundle.html          Original artifact retained for provenance
work/unpack_frontend.rb              Repeatable artifact extraction tool
```

## Run locally

```sh
ruby server.rb
```

Open `http://127.0.0.1:8766/`. The server exposes the static frontend from
`public/` and proxies `/api/*` requests to the Supabase PostgreSQL backend.

## Where to make changes

- Page structure: `public/index.html`
- Interaction and view logic: `public/js/mandate-playbook-controller.js`
- Styling: `public/styles/`
- Server endpoints: `server/routes.rb`
- Database connectivity: `server/supabase_client.rb`
- PostgreSQL structure: `database/postgres/`

`public/legacy/runtime.html` is a temporary compatibility runtime for the
original proprietary page format. It keeps the current product working while
screens are migrated to the extracted controller, styles, and assets. New
server, data, and database work must go into their dedicated layers rather than
the compatibility file.
