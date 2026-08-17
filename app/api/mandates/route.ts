import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { mandates } from "@/db/schema";

export async function GET() {
  const rows = await getDb().select().from(mandates).orderBy(asc(mandates.name));
  return Response.json({ mandates: rows });
}
