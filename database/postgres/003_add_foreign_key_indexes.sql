create index subtasks_owner_idx on public.subtasks(owner_id);
create index task_activity_actor_idx on public.task_activity(actor_id);
create index task_comments_author_idx on public.task_comments(author_id);
create index task_comments_task_idx on public.task_comments(task_id);
create index task_supporting_owners_user_idx on public.task_supporting_owners(user_id);
create index tasks_blocker_owner_idx on public.tasks(blocker_owner_id);
create index tasks_created_by_idx on public.tasks(created_by);
create index tasks_template_task_idx on public.tasks(template_task_id);
