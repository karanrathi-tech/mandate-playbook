export const TASK_STATUSES = [
  "unassigned",
  "pending",
  "in_progress",
  "blocked",
  "completed",
] as const;

export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export interface Mandate {
  id: string;
  externalId?: string;
  name: string;
  developer?: string;
  city?: string;
  mandateType?: string;
  status: string;
  launchDate?: string;
  targetCompletionDate?: string;
  teamLeadId?: string;
  pnlHeadId?: string;
  checklistCreatedAt?: string;
  version: number;
}

export interface Task {
  id: string;
  mandateId: string;
  templateTaskId?: string;
  category: string;
  description: string;
  stage?: string;
  priority: TaskPriority;
  status: TaskStatus;
  startDate?: string;
  dueDate: string;
  revisedDueDate?: string;
  primaryOwnerId?: string;
  supportingOwnerIds: string[];
  remarks?: string;
  closingRemarks?: string;
  blockerReason?: string;
  blockerOwnerId?: string;
  isExternal: boolean;
  sortOrder: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Subtask {
  id: string;
  taskId: string;
  description: string;
  status: TaskStatus;
  ownerId?: string;
  dueDate?: string;
  sortOrder: number;
}

export interface ChecklistTemplateTask {
  id: string;
  category: string;
  description: string;
  subtaskDescription?: string;
  defaultPriority: TaskPriority;
  sortOrder: number;
  selectedByDefault: boolean;
}

export interface TaskFilters {
  search?: string;
  category?: string;
  ownerId?: string;
  statuses?: TaskStatus[];
  dueFrom?: string;
  dueTo?: string;
}

export type CreateTaskInput = Omit<
  Task,
  "id" | "version" | "createdAt" | "updatedAt" | "completedAt"
>;

export type UpdateTaskInput = Partial<
  Omit<Task, "id" | "mandateId" | "version" | "createdAt" | "updatedAt">
>;

export interface ChecklistSelection {
  templateTaskId: string;
  selected: boolean;
}
