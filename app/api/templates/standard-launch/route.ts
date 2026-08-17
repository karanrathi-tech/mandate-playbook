import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { templateTasks } from "@/db/schema";

export async function GET() {
  const tasks = await getDb()
    .select()
    .from(templateTasks)
    .where(eq(templateTasks.templateId, "standard-launch"))
    .orderBy(asc(templateTasks.sortOrder));

  return Response.json({ templateId: "standard-launch", tasks });
}
