BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE mandate_status AS ENUM (
  'not_created',
  'just_started',
  'on_track',
  'at_risk',
  'blocked',
  'completed'
);

CREATE TYPE task_status AS ENUM (
  'unassigned',
  'pending',
  'in_progress',
  'blocked',
  'completed'
);

CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');

CREATE TABLE workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id text UNIQUE,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  external_user_id text,
  name text NOT NULL,
  email text,
  avatar_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, external_user_id),
  UNIQUE (workspace_id, email)
);

CREATE TABLE mandates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  external_id text,
  name text NOT NULL,
  developer text,
  city text,
  mandate_type text,
  status mandate_status NOT NULL DEFAULT 'not_created',
  launch_date date,
  target_completion_date date,
  checklist_created_at timestamptz,
  team_lead_id uuid REFERENCES users(id) ON DELETE SET NULL,
  pnl_head_id uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  version integer NOT NULL DEFAULT 1,
  UNIQUE (workspace_id, external_id)
);

CREATE TABLE checklist_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  is_default boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE checklist_template_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL REFERENCES checklist_templates(id) ON DELETE CASCADE,
  category text NOT NULL,
  task_description text NOT NULL,
  subtask_description text,
  default_priority task_priority NOT NULL DEFAULT 'medium',
  sort_order integer NOT NULL DEFAULT 0,
  is_selected_by_default boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (template_id, sort_order)
);

CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mandate_id uuid NOT NULL REFERENCES mandates(id) ON DELETE CASCADE,
  template_task_id uuid REFERENCES checklist_template_tasks(id) ON DELETE SET NULL,
  category text NOT NULL,
  task_description text NOT NULL,
  stage text,
  priority task_priority NOT NULL DEFAULT 'medium',
  status task_status NOT NULL DEFAULT 'unassigned',
  start_date date,
  due_date date NOT NULL DEFAULT CURRENT_DATE,
  revised_due_date date,
  primary_owner_id uuid REFERENCES users(id) ON DELETE SET NULL,
  remarks text,
  closing_remarks text,
  blocker_reason text,
  blocker_owner_id uuid REFERENCES users(id) ON DELETE SET NULL,
  is_external boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  deleted_at timestamptz,
  version integer NOT NULL DEFAULT 1,
  CONSTRAINT task_dates_valid CHECK (
    start_date IS NULL OR due_date >= start_date
  )
);

CREATE TABLE task_supporting_owners (
  task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (task_id, user_id)
);

CREATE TABLE subtasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  description text NOT NULL,
  status task_status NOT NULL DEFAULT 'unassigned',
  owner_id uuid REFERENCES users(id) ON DELETE SET NULL,
  due_date date,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE task_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  author_id uuid REFERENCES users(id) ON DELETE SET NULL,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE task_activity (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  task_id uuid NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  from_value jsonb,
  to_value jsonb,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX mandates_workspace_idx ON mandates(workspace_id);
CREATE INDEX mandates_status_idx ON mandates(workspace_id, status);
CREATE INDEX tasks_mandate_idx ON tasks(mandate_id) WHERE deleted_at IS NULL;
CREATE INDEX tasks_board_idx ON tasks(mandate_id, status, sort_order) WHERE deleted_at IS NULL;
CREATE INDEX tasks_due_idx ON tasks(mandate_id, due_date) WHERE deleted_at IS NULL;
CREATE INDEX tasks_owner_idx ON tasks(primary_owner_id, status) WHERE deleted_at IS NULL;
CREATE INDEX subtasks_task_idx ON subtasks(task_id, sort_order);
CREATE INDEX task_activity_task_idx ON task_activity(task_id, created_at DESC);

CREATE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  IF TG_TABLE_NAME IN ('mandates', 'tasks') THEN
    NEW.version = OLD.version + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER workspaces_updated_at BEFORE UPDATE ON workspaces
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER mandates_updated_at BEFORE UPDATE ON mandates
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER checklist_templates_updated_at BEFORE UPDATE ON checklist_templates
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER subtasks_updated_at BEFORE UPDATE ON subtasks
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER task_comments_updated_at BEFORE UPDATE ON task_comments
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;
