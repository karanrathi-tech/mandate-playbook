alter table public.tasks add column if not exists client_id text;
alter table public.tasks add column if not exists task_owner_name text;
alter table public.tasks
  add constraint tasks_client_id_key unique (client_id);
