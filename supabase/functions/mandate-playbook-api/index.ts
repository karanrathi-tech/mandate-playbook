import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const EXPECTED_TOKEN_HASH = "ed2d2006a7b8a409277dea3a4af9a8e3f99e7cfa7c0c8b67356212336672dd90";
const url = Deno.env.get("SUPABASE_URL")!;
const secretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || (secretKeys ? Object.values(JSON.parse(secretKeys))[0] as string : "");
const db = createClient(url, serviceKey, { auth: { persistSession: false } });
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
const fromDbStatus = (status: string) => status === "pending" ? "not_started" : status;
const toDbStatus = (status: string) => status === "not_started" ? "pending" : status;
const validStatus = new Set(["unassigned", "pending", "in_progress", "blocked", "completed"]);
const validPriority = new Set(["low", "medium", "high"]);

class ApiError extends Error {
  status: number;
  constructor(message: string, status = 400) { super(message); this.status = status; }
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function actorFromExternalId(externalUserId: unknown) {
  const id = String(externalUserId || "");
  if (!id) throw new ApiError("Choose a user before making changes.", 403);
  const { data, error } = await db.from("users").select("id,external_user_id,name").eq("external_user_id", id).eq("is_active", true).single();
  if (error || !data) throw new ApiError("The selected user is not active.", 403);
  return data;
}

async function accessContext() {
  const [mandatesResult, leadsResult, usersResult] = await Promise.all([
    db.from("mandates").select("id,external_id,pnl_owner_id"),
    db.from("mandate_team_leads").select("mandate_id,user_id"),
    db.from("users").select("id,external_user_id,name").eq("is_active", true),
  ]);
  if (mandatesResult.error) throw mandatesResult.error;
  if (leadsResult.error) throw leadsResult.error;
  if (usersResult.error) throw usersResult.error;
  const mandates = mandatesResult.data || [];
  const leads = leadsResult.data || [];
  const users = usersResult.data || [];
  const mandateByExternal = new Map(mandates.map((m:any) => [m.external_id, m]));
  const leaderIds = new Set<string>();
  const leadersByMandate = new Map<string, Set<string>>();
  mandates.forEach((m:any) => {
    const set = new Set<string>();
    if (m.pnl_owner_id) { set.add(m.pnl_owner_id); leaderIds.add(m.pnl_owner_id); }
    leadersByMandate.set(m.id, set);
  });
  leads.forEach((lead:any) => {
    if (!leadersByMandate.has(lead.mandate_id)) leadersByMandate.set(lead.mandate_id, new Set());
    leadersByMandate.get(lead.mandate_id)!.add(lead.user_id);
    leaderIds.add(lead.user_id);
  });
  return {
    mandateByExternal,
    leadersByMandate,
    leaderIds,
    usersByExternal: new Map(users.map((u:any) => [u.external_user_id, u])),
    usersByName: new Map(users.map((u:any) => [u.name.toLowerCase(), u])),
  };
}

async function state() {
  const [mandateResult, employeeResult, taskResult] = await Promise.all([
    db.from("mandates").select("external_id,name,developer,city,launch_date,mandate_type,has_checklist,pnl_owner:users!mandates_pnl_owner_id_fkey(external_user_id,name),mandate_team_leads(position,user:users(external_user_id,name))").order("external_id"),
    db.from("users").select("external_user_id,name,email,display_color,department").eq("is_active", true).order("name"),
    db.from("tasks").select("id,client_id,category,task_description,subtask_description,priority,status,start_date,due_date,revised_due_date,primary_owner:users!tasks_primary_owner_id_fkey(external_user_id,name),blocker_owner:users!tasks_blocker_owner_id_fkey(external_user_id,name),remarks,closing_remarks,blocker_reason,is_external,sort_order,mandates!inner(external_id),task_revisions(revision_index,from_date,to_date,changed_by,changed_label,reason),task_due_changes(change_index,from_date,to_date,changed_by,changed_label)").is("deleted_at", null).order("sort_order"),
  ]);
  if (mandateResult.error) throw mandateResult.error;
  if (employeeResult.error) throw employeeResult.error;
  if (taskResult.error) throw taskResult.error;

  return {
    mandates: (mandateResult.data || []).sort((a:any, b:any) => Number(a.external_id.slice(1)) - Number(b.external_id.slice(1))).map((m:any) => ({
      id:m.external_id, name:m.name, developer:m.developer, city:m.city,
      launch:m.launch_date ? new Date(m.launch_date+"T00:00:00Z").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}) : "",
      mtype:m.mandate_type, pnlOwnerId:m.pnl_owner?.external_user_id || "",
      pnlHead:m.pnl_owner?.name || "",
      teamLeadIds:(m.mandate_team_leads || []).sort((a:any,b:any)=>a.position-b.position).map((lead:any)=>lead.user?.external_user_id).filter(Boolean),
      teamLead:(m.mandate_team_leads || []).sort((a:any,b:any)=>a.position-b.position).map((lead:any)=>lead.user?.name).filter(Boolean).join(", "),
      updated:"—", hasChecklist:!!m.has_checklist,
    })),
    employees: (employeeResult.data || []).map((e:any) => ({ id:e.external_user_id, name:e.name, email:e.email || "", color:e.display_color, department:e.department || "" })),
    tasks: (taskResult.data || []).map((t:any) => ({
      id:t.client_id||t.id, mandateId:t.mandates.external_id, ws:t.category, name:t.task_description, stage:"",
      start:t.start_date||"", due:t.due_date, revised:t.revised_due_date||"", status:fromDbStatus(t.status), prio:t.priority,
      primaryOwnerId:t.primary_owner?.external_user_id || "", primary:t.primary_owner?.name || "", supporting:[], external:!!t.is_external,
      desc:t.subtask_description||"", remark:t.remarks||"", closeRemark:t.closing_remarks||"", blockerReason:t.blocker_reason||"",
      blockerOwnerId:t.blocker_owner?.external_user_id || "", blockerOwner:t.blocker_owner?.name || "", subtasks:[],
      revisions:(t.task_revisions || []).sort((a:any,b:any)=>a.revision_index-b.revision_index).map((revision:any)=>({from:revision.from_date,to:revision.to_date,by:revision.changed_by||"Task Owner",when:revision.changed_label||"",reason:revision.reason||""})),
      dueChanges:(t.task_due_changes || []).sort((a:any,b:any)=>a.change_index-b.change_index).map((change:any)=>({from:change.from_date,to:change.to_date,by:change.changed_by||"Team Lead",when:change.changed_label||""})),
    })),
  };
}

async function launch(body:any) {
  const actor = await actorFromExternalId(body.userId);
  const access = await accessContext();
  const mandateExternalId = String(body.mandateId || "");
  const selectedIds = Array.isArray(body.selectedTaskIds) ? body.selectedTaskIds.map(String) : [];
  const mandate:any = access.mandateByExternal.get(mandateExternalId);
  if (!mandate || !selectedIds.length) throw new ApiError("Choose a mandate and at least one task.");
  if (!access.leadersByMandate.get(mandate.id)?.has(actor.id)) throw new ApiError("Only this mandate's P&L owner or TL can create its checklist.", 403);
  const {data:templates,error:templateError}=await db.from("checklist_template_tasks").select("id,external_id,category,task_description,subtask_description,company_type,default_priority,sort_order").in("external_id",selectedIds);
  if(templateError) throw templateError;
  const rows=(templates||[]).map((t:any)=>({mandate_id:mandate.id,template_task_id:t.id,client_id:mandateExternalId+"-"+t.external_id,category:t.category,task_description:t.task_description,subtask_description:t.subtask_description,priority:t.default_priority,status:"unassigned",due_date:new Date().toISOString().slice(0,10),primary_owner_id:null,task_owner_name:null,is_external:t.company_type==="external",sort_order:t.sort_order,deleted_at:null}));
  const {error:insertError}=await db.from("tasks").upsert(rows,{onConflict:"client_id",ignoreDuplicates:false}); if(insertError) throw insertError;
  const {error:updateError}=await db.from("mandates").update({has_checklist:true,checklist_created_at:new Date().toISOString()}).eq("id",mandate.id); if(updateError) throw updateError;
  return json({mandateId:mandateExternalId,createdTaskCount:rows.length},201);
}

const coreKeys = ["mandate_id","category","task_description","subtask_description","priority","start_date","due_date","revised_due_date","primary_owner_id","blocker_owner_id","remarks","closing_remarks","blocker_reason","is_external","sort_order"];
const taskOwnerProtectedKeys = coreKeys.filter((key) => !["revised_due_date", "remarks", "blocker_owner_id", "blocker_reason"].includes(key));
const same = (a:any,b:any) => {
  const normalize = (value:any) => value === "" || value === undefined ? null : value;
  return normalize(a) === normalize(b);
};

async function syncTasks(body:any) {
  const actor = await actorFromExternalId(body.userId);
  const incoming = Array.isArray(body.tasks) ? body.tasks : [];
  const access = await accessContext();
  const {data:existingRows,error:existingError}=await db.from("tasks").select("*").is("deleted_at",null); if(existingError) throw existingError;
  const existingByClient = new Map((existingRows||[]).map((t:any)=>[t.client_id,t]));

  const rows=incoming.map((t:any,index:number)=>{
    const mandate:any=access.mandateByExternal.get(String(t.mandateId||""));
    if(!mandate) throw new ApiError("Unknown mandate for task "+String(t.id||""));
    const status=toDbStatus(String(t.status||"unassigned"));
    const priority=String(t.prio||"medium");
    const owner = t.primaryOwnerId ? access.usersByExternal.get(String(t.primaryOwnerId)) : access.usersByName.get(String(t.primary||"").toLowerCase());
    const blockerOwner = t.blockerOwnerId ? access.usersByExternal.get(String(t.blockerOwnerId)) : access.usersByName.get(String(t.blockerOwner||"").toLowerCase());
    const row:any={client_id:String(t.id),mandate_id:mandate.id,category:String(t.ws||"Management"),task_description:String(t.name||"Untitled task"),subtask_description:String(t.desc||""),priority:validPriority.has(priority)?priority:"medium",status:validStatus.has(status)?status:"unassigned",start_date:t.start||null,due_date:t.due||new Date().toISOString().slice(0,10),revised_due_date:t.revised||null,primary_owner_id:owner?.id||null,blocker_owner_id:blockerOwner?.id||null,task_owner_name:null,remarks:String(t.remark||""),closing_remarks:String(t.closeRemark||""),blocker_reason:String(t.blockerReason||""),is_external:!!t.external,sort_order:index,deleted_at:null};
    const existing:any=existingByClient.get(row.client_id);
    const isLeader=access.leadersByMandate.get(mandate.id)?.has(actor.id) || false;
    if(!existing){
      if(!isLeader) throw new ApiError("Only this mandate's P&L owner or TL can create tasks.",403);
      if(row.primary_owner_id && access.leaderIds.has(row.primary_owner_id)) throw new ApiError("P&L owners and TLs cannot be assigned as task owners.",403);
      return row;
    }
    const statusChanged=!same(row.status,existing.status);
    const coreChanged=coreKeys.some((key)=>!same(row[key],existing[key]));
    const taskOwnerProtectedChanged=taskOwnerProtectedKeys.some((key)=>!same(row[key],existing[key]));
    if(isLeader){
      if(!same(row.primary_owner_id,existing.primary_owner_id) && row.primary_owner_id && access.leaderIds.has(row.primary_owner_id)) throw new ApiError("P&L owners and TLs cannot be assigned as task owners.",403);
    } else if(existing.primary_owner_id===actor.id){
      if(taskOwnerProtectedChanged) throw new ApiError("Task owners can update status, revised date, remarks, and blocker details only.",403);
    } else if(statusChanged||coreChanged){
      throw new ApiError("You can view this task, but you cannot update it.",403);
    }
    return row;
  });

  if(rows.length){const {error}=await db.from("tasks").upsert(rows,{onConflict:"client_id",ignoreDuplicates:false});if(error)throw error;}
  if(rows.length){
    const clientIds=rows.map((row:any)=>row.client_id);
    const {data:savedTasks,error:savedTasksError}=await db.from("tasks").select("id,client_id").in("client_id",clientIds);
    if(savedTasksError)throw savedTasksError;
    const taskIdByClient=new Map((savedTasks||[]).map((task:any)=>[task.client_id,task.id]));
    const revisionRows:any[]=[];
    incoming.forEach((task:any)=>{
      const taskId=taskIdByClient.get(String(task.id));
      if(!taskId||!Array.isArray(task.revisions))return;
      task.revisions.forEach((revision:any,index:number)=>revisionRows.push({task_id:taskId,revision_index:index,from_date:revision.from||task.due,to_date:revision.to,changed_by:String(revision.by||actor.name||"Task Owner"),changed_label:String(revision.when||""),reason:String(revision.reason||"")}));
    });
    if(revisionRows.length){const {error:revisionError}=await db.from("task_revisions").upsert(revisionRows,{onConflict:"task_id,revision_index",ignoreDuplicates:false});if(revisionError)throw revisionError;}
    const dueChangeRows:any[]=[];
    incoming.forEach((task:any)=>{
      const taskId=taskIdByClient.get(String(task.id));
      if(!taskId||!Array.isArray(task.dueChanges))return;
      task.dueChanges.forEach((change:any,index:number)=>dueChangeRows.push({task_id:taskId,change_index:index,from_date:change.from,to_date:change.to,changed_by:String(change.by||actor.name||"Team Lead"),changed_label:String(change.when||"")}));
    });
    if(dueChangeRows.length){const {error:dueChangeError}=await db.from("task_due_changes").upsert(dueChangeRows,{onConflict:"task_id,change_index",ignoreDuplicates:false});if(dueChangeError)throw dueChangeError;}
  }
  const keep=new Set(rows.map((r:any)=>r.client_id));
  const removed=(existingRows||[]).filter((t:any)=>t.client_id&&!keep.has(t.client_id));
  for(const task of removed){
    if(!access.leadersByMandate.get(task.mandate_id)?.has(actor.id)) throw new ApiError("Only this mandate's P&L owner or TL can delete tasks.",403);
  }
  if(removed.length){const {error}=await db.from("tasks").update({deleted_at:new Date().toISOString()}).in("client_id",removed.map((t:any)=>t.client_id));if(error)throw error;}
  return json({saved:rows.length,removed:removed.length});
}

Deno.serve(async(req)=>{try{const supplied=req.headers.get("x-mandate-playbook-token")||"";if(!supplied||await sha256(supplied)!==EXPECTED_TOKEN_HASH)return json({error:"Unauthorized"},401);const requestUrl=new URL(req.url);const action=requestUrl.searchParams.get("action")||"state";if(req.method==="GET"&&action==="state")return json(await state());const body=await req.json();if(req.method==="POST"&&action==="launch")return await launch(body);if(req.method==="PUT"&&action==="sync")return await syncTasks(body);return json({error:"Not found"},404);}catch(error){console.error(error);return json({error:error instanceof Error?error.message:"Unexpected error"},error instanceof ApiError?error.status:500);}});
