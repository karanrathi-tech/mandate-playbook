import { index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const mandates = sqliteTable(
  "mandates",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    developer: text("developer").notNull(),
    city: text("city").notNull(),
    launchDate: text("launch_date").notNull(),
    mandateType: text("mandate_type").notNull(),
    pnlHead: text("pnl_head").notNull(),
    teamLead: text("team_lead").notNull(),
    hasChecklist: integer("has_checklist", { mode: "boolean" }).notNull().default(false),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("mandates_city_idx").on(table.city),
    index("mandates_checklist_idx").on(table.hasChecklist),
  ],
);

export const checklistTemplates = sqliteTable("checklist_templates", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const templateTasks = sqliteTable(
  "template_tasks",
  {
    id: text("id").primaryKey(),
    templateId: text("template_id")
      .notNull()
      .references(() => checklistTemplates.id, { onDelete: "cascade" }),
    category: text("category").notNull(),
    description: text("description").notNull(),
    subtaskDescription: text("subtask_description"),
    priority: text("priority", { enum: ["low", "medium", "high"] })
      .notNull()
      .default("medium"),
    company: text("company", { enum: ["internal", "external"] })
      .notNull()
      .default("internal"),
    sortOrder: integer("sort_order").notNull(),
    selectedByDefault: integer("selected_by_default", { mode: "boolean" })
      .notNull()
      .default(true),
  },
  (table) => [
    uniqueIndex("template_tasks_order_uq").on(table.templateId, table.sortOrder),
    index("template_tasks_category_idx").on(table.templateId, table.category),
  ],
);

export const mandateTasks = sqliteTable(
  "mandate_tasks",
  {
    id: text("id").primaryKey(),
    mandateId: text("mandate_id")
      .notNull()
      .references(() => mandates.id, { onDelete: "cascade" }),
    templateTaskId: text("template_task_id").references(() => templateTasks.id, {
      onDelete: "set null",
    }),
    category: text("category").notNull(),
    description: text("description").notNull(),
    priority: text("priority", { enum: ["low", "medium", "high"] })
      .notNull()
      .default("medium"),
    company: text("company", { enum: ["internal", "external"] })
      .notNull()
      .default("internal"),
    dueDate: text("due_date").notNull(),
    status: text("status", {
      enum: ["unassigned", "not_started", "in_progress", "blocked", "completed"],
    })
      .notNull()
      .default("unassigned"),
    taskOwner: text("task_owner").notNull().default("Unassigned"),
    remarks: text("remarks").notNull().default(""),
    sortOrder: integer("sort_order").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    uniqueIndex("mandate_template_task_uq").on(table.mandateId, table.templateTaskId),
    index("mandate_tasks_board_idx").on(table.mandateId, table.status, table.sortOrder),
    index("mandate_tasks_due_idx").on(table.mandateId, table.dueDate),
  ],
);

export const subtasks = sqliteTable(
  "subtasks",
  {
    id: text("id").primaryKey(),
    taskId: text("task_id")
      .notNull()
      .references(() => mandateTasks.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
    status: text("status", {
      enum: ["unassigned", "not_started", "in_progress", "blocked", "completed"],
    })
      .notNull()
      .default("unassigned"),
    taskOwner: text("task_owner").notNull().default("Unassigned"),
    sortOrder: integer("sort_order").notNull(),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [index("subtasks_task_idx").on(table.taskId, table.sortOrder)],
);
