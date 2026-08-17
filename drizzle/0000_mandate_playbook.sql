CREATE TABLE `mandates` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`developer` text NOT NULL,
	`city` text NOT NULL,
	`launch_date` text NOT NULL,
	`mandate_type` text NOT NULL,
	`pnl_head` text NOT NULL,
	`team_lead` text NOT NULL,
	`has_checklist` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `mandates_city_idx` ON `mandates` (`city`);
--> statement-breakpoint
CREATE INDEX `mandates_checklist_idx` ON `mandates` (`has_checklist`);
--> statement-breakpoint
CREATE TABLE `checklist_templates` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `template_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`template_id` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`subtask_description` text,
	`priority` text DEFAULT 'medium' NOT NULL,
	`company` text DEFAULT 'internal' NOT NULL,
	`sort_order` integer NOT NULL,
	`selected_by_default` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`template_id`) REFERENCES `checklist_templates`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `template_tasks_order_uq` ON `template_tasks` (`template_id`,`sort_order`);
--> statement-breakpoint
CREATE INDEX `template_tasks_category_idx` ON `template_tasks` (`template_id`,`category`);
--> statement-breakpoint
CREATE TABLE `mandate_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`mandate_id` text NOT NULL,
	`template_task_id` text,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`priority` text DEFAULT 'medium' NOT NULL,
	`company` text DEFAULT 'internal' NOT NULL,
	`due_date` text NOT NULL,
	`status` text DEFAULT 'unassigned' NOT NULL,
	`task_owner` text DEFAULT 'Unassigned' NOT NULL,
	`remarks` text DEFAULT '' NOT NULL,
	`sort_order` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`mandate_id`) REFERENCES `mandates`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`template_task_id`) REFERENCES `template_tasks`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mandate_template_task_uq` ON `mandate_tasks` (`mandate_id`,`template_task_id`);
--> statement-breakpoint
CREATE INDEX `mandate_tasks_board_idx` ON `mandate_tasks` (`mandate_id`,`status`,`sort_order`);
--> statement-breakpoint
CREATE INDEX `mandate_tasks_due_idx` ON `mandate_tasks` (`mandate_id`,`due_date`);
--> statement-breakpoint
CREATE TABLE `subtasks` (
	`id` text PRIMARY KEY NOT NULL,
	`task_id` text NOT NULL,
	`description` text NOT NULL,
	`status` text DEFAULT 'unassigned' NOT NULL,
	`task_owner` text DEFAULT 'Unassigned' NOT NULL,
	`sort_order` integer NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`task_id`) REFERENCES `mandate_tasks`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `subtasks_task_idx` ON `subtasks` (`task_id`,`sort_order`);
--> statement-breakpoint
INSERT INTO `checklist_templates` (`id`,`name`,`description`,`is_active`,`created_at`,`updated_at`) VALUES
('standard-launch','Standard launch template','Pre-fills all 8 workstreams with common tasks',true,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z');
--> statement-breakpoint
INSERT INTO `mandates` (`id`,`name`,`developer`,`city`,`launch_date`,`mandate_type`,`pnl_head`,`team_lead`,`has_checklist`,`created_at`,`updated_at`) VALUES
('m1','Prestige Lakeside Habitat','Prestige Group','Bengaluru','2026-08-15','New Launch','Kavya R','Arindom D',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m2','Lodha Amara','Lodha Group','Thane, Mumbai','2026-07-30','New Launch','Kavya R','Rohit M',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m3','Godrej Woodscape','Godrej Properties','Pune','2026-08-22','Launched','Kavya R','Arindom D',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m4','Sobha Neopolis','Sobha Ltd','Bengaluru','2026-10-05','Sustenance','Kavya R','Rohit M',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m5','DLF Privana','DLF Ltd','Gurugram','2026-09-12','Launched','Kavya R','Arindom D',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m6','Brigade Cornerstone','Brigade Group','Bengaluru','2026-11-20','New Launch','Kavya R','Arindom D',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m7','Mahindra Eden','Mahindra Lifespaces','Bengaluru','2026-11-28','New Launch','Kavya R','Arindom D',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m8','Shapoorji Northern Lights','Shapoorji Pallonji','Pune','2026-12-02','New Launch','Kavya R','Rohit M',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m9','Tata Carnatica','Tata Housing','Bengaluru','2026-12-10','New Launch','Kavya R','Arindom D',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m10','Puravankara Purva Zenium','Puravankara','Bengaluru','2026-12-15','New Launch','Kavya R','Rohit M',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m11','Kolte Patil 24K Espada','Kolte-Patil','Pune','2026-12-20','New Launch','Kavya R','Arindom D',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m12','Mantri Serenity','Mantri Developers','Bengaluru','2027-01-05','New Launch','Kavya R','Rohit M',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m13','Assetz Marq 3.0','Assetz Property','Bengaluru','2027-01-12','New Launch','Kavya R','Arindom D',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m14','Kalpataru Immensa','Kalpataru','Thane, Mumbai','2027-01-18','New Launch','Kavya R','Rohit M',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m15','Casagrand Zaltana','Casagrand','Chennai','2027-01-25','New Launch','Kavya R','Arindom D',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z'),
('m16','Provident Botanico','Provident Housing','Bengaluru','2027-02-01','New Launch','Kavya R','Rohit M',false,'2026-08-01T00:00:00.000Z','2026-08-01T00:00:00.000Z');
--> statement-breakpoint
INSERT INTO `template_tasks` (`id`,`template_id`,`category`,`description`,`priority`,`company`,`sort_order`,`selected_by_default`) VALUES
('standard-01','standard-launch','Management','Kickoff & governance setup','medium','internal',1,true),
('standard-02','standard-launch','Management','Weekly governance cadence setup','medium','internal',2,true),
('standard-03','standard-launch','PR','Press note draft','medium','internal',3,true),
('standard-04','standard-launch','PR','Media list & embargo plan','medium','internal',4,true),
('standard-05','standard-launch','Digital Marketing','Landing page go-live','medium','internal',5,true),
('standard-06','standard-launch','Digital Marketing','Paid campaign setup','medium','internal',6,true),
('standard-07','standard-launch','Site Requirements','Site branding installation','medium','external',7,true),
('standard-08','standard-launch','Site Requirements','Sample flat readiness','medium','internal',8,true),
('standard-09','standard-launch','Marketing','Brochure final cut','medium','internal',9,true),
('standard-10','standard-launch','Marketing','Signage & hoarding plan','medium','external',10,true),
('standard-11','standard-launch','Post Sales','CRM process mapping','medium','internal',11,true),
('standard-12','standard-launch','Manpower','Sales team deployment','medium','internal',12,true),
('standard-13','standard-launch','Manpower','Channel partner onboarding','medium','external',13,true),
('standard-14','standard-launch','Training & Pitch','Pitch deck v1','medium','internal',14,true);
