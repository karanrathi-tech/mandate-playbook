# Mandate Playbook database

This directory contains the provider-neutral PostgreSQL foundation for Mandate
Playbook. The web interface must access these records through the application
API; it must not contain a database password or privileged database key.

## Apply the schema

Set `DATABASE_URL` to a PostgreSQL connection string and apply
`001_initial_schema.sql` using the migration tool supported by the host system.
The file runs in one transaction and can be reviewed before execution.

## Application boundary

The interface should depend on these operations rather than a database vendor:

- `listMandates(filters)`
- `getMandate(id)`
- `createChecklist(mandateId, selectedTemplateTaskIds)`
- `listTasks(mandateId, filters)`
- `createTask(input)`
- `updateTask(id, changes, expectedVersion)`
- `moveTask(id, status, sortOrder, expectedVersion)`
- `deleteTask(id, reason, expectedVersion)`
- `addTaskComment(taskId, body)`
- `listTaskActivity(taskId)`

Board, List, and Gantt views use the same task records. `version` supports safe
updates when multiple users edit the same task, and `task_activity` provides an
audit trail for integration with the larger system.

## Integration identifiers

`workspaces.external_id`, `users.external_user_id`, and
`mandates.external_id` allow the larger system to retain its own identifiers.
The Mandate Playbook UUID remains stable internally, so an upstream identifier
can change without rewriting task relationships.

## Security

- Keep `DATABASE_URL` on the server only.
- Authenticate users before any write operation.
- Scope every query by `workspace_id`.
- Never expose a PostgreSQL administrator password in browser code.
- Add row-level security policies if the selected PostgreSQL host exposes the
  database directly to browser clients.
