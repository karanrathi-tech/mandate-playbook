create extension if not exists pgcrypto;

create type public.mandate_status as enum ('not_created', 'just_started', 'on_track', 'at_risk', 'blocked', 'completed');
create type public.task_status as enum ('unassigned', 'pending', 'in_progress', 'blocked', 'completed');
create type public.task_priority as enum ('low', 'medium', 'high');

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  external_id text unique not null,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.users (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  external_user_id text,
  name text not null,
  email text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, external_user_id),
  unique (workspace_id, email)
);

create table public.mandates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  external_id text not null,
  name text not null,
  developer text,
  city text,
  mandate_type text,
  status public.mandate_status not null default 'not_created',
  launch_date date,
  target_completion_date date,
  has_checklist boolean not null default false,
  checklist_created_at timestamptz,
  team_lead_name text,
  pnl_head_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  version integer not null default 1,
  unique (workspace_id, external_id)
);

create table public.checklist_templates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  external_id text not null,
  name text not null,
  description text,
  is_default boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, external_id)
);

create table public.checklist_template_tasks (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.checklist_templates(id) on delete cascade,
  external_id text not null,
  category text not null,
  task_description text not null,
  subtask_description text,
  company_type text not null default 'internal',
  default_priority public.task_priority not null default 'medium',
  sort_order integer not null default 0,
  is_selected_by_default boolean not null default true,
  created_at timestamptz not null default now(),
  unique (template_id, external_id),
  unique (template_id, sort_order)
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  mandate_id uuid not null references public.mandates(id) on delete cascade,
  template_task_id uuid references public.checklist_template_tasks(id) on delete set null,
  category text not null,
  task_description text not null,
  subtask_description text,
  priority public.task_priority not null default 'medium',
  status public.task_status not null default 'unassigned',
  start_date date,
  due_date date not null default current_date,
  revised_due_date date,
  primary_owner_id uuid references public.users(id) on delete set null,
  remarks text,
  closing_remarks text,
  blocker_reason text,
  blocker_owner_id uuid references public.users(id) on delete set null,
  is_external boolean not null default false,
  sort_order integer not null default 0,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  deleted_at timestamptz,
  version integer not null default 1,
  constraint task_dates_valid check (start_date is null or due_date >= start_date)
);

create table public.task_supporting_owners (
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (task_id, user_id)
);

create table public.subtasks (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  description text not null,
  status public.task_status not null default 'unassigned',
  owner_id uuid references public.users(id) on delete set null,
  due_date date,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.task_comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  author_id uuid references public.users(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.task_activity (
  id bigint generated always as identity primary key,
  task_id uuid not null references public.tasks(id) on delete cascade,
  actor_id uuid references public.users(id) on delete set null,
  event_type text not null,
  from_value jsonb,
  to_value jsonb,
  reason text,
  created_at timestamptz not null default now()
);

create table public.task_revisions (
  task_id uuid not null references public.tasks(id) on delete cascade,
  revision_index integer not null check (revision_index >= 0),
  from_date date not null,
  to_date date not null,
  changed_by text not null default 'Task Owner',
  changed_label text not null default '',
  reason text not null default '',
  created_at timestamptz not null default now(),
  primary key (task_id, revision_index)
);

create table public.task_due_changes (
  task_id uuid not null references public.tasks(id) on delete cascade,
  change_index integer not null check (change_index >= 0),
  from_date date not null,
  to_date date not null,
  changed_by text not null default 'Team Lead',
  changed_label text not null default '',
  created_at timestamptz not null default now(),
  primary key (task_id, change_index)
);

create index mandates_workspace_idx on public.mandates(workspace_id);
create index mandates_status_idx on public.mandates(workspace_id, status);
create index tasks_mandate_idx on public.tasks(mandate_id) where deleted_at is null;
create index tasks_board_idx on public.tasks(mandate_id, status, sort_order) where deleted_at is null;
create index tasks_due_idx on public.tasks(mandate_id, due_date) where deleted_at is null;
create index tasks_owner_idx on public.tasks(primary_owner_id, status) where deleted_at is null;
create index subtasks_task_idx on public.subtasks(task_id, sort_order);
create index task_activity_task_idx on public.task_activity(task_id, created_at desc);
create index task_revisions_task_id_idx on public.task_revisions(task_id, revision_index);
create index task_due_changes_task_id_idx on public.task_due_changes(task_id, change_index);

create function public.set_updated_at() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  if tg_table_name in ('mandates', 'tasks') then
    new.version = old.version + 1;
  end if;
  return new;
end;
$$;

create trigger workspaces_updated_at before update on public.workspaces for each row execute function public.set_updated_at();
create trigger users_updated_at before update on public.users for each row execute function public.set_updated_at();
create trigger mandates_updated_at before update on public.mandates for each row execute function public.set_updated_at();
create trigger checklist_templates_updated_at before update on public.checklist_templates for each row execute function public.set_updated_at();
create trigger tasks_updated_at before update on public.tasks for each row execute function public.set_updated_at();
create trigger subtasks_updated_at before update on public.subtasks for each row execute function public.set_updated_at();
create trigger task_comments_updated_at before update on public.task_comments for each row execute function public.set_updated_at();

alter table public.workspaces enable row level security;
alter table public.users enable row level security;
alter table public.mandates enable row level security;
alter table public.checklist_templates enable row level security;
alter table public.checklist_template_tasks enable row level security;
alter table public.tasks enable row level security;
alter table public.task_supporting_owners enable row level security;
alter table public.subtasks enable row level security;
alter table public.task_comments enable row level security;
alter table public.task_activity enable row level security;
alter table public.task_revisions enable row level security;
alter table public.task_due_changes enable row level security;

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.task_revisions to service_role;
grant select, insert, update, delete on table public.task_due_changes to service_role;

insert into public.workspaces (external_id, name)
values ('mandate-playbook', 'Mandate Playbook');

insert into public.mandates
  (workspace_id, external_id, name, developer, city, mandate_type, launch_date, team_lead_name, pnl_head_name)
select w.id, v.external_id, v.name, v.developer, v.city, 'New Launch', v.launch_date::date, 'Kavya R', v.pnl_head
from public.workspaces w
cross join (values
  ('m1','Prestige Lakeside Habitat','Prestige Group','Bengaluru','2026-08-15','Arindom D'),
  ('m2','Lodha Amara','Lodha Group','Thane, Mumbai','2026-07-30','Rohit M'),
  ('m3','Godrej Woodscape','Godrej Properties','Pune','2026-08-22','Arindom D'),
  ('m4','Sobha Neopolis','Sobha Ltd','Bengaluru','2026-10-05','Rohit M'),
  ('m5','DLF Privana','DLF Ltd','Gurugram','2026-09-12','Arindom D'),
  ('m6','Brigade Cornerstone','Brigade Group','Bengaluru','2026-11-20','Arindom D'),
  ('m7','Mahindra Eden','Mahindra Lifespaces','Bengaluru','2026-11-28','Arindom D'),
  ('m8','Shapoorji Northern Lights','Shapoorji Pallonji','Pune','2026-12-02','Rohit M'),
  ('m9','Tata Carnatica','Tata Housing','Bengaluru','2026-12-10','Arindom D'),
  ('m10','Puravankara Purva Zenium','Puravankara','Bengaluru','2026-12-15','Rohit M'),
  ('m11','Kolte Patil 24K Espada','Kolte-Patil','Pune','2026-12-20','Arindom D'),
  ('m12','Mantri Serenity','Mantri Developers','Bengaluru','2027-01-05','Rohit M'),
  ('m13','Assetz Marq 3.0','Assetz Property','Bengaluru','2027-01-12','Arindom D'),
  ('m14','Kalpataru Immensa','Kalpataru','Thane, Mumbai','2027-01-18','Rohit M'),
  ('m15','Casagrand Zaltana','Casagrand','Chennai','2027-01-25','Arindom D'),
  ('m16','Provident Botanico','Provident Housing','Bengaluru','2027-02-01','Rohit M')
) as v(external_id,name,developer,city,launch_date,pnl_head)
where w.external_id = 'mandate-playbook';

update public.mandates set mandate_type = 'Launched' where external_id in ('m3','m5');
update public.mandates set mandate_type = 'Sustenance' where external_id = 'm4';

insert into public.checklist_templates (workspace_id, external_id, name, description, is_default)
select id, 'standard-launch', 'Standard launch template', 'Common launch tasks across eight workstreams', true
from public.workspaces where external_id = 'mandate-playbook';

insert into public.checklist_template_tasks
  (template_id, external_id, category, task_description, company_type, sort_order)
select t.id, v.external_id, v.category, v.task_description, v.company_type, v.sort_order
from public.checklist_templates t
cross join (values
  ('standard-01','Management','Kickoff & governance setup','internal',1),
  ('standard-02','Management','Weekly governance cadence setup','internal',2),
  ('standard-03','PR','Press note draft','internal',3),
  ('standard-04','PR','Media list & embargo plan','internal',4),
  ('standard-05','Digital Marketing','Landing page go-live','internal',5),
  ('standard-06','Digital Marketing','Paid campaign setup','internal',6),
  ('standard-07','Site Requirements','Site branding installation','external',7),
  ('standard-08','Site Requirements','Sample flat readiness','internal',8),
  ('standard-09','Marketing','Brochure final cut','internal',9),
  ('standard-10','Marketing','Signage & hoarding plan','external',10),
  ('standard-11','Post Sales','CRM process mapping','internal',11),
  ('standard-12','Manpower','Sales team deployment','internal',12),
  ('standard-13','Manpower','Channel partner onboarding','external',13),
  ('standard-14','Training & Pitch','Pitch deck v1','internal',14)
) as v(external_id,category,task_description,company_type,sort_order)
where t.external_id = 'standard-launch';
