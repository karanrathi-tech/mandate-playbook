alter table public.users
  add column if not exists app_role text,
  add column if not exists display_color text;

create unique index if not exists users_workspace_external_user_id_uidx
  on public.users (workspace_id, external_user_id)
  where external_user_id is not null;

insert into public.users (workspace_id, external_user_id, name, email, app_role, display_color, is_active)
select w.id, e.external_user_id, e.name, e.email, e.app_role, e.display_color, true
from public.workspaces w
cross join (values
  ('e1','Arindom D','arindom.das@anarock.co','lead','#6161FF'),
  ('e2','Amit K','amit.kumar@anarock.co','bsm','#10AC60'),
  ('e3','Sneha P','sneha.patil@anarock.co',null,'#C98A12'),
  ('e4','Rohit M','rohit.mehta@anarock.co',null,'#D32F02'),
  ('e5','Kavya R','kavya.reddy@anarock.co','pnl','#7A4FD0'),
  ('e6','Mihir Shah','mihir.shah@anarock.co','dev','#4A7A9E'),
  ('e7','Priya N','priya.nair@anarock.co',null,'#DC4276'),
  ('e8','Karan V','karan.verma@anarock.co',null,'#47C1BF'),
  ('e9','Neha J','neha.joshi@anarock.co',null,'#ED754B'),
  ('e10','Vikram S','vikram.singh@anarock.co',null,'#4BB952')
) as e(external_user_id,name,email,app_role,display_color)
where w.external_id = 'mandate-playbook'
on conflict (workspace_id, external_user_id) where external_user_id is not null
do update set name=excluded.name, email=excluded.email, app_role=excluded.app_role,
  display_color=excluded.display_color, is_active=true, updated_at=now();
