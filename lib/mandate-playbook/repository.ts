import type {
  ChecklistSelection,
  ChecklistTemplateTask,
  CreateTaskInput,
  Mandate,
  Subtask,
  Task,
  TaskFilters,
  TaskStatus,
  UpdateTaskInput,
} from "./domain";

export class RecordNotFoundError extends Error {}
export class VersionConflictError extends Error {}

export interface MandatePlaybookRepository {
  listMandates(): Promise<Mandate[]>;
  getMandate(id: string): Promise<Mandate | null>;
  listTasks(mandateId: string, filters?: TaskFilters): Promise<Task[]>;
  getTask(id: string): Promise<Task | null>;
  listSubtasks(taskId: string): Promise<Subtask[]>;
  listChecklistTemplateTasks(): Promise<ChecklistTemplateTask[]>;
  createChecklist(
    mandateId: string,
    selections: ChecklistSelection[],
  ): Promise<Task[]>;
  createTask(input: CreateTaskInput): Promise<Task>;
  updateTask(
    id: string,
    changes: UpdateTaskInput,
    expectedVersion: number,
  ): Promise<Task>;
  moveTask(
    id: string,
    status: TaskStatus,
    sortOrder: number,
    expectedVersion: number,
  ): Promise<Task>;
  deleteTask(id: string, reason: string, expectedVersion: number): Promise<void>;
}
