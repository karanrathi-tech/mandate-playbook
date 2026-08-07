import { TASK_PRIORITIES, TASK_STATUSES, type CreateTaskInput, type TaskStatus, type UpdateTaskInput } from "./domain";
import type { MandatePlaybookRepository } from "./repository";

export class MandatePlaybookService {
  constructor(private readonly repository: MandatePlaybookRepository) {}

  listMandates() {
    return this.repository.listMandates();
  }

  listTasks(mandateId: string, filters = {}) {
    return this.repository.listTasks(mandateId, filters);
  }

  createTask(input: CreateTaskInput) {
    this.validateTask(input);
    return this.repository.createTask(input);
  }

  updateTask(id: string, changes: UpdateTaskInput, expectedVersion: number) {
    this.validateTask(changes);
    return this.repository.updateTask(id, changes, expectedVersion);
  }

  moveTask(id: string, status: TaskStatus, sortOrder: number, expectedVersion: number) {
    if (!TASK_STATUSES.includes(status)) throw new Error("Invalid task status.");
    if (!Number.isInteger(sortOrder) || sortOrder < 0) {
      throw new Error("Task position must be a non-negative whole number.");
    }
    return this.repository.moveTask(id, status, sortOrder, expectedVersion);
  }

  private validateTask(input: Partial<CreateTaskInput | UpdateTaskInput>) {
    if (input.description !== undefined && !input.description.trim()) {
      throw new Error("Task description is required.");
    }
    if (input.category !== undefined && !input.category.trim()) {
      throw new Error("Task category is required.");
    }
    if (input.priority !== undefined && !TASK_PRIORITIES.includes(input.priority)) {
      throw new Error("Invalid task priority.");
    }
    if (input.status !== undefined && !TASK_STATUSES.includes(input.status)) {
      throw new Error("Invalid task status.");
    }
    if (input.startDate && input.dueDate && input.dueDate < input.startDate) {
      throw new Error("Due date cannot be earlier than the start date.");
    }
  }
}
