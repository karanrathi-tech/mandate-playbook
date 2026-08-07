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
import {
  RecordNotFoundError,
  VersionConflictError,
  type MandatePlaybookRepository,
} from "./repository";

export interface InMemorySeed {
  mandates?: Mandate[];
  tasks?: Task[];
  subtasks?: Subtask[];
  templateTasks?: ChecklistTemplateTask[];
}

const clone = <T>(value: T): T => structuredClone(value);

export class InMemoryMandatePlaybookRepository
  implements MandatePlaybookRepository
{
  private mandates: Mandate[];
  private tasks: Task[];
  private subtasks: Subtask[];
  private templateTasks: ChecklistTemplateTask[];

  constructor(seed: InMemorySeed = {}) {
    this.mandates = clone(seed.mandates ?? []);
    this.tasks = clone(seed.tasks ?? []);
    this.subtasks = clone(seed.subtasks ?? []);
    this.templateTasks = clone(seed.templateTasks ?? []);
  }

  async listMandates() {
    return clone(this.mandates);
  }

  async getMandate(id: string) {
    return clone(this.mandates.find((mandate) => mandate.id === id) ?? null);
  }

  async listTasks(mandateId: string, filters: TaskFilters = {}) {
    const query = filters.search?.trim().toLowerCase();
    return clone(
      this.tasks
        .filter((task) => task.mandateId === mandateId)
        .filter((task) => !filters.category || task.category === filters.category)
        .filter(
          (task) =>
            !filters.ownerId ||
            task.primaryOwnerId === filters.ownerId ||
            task.supportingOwnerIds.includes(filters.ownerId),
        )
        .filter(
          (task) => !filters.statuses?.length || filters.statuses.includes(task.status),
        )
        .filter((task) => !filters.dueFrom || task.dueDate >= filters.dueFrom)
        .filter((task) => !filters.dueTo || task.dueDate <= filters.dueTo)
        .filter(
          (task) =>
            !query ||
            `${task.description} ${task.category} ${task.remarks ?? ""}`
              .toLowerCase()
              .includes(query),
        )
        .sort((a, b) => a.sortOrder - b.sortOrder),
    );
  }

  async getTask(id: string) {
    return clone(this.tasks.find((task) => task.id === id) ?? null);
  }

  async listSubtasks(taskId: string) {
    return clone(
      this.subtasks
        .filter((subtask) => subtask.taskId === taskId)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    );
  }

  async listChecklistTemplateTasks() {
    return clone([...this.templateTasks].sort((a, b) => a.sortOrder - b.sortOrder));
  }

  async createChecklist(mandateId: string, selections: ChecklistSelection[]) {
    const mandate = this.requireMandate(mandateId);
    const selectedIds = new Set(
      selections.filter((selection) => selection.selected).map((selection) => selection.templateTaskId),
    );
    const today = new Date().toISOString();
    const dueDate = today.slice(0, 10);
    const created = this.templateTasks
      .filter((templateTask) => selectedIds.has(templateTask.id))
      .map((templateTask, index): Task => ({
        id: crypto.randomUUID(),
        mandateId,
        templateTaskId: templateTask.id,
        category: templateTask.category,
        description: templateTask.description,
        priority: templateTask.defaultPriority,
        status: "unassigned",
        dueDate,
        supportingOwnerIds: [],
        isExternal: false,
        sortOrder: index,
        version: 1,
        createdAt: today,
        updatedAt: today,
      }));

    this.tasks.push(...created);
    mandate.checklistCreatedAt = today;
    mandate.version += 1;
    return clone(created);
  }

  async createTask(input: CreateTaskInput) {
    this.requireMandate(input.mandateId);
    const now = new Date().toISOString();
    const task: Task = {
      ...clone(input),
      id: crypto.randomUUID(),
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.push(task);
    return clone(task);
  }

  async updateTask(id: string, changes: UpdateTaskInput, expectedVersion: number) {
    const task = this.requireTask(id);
    this.assertVersion(task, expectedVersion);
    Object.assign(task, clone(changes), {
      version: task.version + 1,
      updatedAt: new Date().toISOString(),
    });
    return clone(task);
  }

  async moveTask(
    id: string,
    status: TaskStatus,
    sortOrder: number,
    expectedVersion: number,
  ) {
    const completedAt = status === "completed" ? new Date().toISOString() : undefined;
    return this.updateTask(id, { status, sortOrder, completedAt }, expectedVersion);
  }

  async deleteTask(id: string, reason: string, expectedVersion: number) {
    if (!reason.trim()) throw new Error("A deletion reason is required.");
    const task = this.requireTask(id);
    this.assertVersion(task, expectedVersion);
    this.tasks = this.tasks.filter((candidate) => candidate.id !== id);
    this.subtasks = this.subtasks.filter((subtask) => subtask.taskId !== id);
  }

  private requireMandate(id: string) {
    const mandate = this.mandates.find((candidate) => candidate.id === id);
    if (!mandate) throw new RecordNotFoundError(`Mandate ${id} was not found.`);
    return mandate;
  }

  private requireTask(id: string) {
    const task = this.tasks.find((candidate) => candidate.id === id);
    if (!task) throw new RecordNotFoundError(`Task ${id} was not found.`);
    return task;
  }

  private assertVersion(record: { version: number }, expectedVersion: number) {
    if (record.version !== expectedVersion) {
      throw new VersionConflictError("This record has changed. Reload it and try again.");
    }
  }
}
