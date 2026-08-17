const mandates = [
  { id: "prestige", name: "Prestige Lakeside Habitat", developer: "Prestige Group", city: "Bengaluru", status: "At risk", statusClass: "risk", progress: 10, total: 20, done: 2, wip: 10, blocked: 3, pending: 5, completion: "1 Aug 2026" },
  { id: "lodha", name: "Lodha Amara", developer: "Lodha Group", city: "Thane, Mumbai", status: "At risk", statusClass: "risk", progress: 17, total: 6, done: 1, wip: 2, blocked: 2, pending: 1, completion: "20 Jul 2026" },
  { id: "godrej", name: "Godrej Woodscape", developer: "Godrej Properties", city: "Pune", status: "On track", statusClass: "track", progress: 100, total: 5, done: 5, completion: "18 Jul 2026" },
  { id: "sobha", name: "Sobha Neopolis", developer: "Sobha Ltd", city: "Bengaluru", status: "Just started", statusClass: "started", progress: 0, total: 3, pending: 3, completion: "15 Aug 2026" },
  { id: "dlf", name: "DLF Privana", developer: "DLF Ltd", city: "Gurugram", status: "Just started", statusClass: "started", progress: 0, total: 3, pending: 3, completion: "20 Aug 2026" },
  { id: "brigade", name: "Brigade Cornerstone", developer: "Brigade Group", city: "Bengaluru", status: "Not created", statusClass: "empty", progress: null },
  { id: "mahindra", name: "Mahindra Eden", developer: "Mahindra Lifespaces", city: "Bengaluru", status: "Not created", statusClass: "empty", progress: null },
  { id: "shapoorji", name: "Shapoorji Northern Lights", developer: "Shapoorji Pallonji", city: "Pune", status: "On track", statusClass: "track", progress: 100, total: 4, done: 4, completion: "10 Jul 2026" },
  { id: "tata", name: "Tata Carnatica", developer: "Tata Housing", city: "Bengaluru", status: "Not created", statusClass: "empty", progress: null },
];

const seedTasks = [
  { id: 1, name: "Project kickoff and stakeholder alignment", workstream: "Mandate Setup", owner: "Aditi Rao", status: "done", priority: "high", start: "2026-07-13", due: "2026-07-15", description: "Confirm success metrics, owners and governance cadence." },
  { id: 2, name: "Finalize pricing and inventory grid", workstream: "Product & Pricing", owner: "Vikram Shah", status: "done", priority: "high", start: "2026-07-14", due: "2026-07-18", description: "Sign off tower-wise inventory and launch pricing." },
  { id: 3, name: "Approve campaign communication", workstream: "Marketing", owner: "Meera Iyer", status: "in_progress", priority: "high", start: "2026-07-16", due: "2026-07-24", description: "Complete creative, media and messaging approvals." },
  { id: 4, name: "Configure lead routing rules", workstream: "Technology", owner: "Arjun Nair", status: "in_progress", priority: "medium", start: "2026-07-18", due: "2026-07-25", description: "Map source, city and campaign rules to sales teams." },
  { id: 5, name: "Sales team product training", workstream: "Sales Readiness", owner: "Nisha Kapoor", status: "in_progress", priority: "high", start: "2026-07-20", due: "2026-07-27", description: "Train all assigned sales managers and certify completion." },
  { id: 6, name: "Publish landing page and lead forms", workstream: "Technology", owner: "Arjun Nair", status: "blocked", priority: "high", start: "2026-07-19", due: "2026-07-26", description: "Waiting for final compliance disclaimer and approved renders." },
  { id: 7, name: "Complete legal and RERA checks", workstream: "Compliance", owner: "Rohan Mehta", status: "blocked", priority: "high", start: "2026-07-15", due: "2026-07-22", description: "Close outstanding document and disclaimer observations." },
  { id: 8, name: "Set up daily performance dashboard", workstream: "Reporting & Governance", owner: "Aditi Rao", status: "in_progress", priority: "medium", start: "2026-07-22", due: "2026-07-30", description: "Publish channel, lead, site visit and booking metrics." },
  { id: 9, name: "Launch digital media campaigns", workstream: "Marketing", owner: "Meera Iyer", status: "pending", priority: "high", start: "2026-07-27", due: "2026-08-02", description: "Activate approved search, social and programmatic plans." },
  { id: 10, name: "Activate channel partner outreach", workstream: "Channel", owner: "Nisha Kapoor", status: "pending", priority: "medium", start: "2026-07-25", due: "2026-08-05", description: "Share launch kit and confirm priority partner participation." },
  { id: 11, name: "Run launch readiness review", workstream: "Mandate Setup", owner: "Vikram Shah", status: "pending", priority: "high", start: "2026-07-30", due: "2026-08-01", description: "Review all workstreams and record go-live decision." },
  { id: 12, name: "Complete week-one performance review", workstream: "Reporting & Governance", owner: "Aditi Rao", status: "pending", priority: "low", start: "2026-08-03", due: "2026-08-08", description: "Compare actual funnel performance with the agreed plan." },
];

const onboardingTaskDefinitions = [
  { category: "Mandate Setup", name: "Confirm mandate objectives and success metrics", subtask: "Document revenue, launch and conversion targets" },
  { category: "Mandate Setup", name: "Map key stakeholders and decision owners", subtask: "Create stakeholder RACI" },
  { category: "Mandate Setup", name: "Complete project kickoff meeting", subtask: "Share minutes and action tracker" },
  { category: "Mandate Setup", name: "Publish mandate governance cadence", subtask: "Schedule weekly and monthly reviews" },
  { category: "Mandate Setup", name: "Create central document repository", subtask: "Set folder access and naming convention" },
  { category: "Mandate Setup", name: "Approve launch readiness checklist", subtask: "Confirm workstream owners" },
  { category: "Product & Pricing", name: "Finalize unit inventory grid", subtask: "Validate tower and configuration availability" },
  { category: "Product & Pricing", name: "Approve launch pricing", subtask: "Sign off base price and premiums" },
  { category: "Product & Pricing", name: "Define payment plans", subtask: "Validate milestone and possession schedules" },
  { category: "Product & Pricing", name: "Complete competitor benchmarking", subtask: "Compare pricing, amenities and positioning" },
  { category: "Product & Pricing", name: "Prepare product fact sheet", subtask: "Verify specifications and amenities" },
  { category: "Product & Pricing", name: "Approve offer and discount matrix", subtask: "Document approval limits" },
  { category: "Compliance", name: "Validate RERA registration details", subtask: "Check registration number and validity" },
  { category: "Compliance", name: "Complete legal document review", subtask: "Review title, approvals and agreements" },
  { category: "Compliance", name: "Approve communication disclaimers", subtask: "Add channel-specific disclaimers" },
  { category: "Compliance", name: "Verify advertising permissions", subtask: "Confirm permitted claims and visuals" },
  { category: "Compliance", name: "Complete data privacy review", subtask: "Validate lead consent language" },
  { category: "Compliance", name: "Publish escalation and audit process", subtask: "Assign compliance point of contact" },
  { category: "Marketing", name: "Finalize project positioning", subtask: "Approve value proposition and proof points" },
  { category: "Marketing", name: "Approve campaign communication", subtask: "Sign off master messaging" },
  { category: "Marketing", name: "Complete creative production", subtask: "Deliver display, social and search assets" },
  { category: "Marketing", name: "Publish project landing page", subtask: "Complete content and quality review" },
  { category: "Marketing", name: "Configure campaign tracking", subtask: "Add UTMs, pixels and conversion events" },
  { category: "Marketing", name: "Approve media plan and budgets", subtask: "Confirm channel allocation" },
  { category: "Marketing", name: "Launch digital media campaigns", subtask: "Activate search, social and programmatic" },
  { category: "Marketing", name: "Prepare launch-day content calendar", subtask: "Schedule organic and CRM communication" },
  { category: "Technology", name: "Configure lead capture forms", subtask: "Validate required fields and consent" },
  { category: "Technology", name: "Set up lead routing rules", subtask: "Map sources to sales teams" },
  { category: "Technology", name: "Complete CRM integration testing", subtask: "Test lead creation and assignment" },
  { category: "Technology", name: "Configure notification workflows", subtask: "Test email and mobile alerts" },
  { category: "Technology", name: "Complete end-to-end funnel testing", subtask: "Run test lead through booking stage" },
  { category: "Technology", name: "Publish technical support process", subtask: "Share incident and escalation contacts" },
  { category: "Sales Readiness", name: "Assign mandate sales team", subtask: "Confirm team roster and reporting lines" },
  { category: "Sales Readiness", name: "Complete product training", subtask: "Certify sales managers" },
  { category: "Sales Readiness", name: "Prepare sales pitch and objection guide", subtask: "Approve key scripts" },
  { category: "Sales Readiness", name: "Configure call and follow-up cadence", subtask: "Publish SLA for each lead stage" },
  { category: "Sales Readiness", name: "Complete site visit readiness", subtask: "Verify experience centre and collateral" },
  { category: "Sales Readiness", name: "Run sales readiness assessment", subtask: "Score knowledge and pitch quality" },
  { category: "Sales Readiness", name: "Approve booking and handover workflow", subtask: "Confirm documentation steps" },
  { category: "Channel", name: "Identify priority channel partners", subtask: "Create launch partner list" },
  { category: "Channel", name: "Approve channel commercial terms", subtask: "Publish brokerage and payout rules" },
  { category: "Channel", name: "Prepare channel partner launch kit", subtask: "Package creatives, inventory and FAQs" },
  { category: "Channel", name: "Complete channel partner briefing", subtask: "Record attendance and questions" },
  { category: "Channel", name: "Activate partner lead tracking", subtask: "Validate source attribution" },
  { category: "Reporting & Governance", name: "Set up daily performance dashboard", subtask: "Track leads, visits, bookings and spend" },
  { category: "Reporting & Governance", name: "Define funnel health thresholds", subtask: "Set red, amber and green benchmarks" },
  { category: "Reporting & Governance", name: "Publish daily review format", subtask: "Confirm owners and cut-off time" },
  { category: "Reporting & Governance", name: "Complete launch readiness review", subtask: "Record go-live decision" },
  { category: "Reporting & Governance", name: "Run week-one performance review", subtask: "Compare actuals with plan" },
  { category: "Reporting & Governance", name: "Publish action closure tracker", subtask: "Assign owners and closure dates" },
];

const statusMeta = {
  unassigned: { label: "Unassigned", className: "unassigned" },
  pending: { label: "Pending", className: "pending" },
  in_progress: { label: "In progress", className: "progress" },
  blocked: { label: "Blocked", className: "blocked" },
  done: { label: "Done", className: "done" },
};

const workstreams = ["Mandate Setup", "Product & Pricing", "Compliance", "Marketing", "Technology", "Sales Readiness", "Channel", "Reporting & Governance"];
const owners = ["Unassigned", "Aditi Rao", "Vikram Shah", "Meera Iyer", "Arjun Nair", "Nisha Kapoor", "Rohan Mehta"];
const tasksByMandate = new Map();

const elements = {
  portfolioView: document.querySelector("#portfolioView"),
  workspaceView: document.querySelector("#workspaceView"),
  mandateGrid: document.querySelector("#mandateGrid"),
  emptyState: document.querySelector("#emptyState"),
  search: document.querySelector("#search"),
  sortButton: document.querySelector("#sortButton"),
  sortArrow: document.querySelector("#sortArrow"),
  gridButton: document.querySelector("#gridButton"),
  listButton: document.querySelector("#listButton"),
  role: document.querySelector("#role"),
  back: document.querySelector("#backToPortfolio"),
  workspaceTitle: document.querySelector("#workspaceTitle"),
  workspaceMeta: document.querySelector("#workspaceMeta"),
  workspaceAvatar: document.querySelector("#workspaceAvatar"),
  workspaceStatus: document.querySelector("#workspaceStatus"),
  breadcrumbName: document.querySelector("#breadcrumbName"),
  taskView: document.querySelector("#taskView"),
  taskSearch: document.querySelector("#taskSearch"),
  workstreamFilter: document.querySelector("#workstreamFilter"),
  ownerFilter: document.querySelector("#ownerFilter"),
  boardTab: document.querySelector("#boardTab"),
  listTab: document.querySelector("#taskListTab"),
  ganttTab: document.querySelector("#ganttTab"),
  addTask: document.querySelector("#addTaskButton"),
  exportButton: document.querySelector("#exportButton"),
  modal: document.querySelector("#taskModal"),
  modalTitle: document.querySelector("#modalTitle"),
  closeModal: document.querySelector("#closeModal"),
  cancelModal: document.querySelector("#cancelModal"),
  taskForm: document.querySelector("#taskForm"),
  taskId: document.querySelector("#taskId"),
  taskName: document.querySelector("#taskName"),
  taskWorkstream: document.querySelector("#taskWorkstream"),
  taskOwner: document.querySelector("#taskOwner"),
  taskStatus: document.querySelector("#taskStatus"),
  taskPriority: document.querySelector("#taskPriority"),
  taskStart: document.querySelector("#taskStart"),
  taskDue: document.querySelector("#taskDue"),
  taskDescription: document.querySelector("#taskDescription"),
  taskSubtasks: document.querySelector("#taskSubtasks"),
  taskRemarks: document.querySelector("#taskRemarks"),
  onboardingModal: document.querySelector("#onboardingModal"),
  onboardingTitle: document.querySelector("#onboardingTitle"),
  onboardingMandateName: document.querySelector("#onboardingMandateName"),
  onboardingRows: document.querySelector("#onboardingTaskRows"),
  onboardingSearch: document.querySelector("#onboardingSearch"),
  selectedTaskCount: document.querySelector("#selectedTaskCount"),
  startOnboarding: document.querySelector("#startOnboarding"),
  selectAllTasks: document.querySelector("#selectAllTasks"),
  clearAllTasks: document.querySelector("#clearAllTasks"),
  closeOnboarding: document.querySelector("#closeOnboarding"),
  cancelOnboarding: document.querySelector("#cancelOnboarding"),
  toast: document.querySelector("#toast"),
  kpiTotal: document.querySelector("#kpiTotal"),
  kpiDone: document.querySelector("#kpiDone"),
  kpiProgress: document.querySelector("#kpiProgress"),
  kpiBlocked: document.querySelector("#kpiBlocked"),
  kpiPercent: document.querySelector("#kpiPercent"),
};

let ascending = true;
let currentMandate = null;
let taskViewMode = "board";
let toastTimer;
let nextTaskId = 100;
let onboardingMandate = null;
let onboardingSelected = new Set();
let draggedTaskId = null;
let recentlyMovedTaskId = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initials(name) {
  return name.split(" ").slice(0, 2).map((word) => word[0]).join("");
}

function formatDate(value, short = false) {
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: short ? "short" : "short",
    year: short ? undefined : "numeric",
  }).format(date);
}

function currentLocalDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function stat(label, value) {
  return value === undefined ? "" : `<span>${label}<strong>${value}</strong></span>`;
}

function cardTemplate(mandate) {
  const hasChecklist = mandate.progress !== null;
  const progress = hasChecklist
    ? `<div class="progress-row" aria-label="${mandate.progress}% complete">
        <div class="progress-track"><span style="width:${mandate.progress}%"></span></div>
        <strong>${mandate.progress}%</strong>
      </div>
      <div class="task-stats">
        ${stat("Total Tasks", mandate.total)}${stat("Done", mandate.done)}
        ${stat("WIP", mandate.wip)}${stat("Blocked", mandate.blocked)}${stat("Pending", mandate.pending)}
      </div>`
    : `<div class="progress-row" aria-label="Checklist not created">
        <div class="progress-track"><span style="width:0%"></span></div><strong>—</strong>
      </div>
      <div class="task-stats"><span>Set up a checklist to start tracking progress.</span></div>`;

  return `<article class="mandate-card" data-id="${mandate.id}">
    <div class="card-top">
      <div class="project-avatar">${initials(mandate.name)}</div>
      <div><h2 class="project-name">${mandate.name}</h2><p class="project-meta">${mandate.developer} · ${mandate.city}</p></div>
      <span class="status ${mandate.statusClass}">${mandate.status}</span>
    </div>
    ${progress}
    <div class="card-footer">
      <div class="completion">${hasChecklist ? "Completion" : "Checklist"}<strong>${hasChecklist ? mandate.completion : "Not created yet"}</strong></div>
      <button class="checklist-button ${hasChecklist ? "" : "primary"}" type="button">${hasChecklist ? "View Checklist" : "Create Checklist"}</button>
    </div>
  </article>`;
}

function renderPortfolio() {
  const query = elements.search.value.trim().toLowerCase();
  const visible = [...mandates]
    .filter((mandate) => `${mandate.name} ${mandate.developer} ${mandate.city}`.toLowerCase().includes(query))
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return ascending ? comparison : -comparison;
    });
  elements.mandateGrid.innerHTML = visible.map(cardTemplate).join("");
  elements.emptyState.hidden = visible.length > 0;
}

function setPortfolioView(mode) {
  const list = mode === "list";
  elements.mandateGrid.classList.toggle("list-view", list);
  elements.listButton.classList.toggle("active", list);
  elements.gridButton.classList.toggle("active", !list);
  elements.listButton.setAttribute("aria-pressed", String(list));
  elements.gridButton.setAttribute("aria-pressed", String(!list));
}

function onboardingRow(definition, index) {
  const selected = onboardingSelected.has(index);
  return `<tr>
    <td>
      <label class="task-checkbox">
        <input type="checkbox" data-onboarding-index="${index}" ${selected ? "checked" : ""} />
        <span></span>
      </label>
    </td>
    <td><span class="workstream-tag">${escapeHtml(definition.category)}</span></td>
    <td><strong>${escapeHtml(definition.name)}</strong></td>
    <td><span class="subtask-copy">${escapeHtml(definition.subtask)}</span></td>
    <td>${priorityBadge("medium")}</td>
    <td><span class="default-value">${formatDate(currentLocalDate(), true)}</span></td>
    <td><span class="onboarding-status">Unassigned</span></td>
    <td><span class="default-value">Unassigned</span></td>
    <td><span class="remarks-empty">—</span></td>
  </tr>`;
}

function updateOnboardingSelection() {
  const count = onboardingSelected.size;
  elements.selectedTaskCount.textContent = count;
  elements.startOnboarding.textContent = `Start onboarding · ${count} ${count === 1 ? "task" : "tasks"}`;
  elements.startOnboarding.disabled = count === 0;
}

function renderOnboardingRows() {
  const query = elements.onboardingSearch.value.trim().toLowerCase();
  const visible = onboardingTaskDefinitions
    .map((definition, index) => ({ definition, index }))
    .filter(({ definition }) => `${definition.category} ${definition.name} ${definition.subtask}`.toLowerCase().includes(query));
  elements.onboardingRows.innerHTML = visible.length
    ? visible.map(({ definition, index }) => onboardingRow(definition, index)).join("")
    : '<tr><td class="onboarding-empty" colspan="9">No recommended tasks match your search.</td></tr>';
  updateOnboardingSelection();
}

function openOnboarding(mandateId) {
  onboardingMandate = mandates.find((mandate) => mandate.id === mandateId);
  if (!onboardingMandate) return;
  onboardingSelected = new Set(onboardingTaskDefinitions.map((_, index) => index));
  elements.onboardingSearch.value = "";
  elements.onboardingMandateName.textContent = onboardingMandate.name;
  elements.onboardingModal.hidden = false;
  document.body.classList.add("modal-open");
  renderOnboardingRows();
  elements.onboardingSearch.focus();
}

function closeOnboarding() {
  elements.onboardingModal.hidden = true;
  document.body.classList.remove("modal-open");
  onboardingMandate = null;
}

function startOnboarding() {
  if (!onboardingMandate || onboardingSelected.size === 0) return;
  const today = currentLocalDate();
  const selectedTasks = [...onboardingSelected]
    .sort((a, b) => a - b)
    .map((index) => {
      const definition = onboardingTaskDefinitions[index];
      return {
        id: nextTaskId++,
        name: definition.name,
        workstream: definition.category,
        owner: "Unassigned",
        status: "unassigned",
        priority: "medium",
        start: today,
        due: today,
        description: definition.name,
        subtasks: [definition.subtask],
        remarks: "",
      };
    });
  tasksByMandate.set(onboardingMandate.id, selectedTasks);
  onboardingMandate.progress = 0;
  onboardingMandate.total = selectedTasks.length;
  onboardingMandate.done = 0;
  onboardingMandate.wip = 0;
  onboardingMandate.blocked = 0;
  onboardingMandate.pending = selectedTasks.length;
  onboardingMandate.status = "Just started";
  onboardingMandate.statusClass = "started";
  onboardingMandate.completion = formatDate(today);
  const mandateId = onboardingMandate.id;
  closeOnboarding();
  renderPortfolio();
  openWorkspace(mandateId);
  showToast(`${selectedTasks.length} tasks added to the playbook.`);
}

function tasksFor(mandate) {
  if (!tasksByMandate.has(mandate.id)) {
    const tasks = mandate.progress === null
      ? []
      : seedTasks.slice(0, Math.min(mandate.total || seedTasks.length, seedTasks.length)).map((task, index) => ({
          ...task,
          id: Number(`${mandates.indexOf(mandate) + 1}${String(index + 1).padStart(2, "0")}`),
        }));
    tasksByMandate.set(mandate.id, tasks);
  }
  return tasksByMandate.get(mandate.id);
}

function openWorkspace(mandateId) {
  currentMandate = mandates.find((mandate) => mandate.id === mandateId);
  if (!currentMandate) return;
  elements.portfolioView.hidden = true;
  elements.workspaceView.hidden = false;
  elements.workspaceTitle.textContent = currentMandate.name;
  elements.breadcrumbName.textContent = currentMandate.name;
  elements.workspaceMeta.textContent = `${currentMandate.developer} · ${currentMandate.city}`;
  elements.workspaceAvatar.textContent = initials(currentMandate.name);
  elements.workspaceStatus.textContent = currentMandate.status;
  elements.workspaceStatus.className = `status ${currentMandate.statusClass}`;
  elements.taskSearch.value = "";
  elements.workstreamFilter.value = "all";
  elements.ownerFilter.value = "all";
  taskViewMode = "board";
  updateViewTabs();
  renderWorkspace();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeWorkspace() {
  elements.workspaceView.hidden = true;
  elements.portfolioView.hidden = false;
  currentMandate = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function filteredTasks() {
  const query = elements.taskSearch.value.trim().toLowerCase();
  return tasksFor(currentMandate).filter((task) => {
    const matchesQuery = `${task.name} ${task.description} ${task.owner} ${task.workstream}`.toLowerCase().includes(query);
    const matchesWorkstream = elements.workstreamFilter.value === "all" || task.workstream === elements.workstreamFilter.value;
    const matchesOwner = elements.ownerFilter.value === "all" || task.owner === elements.ownerFilter.value;
    return matchesQuery && matchesWorkstream && matchesOwner;
  });
}

function updateKpis() {
  const tasks = tasksFor(currentMandate);
  const done = tasks.filter((task) => task.status === "done").length;
  const inProgress = tasks.filter((task) => task.status === "in_progress").length;
  const blocked = tasks.filter((task) => task.status === "blocked").length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  elements.kpiTotal.textContent = tasks.length;
  elements.kpiDone.textContent = done;
  elements.kpiProgress.textContent = inProgress;
  elements.kpiBlocked.textContent = blocked;
  elements.kpiPercent.textContent = `${percent}%`;
}

function priorityBadge(priority) {
  return `<span class="priority ${priority}">${priority}</span>`;
}

function statusSelect(task) {
  return `<select class="inline-status status-${task.status}" data-action="status" data-id="${task.id}" aria-label="Status for ${escapeHtml(task.name)}">
    ${Object.entries(statusMeta).map(([key, value]) => `<option value="${key}" ${task.status === key ? "selected" : ""}>${value.label}</option>`).join("")}
  </select>`;
}

function taskCard(task) {
  const subtask = task.subtasks?.[0];
  const movedClass = recentlyMovedTaskId === task.id ? " just-moved" : "";
  return `<article class="task-card${movedClass}" draggable="true" data-task-id="${task.id}" data-status="${task.status}">
    <div class="task-card-top"><span class="workstream-tag">${escapeHtml(task.workstream)}</span><span class="drag-handle" title="Drag to change status" aria-hidden="true">⋮⋮</span>${priorityBadge(task.priority)}</div>
    <h3>${escapeHtml(task.name)}</h3>
    <p>${escapeHtml(task.description)}</p>
    ${subtask ? `<div class="task-subtask">↳ ${escapeHtml(subtask)}</div>` : ""}
    <div class="task-date"><span>◷</span> ${formatDate(task.start, true)} – ${formatDate(task.due, true)}</div>
    <footer>
      <div class="owner-pill"><span>${initials(task.owner)}</span>${escapeHtml(task.owner)}</div>
      <button class="task-edit" type="button" data-action="edit" data-id="${task.id}" aria-label="Edit ${escapeHtml(task.name)}">•••</button>
    </footer>
    ${statusSelect(task)}
  </article>`;
}

function renderBoard(tasks) {
  return `<div class="board-view">
    ${Object.entries(statusMeta).map(([key, meta]) => {
      const columnTasks = tasks.filter((task) => task.status === key);
      return `<section class="board-column column-${meta.className}" data-drop-status="${key}" data-drop-label="${meta.label}">
        <header><span class="column-dot"></span><h2>${meta.label}</h2><strong>${columnTasks.length}</strong></header>
        <div class="board-cards">${columnTasks.length ? columnTasks.map(taskCard).join("") : '<p class="column-empty">No tasks here</p>'}</div>
        <button class="column-add" type="button" data-action="add" data-status="${key}">＋ Add task</button>
      </section>`;
    }).join("")}
  </div>`;
}

function renderList(tasks) {
  if (!tasks.length) return '<div class="view-empty"><strong>No tasks found</strong><span>Try changing your filters or add a new task.</span></div>';
  return `<div class="task-table-wrap"><table class="task-table">
    <thead><tr><th>Task description</th><th>Category</th><th>Sub-task</th><th>Priority</th><th>Due date</th><th>Status</th><th>Task owner</th><th>Remarks</th><th></th></tr></thead>
    <tbody>${tasks.map((task) => `<tr>
      <td><button class="task-name-button" type="button" data-action="edit" data-id="${task.id}">${escapeHtml(task.name)}</button><small>${escapeHtml(task.description)}</small></td>
      <td><span class="workstream-tag">${escapeHtml(task.workstream)}</span></td>
      <td><span class="subtask-copy">${escapeHtml(task.subtasks?.join(", ") || "—")}</span></td>
      <td>${priorityBadge(task.priority)}</td>
      <td><strong>${formatDate(task.due, true)}</strong></td>
      <td>${statusSelect(task)}</td>
      <td><div class="owner-pill"><span>${initials(task.owner)}</span>${escapeHtml(task.owner)}</div></td>
      <td><span class="remarks-copy">${escapeHtml(task.remarks || "—")}</span></td>
      <td><button class="task-edit" type="button" data-action="edit" data-id="${task.id}" aria-label="Edit ${escapeHtml(task.name)}">•••</button></td>
    </tr>`).join("")}</tbody>
  </table></div>`;
}

function dayDiff(a, b) {
  return Math.round((new Date(`${b}T00:00:00`) - new Date(`${a}T00:00:00`)) / 86400000);
}

function renderGantt(tasks) {
  const rangeStart = "2026-07-13";
  const rangeEnd = "2026-08-23";
  const totalDays = dayDiff(rangeStart, rangeEnd) + 1;
  const weeks = ["13 Jul", "20 Jul", "27 Jul", "3 Aug", "10 Aug", "17 Aug"];
  if (!tasks.length) return '<div class="view-empty"><strong>No tasks found</strong><span>Try changing your filters or add a new task.</span></div>';
  return `<div class="gantt-wrap">
    <div class="gantt-grid gantt-header">
      <div class="gantt-task-head">Task &amp; owner</div>
      <div class="gantt-timeline-head">${weeks.map((week) => `<span>${week}</span>`).join("")}</div>
    </div>
    ${tasks.map((task) => {
      const rawLeft = dayDiff(rangeStart, task.start);
      const rawWidth = Math.max(1, dayDiff(task.start, task.due) + 1);
      const left = Math.max(0, Math.min(totalDays - 1, rawLeft));
      const width = Math.max(2.4, Math.min(totalDays - left, rawWidth));
      return `<div class="gantt-grid gantt-row">
        <button class="gantt-task" type="button" data-action="edit" data-id="${task.id}">
          <strong>${escapeHtml(task.name)}</strong><span>${escapeHtml(task.owner)} · ${escapeHtml(task.workstream)}</span>
        </button>
        <div class="gantt-track">
          <button class="gantt-bar bar-${task.status}" type="button" data-action="edit" data-id="${task.id}" style="left:${(left / totalDays) * 100}%;width:${(width / totalDays) * 100}%">
            <span>${escapeHtml(task.name)}</span>
          </button>
          <i class="today-line" style="left:${(18 / totalDays) * 100}%"><em>Today</em></i>
        </div>
      </div>`;
    }).join("")}
    <div class="gantt-legend">${Object.entries(statusMeta).map(([key, meta]) => `<span><i class="bar-${key}"></i>${meta.label}</span>`).join("")}</div>
  </div>`;
}

function renderWorkspace() {
  updateKpis();
  const tasks = filteredTasks();
  if (taskViewMode === "board") elements.taskView.innerHTML = renderBoard(tasks);
  if (taskViewMode === "list") elements.taskView.innerHTML = renderList(tasks);
  if (taskViewMode === "gantt") elements.taskView.innerHTML = renderGantt(tasks);
}

function updateViewTabs() {
  [
    [elements.boardTab, "board"],
    [elements.listTab, "list"],
    [elements.ganttTab, "gantt"],
  ].forEach(([button, mode]) => {
    const active = taskViewMode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

function changeTaskView(mode) {
  taskViewMode = mode;
  updateViewTabs();
  renderWorkspace();
}

function optionMarkup(values) {
  return values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
}

function prepareSelects() {
  elements.workstreamFilter.insertAdjacentHTML("beforeend", optionMarkup(workstreams));
  elements.ownerFilter.insertAdjacentHTML("beforeend", optionMarkup(owners));
  elements.taskWorkstream.innerHTML = optionMarkup(workstreams);
  elements.taskOwner.innerHTML = optionMarkup(owners);
}

function openTaskModal(task = null, initialStatus = "unassigned") {
  elements.taskForm.reset();
  elements.taskId.value = task?.id || "";
  elements.modalTitle.textContent = task ? "Edit task" : "Add task";
  elements.taskName.value = task?.name || "";
  elements.taskWorkstream.value = task?.workstream || workstreams[0];
  elements.taskOwner.value = task?.owner || owners[0];
  elements.taskStatus.value = task?.status || initialStatus;
  elements.taskPriority.value = task?.priority || "medium";
  elements.taskStart.value = task?.start || currentLocalDate();
  elements.taskDue.value = task?.due || currentLocalDate();
  elements.taskDescription.value = task?.description || "";
  elements.taskSubtasks.value = task?.subtasks?.join(", ") || "";
  elements.taskRemarks.value = task?.remarks || "";
  elements.modal.hidden = false;
  document.body.classList.add("modal-open");
  elements.taskName.focus();
}

function closeTaskModal() {
  elements.modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function saveTask(event) {
  event.preventDefault();
  if (elements.taskDue.value < elements.taskStart.value) {
    showToast("Due date must be on or after the start date.");
    return;
  }
  const tasks = tasksFor(currentMandate);
  const payload = {
    name: elements.taskName.value.trim(),
    workstream: elements.taskWorkstream.value,
    owner: elements.taskOwner.value,
    status: elements.taskStatus.value,
    priority: elements.taskPriority.value,
    start: elements.taskStart.value,
    due: elements.taskDue.value,
    description: elements.taskDescription.value.trim() || "No description added.",
    subtasks: elements.taskSubtasks.value.split(",").map((value) => value.trim()).filter(Boolean),
    remarks: elements.taskRemarks.value.trim(),
  };
  const id = Number(elements.taskId.value);
  if (id) {
    const index = tasks.findIndex((task) => task.id === id);
    tasks[index] = { ...tasks[index], ...payload };
    showToast("Task updated.");
  } else {
    tasks.unshift({ id: nextTaskId++, ...payload });
    showToast("Task added.");
  }
  closeTaskModal();
  renderWorkspace();
}

function updateTaskStatus(id, status) {
  const task = tasksFor(currentMandate).find((item) => item.id === id);
  if (!task) return;
  task.status = status;
  showToast(`Moved to ${statusMeta[status].label}.`);
  renderWorkspace();
}

function clearDragVisuals() {
  elements.taskView.querySelector(".board-view")?.classList.remove("is-dragging-board");
  elements.taskView.querySelectorAll(".board-column").forEach((column) => {
    column.classList.remove("drop-available", "is-drag-over");
  });
  elements.taskView.querySelectorAll(".task-card").forEach((card) => card.classList.remove("is-dragging"));
}

function moveTaskByDrag(id, status) {
  const task = tasksFor(currentMandate).find((item) => item.id === id);
  if (!task || task.status === status) {
    clearDragVisuals();
    return;
  }
  task.status = status;
  recentlyMovedTaskId = id;
  renderWorkspace();
  showToast(`${task.name} moved to ${statusMeta[status].label}.`);
  window.setTimeout(() => {
    elements.taskView.querySelector(`[data-task-id="${id}"]`)?.classList.remove("just-moved");
    if (recentlyMovedTaskId === id) recentlyMovedTaskId = null;
  }, 700);
}

function exportTasks() {
  const rows = [["Category", "Task description", "Sub-task", "Priority", "Due date", "Status", "Task owner", "Remarks"]];
  tasksFor(currentMandate).forEach((task) => rows.push([
    task.workstream, task.name, task.subtasks?.join("; ") || "", task.priority,
    task.due, statusMeta[task.status].label, task.owner, task.remarks || "",
  ]));
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${currentMandate.id}-tasks.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Task list exported.");
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("visible"), 2500);
}

elements.search.addEventListener("input", renderPortfolio);
elements.sortButton.addEventListener("click", () => {
  ascending = !ascending;
  elements.sortArrow.textContent = ascending ? "↓" : "↑";
  renderPortfolio();
});
elements.gridButton.addEventListener("click", () => setPortfolioView("grid"));
elements.listButton.addEventListener("click", () => setPortfolioView("list"));
elements.role.addEventListener("change", () => showToast(`Viewing as ${elements.role.value}`));
elements.mandateGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".checklist-button");
  if (!button) return;
  const mandateId = button.closest(".mandate-card").dataset.id;
  const mandate = mandates.find((item) => item.id === mandateId);
  if (mandate?.progress === null) openOnboarding(mandateId);
  else openWorkspace(mandateId);
});
elements.back.addEventListener("click", closeWorkspace);
elements.boardTab.addEventListener("click", () => changeTaskView("board"));
elements.listTab.addEventListener("click", () => changeTaskView("list"));
elements.ganttTab.addEventListener("click", () => changeTaskView("gantt"));
elements.taskSearch.addEventListener("input", renderWorkspace);
elements.workstreamFilter.addEventListener("change", renderWorkspace);
elements.ownerFilter.addEventListener("change", renderWorkspace);
elements.addTask.addEventListener("click", () => openTaskModal());
elements.exportButton.addEventListener("click", exportTasks);
elements.taskView.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]");
  if (!action) return;
  if (action.dataset.action === "edit") {
    const task = tasksFor(currentMandate).find((item) => item.id === Number(action.dataset.id));
    if (task) openTaskModal(task);
  }
  if (action.dataset.action === "add") openTaskModal(null, action.dataset.status);
});
elements.taskView.addEventListener("change", (event) => {
  const select = event.target.closest('[data-action="status"]');
  if (select) updateTaskStatus(Number(select.dataset.id), select.value);
});
elements.taskView.addEventListener("dragstart", (event) => {
  if (taskViewMode !== "board" || event.target.closest("button, select")) {
    event.preventDefault();
    return;
  }
  const card = event.target.closest(".task-card");
  if (!card) return;
  draggedTaskId = Number(card.dataset.taskId);
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", String(draggedTaskId));
  window.requestAnimationFrame(() => card.classList.add("is-dragging"));
  elements.taskView.querySelector(".board-view")?.classList.add("is-dragging-board");
  elements.taskView.querySelectorAll(".board-column").forEach((column) => {
    if (column.dataset.dropStatus !== card.dataset.status) column.classList.add("drop-available");
  });
});
elements.taskView.addEventListener("dragover", (event) => {
  const column = event.target.closest(".board-column");
  if (!column || draggedTaskId === null) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  elements.taskView.querySelectorAll(".board-column").forEach((item) => item.classList.toggle("is-drag-over", item === column));
});
elements.taskView.addEventListener("dragleave", (event) => {
  const column = event.target.closest(".board-column");
  if (!column || (event.relatedTarget && column.contains(event.relatedTarget))) return;
  column.classList.remove("is-drag-over");
});
elements.taskView.addEventListener("drop", (event) => {
  const column = event.target.closest(".board-column");
  if (!column || draggedTaskId === null) return;
  event.preventDefault();
  const id = draggedTaskId;
  draggedTaskId = null;
  moveTaskByDrag(id, column.dataset.dropStatus);
});
elements.taskView.addEventListener("dragend", () => {
  draggedTaskId = null;
  clearDragVisuals();
});
elements.taskForm.addEventListener("submit", saveTask);
elements.closeModal.addEventListener("click", closeTaskModal);
elements.cancelModal.addEventListener("click", closeTaskModal);
elements.modal.addEventListener("click", (event) => {
  if (event.target === elements.modal) closeTaskModal();
});
elements.onboardingSearch.addEventListener("input", renderOnboardingRows);
elements.onboardingRows.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-onboarding-index]");
  if (!checkbox) return;
  const index = Number(checkbox.dataset.onboardingIndex);
  if (checkbox.checked) onboardingSelected.add(index);
  else onboardingSelected.delete(index);
  updateOnboardingSelection();
});
elements.selectAllTasks.addEventListener("click", () => {
  onboardingSelected = new Set(onboardingTaskDefinitions.map((_, index) => index));
  renderOnboardingRows();
});
elements.clearAllTasks.addEventListener("click", () => {
  onboardingSelected.clear();
  renderOnboardingRows();
});
elements.startOnboarding.addEventListener("click", startOnboarding);
elements.closeOnboarding.addEventListener("click", closeOnboarding);
elements.cancelOnboarding.addEventListener("click", closeOnboarding);
elements.onboardingModal.addEventListener("click", (event) => {
  if (event.target === elements.onboardingModal) closeOnboarding();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!elements.modal.hidden) closeTaskModal();
  else if (!elements.onboardingModal.hidden) closeOnboarding();
});

prepareSelects();
renderPortfolio();
