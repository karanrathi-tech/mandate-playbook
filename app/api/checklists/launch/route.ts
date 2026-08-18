import { and, eq, inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { mandates, mandateTasks, templateTasks } from "@/db/schema";

interface LaunchChecklistRequest {
  mandateId?: string;
  templateId?: string;
  selectedTaskIds?: string[];
}

export async function POST(request: Request) {
  const body = (await request.json()) as LaunchChecklistRequest;
  const mandateId = body.mandateId?.trim();
  const templateId = body.templateId?.trim() || "standard-launch";
  const selectedTaskIds = [...new Set(body.selectedTaskIds ?? [])];

  if (!mandateId || selectedTaskIds.length === 0) {
    return Response.json(
      { error: "Choose one mandate and at least one task." },
      { status: 400 },
    );
  }

  const db = getDb();
  const [mandate] = await db
    .select({ id: mandates.id, hasChecklist: mandates.hasChecklist })
    .from(mandates)
    .where(eq(mandates.id, mandateId))
    .limit(1);

  if (!mandate) {
    return Response.json({ error: "Mandate not found." }, { status: 404 });
  }
  if (mandate.hasChecklist) {
    return Response.json(
      { error: "This mandate already has a playbook." },
      { status: 409 },
    );
  }

  const selected = await db
    .select()
    .from(templateTasks)
    .where(
      and(
        eq(templateTasks.templateId, templateId),
        inArray(templateTasks.id, selectedTaskIds),
      ),
    );

  if (selected.length !== selectedTaskIds.length) {
    return Response.json(
      { error: "One or more selected template tasks are invalid." },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const dueDate = now.slice(0, 10);
  await db.insert(mandateTasks).values(
    selected
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((task, index) => ({
        id: crypto.randomUUID(),
        mandateId,
        templateTaskId: task.id,
        category: task.category,
        description: task.description,
        priority: task.priority,
        company: task.company,
        dueDate,
        status: "unassigned" as const,
        taskOwner: "Unassigned",
        remarks: "",
        sortOrder: index,
        createdAt: now,
        updatedAt: now,
      })),
  );

  await db
    .update(mandates)
    .set({ hasChecklist: true, updatedAt: now })
    .where(eq(mandates.id, mandateId));

  return Response.json(
    { mandateId, createdTaskCount: selected.length },
    { status: 201 },
  );
}
