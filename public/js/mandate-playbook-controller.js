class Component extends DCLogic {
  constructor(props){
    super(props);
    this.realToday = ()=>{ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
    const NOW = this.realToday();
    this.NOW = NOW;
    this.WS = ['Management','PR','Digital Marketing','Site Requirements','Marketing','Post Sales','Manpower','Training & Pitch','Timeline Scenarios'];
    this.STATUS = {
      unassigned:{label:'Unassigned', bg:'#ECECEF', fg:'#6b6b72', accent:'#a0a0a8'},
      not_started:{label:'Pending', bg:'#EFEFEF', fg:'#6b6b6b', accent:'#b0b0b0'},
      in_progress:{label:'In Progress', bg:'#E7F0FE', fg:'#2f6fdb', accent:'#2f6fdb'},
      blocked:{label:'Blocked', bg:'var(--red-light)', fg:'var(--red)', accent:'var(--red)'},
      completed:{label:'Completed', bg:'var(--emerald-light)', fg:'var(--emerald)', accent:'var(--emerald)'}
    };
    this.PRIO = { high:{label:'High', bg:'var(--red-light)', fg:'var(--red)'}, medium:{label:'Medium', bg:'var(--yellow-light)', fg:'#b0810f'}, low:{label:'Low', bg:'#EFEFEF', fg:'var(--gray)'} };
    this.ROLES = {
      pnl:{label:'P&L Head', role:'pnl', scope:'monitors the full portfolio'},
      lead:{label:'Team Lead', role:'lead', scope:'owns playbook execution'},
      bsm:{label:'BSM Member', role:'bsm', scope:'updates assigned tasks'},
      viewer:{label:'Viewer', role:'viewer', scope:'can view all tasks'}
    };
    this.OWNERS = [];
    this.ownerColors = {};
    this.EMPLOYEES = [];

    // Master data is loaded from PostgreSQL through /api/state.
    this.mandates = [];

    let uid = 0; const T = (m,ws,name,stage,status,prio,due,revised,primary,supporting,external,remark)=>(
      {id:'t'+(++uid), mandateId:m, ws, name, stage, status, prio, due, revised, primary, supporting:supporting||[], external:!!external, desc:'', remark:remark||''});
    this.tasks = [];
    const addSub=(name,subs)=>{ const t=this.tasks.find(x=>x.name===name); if(t) t.subtasks=subs; };
    addSub('Landing page go-live',[{id:'s1',name:'Design handoff',status:'completed'},{id:'s2',name:'Frontend build',status:'in_progress'},{id:'s3',name:'QA & launch',status:'not_started'}]);
    addSub('Pitch deck v1',[{id:'s4',name:'Pricing slide',status:'in_progress'},{id:'s5',name:'Competition slide',status:'not_started'}]);
    addSub('Sales team deployment',[{id:'s6',name:'Interviews',status:'completed'},{id:'s7',name:'Offers rolled out',status:'completed'},{id:'s8',name:'Onboarding',status:'in_progress'}]);
    addSub('Media list finalization',[{id:'s9',name:'Shortlist outlets',status:'completed'},{id:'s10',name:'Developer approval',status:'blocked'}]);
    const addRev=(name,revs)=>{ const t=this.tasks.find(x=>x.name===name); if(t) t.revisions=revs; };
    addRev('Marketing collateral approval',[{from:'2026-07-28',to:'2026-07-19',by:'Team Lead',when:'2026-07-10 · 11:00 am',reason:'Vendor confirmed early completion — pulled the date in.'}]);
    addRev('Site inspection report',[{from:'2026-07-16',to:'2026-07-24',by:'Sneha P',when:'2026-07-11 · 4:10 pm',reason:'Awaiting signage vendor slot — pushed by a week.'}]);
    addRev('Utility connection setup',[{from:'2026-07-04',to:'2026-07-10',by:'Mihir Shah',when:'2026-07-02 · 10:00 am',reason:'Local authority approval delayed.'}]);

    // derive a task start (creation) date from due minus a priority-based lead time
    const DAYMS=86400000; const leadBy={high:6,medium:4,low:3};
    this.tasks.forEach(t=>{ if(!t.start && t.due){ const p=t.due.split('-').map(Number); const ms=Date.UTC(p[0],p[1]-1,p[2])-(leadBy[t.prio]||4)*DAYMS; const d=new Date(ms); t.start=d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0'); } });

    this.state = {
      userId:null, view:'direct', mandateId:null,
      landingSearch:'', landingFilter:'all', fLaunch:'all', fOwner:'all', fType:'all', landingView:'grid', tasksOnlyFilter:true, directSel:null, directOpen:false,
      mSortKey:'none', mSortOpen:false,
      clSearch:'', fDue:'all', fStatus:'all', fPrio:'all', fMine:false, sort:'start', collapsed:{}, clView:'board', dueHoverId:null, rowHoverId:null, selTasks:{},
      analyticsOpen:false, fTaskWs:'all', fTaskOwner:'all', fOwnerOverdueOnly:false, fOverdueRange:'all', fBlockedRange:'all', fRevisedRange:'all', overdueOwnersOpen:false, overdueOwnersSearch:'', unassignedDepartmentsOpen:false, unassignedDepartmentsSearch:'',
      drawer:null, // {mode:'view'|'add'|'edit', taskId}
      drawerTab:'details', addStep:1,
      draft:null,
      modal:null, // {type:'delete'|'create', taskId|mandateId} 
      delRemark:'', delConfirm:false, delError:'',
      dragTaskId:null, dragOverStatus:null, boardFail:false, justMovedId:null, boardGroup:'mandate', collapsedLanes:{},
      listCols:{}, listColsOpen:false, expandedSubs:{}, listExpanded:{}, ganttExpanded:{}, ganttZoom:'weeks', ganttHover:null, ganttOverride:{}, ganttRow:null, rowMenuId:null, listStatusMenuId:null, mandateMenuId:null,
      statusModal:null, // {kind:'complete'|'block'|'reopen', id, target, closingRemark, blockerReason, blockerOwner, reopenReason, error}
      celebFreeze:null, // holds header Done stat at its pre-completion value during the celebration cracker
      transfer:null, // {taskId, search, pickedId}
      dueEdit:null, // taskId currently editing its due date inline
      toast:null, navDrawerOpen:false,
      gfOpen:false, gfSel:null, gfSearch:'', gfParam:'Mandate', gfGroupSel:null, gfDrillMandate:null, gfTeams:false,
      mColWidths:[260,110,190,90,85,85,100,85,95,115,150,110,100,120], mHoverCol:null, mResizeCol:null, mActionW:150, mActionHover:false, mActionResizing:false,
      taskColW:{}, taskHoverCol:null, taskResizeCol:null,
      ganttColW:300, ganttHoverCol:null, ganttResizeCol:null
    };
  }

  // ---------- helpers ----------
  currentUserId(){ return this.state.userId || (this.EMPLOYEES[0]&&this.EMPLOYEES[0].id) || ''; }
  currentUser(){ return this.EMPLOYEES.find(x=>x.id===this.currentUserId()) || this.EMPLOYEES[0] || null; }
  roleName(){ const e=this.currentUser(); return e?e.name:''; }
  canManageMandate(id){ const m=typeof id==='string'?this.mandate(id):id; const uid=this.currentUserId(); return !!(m&&uid&&(m.pnlOwnerId===uid||(m.teamLeadIds||[]).includes(uid))); }
  role(mandateId){ const m=this.mandate(mandateId||this.state.mandateId); const uid=this.currentUserId(); if(m&&m.pnlOwnerId===uid)return 'pnl'; if(m&&(m.teamLeadIds||[]).includes(uid))return 'lead'; if(uid&&this.tasks.some(t=>t.primaryOwnerId===uid&&(!mandateId||t.mandateId===mandateId)))return 'bsm'; return 'viewer'; }
  userRoleLabel(userId){ if(this.mandates.some(m=>m.pnlOwnerId===userId)) return 'P&L Owner'; if(this.mandates.some(m=>(m.teamLeadIds||[]).includes(userId))) return 'Team Lead'; return 'Task Owner'; }
  userRoleRank(userId){ const label=this.userRoleLabel(userId); return label==='P&L Owner'?0:label==='Team Lead'?1:2; }
  initials(n){ if(!n) return '?'; const p=n.trim().split(/\s+/); return (p[0][0]+(p[1]?p[1][0]:'')).toUpperCase(); }
  fmt(d){ if(!d) return ''; const [y,mo,da]=String(d).slice(0,10).split('-'); const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return y&&M[parseInt(mo,10)-1]?String(da).padStart(2,'0')+'-'+M[parseInt(mo,10)-1]+'-'+y:''; }
  fmtFull(d){ return this.fmt(d); }
  _applyUiPolish(){
    try{
      if(!document.getElementById('mpb-ui-polish')){
        const style=document.createElement('style'); style.id='mpb-ui-polish';
        style.textContent='.dd-field{position:relative;z-index:1!important}.dd-field:focus-within{z-index:10000!important}.dd-field:focus-within [role="listbox"],.dd-field:focus-within [role="menu"]{z-index:10001!important;background:#fff!important;box-shadow:0 12px 30px rgba(16,23,33,.16)!important}.mpb-date-input{color:transparent!important;caret-color:transparent!important;padding-right:46px!important}.mpb-date-overlay{position:absolute;display:flex;align-items:center;pointer-events:none;color:rgba(16,23,33,.94);font:500 14px/18px Graphik,Inter,system-ui,sans-serif;white-space:nowrap;z-index:2}';
        document.head.appendChild(style);
      }
      document.querySelectorAll('input[type="date"]:not(.list-inline-date-input)').forEach(input=>{
        const parent=input.parentElement; if(!parent)return;
        const inputStyle=getComputedStyle(input);
        if(inputStyle.display==='none' || input.offsetParent===null){
          input.classList.remove('mpb-date-input');
          const stale=parent.querySelector(':scope > .mpb-date-overlay'); if(stale) stale.remove();
          return;
        }
        input.classList.add('mpb-date-input');
        if(getComputedStyle(parent).position==='static') parent.style.position='relative';
        let overlay=parent.querySelector(':scope > .mpb-date-overlay');
        if(!overlay){ overlay=document.createElement('span'); overlay.className='mpb-date-overlay'; parent.appendChild(overlay); }
        const update=()=>{ overlay.textContent=this.fmt(input.value); overlay.style.left='16px'; overlay.style.top=input.offsetTop+'px'; overlay.style.height=input.offsetHeight+'px'; overlay.style.maxWidth=Math.max(0,input.parentElement.clientWidth-62)+'px'; };
        update();
        if(!input.dataset.mpbDateBound){ input.dataset.mpbDateBound='1'; input.addEventListener('input',()=>requestAnimationFrame(update)); input.addEventListener('change',()=>requestAnimationFrame(update)); }
      });
    }catch(_){}
  }
  completionDate(id){ const ts=this.mTasks(id); const eff=ts.map(t=>this.effDate(t)).filter(Boolean); if(!eff.length) return ''; return this.fmtFull(eff.reduce((a,b)=>a>b?a:b)); }
  isMine(t){ return !!(t&&t.primaryOwnerId&&t.primaryOwnerId===this.currentUserId()); }
  effDate(t){ return t.revised||t.due; }
  isOverdue(t){ const eff=this.effDate(t); return t.status!=='completed' && eff < this.NOW; }
  dueBucket(t){ const eff=this.effDate(t); if(eff<this.NOW) return 'overdue'; if(eff===this.NOW) return 'today'; const wk=new Date(this.NOW); wk.setDate(wk.getDate()+7); return eff<=wk.toISOString().slice(0,10)?'week':'upcoming'; }
  daysBetween(a,b){ const p1=a.split('-').map(Number), p2=b.split('-').map(Number); return Math.round((Date.UTC(p2[0],p2[1]-1,p2[2])-Date.UTC(p1[0],p1[1]-1,p1[2]))/86400000); }
  overdueDays(t){ return this.isOverdue(t) ? this.daysBetween(this.effDate(t), this.NOW) : 0; }
  dueTagLabel(t){ if(this.isOverdue(t)) return 'Late by '+this.overdueDays(t)+'d'; const d=this.daysBetween(this.NOW,this.effDate(t)); return d===0?'Today':d+'d left'; }
  dueSoon(t){ if(this.isOverdue(t)) return false; const d=this.daysBetween(this.NOW,this.effDate(t)); return d>=0&&d<=2; }
  revisedDeltaDays(t){ return t.revised ? this.daysBetween(t.due, t.revised) : 0; }
  mandate(id){ return this.mandates.find(m=>m.id===id); }
  accessibleMandateIds(){
    const uid=this.currentUserId();
    const managed=this.mandates.filter(m=>m.pnlOwnerId===uid||(m.teamLeadIds||[]).includes(uid)).map(m=>m.id);
    const assigned=this.tasks.filter(t=>t.primaryOwnerId===uid).map(t=>t.mandateId);
    return new Set([...managed,...assigned]);
  }
  canViewMandate(id){ return this.accessibleMandateIds().has(id); }
  mTasks(id){ return this.canViewMandate(id)?this.tasks.filter(t=>t.mandateId===id):[]; }
  mandatesForRole(){ return [...new Set(this.tasks.filter(t=>this.isMine(t)).map(t=>t.mandateId))]; }
  scopedMandates(){ const ids=this.accessibleMandateIds(); return this.mandates.filter(m=>ids.has(m.id)); }
  leaderUserIds(){ const ids=new Set(); this.mandates.forEach(m=>{ if(m.pnlOwnerId)ids.add(m.pnlOwnerId); (m.teamLeadIds||[]).forEach(id=>ids.add(id)); }); return ids; }
  eligibleOwners(){ const leaders=this.leaderUserIds(); return this.EMPLOYEES.filter(e=>!leaders.has(e.id)); }
  progress(id){ const t=this.mTasks(id); if(!t.length) return {pct:0,done:0,total:0}; const done=t.filter(x=>x.status==='completed').length; return {pct:Math.round(done/t.length*100),done,total:t.length}; }
  counts(id){ const t=this.mTasks(id); return {unassigned:t.filter(x=>x.status==='unassigned').length, overdue:t.filter(x=>this.isOverdue(x)).length, blocked:t.filter(x=>x.status==='blocked').length, inprog:t.filter(x=>x.status==='in_progress').length, completed:t.filter(x=>x.status==='completed').length, notstarted:t.filter(x=>x.status==='not_started').length}; }

  // permission model
  perm(){
    const canManage=this.state.mandateId?this.canManageMandate(this.state.mandateId):this.mandates.some(m=>this.canManageMandate(m));
    return {
      canAdd: canManage,
      canDelete: canManage,
      canEditCore: canManage
    };
  }
  canEditTaskInline(t){
    return this.canManageMandate(t.mandateId);
  }
  canEditTask(t){ // opens edit drawer
    return this.canManageMandate(t.mandateId) || this.isMine(t);
  }
  canChangeTaskStatus(t){
    return !!(t&&(this.canManageMandate(t.mandateId)||this.isMine(t)));
  }

  // ---------- navigation ----------
  setUser(userId){ try{ localStorage.setItem('mandate-playbook:selected-user',userId); }catch(_){} this.setState({userId,view:'direct',mandateId:null,directSel:null,gfSel:null,gfGroupSel:null,gfDrillMandate:null,gfOpen:false,roleMenuOpen:false,drawer:null,modal:null,draft:null,statusModal:null,transfer:null,dueEdit:null,dragTaskId:null,dragOverStatus:null,fMine:false,selTasks:{}}); }
  goLanding(){ this.setState({view:'direct', mandateId:null, drawer:null, modal:null, directSel:null, collapsed:{}}); }
  toggleNavDrawer(){ if(this.state.navDrawerOpen){ this.closeNavDrawer(); } else { this.setState({navDrawerOpen:true, navDrawerClosing:false}); } }
  closeNavDrawer(){
    if(this._navClosing || !this.state.navDrawerOpen) return;
    this._navClosing=true;
    this.setState({navDrawerClosing:true});
    clearTimeout(this._nct);
    this._nct=setTimeout(()=>{ this._navClosing=false; this.setState({navDrawerOpen:false, navDrawerClosing:false}); }, 230);
  }
  openMandate(id){ const m=this.mandate(id); this.setState({view:'checklist', mandateId:id, drawer:null, modal:null, clSearch:'', fDue:'all', fStatus:'all', fPrio:'all', fMine:false, collapsed:{}, dueEdit:null}); }
  openDirect(){ this.setState({view:'direct', mandateId:null, drawer:null, modal:null, clSearch:'', fDue:'all', fStatus:'all', fPrio:'all', fMine:false, collapsed:{}, dueEdit:null, directSel:null, directOpen:false, selTasks:{}}); }
  toggleDirectMandate(id){ const r=this.role(), rn=this.roleName(); const scope=this.scopedMandates(r,rn);
    let sel=this.state.directSel; if(!sel){ sel={}; scope.forEach(m=>sel[m.id]=true); } else sel={...sel};
    sel[id]=!sel[id];
    const on=scope.filter(m=>sel[m.id]).length;
    if(on===0){ sel[id]=true; } // keep at least one mandate selected
    this.setState({directSel: on===scope.length?null:sel});
  }
  toast(msg,type){ this.setState({toast:{msg,type:type||'success'}}); clearTimeout(this._tt); this._tt=setTimeout(()=>this.setState({toast:null}),2600); }
  dismissToast(){ clearTimeout(this._tt); this.setState({toast:null}); }
  // ---------- inline due-date edit (table cell → native calendar) ----------
  startDueEdit(id,e,dueVal){
    try{e.preventDefault();e.stopPropagation();}catch(_){}
    const el = this._dueRefs && this._dueRefs[id];
    if(el){
      if(el.parentElement&&getComputedStyle(el.parentElement).position==='static') el.parentElement.style.position='relative';
      el.value=dueVal||'';
      el.focus();
      try{ el.showPicker && el.showPicker(); }catch(_){}
    }
    this.setState({dueEdit:id});
  }
  cancelDueEdit(){ this.setState({dueEdit:null}); }
  openReviseModal(id,val){
    if(!val) return; // incomplete date mid-typing — wait for a full value
    this.setState({statusModal:{kind:'revise', id, date:val, reviseReason:'', error:''}, dueEdit:null});
  }
  openReviseModalDirect(id){
    const t=this.tasks.find(x=>x.id===id); if(!t) return;
    this.setState({statusModal:{kind:'revise', id, date:(t.revised||t.due), reviseReason:'', error:''}, dueEdit:null});
  }
  openDueModalDirect(id){
    const t=this.tasks.find(x=>x.id===id); if(!t) return;
    this.setState({statusModal:{kind:'due', id, date:t.due, error:''}, dueEdit:null});
  }
  saveDueEdit(id,val){
    const t=this.tasks.find(x=>x.id===id); if(!t) return;
    if(!val){ return; } // incomplete date mid-typing — keep editor open, wait for more input
    if(val<this.realToday()){ this.toast('Due date cannot be in the past.','error'); return; }
    if(t.start && val<t.start){ this.toast('Due date cannot be before the start date ('+this.fmt(t.start)+').','error'); return; }
    const changed = t.due!==val;
    if(changed){ t.dueChanges=t.dueChanges||[]; t.dueChanges.push({from:t.due,to:val,by:this.roleName()||'Team Lead',when:this.fmt(this.realToday())+' · just now'}); }
    t.due=val;
    this.setState({dueEdit:null});
    if(changed) this.toast('Due date updated to '+this.fmt(val),'success');
  }

  // ---------- drawer / form ----------
  openView(id){ this.openEdit(id); } // unified: always open the single Edit Details drawer
  openAdd(){ const st=this.state; let _sm=this.mandates.filter(m=>this.canManageMandate(m)); if(st.gfSel) _sm=_sm.filter(m=>st.gfSel[m.id]); const _defM=(st.mandateId&&this.canManageMandate(st.mandateId)?st.mandateId:null)||(_sm[0]&&_sm[0].id); if(!_defM){ this.toast('You can create tasks only for mandates where you are the P&L owner or TL.','error'); return; } this.setState({drawer:{mode:'add'}, drawerTab:'details', addStep:1, draft:{mandateId:_defM, ws:this.WS[0],name:'',subs:[],prio:'medium',desc:'',start:this.NOW,due:this.NOW,revised:'',status:'unassigned',primary:'',primaryOwnerId:'',external:false,remark:'',closeRemark:'',fail:false}}); }
  openEdit(id){
    const t=this.tasks.find(x=>x.id===id);
    const primaryEmployee=this.EMPLOYEES.find(e=>(t.primaryOwnerId&&e.id===t.primaryOwnerId)||e.name===t.primary);
    const department=t.dept||(primaryEmployee&&(primaryEmployee.department||primaryEmployee.dept))||'';
    const subs=(t.subtasks||[]).map(s=>{ const ownerId=s.primaryOwnerId||s.taskOwnerId||s.ownerId||s.owner_id||''; const employee=ownerId&&this.EMPLOYEES.find(e=>e.id===ownerId); return {name:s.name||s.taskName||'',owner:s.primary||s.owner||s.taskOwner||s.task_owner||(employee&&employee.name)||''}; });
    this.setState({drawer:{mode:'edit',taskId:id},drawerTab:'details',draft:{...t,dept:department,subs,remark:'',blockerOwner:t.blockerOwner||'',blockerOwnerId:t.blockerOwnerId||'',closeRemark:t.closeRemark||'',fail:false}});
  }
  addNext(){
    const d=this.state.draft||{}; let err='';
    const incompleteSubtask=(d.subs||[]).some(subtask=>{ const hasName=!!String(subtask&&subtask.name||'').trim(), hasOwner=!!(subtask&&subtask.owner); return hasName!==hasOwner; });
    if(!d.mandateId) err='Mandate is required.';
    else if(!d.ws) err='Category is required.';
    else if(!d.name||!d.name.trim()) err='Task is required.';
    else if(incompleteSubtask) err='Complete both the sub-task name and owner, or remove that sub-task.';
    if(err){ this.setState({draft:{...d,error:err,validationAttempted:true}}); return; }
    this.setState({addStep:2, draft:{...d,error:'',validationAttempted:false}});
  }
  addBack(){ this.setState({addStep:1, draft:{...(this.state.draft||{}),error:''}}); }
  closeDrawer(){
    if(this._drawerClosing) return;
    this._drawerClosing=true;
    this.setState({drawerClosing:true});
    clearTimeout(this._dct);
    this._dct=setTimeout(()=>{ this._drawerClosing=false; this.setState({drawer:null, draft:null, drawerClosing:false}); }, 250);
  }
  setDrawerTab(t){ this.setState({drawerTab:t}); }
  taskTimeline(t){ if(!t) return [];
    const ev=[]; const who=t.primary||'Team Lead';
    ev.push({type:'created', title:'Task created', by:(t.ws==='Management'?'Arindom D':'Team Lead'), when:this.fmt(t.start)+' · 09:30 am', note:'Added to the launch playbook under '+t.ws+'.', dot:'var(--violet)'});
    const originalDue=(Array.isArray(t.dueChanges)&&t.dueChanges.length&&t.dueChanges[0].from)||t.due;
    ev.push({type:'due', title:'Due date set', by:'Team Lead', when:this.fmt(t.start)+' · 09:31 am', note:'Target: '+this.fmt(originalDue), dot:'#2f6fdb'});
    if(t.status==='in_progress'||t.status==='completed'||t.status==='blocked') ev.push({type:'status', title:'Status → In Progress', by:who, when:this.fmt(t.start)+' · 02:15 pm', note:'Work started.', dot:'#2f6fdb'});
    if(Array.isArray(t.dueChanges)) t.dueChanges.forEach(change=>ev.push({type:'due-change',title:'Due date changed',by:change.by||'Team Lead',when:change.when||this.fmt(this.realToday()),note:this.fmt(change.from)+'  →  '+this.fmt(change.to),dot:'#2f6fdb'}));
    if(Array.isArray(t.revisions) && t.revisions.length){
      t.revisions.forEach((rv,index)=>ev.push({type:'revised', title:index===0?'Timeline revised':'Revised timeline changed', by:rv.by||'Task Owner', when:rv.when||this.fmt(t.due), note:this.fmt(rv.from||t.due)+'  →  '+this.fmt(rv.to), dot:'#c98a12'}));
    } else if(t.revised){
      ev.push({type:'revised', title:'Timeline revised', by:'Task Owner', when:this.fmt(t.due)+' · 11:00 am', note:this.fmt(t.due)+'  →  '+this.fmt(t.revised), dot:'#c98a12'});
    }
    if(t.remark) ev.push({type:'note', title:'Note added by '+who, by:who, when:this.fmt(t.revised||t.due)+' · 04:20 pm', note:t.remark, dot:'var(--gray)'});
    if(t.status==='blocked') ev.push({type:'status', title:'Status → Blocked', by:who, when:this.fmt(t.revised||t.due)+' · 04:25 pm', note:t.remark||'Blocked pending dependency.', dot:'var(--red)'});
    if(t.status==='completed') ev.push({type:'done', title:'Marked complete', by:who, when:this.fmt(t.revised||t.due)+' · 05:55 pm', note:t.closeRemark||t.remark||'Closed and signed off.', dot:'var(--emerald)'});
    return ev.reverse();
  }
  revisedHistory(t){ if(!t) return [];
    // real, logged revisions (newest first) take priority
    if(Array.isArray(t.revisions) && t.revisions.length){
      return t.revisions.slice().reverse().map(rv=>({from:this.fmt(rv.from), to:this.fmt(rv.to), by:rv.by, when:rv.when, reason:rv.reason}));
    }
    if(!t.revised) return [];
    // seed: latest change + one earlier change, with reasons (wireframe data)
    const who=t.primary||'Team Lead';
    const rows=[
      {from:this.fmt(t.due), to:this.fmt(t.revised), by:'Team Lead', when:this.fmt(t.due)+' · 11:00 am', reason: t.status==='blocked' ? 'Blocked on a dependency — pushed to a realistic date.' : 'Scope expanded after review; extended the deadline.'},
    ];
    // a second (earlier) revision for higher-priority tasks, to show multiple changes
    if(t.prio==='high'){
      rows.push({from:this.fmt(t.due), to:this.fmt(t.due), by:who, when:this.fmt(t.start)+' · 03:40 pm', reason:'Initial estimate firmed up with the vendor.'});
    }
    return rows;
  }
  editFromView(){ const id=this.state.drawer.taskId; this.openEdit(id); }
  setD(k,v){ this.setState(s=>{ const draft=s.draft||{}; if(k==='status'&&v==='unassigned'&&draft.primary) v='not_started'; return {draft:{...draft,[k]:v,error:''}}; }); }
  setStartDate(v){ this.setState(s=>{ const draft=s.draft||{}, due=(!draft.due||draft.due<v)?v:draft.due; return {draft:{...draft,start:v,due,error:''}}; }); }
  setDueDate(v){ this.setState(s=>({draft:{...(s.draft||{}),due:v,error:''}})); }
  categoryNames(){
    const names=[...this.WS,...this.tasks.map(t=>t&&t.ws).filter(Boolean)];
    return names.filter((name,index)=>names.findIndex(other=>other.trim().toLocaleLowerCase()===name.trim().toLocaleLowerCase())===index);
  }
  setCategoryValue(value){
    if(value==='__new_category_active__') return;
    if(value!=='__add_new_category__'){
      this.setState(s=>({draft:{...s.draft,ws:value,newCategoryOpen:false,newCategoryName:'',newCategoryError:'',error:''}}));
      return;
    }
    this.setState(s=>({draft:{...s.draft,newCategoryOpen:true,newCategoryName:'',newCategoryError:'',error:''}}));
  }
  setNewCategoryName(value){ this.setState(s=>({draft:{...s.draft,newCategoryName:value,newCategoryError:'',error:''}})); }
  cancelNewCategory(){ this.setState(s=>({draft:{...s.draft,newCategoryOpen:false,newCategoryName:'',newCategoryError:'',error:''}})); }
  confirmNewCategory(){
    const entered=(this.state.draft&&this.state.draft.newCategoryName)||'';
    const name=entered.trim().replace(/\s+/g,' ');
    if(!name){ this.setState(s=>({draft:{...s.draft,newCategoryError:'Enter a category name.'}})); return; }
    const existing=this.categoryNames().find(category=>category.toLocaleLowerCase()===name.toLocaleLowerCase());
    if(existing){
      this.setState(s=>({draft:{...s.draft,newCategoryError:'This category already exists.'}}));
      return;
    }
    this.WS.push(name);
    this.setState(s=>({draft:{...s.draft,ws:name,newCategoryOpen:false,newCategoryName:'',newCategoryError:'',error:''}}));
  }
  setPrimaryAndDepartment(ownerName){
    const employee=this.EMPLOYEES.find(e=>e.name===ownerName);
    const department=employee ? (employee.department||employee.dept||'') : '';
    this.setState(s=>{ const draft=s.draft||{}; return {draft:{...draft,primary:ownerName,primaryOwnerId:employee?employee.id:'',dept:department,status:ownerName?(draft.status==='unassigned'?'not_started':draft.status):'unassigned',error:''}}; });
  }
  addSub(){ this.setState(s=>({draft:{...s.draft,subs:[...(s.draft.subs||[]),{name:'',owner:''}],error:'',validationAttempted:false}})); }
  setSub(i,field,v){ this.setState(s=>{ const subs=[...(s.draft.subs||[])]; subs[i]={...subs[i],[field]:v}; return {draft:{...s.draft,subs,error:''}}; }); }
  removeSub(i){ this.setState(s=>{ const subs=(s.draft.subs||[]).filter((_,x)=>x!==i); return {draft:{...s.draft,subs,error:'',validationAttempted:false}}; }); }
  toggleSupport(name){ this.setState(s=>{ const cur=s.draft.supporting||[]; const has=cur.includes(name); return {draft:{...s.draft, supporting: has?cur.filter(x=>x!==name):[...cur,name], error:''}}; }); }
  reopen(id){ const t=this.tasks.find(x=>x.id===id); t.status='in_progress'; this.toast('Task reopened','success'); this.forceUpdate(); }

  _morphModalToCard(addedId, modalRect, toView){
    const esc=(window.CSS&&CSS.escape)?CSS.escape(addedId||''):(addedId||'');
    const findTarget=()=> (toView==='list')
      ? (document.querySelector('[data-lrow="'+esc+'"]')||document.querySelector('[data-lstat="'+esc+'"]'))
      : document.querySelector('[data-tid="'+esc+'"]');
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ try{
      const tgt=findTarget(); if(!tgt) return;
      const tr=tgt.getBoundingClientRect();
      if(!tr.width || !tr.height) return;
      // hide the real card while the ghost flies in
      const prevVis=tgt.style.visibility; tgt.style.visibility='hidden';
      const ghost=document.createElement('div');
      ghost.style.cssText='position:fixed;left:'+modalRect.left+'px;top:'+modalRect.top+'px;width:'+modalRect.width+'px;height:'+modalRect.height+'px;background:#fff;border:1px solid #E0E0E0;border-radius:12px;box-shadow:0 20px 60px rgba(16,23,33,.28);z-index:9998;transform-origin:top left;transition:transform .5s cubic-bezier(.5,.02,.3,1),border-radius .5s ease,box-shadow .5s ease,opacity .5s ease;pointer-events:none;will-change:transform';
      document.body.appendChild(ghost);
      const dx=tr.left-modalRect.left, dy=tr.top-modalRect.top, sx=tr.width/modalRect.width, sy=tr.height/modalRect.height;
      requestAnimationFrame(()=>{ ghost.style.transform='translate('+dx+'px,'+dy+'px) scale('+sx+','+sy+')'; ghost.style.borderRadius='10px'; ghost.style.boxShadow='0 6px 18px rgba(16,23,33,.14)'; ghost.style.opacity='0.35'; });
      const done=()=>{ try{ tgt.style.visibility=prevVis||''; }catch(_){}; try{ ghost.remove(); }catch(_){}; };
      ghost.addEventListener('transitionend', done, {once:true});
      setTimeout(done, 640);
    }catch(_){}}));
  }
  saveDraft(){
    const d=this.state.draft;
    const stask = (this.state.drawer && this.state.drawer.taskId) ? this.tasks.find(x=>x.id===this.state.drawer.taskId) : null;
    const editable=this.canManageMandate(d.mandateId||(stask&&stask.mandateId)||this.state.mandateId);
    const statusOnly=!!(stask&&this.isMine(stask)&&!editable);
    const revisedChanged=!!(stask&&((d.revised||'')!==(stask.revised||'')));
    const incompleteSubtask=(d.subs||[]).some(subtask=>{ const hasName=!!String(subtask&&subtask.name||'').trim(), hasOwner=!!(subtask&&subtask.owner); return hasName!==hasOwner; });
    let err='';
    if(editable){
      if(this.state.drawer.mode==='add' && !d.mandateId) err='Mandate is required.';
      else if(!d.ws) err='Category is required.';
      else if(!d.name || !d.name.trim()) err='Task is required.';
      else if(incompleteSubtask) err='Complete both the sub-task name and owner, or remove that sub-task.';
      else if(this.state.drawer.mode==='add' && !d.start) err='Start date is required.';
      else if(!d.due) err='Due date is required.';
      else if(d.start && d.due && d.due < d.start) err='Due date cannot be before the start date.';
      else if(!d.status) err='Status is required.';
      else if(!d.prio) err='Priority is required.';
      else if(d.status!=='unassigned'&&!d.primary) err='Task Owner is required for the selected status.';
    }
    if(!err && d.revised && d.revised < this.NOW) err='Revised date must be today or later.';
    if(!err && statusOnly && revisedChanged && !(d.remark||'').trim()) err='Remark is required when setting a revised date.';
    if(!err && d.status==='blocked' && !(d.remark||'').trim()) err='Remark is required when status is Blocked.';
    if(!err && !editable && !statusOnly) err='You can view this task, but you cannot update it.';
    if(!err && d.fail) err='Task could not be saved. The server returned an error (500). Please retry.';
    if(err){ this.setState(s=>({draft:{...s.draft,error:err,validationAttempted:true}})); this.toast(err,'error'); return; }
    const subtasks=(d.subs||[]).filter(s=>s&&s.name&&s.name.trim()).map((s,i)=>{ const owner=this.EMPLOYEES.find(e=>e.name===s.owner); return {id:'ns'+i,name:s.name.trim(),status:'not_started',primary:s.owner||'',owner:s.owner||'',taskOwner:s.owner||'',primaryOwnerId:owner?owner.id:''}; });
    let celebrateId=null; let addedId=null;
    if(this.state.drawer.mode==='add'){
      const owner=this.EMPLOYEES.find(e=>e.name===d.primary);
      const t={id:'t'+Date.now(), mandateId:(d.mandateId||this.state.mandateId), dept:d.dept||'', ws:d.ws, name:d.name.trim(), stage:'', start:d.start||this.NOW, status:d.status||'unassigned', prio:d.prio, due:d.due, revised:d.revised, primaryOwnerId:owner?owner.id:'', primary:d.primary, supporting:[], external:!!d.external, desc:d.desc, remark:d.remark, closeRemark:d.closeRemark, subtasks};
      this.tasks.push(t); addedId=t.id;
      // adding the first task implicitly creates the checklist for this mandate
      const _m=this.mandate(d.mandateId||this.state.mandateId); if(_m && !_m.hasChecklist){ _m.hasChecklist=true; }
      this.toast('Task added successfully','success');
      if(d.status==='completed') celebrateId=t.id;
    } else {
      const t=this.tasks.find(x=>x.id===this.state.drawer.taskId);
      const wasDone=t.status==='completed'; const wasBlk=t.status==='blocked';
      if(editable){ const owner=this.EMPLOYEES.find(e=>e.name===d.primary); if(t.due!==d.due){ t.dueChanges=t.dueChanges||[]; t.dueChanges.push({from:t.due,to:d.due,by:this.roleName()||'Team Lead',when:this.fmt(this.realToday())+' · just now'}); } Object.assign(t,{ws:d.ws,name:d.name,prio:d.prio,due:d.due,revised:d.revised,status:d.status,primaryOwnerId:owner?owner.id:'',primary:d.primary,desc:d.desc,closeRemark:d.closeRemark,dept:d.dept,external:!!d.external}); if((d.remark||'').trim()) t.remark=d.remark.trim(); if(d.status==='blocked'){ t.blockerReason=d.remark.trim(); t.blockerOwner=d.blockerOwner||''; t.blockerOwnerId=d.blockerOwnerId||''; } }
      if(statusOnly){
        t.status=d.status;
        if((d.remark||'').trim()) t.remark=d.remark.trim();
        if(d.status==='blocked'){
          t.blockerReason=d.remark.trim();
          t.blockerOwner=d.blockerOwner||'';
          t.blockerOwnerId=d.blockerOwnerId||'';
          t.remark=d.remark.trim();
        }
        if(revisedChanged){
          t.revisions=t.revisions||[];
          t.revisions.push({from:t.revised||t.due,to:d.revised,by:this.roleName(),when:this.fmt(this.realToday()),reason:(d.remark||'').trim()});
          t.revised=d.revised;
          t.remark=d.remark;
        }
      }
      if(!wasDone && t.status==='completed') celebrateId=t.id;
      if(!wasBlk && t.status==='blocked'){ this._blockedSound(); this._blockedPulse(t.id); }
      if(editable&&d.subs) t.subtasks=subtasks;
      this.toast('Task updated','success');
    }
    if(celebrateId){ this._moveSeq=(this._moveSeq||0)+1; if(!this._moveOrder) this._moveOrder={}; this._moveOrder[celebrateId]=this._moveSeq; clearTimeout(this._jm); this._jm=setTimeout(()=>this.setState({justMovedId:null}),1400); }
    if(celebrateId){ this._moveAt=Date.now(); (this._movedIds=this._movedIds||{})[celebrateId]=1; }
    if(addedId){
      // Close immediately after creation. The previous morph animation could leave
      // the modal mounted when its target card was outside the rendered viewport.
      this._moveSeq=(this._moveSeq||0)+1; if(!this._moveOrder) this._moveOrder={}; this._moveOrder[addedId]=this._moveSeq;
      this._moveAt=Date.now(); (this._movedIds=this._movedIds||{})[addedId]=1;
      clearTimeout(this._jm); this._jm=setTimeout(()=>this.setState({justMovedId:null}),1400);
      const curView=this.state.clView||'board';
      const toView=curView==='list'?'list':'board';
      this.setState({drawer:null,draft:null,drawerClosing:false,clView:toView,justMovedId:addedId});
      if(celebrateId) this.celebrate(celebrateId);
      return;
    }
    this.setState({drawer:null, draft:null, justMovedId: celebrateId||null});
    if(celebrateId) this.celebrate(celebrateId);
  }

  updateStatus(id,val){
    const t=this.tasks.find(x=>x.id===id); if(!t || t.status===val) return;
    if(!this.canChangeTaskStatus(t)){ this.toast('You can change the status only for tasks assigned to you.','error'); return; }
    if((!t.primary||t.primary==='Unassigned')&&val!=='unassigned'){
      this.setState({listStatusMenuId:null,unassignedAssign:{taskId:t.id,target:val,pickedId:''}}); return;
    }
    if(t.status==='completed'&&val==='unassigned'){ this.openSM('reopen',id,val,{openUnassignOwnerNext:true}); return; }
    if(val==='unassigned'){ this.openSM('unassign',id,val); return; }
    if(val==='completed'){ this.openSM('complete',id,val); return; }   // ask closing remark
    if(val==='blocked'){ this.openSM('block',id,val); return; }        // ask blocker reason (mandatory)
    if(t.status==='completed'){ this.openSM('reopen',id,val); return; } // confirm reopen
    this.applyStatus(id,val,{});
  }
  toggleListStatusMenu(id,e){ try{e.stopPropagation();}catch(_){} this.setState(s=>({listStatusMenuId:s.listStatusMenuId===id?null:id,rowMenuId:null})); }
  closeListStatusMenu(e){ try{e.stopPropagation();}catch(_){} this.setState({listStatusMenuId:null}); }
  pickListStatus(id,status,e){ try{e.stopPropagation();}catch(_){} this.setState({listStatusMenuId:null},()=>this.updateStatus(id,status)); }

  // ---------- delete ----------
  openDelete(id){ const t=this.tasks.find(x=>x.id===id); if(!t||!this.canManageMandate(t.mandateId)){ this.toast('Only this mandate\'s P&L owner or TL can delete tasks.','error'); return; } this.setState({modal:{type:'delete',taskId:id}, delRemark:'', delConfirm:false, delError:'', drawer:null}); }
  confirmDelete(){
    const t=this.tasks.find(x=>x.id===this.state.modal.taskId);
    if(!this.state.delRemark.trim()){ this.setState({delError:'A reason for deletion is required.'}); return; }
    if(t.status==='completed' && !this.state.delConfirm){ this.setState({delError:'Please confirm PM approval to delete a completed task.'}); return; }
    this.tasks=this.tasks.filter(x=>x.id!==t.id);
    this.setState({modal:null, delRemark:'', delConfirm:false, delError:''});
    this.toast('Task deleted','success');
  }
  cancelModal(){ this.setState({modal:null}); }

  // ---------- create checklist ----------
  openCreate(){ if(!this.mandates.some(m=>this.canManageMandate(m))){ this.toast('You are not a P&L owner or TL for any mandate.','error'); return; } this.setState({modal:{type:'create'}, clw:{step:1, mandateId:null, search:'', method:'standard'}}); }
  clwSearch(v){ this.setState(s=>({clw:{...s.clw, search:v}})); }
  clwPick(id){ this.setState(s=>({clw:{...s.clw, mandateId:id}})); }
  clwSetMethod(m){ this.setState(s=>({clw:{...s.clw, method:m}})); }
  clwBack(){ this.setState(s=>({clw:{...s.clw, step:Math.max(1,s.clw.step-1)}})); }
  clwPrimary(){
    const w=this.state.clw; if(!w) return;
    if(w.step===1){ if(!w.mandateId){ this.toast('Select a mandate to continue','error'); return; } this.setState(s=>({clw:{...s.clw, step:2}})); return; }
    if(w.step===2){ if(!w.method){ this.toast('Choose how to start the playbook','error'); return; }
      if(w.method==='standard'){ const tpl=this.stdTemplateTasks(); this.setState({mandateId:w.mandateId, modal:null, clw:null, stdModal:{cat:'All', sel:tpl.map(()=>true)}, stdEnter:true}); return; }
      this.setState(s=>({clw:{...s.clw, step:3}})); return; }
    // step 3 — commit (blank only; standard routes to the template-review modal)
    const id=w.mandateId, m=this.mandate(id); if(!m) return; m.hasChecklist=true;
    this.setState({modal:null, clw:null, view:'checklist', mandateId:id});
    this.toast('Blank playbook created','success');
    setTimeout(()=>this.openAdd(),260);
  }
  createChecklist(kind){
    const id=this.state.mandateId, m=this.mandate(id); m.hasChecklist=true;
    if(kind==='standard'){
      let u=0; const mk=(ws,name,stage)=>({id:'ct'+Date.now()+(u++), mandateId:id, ws, name, stage, status:'not_started', prio:'medium', due:'2026-08-01', revised:'', primary:m.teamLead, supporting:[], external:false, desc:'', remark:''});
      [['Management','Kickoff & governance setup','Kickoff'],['PR','Press note draft','Draft'],['Digital Marketing','Landing page go-live','Build'],['Site Requirements','Site branding installation','Execution'],['Marketing','Brochure final cut','Final Cut'],['Post Sales','CRM process mapping','Mapping'],['Manpower','Sales team deployment','Hiring'],['Training & Pitch','Pitch deck v1','Draft']].forEach(a=>this.tasks.push(mk(a[0],a[1],a[2])));
      this.toast('Playbook created from template','success');
    } else if(kind==='import'){
      let u=0; const mk=(ws,name,prio,due,primary)=>({id:'ci'+Date.now()+(u++), mandateId:id, ws, name, stage:'', status:'not_started', prio, due, revised:'', primary, supporting:[], external:false, desc:'', remark:'Imported from CSV'});
      [['Management','Kickoff & governance setup','high','2026-07-25',m.teamLead],['PR','Press note draft','medium','2026-08-02','Sneha P'],['Digital Marketing','Landing page go-live','high','2026-08-05','Amit K'],['Site Requirements','Site branding installation','high','2026-08-08','Mihir Shah'],['Marketing','Brochure final cut','medium','2026-08-10','Sneha P'],['Manpower','Sales team deployment','high','2026-08-12',m.teamLead]].forEach(a=>this.tasks.push(mk(a[0],a[1],a[2],a[3],a[4])));
      this.toast('6 tasks imported from CSV','success');
    } else { this.toast('Blank playbook created','success'); }
    this.setState({modal:null, view:'checklist', mandateId:id});
  }

  // ---------- standard template preview ----------
  stdTemplateTasks(){
    return [
      {ws:'Management', name:'Kickoff & governance setup', prio:'medium'},
      {ws:'Management', name:'Weekly governance cadence setup', prio:'medium'},
      {ws:'PR', name:'Press note draft', prio:'medium'},
      {ws:'PR', name:'Media list & embargo plan', prio:'medium'},
      {ws:'Digital Marketing', name:'Landing page go-live', prio:'medium'},
      {ws:'Digital Marketing', name:'Paid campaign setup', prio:'medium'},
      {ws:'Site Requirements', name:'Site branding installation', prio:'medium', external:true},
      {ws:'Site Requirements', name:'Sample flat readiness', prio:'medium'},
      {ws:'Marketing', name:'Brochure final cut', prio:'medium'},
      {ws:'Marketing', name:'Signage & hoarding plan', prio:'medium', external:true},
      {ws:'Post Sales', name:'CRM process mapping', prio:'medium'},
      {ws:'Manpower', name:'Sales team deployment', prio:'medium'},
      {ws:'Manpower', name:'Channel partner onboarding', prio:'medium', external:true},
      {ws:'Training & Pitch', name:'Pitch deck v1', prio:'medium'}
    ];
  }
  openStdTemplate(){ const tpl=this.stdTemplateTasks(); this.setState({stdModal:{cat:'All', sel:tpl.map(()=>true)}, stdEnter:false}); }
  closeStd(){ this.setState({stdModal:null, stdConfirmOpen:false}); }
  stdBackToWizard(step){ this.setState({stdModal:null, stdConfirmOpen:false, modal:{type:'create'}, clw:{step:step, mandateId:this.state.mandateId, search:'', method:'standard'}}); }
  stdSetCat(c,idx){ this.setState(s=>({stdModal:{...s.stdModal, cat:c}})); const el=this._stdChips; if(el&&idx!=null){ requestAnimationFrame(()=>{ const prev=el.children[idx-1]; el.scrollTo({left: idx<=0?0:(prev?prev.offsetLeft:0), behavior:'smooth'}); }); } }
  stdToggle(i){ this.setState(s=>{ const sel=s.stdModal.sel.slice(); sel[i]=!sel[i]; return {stdModal:{...s.stdModal, sel}}; }); }
  stdToggleAllVisible(){ this.setState(s=>{ const sm=s.stdModal; const tpl=this.stdTemplateTasks(); const vis=tpl.map((t,i)=>i).filter(i=> sm.cat==='All'||tpl[i].ws===sm.cat); const allIn=vis.length>0&&vis.every(i=>sm.sel[i]); const sel=sm.sel.slice(); vis.forEach(i=>{ sel[i]=!allIn; }); return {stdModal:{...sm, sel}}; }); }
  stdConfirm(){
    const sm=this.state.stdModal; if(!sm) return;
    if(!sm.sel.filter(Boolean).length){ this.toast('Select at least one task to add','error'); return; }
    this.setState({stdConfirmOpen:true});
  }
  stdCancelConfirm(){ this.setState({stdConfirmOpen:false}); }
  stdReallyAdd(){
    const sm=this.state.stdModal; if(!sm) return;
    const tpl=this.stdTemplateTasks();
    const chosen=tpl.map((t,i)=>({...t,templateTaskId:'standard-'+String(i+1).padStart(2,'0')})).filter((t,i)=>sm.sel[i]);
    if(!chosen.length){ this.toast('Select at least one task to add','error'); return; }
    const id=this.state.mandateId, m=this.mandate(id); m.hasChecklist=true;
    let u=0;
    chosen.forEach(t=>this.tasks.push({id:id+'-'+t.templateTaskId, mandateId:id, ws:t.ws, name:t.name, stage:'', start:this.realToday(), status:'unassigned', prio:'medium', due:this.realToday(), revised:'', primary:'Unassigned', supporting:[], external:!!t.external, desc:'', remark:'', subtasks:[]}));
    try{ fetch('/api/checklists/launch',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:this.currentUserId(),mandateId:id,templateId:'standard-launch',selectedTaskIds:chosen.map(t=>t.templateTaskId)})}).catch(()=>{}); }catch(_){}
    this.toast(chosen.length+(chosen.length===1?' task added from template':' tasks added from template'),'success');
    this.setState({stdModal:null, stdConfirmOpen:false, view:'checklist', mandateId:id});
  }
  toggleWs(ws){ this.setState(s=>({collapsed:{...s.collapsed,[ws]:!s.collapsed[ws]}})); }

  // ---------- kanban / drag ----------
  setClView(v){ this.setState({clView:v, dragTaskId:null, dragOverStatus:null}); }
  setGanttZoom(v){ this.setState({ganttZoom:v}); }
  scrollGanttToToday(todayLeft){ const el=document.getElementById('gantt-scroll'); if(el){ el.scrollTo({left:Math.max(0,todayLeft-el.clientWidth/2),behavior:'smooth'}); } }
  setGanttHover(id){ if(this.state.ganttHover!==id) this.setState({ganttHover:id}); }
  setGanttRow(id){ if(this.state.ganttRow!==id) this.setState({ganttRow:id}); }
  startColResize(i,e){
    try{ e.preventDefault(); e.stopPropagation(); }catch(_){}
    this._colDragIdx=i; this._colDragStartX=e.clientX; this._colDragStartW=this.state.mColWidths[i];
    if(!this._onColMove) this._onColMove=(ev)=>{
      if(this._colDragIdx==null) return;
      const delta=ev.clientX-this._colDragStartX;
      const nw=Math.max(60, this._colDragStartW+delta);
      const cw=this.state.mColWidths.slice(); cw[this._colDragIdx]=nw;
      this.setState({mColWidths:cw});
    };
    if(!this._onColUp) this._onColUp=()=>{
      this._colDragIdx=null;
      document.removeEventListener('mousemove', this._onColMove);
      document.removeEventListener('mouseup', this._onColUp);
      this.setState({mResizeCol:null});
    };
    document.addEventListener('mousemove', this._onColMove);
    document.addEventListener('mouseup', this._onColUp);
    this.setState({mResizeCol:i, mHoverCol:i});
  }
  startActionResize(e){
    try{ e.preventDefault(); e.stopPropagation(); }catch(_){}
    this._actStartX=e.clientX; this._actStartW=this.state.mActionW;
    if(!this._onActMove) this._onActMove=(ev)=>{
      const delta=ev.clientX-this._actStartX;            // right-anchored: drag left widens
      const nw=Math.max(72, Math.min(320, this._actStartW-delta));
      this.setState({mActionW:nw});
    };
    if(!this._onActUp) this._onActUp=()=>{
      document.removeEventListener('mousemove', this._onActMove);
      document.removeEventListener('mouseup', this._onActUp);
      this.setState({mActionResizing:false});
    };
    document.addEventListener('mousemove', this._onActMove);
    document.addEventListener('mouseup', this._onActUp);
    this.setState({mActionResizing:true, mActionHover:true});
  }
  startTaskColResize(key,e){
    try{ e.preventDefault(); e.stopPropagation(); }catch(_){}
    const DEFW={task:340,ws:150,stage:130,due:190,status:160,prio:110,owner:170,support:140,remark:240,start:110,company:110,nudge:70};
    this._tColKey=key; this._tColStartX=e.clientX; this._tColStartW=(this.state.taskColW||{})[key]||DEFW[key];
    if(!this._onTColMove) this._onTColMove=(ev)=>{
      if(this._tColKey==null) return;
      const delta=ev.clientX-this._tColStartX;
      const nw=Math.max(60, this._tColStartW+delta);
      this.setState(s=>({taskColW:{...(s.taskColW||{}), [this._tColKey]:nw}}));
    };
    if(!this._onTColUp) this._onTColUp=()=>{
      this._tColKey=null;
      document.removeEventListener('mousemove', this._onTColMove);
      document.removeEventListener('mouseup', this._onTColUp);
      this.setState({taskResizeCol:null});
    };
    document.addEventListener('mousemove', this._onTColMove);
    document.addEventListener('mouseup', this._onTColUp);
    this.setState({taskResizeCol:key, taskHoverCol:key});
  }
  startGanttColResize(e){
    try{ e.preventDefault(); e.stopPropagation(); }catch(_){}
    this._gColStartX=e.clientX; this._gColStartW=this.state.ganttColW||300;
    if(!this._onGColMove) this._onGColMove=(ev)=>{
      const delta=ev.clientX-this._gColStartX;
      const nw=Math.max(160, Math.min(560, this._gColStartW+delta));
      this.setState({ganttColW:nw});
    };
    if(!this._onGColUp) this._onGColUp=()=>{
      document.removeEventListener('mousemove', this._onGColMove);
      document.removeEventListener('mouseup', this._onGColUp);
      this.setState({ganttResizeCol:false});
    };
    document.addEventListener('mousemove', this._onGColMove);
    document.addEventListener('mouseup', this._onGColUp);
    this.setState({ganttResizeCol:true, ganttHoverCol:true});
  }
  startGanttResize(id, edge, e, dayW, base){
    try{ e.preventDefault(); e.stopPropagation(); }catch(_){}
    const DAY=86400000;
    const previousOverride=(this.state.ganttOverride||{})[id]||null;
    const ov=previousOverride||{start:base.start,end:base.end};
    const s0=ov.start, e0=ov.end, startX=e.clientX;
    let latest={start:s0,end:e0};
    this.setState({ganttHover:id});
    const move=(ev)=>{ const dd=Math.round((ev.clientX-startX)/dayW); let ns=s0, ne=e0;
      if(edge==='start') ns=Math.min(s0+dd*DAY, e0-DAY); else ne=Math.max(e0+dd*DAY, s0+DAY);
      latest={start:ns,end:ne};
      this.setState(st=>({ganttOverride:{...st.ganttOverride,[id]:{start:ns,end:ne}}})); };
    const up=()=>{
      document.removeEventListener('mousemove',move); document.removeEventListener('mouseup',up);
      if(latest.start===s0&&latest.end===e0) return;
      this.setState({timelineDateModal:{id,edge,oldStart:s0,oldEnd:e0,newStart:latest.start,newEnd:latest.end,previousOverride}});
    };
    document.addEventListener('mousemove',move); document.addEventListener('mouseup',up);
  }
  ganttDate(ms){ const d=new Date(ms); return d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0')+'-'+String(d.getUTCDate()).padStart(2,'0'); }
  cancelTimelineDateChange(){
    const md=this.state.timelineDateModal; if(!md) return;
    this.setState(s=>{ const next={...(s.ganttOverride||{})}; if(md.previousOverride) next[md.id]=md.previousOverride; else delete next[md.id]; return {ganttOverride:next,timelineDateModal:null}; });
  }
  confirmTimelineDateChange(){
    const md=this.state.timelineDateModal; if(!md) return;
    const t=this.tasks.find(x=>x.id===md.id);
    if(t){
      const oldDue=t.due, nextStart=this.ganttDate(md.newStart), nextEnd=this.ganttDate(md.newEnd);
      t.start=nextStart;
      if(t.revised) t.revised=nextEnd; else t.due=nextEnd;
      if(!t.revised&&oldDue!==nextEnd){ t.dueChanges=t.dueChanges||[]; t.dueChanges.push({from:oldDue,to:nextEnd,by:this.roleName()||'Team Lead',when:this.fmt(this.realToday())+' · just now'}); }
    }
    this.setState({timelineDateModal:null});
    this.toast('Timeline dates updated','success');
  }
  timelineData(filtered){
    const S=this.STATUS, DAY=86400000;
    const parse=s=>{const a=s.split('-').map(Number);return Date.UTC(a[0],a[1]-1,a[2]);};
    const today=parse(this.realToday());
    const zoom=this.state.ganttZoom||'weeks';
    const dayW=zoom==='quarters'?4:(zoom==='months'?9:34);
    const durByPrio={high:6,medium:4,low:3};
    let ds=[today];
    filtered.forEach(t=>{ ds.push(parse(t.due)); if(t.revised)ds.push(parse(t.revised)); ds.push(t.start?parse(t.start):parse(t.due)-(durByPrio[t.prio]||4)*DAY); });
    let minD=Math.min(...ds)-3*DAY, maxD=Math.max(...ds)+6*DAY;
    const dow0=new Date(minD).getUTCDay(); minD-=((dow0+6)%7)*DAY;
    const totalDays=Math.round((maxD-minD)/DAY)+1;
    const totalW=totalDays*dayW;
    const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const days=[]; for(let i=0;i<totalDays;i++){const dt=new Date(minD+i*DAY);days.push({i,dom:dt.getUTCDate(),mon:dt.getUTCMonth(),dow:dt.getUTCDay()});}
    const MONx=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const fmtMs=ms=>{const d=new Date(ms);return d.getUTCDate()+' '+MONx[d.getUTCMonth()];};
    const months=[]; let cur=null;
    days.forEach(d=>{ if(!cur||cur.mon!==d.mon){ if(cur)months.push(cur); cur={mon:d.mon,start:d.i,count:1}; } else cur.count++; });
    if(cur)months.push(cur);
    const monthSegs=months.map(m=>({label:MON[m.mon], style:`position:absolute;left:${m.start*dayW}px;width:${m.count*dayW}px;top:0;height:24px;display:flex;align-items:center;padding-left:9px;font-size:11px;font-weight:700;color:var(--gray-dark);border-left:1px solid var(--border);box-sizing:border-box`}));
    const showDays = zoom==='weeks';
    const dayCells = showDays ? days.map(d=>({label:d.dom, style:`position:absolute;left:${d.i*dayW}px;width:${dayW}px;top:0;height:32px;display:flex;align-items:center;justify-content:center;font-size:10.5px;color:${(d.dow===0||d.dow===6)?'#c4c4c4':'var(--gray-dark)'};border-left:1px solid #F2F2F2;box-sizing:border-box`})) : [];
    const gridBg = 'transparent';
    const todayLeft=Math.round(((today-minD)/DAY)*dayW + dayW/2);
    const rows=[];
    {
      // date-based colour: completed=green, overdue=red, else blue
      const palette=(task)=>{ if(task.status==='completed') return {bg:'var(--emerald-light)',fg:'var(--emerald)'};
        if(this.isOverdue(task)) return {bg:'var(--red-light)',fg:'var(--red)'}; return {bg:'#E7F0FE',fg:'#2f6fdb'}; };
      filtered.forEach(t=>{
        const baseEnd=parse(t.revised||t.due);
        let baseStart=t.start?parse(t.start):parse(t.due)-(durByPrio[t.prio]||4)*DAY;
        if(baseStart>=baseEnd) baseStart=baseEnd-2*DAY;
        const ov=(this.state.ganttOverride||{})[t.id];
        const start = ov?ov.start:baseStart, end = ov?ov.end:baseEnd;
        const left=Math.round(((start-minD)/DAY)*dayW);
        const w=Math.max(Math.round(((end-start)/DAY)*dayW),18);
        const pal=palette(t); const od=this.isOverdue(t);
        const subs=t.subtasks||[]; const hasSubs=subs.length>0; const expanded=!!(this.state.ganttExpanded||{})[t.id];
        const subDone=subs.filter(x=>x.status==='completed').length;
        // subtask fixed segments (from baseline span) — used for bars AND overflow check
        const span=baseEnd-baseStart, n=subs.length||1;
        const OV=this.state.ganttOverride||{};
        const segEnds=subs.map((s,idx)=>{ const o=OV[t.id+'::'+idx]; return o?o.end:baseStart+Math.round(span*(idx+1)/n); });
        const segStarts=subs.map((s,idx)=>{ const o=OV[t.id+'::'+idx]; return o?o.start:baseStart+Math.round(span*idx/n); });
        const dateError = hasSubs && (Math.max(...segEnds,end)>end || Math.min(...segStarts,start)<start);
        const hovered=this.state.ganttHover===t.id;
        const stLabel=(this.STATUS[t.status]&&this.STATUS[t.status].label)||t.status||'—';
        const rCanT=this.canManageMandate(t.mandateId);
        rows.push({group:false, groupRow:true, id:t.id, name:t.name, stage:t.stage, statusLabel:stLabel, ext:t.external,
          primaryInitials:this.initials(t.primary), ownerColor:this.ownerColors[t.primary]||'var(--gray-dark)',
          canTransfer:rCanT, onTransfer:rCanT?((e)=>this.openTransfer(t.id,e)):(()=>{}),
          canDelete:rCanT, onDelete:(e)=>{ try{e.stopPropagation();}catch(_){} this.openDelete(t.id); },
          ownerAvatarStyle:'width:24px;height:24px;border-radius:50%;background:'+(this.ownerColors[t.primary]||'var(--gray-dark)')+';color:#fff;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none'+(rCanT?';cursor:pointer':''),
          ownerHoverStyle:rCanT?'filter:brightness(1.08)':'',
          ownerTitle:rCanT?'Click to transfer owner / Task Owner':t.primary,
          barStyle:`position:absolute;left:${left}px;width:${w}px;top:11px;height:22px;border-radius:5px;background:${pal.bg};border:1.5px solid ${pal.fg};display:flex;align-items:center;padding:0 7px;gap:6px;box-sizing:border-box;cursor:pointer`,
          barFg:pal.fg, showLabelInBar:w>96,
          od,
          hasSubs, noSubs:!hasSubs, expanded, subCount:hasSubs?(subDone+'/'+subs.length):'',
          wsName:t.ws,
          hovered,
          rowHovered:this.state.ganttRow===t.id, rowBg:this.state.ganttRow===t.id?'#F6F6FF':'transparent',
          onRowEnter:()=>this.setGanttRow(t.id), onRowLeave:()=>this.setGanttRow(null),
          startText:fmtMs(start), endText:fmtMs(end), durText:Math.round((end-start)/DAY)+'d',
          startPillStyle:`position:absolute;top:-4px;right:${totalW-left+6}px;white-space:nowrap;background:#20203A;color:#fff;font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;z-index:6;pointer-events:none`,
          endPillStyle:`position:absolute;top:-4px;left:${left+w+6}px;white-space:nowrap;background:#20203A;color:#fff;font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;z-index:6;pointer-events:none`,
          handleStyle:`position:absolute;top:2px;width:7px;height:18px;background:#fff;border:1.5px solid ${pal.fg};border-radius:3px;cursor:ew-resize;z-index:7;`,
          subPct: hasSubs?Math.round(subDone/subs.length*100):0,
          subFillStyle: `height:100%;width:${hasSubs?Math.round(subDone/subs.length*100):0}%;background:${(hasSubs&&subDone===subs.length)?'#5AA700':'#5A8DEF'};border-radius:3px`,
          onEnter:()=>this.setGanttHover(t.id), onLeave:()=>this.setGanttHover(null),
          onResizeStartL:(e)=>this.startGanttResize(t.id,'start',e,dayW,{start:baseStart,end:baseEnd}),
          onResizeStartR:(e)=>this.startGanttResize(t.id,'end',e,dayW,{start:baseStart,end:baseEnd}),
          dateError, errText:'This parent work item ends before the end date of a child work item.',
          errHovered:this.state.ganttHover===('err::'+t.id),
          onErrEnter:()=>this.setGanttHover('err::'+t.id), onErrLeave:()=>this.setGanttHover(null),
          errTipStyle:`position:absolute;top:34px;left:${Math.max(8,left+w-186)}px;width:236px;background:#fff;border:1px solid #E0E0E0;border-radius:6px;box-shadow:0 0 4px rgba(16,23,33,.08),0 8px 16px rgba(16,23,33,.16);padding:9px 11px;z-index:9;display:flex;gap:8px;align-items:flex-start`,
          errStyle:`position:absolute;top:9px;left:${left+w+8}px;width:20px;height:20px;border-radius:50%;background:#FBE2C4;border:1px solid #E0A83E;color:#9a6a12;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;z-index:6;cursor:help`,
          caretChar: expanded?'▾':'▸',
          caretStyle:`width:20px;height:20px;flex:none;display:flex;align-items:center;justify-content:center;border:1px solid ${expanded?'var(--violet)':'#D8D8D8'};border-radius:5px;background:${expanded?'#EFEFFF':'#fff'};color:${expanded?'var(--violet)':'var(--gray-dark)'};font-size:10px;cursor:pointer`,
          onToggle:(e)=>{ try{e.stopPropagation();}catch(_){}; this.toggleGanttSub(t.id); },
          onOpen:()=>this.openView(t.id)});
        if(hasSubs && expanded){
          subs.forEach((sub,idx)=>{ const sid=t.id+'::'+idx; const bS=segStarts[idx], bE=segEnds[idx];
            const sov=(this.state.ganttOverride||{})[sid]; const s0=sov?sov.start:bS, s1=sov?sov.end:bE;
            const sl=Math.round(((s0-minD)/DAY)*dayW), sw=Math.max(Math.round(((s1-s0)/DAY)*dayW),14); const sc=S[sub.status];
            const over = s1>end; const shov=this.state.ganttHover===sid;
            rows.push({group:false, groupRow:false, sub:true, name:sub.name, code:'ST-'+((sub.id||'').replace(/\D/g,'')||(idx+1)),
              rowHovered:this.state.ganttRow===sid, rowBg:this.state.ganttRow===sid?'#F6F6FF':'#FCFCFD',
              onRowEnter:()=>this.setGanttRow(sid), onRowLeave:()=>this.setGanttRow(null),
              subStatusLabel:sc.label.toUpperCase(),
              subStatusStyle:`font-size:8.5px;background:${sc.bg};color:${sc.fg};padding:2px 7px;border-radius:10px;font-weight:700;letter-spacing:.3px;white-space:nowrap;flex:none`,
              subBarStyle:`position:absolute;left:${sl}px;width:${sw}px;top:9px;height:16px;border-radius:10px;background:${sc.bg};border:1px solid ${over?'var(--red)':sc.fg};box-sizing:border-box;cursor:pointer`,
              subHovered:shov,
              subHandleStyle:`position:absolute;top:1px;width:6px;height:14px;background:#fff;border:1.5px solid ${sc.fg};border-radius:3px;cursor:ew-resize;z-index:7;`,
              subStartText:fmtMs(s0), subEndText:fmtMs(s1), subDurText:Math.round((s1-s0)/DAY)+'d',
              subStartPillStyle:`position:absolute;top:-6px;right:${totalW-sl+6}px;white-space:nowrap;background:#20203A;color:#fff;font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;z-index:6;pointer-events:none`,
              subEndPillStyle:`position:absolute;top:-6px;left:${sl+sw+6}px;white-space:nowrap;background:#20203A;color:#fff;font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;z-index:6;pointer-events:none`,
              onSubEnter:()=>this.setGanttHover(sid), onSubLeave:()=>this.setGanttHover(null),
              onSubResizeL:(e)=>this.startGanttResize(sid,'start',e,dayW,{start:bS,end:bE}),
              onSubResizeR:(e)=>this.startGanttResize(sid,'end',e,dayW,{start:bS,end:bE})});
          });
        }
      });
    }
    const seg=(on)=> on
      ? 'padding:0 13px;height:30px;border:0;border-radius:6px;background:var(--violet);color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit'
      : 'padding:0 13px;height:30px;border:0;border-radius:6px;background:transparent;color:var(--gray-dark);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit';
    return {zoom, totalW, totalWpx:totalW+'px', monthSegs, dayCells, gridBg, todayLeft, todayLeftpx:todayLeft+'px', rows,
      weeksStyle:seg(zoom==='weeks'), monthsStyle:seg(zoom==='months'), quartersStyle:seg(zoom==='quarters'),
      onQuarters:()=>this.setGanttZoom('quarters'),
      todayStyle:'padding:0 13px;height:30px;border:0;border-radius:6px;background:transparent;color:var(--gray-dark);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit',
      onToday:()=>this.scrollGanttToToday(todayLeft),
      onWeeks:()=>this.setGanttZoom('weeks'), onMonths:()=>this.setGanttZoom('months')};
  }
  toggleBoardFail(e){ this.setState({boardFail:e.target.checked}); }
  setBoardGroup(v){ this.setState({boardGroup:v, collapsedLanes:{}}); }
  toggleLane(k){ this.setState(s=>({collapsedLanes:{...s.collapsedLanes,[k]:!s.collapsedLanes[k]}})); }
  toggleSubs(id){ this.setState(s=>({expandedSubs:{...s.expandedSubs,[id]:!s.expandedSubs[id]}})); }
  toggleListSub(id){ this.setState(s=>({listExpanded:{...s.listExpanded,[id]:!s.listExpanded[id]}})); }
  toggleTaskSel(id){ this.setState(s=>{ const sel={...s.selTasks}; if(sel[id]) delete sel[id]; else sel[id]=true; return {selTasks:sel}; }); }
  toggleAllTaskSel(ids){ this.setState(s=>{ const sel={...s.selTasks}; const allIn = ids.length>0 && ids.every(id=>sel[id]); if(allIn){ ids.forEach(id=>delete sel[id]); } else { ids.forEach(id=>sel[id]=true); } return {selTasks:sel}; }); }
  clearTaskSel(){ this.setState({selTasks:{}}); }
  openBulkDeleteConfirm(){
    if(!Object.keys(this.state.selTasks||{}).length) return;
    this.setState({modal:{type:'bulkDelete'}, bulkDelReason:'', bulkDelReasonError:false});
  }
  bulkDeleteTasks(){
    const ids=Object.keys(this.state.selTasks||{}); if(!ids.length) return;
    if(ids.some(id=>{const t=this.tasks.find(x=>x.id===id);return !t||!this.canManageMandate(t.mandateId);})){ this.toast('You can delete tasks only in mandates you manage.','error'); return; }
    if(!(this.state.bulkDelReason||'').trim()){ this.setState({bulkDelReasonError:true}); return; }
    const n=ids.length;
    this.tasks=this.tasks.filter(t=>!ids.includes(t.id));
    this.setState({selTasks:{}, modal:null, bulkDelReason:'', bulkDelReasonError:false});
    this.toast(n+(n===1?' task deleted':' tasks deleted'),'success');
  }
  toggleRowMenu(id,e){ try{e.stopPropagation();}catch(_){}; this.setState(s=>({rowMenuId:s.rowMenuId===id?null:id})); }
  toggleMandateMenu(id,e){ try{e.stopPropagation();}catch(_){}; this.setState(s=>({mandateMenuId:s.mandateMenuId===id?null:id})); }
  closeRowMenu(){ if(this.state.rowMenuId) this.setState({rowMenuId:null}); }
  toggleGanttSub(id){ this.setState(s=>({ganttExpanded:{...s.ganttExpanded,[id]:!s.ganttExpanded[id]}})); }
  toggleListCol(k){ const DEF={ws:false,stage:false,start:true,owner:true,support:false,due:true,status:true,prio:true,remark:true}; this.setState(s=>{ const cur=s.listCols||{}; const now=cur[k]===undefined?DEF[k]:cur[k]; return {listCols:{...cur,[k]:!now}}; }); }
  canDrag(t){ const m=this.mandate(t.mandateId);
    if(m && m.closed) return false;
    return this.canChangeTaskStatus(t); }
  dragReason(t){ const m=this.mandate(t.mandateId);
    if(m && m.closed) return 'Mandate is launched — the playbook is locked.';
    if(!this.canDrag(t)) return t.primary?'Assigned to '+t.primary+' — only that task owner or the mandate P&L owner/TL can move it.':'This task must be assigned before its status can change.';
    return ''; }
  dragStart(id){ this._justDragged=false; this.setState({dragTaskId:id}); }
  dragEnd(){ this._justDragged=true; clearTimeout(this._jd); this._jd=setTimeout(()=>{this._justDragged=false;},130); this.setState({dragTaskId:null, dragOverStatus:null}); }
  colOver(k){ if(this.state.dragOverStatus!==k) this.setState({dragOverStatus:k}); }
  colLeave(k){ if(this.state.dragOverStatus===k) this.setState({dragOverStatus:null}); }
  colDrop(k){ const id=this.state.dragTaskId; this.setState({dragOverStatus:null}); if(!id) return;
    const t=this.tasks.find(x=>x.id===id); if(!t || t.status===k) return;
    if(!this.canDrag(t)) return;
    if((!t.primary || t.primary==='Unassigned') && k!=='unassigned'){
      this.setState({dragTaskId:null, unassignedAssign:{taskId:t.id,target:k,pickedId:''}}); return;
    }
    if(this.state.boardFail){ this.setState({boardFail:false, dragTaskId:null}); this.toast('Task status update failed — card reverted to previous status.','error'); return; }
    if(t.status==='completed'&&k==='unassigned'){ this.openSM('reopen',id,k,{openUnassignOwnerNext:true}); return; }
    if(k==='unassigned'){ this.openSM('unassign',id,k); return; }
    if(k==='completed'){ this.openSM('complete',id,k); return; }
    if(k==='blocked'){ this.openSM('block',id,k); return; }
    if(t.status==='completed'){ this.openSM('reopen',id,k); return; }
    this.applyStatus(id,k,{}); }
  openSM(kind,id,target,context){
    const task=this.tasks.find(x=>x.id===id)||{};
    this.setState({statusModal:{kind,id,target,closingRemark:'',blockerReason:'',blockerOwner:'',reopenReason:'',reopenOwner:task.primary||'',error:'',...(context||{})}, dragTaskId:null});
  }
  setSM(k,v){ this.setState(s=>({statusModal:{...s.statusModal,[k]:v,error:''}})); }
  cancelSM(){
    const sm=this.state.statusModal;
    if(sm&&sm.assignedFromUnassigned){ this.applyStatus(sm.id,'not_started',{}); return; }
    this.setState({statusModal:null, dragTaskId:null});
  }
  closeUnassignedBlock(){ this.setState({unassignedAssign:null,dragTaskId:null}); }
  setUnassignedOwner(userId){ this.setState(s=>({unassignedAssign:{...s.unassignedAssign,pickedId:userId}})); }
  confirmUnassignedOwner(){
    const ua=this.state.unassignedAssign; if(!ua||!ua.pickedId) return;
    const t=this.tasks.find(x=>x.id===ua.taskId), emp=this.EMPLOYEES.find(x=>x.id===ua.pickedId); if(!t||!emp) return;
    t.primary=emp.name; t.primaryOwnerId=emp.id; t.dept=emp.department||emp.dept||'';
    this.setState({unassignedAssign:null},()=>{
      if(ua.target==='completed') this.openSM('complete',t.id,ua.target,{assignedFromUnassigned:true});
      else if(ua.target==='blocked') this.openSM('block',t.id,ua.target,{assignedFromUnassigned:true});
      else this.applyStatus(t.id,ua.target,{});
    });
  }
  openTransfer(taskId,e){ try{e.preventDefault();e.stopPropagation();}catch(_){} this.setState({transfer:{taskId, search:'', pickedId:null}}); }
  closeTransfer(){ this.setState({transfer:null}); }
  setTransferSearch(v){ this.setState(s=>({transfer:{...s.transfer, search:v}})); }
  pickTransfer(id){ this.setState(s=>({transfer:{...s.transfer, pickedId:id}})); }
  openNudge(id){ this.setState({nudge:{taskId:id, msg:''}}); }
  closeNudge(){ this.setState({nudge:null}); }
  setNudgeMsg(v){ this.setState(s=>({nudge:{...s.nudge, msg:v}})); }
  async sendAutomaticWhatsAppNudge(t,customMessage){
    const response=await fetch('/api/notifications/whatsapp',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ownerName:t.primary||'Task owner',taskName:t.name,dueDate:this.fmt(this.effDate(t)),message:(customMessage||'').trim()})});
    const result=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(result.error||'WhatsApp delivery failed.');
    return result;
  }
  async sendNudge(){ const n=this.state.nudge; if(!n) return; const t=this.tasks.find(x=>x.id===n.taskId); if(!t) return;
    try{ const result=await this.sendAutomaticWhatsAppNudge(t,n.msg); const delivered=['delivered','read'].includes(String(result.status||'').toLowerCase()); this.toast(delivered?'WhatsApp message delivered to '+t.primary:'WhatsApp message queued for '+t.primary,delivered?'success':'default'); this.setState({nudge:null}); }
    catch(error){ this.toast(error&&error.message?error.message:'WhatsApp delivery failed.','error'); } }
  async sendDrawerNudge(id,remark){ const t=this.tasks.find(x=>x.id===id); if(!t) return;
    if(!remark||!remark.trim()){ this.setState(s=>({draft:{...s.draft, error:'Add a remark before nudging.'}})); return; }
    try{ const result=await this.sendAutomaticWhatsAppNudge(t,remark); const delivered=['delivered','read'].includes(String(result.status||'').toLowerCase()); this.toast(delivered?'WhatsApp message delivered to '+t.primary:'WhatsApp message queued for '+t.primary,delivered?'success':'default'); }
    catch(error){ this.toast(error&&error.message?error.message:'WhatsApp delivery failed.','error'); } }
  confirmTransfer(){ const tr=this.state.transfer; if(!tr||!tr.pickedId) return;
    const t=this.tasks.find(x=>x.id===tr.taskId); const emp=this.EMPLOYEES.find(e=>e.id===tr.pickedId);
    if(t&&emp && !this.ownerColors[emp.name]) this.ownerColors[emp.name]='var(--gray-dark)';
    if(t&&emp){ t.primary=emp.name; t.primaryOwnerId=emp.id; t.dept=emp.department||emp.dept||''; this.toast('Task owner transferred to '+emp.name,'success'); }
    this.setState({transfer:null});
  }
  openPriority(taskId,e){
    try{e.preventDefault();e.stopPropagation();}catch(_){}
    const t=this.tasks.find(x=>x.id===taskId); if(!t||!this.canManageMandate(t.mandateId)) return;
    this.setState({priorityModal:{taskId,picked:t.prio}});
  }
  closePriority(){ this.setState({priorityModal:null}); }
  pickPriority(value){ this.setState(s=>({priorityModal:{...s.priorityModal,picked:value}})); }
  confirmPriority(){
    const pm=this.state.priorityModal; if(!pm||!pm.picked) return;
    const t=this.tasks.find(x=>x.id===pm.taskId); if(!t) return;
    const changed=t.prio!==pm.picked; t.prio=pm.picked;
    this.setState({priorityModal:null});
    if(changed) this.toast('Priority updated to '+({high:'High',medium:'Medium',low:'Low'}[pm.picked]||pm.picked),'success');
  }
  confirmSM(){ const sm=this.state.statusModal;
    if(sm.kind==='complete'){ this.applyStatus(sm.id,'completed',{closingRemark:(sm.closingRemark||'').trim()}); }
    else if(sm.kind==='block'){ if(!sm.blockerReason.trim()){ this.setState(s=>({statusModal:{...s.statusModal,error:'Please add a blocker reason.'}})); return; } this.applyStatus(sm.id,'blocked',{blockerReason:sm.blockerReason,blockerOwner:sm.blockerOwner}); }
    else if(sm.kind==='revise'){
      const t=this.tasks.find(x=>x.id===sm.id);
      if(!sm.date){ this.setState(s=>({statusModal:{...s.statusModal,error:'Please choose a revised date.'}})); return; }
      if(sm.date<this.realToday()){ this.setState(s=>({statusModal:{...s.statusModal,error:'Revised date can’t be in the past.'}})); return; }
      if(t&&t.start&&sm.date<t.start){ this.setState(s=>({statusModal:{...s.statusModal,error:'Revised date cannot be before the start date ('+this.fmt(t.start)+').'}})); return; }
      if(!sm.reviseReason.trim()){ this.setState(s=>({statusModal:{...s.statusModal,error:'Please add a reason for the revised timeline.'}})); return; }
      this.applyRevise(sm.id,sm.date,sm.reviseReason);
    }
    else if(sm.kind==='due'){
      const t=this.tasks.find(x=>x.id===sm.id);
      if(!sm.date){ this.setState(s=>({statusModal:{...s.statusModal,error:'Please choose a due date.'}})); return; }
      if(sm.date<this.realToday()){ this.setState(s=>({statusModal:{...s.statusModal,error:'Due date cannot be in the past.'}})); return; }
      if(t&&t.start&&sm.date<t.start){ this.setState(s=>({statusModal:{...s.statusModal,error:'Due date cannot be before the start date ('+this.fmt(t.start)+').'}})); return; }
      this.applyDueChange(sm.id,sm.date);
    }
    else if(sm.kind==='unassign'){
      const task=this.tasks.find(x=>x.id===sm.id); if(!task) return;
      if(!sm.reopenOwner){ this.setState(s=>({statusModal:{...s.statusModal,error:'Please select a task owner or No owner.'}})); return; }
      if(sm.reopenOwner==='__no_owner__'){
        task.primary=''; task.primaryOwnerId=''; task.dept='';
        this.applyStatus(sm.id,'unassigned',{reopenReason:sm.reopenReason});
      } else {
        const owner=this.EMPLOYEES.find(e=>e.name===sm.reopenOwner);
        if(!owner){ this.setState(s=>({statusModal:{...s.statusModal,error:'Please select a valid task owner.'}})); return; }
        task.primary=owner.name; task.primaryOwnerId=owner.id; task.dept=owner.department||owner.dept||'';
        this.applyStatus(sm.id,'not_started',{reopenReason:sm.reopenReason});
      }
    }
    else {
      if(sm.openUnassignOwnerNext){ this.openSM('unassign',sm.id,'unassigned',{reopenReason:sm.reopenReason||''}); return; }
      this.applyStatus(sm.id,sm.target,{reopenReason:sm.reopenReason});
    } }
  applyDueChange(id,date){
    const t=this.tasks.find(x=>x.id===id); if(!t) return;
    const changed = t.due!==date;
    if(changed){ t.dueChanges=t.dueChanges||[]; t.dueChanges.push({from:t.due,to:date,by:this.roleName()||'Team Lead',when:this.fmt(this.realToday())+' · just now'}); }
    t.due=date;
    this.setState({statusModal:null});
    if(changed) this.toast('Due date updated to '+this.fmt(date),'success');
  }
  applyRevise(id,date,reason){
    const t=this.tasks.find(x=>x.id===id); if(!t) return;
    t.revisions=t.revisions||[];
    t.revisions.push({from:t.revised||t.due, to:date, by:this.roleName()||'Task owner', when:this.fmt(this.NOW)+' · just now', reason:reason.trim()});
    t.revised=date;
    this.setState({statusModal:null});
    this.toast('Revised date updated to '+this.fmt(date),'success');
  }
  reduceMotion(){ try{ return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }catch(_){ return false; } }
  applyStatus(id,status,extra){ const t=this.tasks.find(x=>x.id===id); if(!t) return; const wasCompleted=t.status==='completed'; const wasBlocked=t.status==='blocked'; t.status=status;
    // record move recency so the just-moved card sits at the top of its column (pushing the rest down)
    this._moveSeq=(this._moveSeq||0)+1; if(!this._moveOrder) this._moveOrder={}; this._moveOrder[id]=this._moveSeq;
    if(extra.closingRemark) t.remark=extra.closingRemark;
    if(extra.blockerReason) t.remark='Blocker: '+extra.blockerReason+(extra.blockerOwner?(' — owner '+extra.blockerOwner):'');
    if(extra.reopenReason) t.remark=extra.reopenReason;
    clearTimeout(this._jm); this._moveAt=Date.now(); (this._movedIds=this._movedIds||{})[id]=1; this.setState({statusModal:null, dragTaskId:null, justMovedId:id});
    this._jm=setTimeout(()=>this.setState({justMovedId:null}),1400);
    if(status==='completed' && !wasCompleted) this.celebrate(id);
    if(status==='blocked' && !wasBlocked){ this._blockedSound(); this._blockedPulse(id); }
    const STL={not_started:'Pending',unassigned:'Unassigned',in_progress:'In Progress',blocked:'Blocked',completed:'Completed'};
    const kind = status==='completed' ? 'success' : status==='blocked' ? 'error' : 'move';
    this.toast('Moved to '+(STL[status]||status), kind); }
  // Directed celebration: a single cracker launches from the just-completed card in the
  // Done column, arcs up to the header "Done" stat, bursts there, then the Done number
  // ticks up and its bar fills. The header Done value is held frozen until the burst lands.
  celebrate(taskId){
    try{
      if(typeof document==='undefined') return;
      // Reduced motion: skip the flourish, let the stat update normally.
      if(this.reduceMotion()){ this.setState({celebFreeze:null}); return; }
      const mid=this.state.mandateId;
      const doneAfter=this.mTasks(mid).filter(x=>x.status==='completed').length;
      // Freeze the header Done stat at its pre-completion value so the tick-up waits for the cracker.
      this.setState({celebFreeze:{done:Math.max(0,doneAfter-1)}});
      const release=()=>{
        this.setState({celebFreeze:null});
        // Pop the Done number as it ticks up.
        try{
          requestAnimationFrame(()=>{
            const el=document.querySelector('[data-anstat="done"]') || document.querySelector('[data-sumstat="completed"]') || document.querySelector('[data-stat="done"] [data-statval]');
            if(el&&el.animate) el.animate(
              [{transform:'scale(1)'},{transform:'scale(1.42)'},{transform:'scale(1)'}],
              {duration:460,easing:'cubic-bezier(.34,1.56,.64,1)'});
          });
        }catch(_){}
      };
      // Let the card's entrance settle first, then launch the cracker. The delay also pushes
      // the burst's celebFreeze-release re-render past the entrance window so it can't replay wf-insert.
      requestAnimationFrame(()=>requestAnimationFrame(()=>{ setTimeout(()=>this._runCracker(taskId, release), 300); }));
    }catch(_){ this.setState({celebFreeze:null}); }
  }

  _runCracker(taskId, onArrive){
    const fire=()=>{ try{ onArrive&&onArrive(); }catch(_){} };
    try{
      const esc=(window.CSS&&CSS.escape)?CSS.escape(taskId||''):(taskId||'');
      let src = taskId ? document.querySelector('[data-tid="'+esc+'"]') : null;
      if(!src && taskId) src = document.querySelector('[data-lstat="'+esc+'"]'); // list view: launch from the row's status tag
      if(!src) src = document.querySelector('[data-col-key="completed"]');
      const bar = document.querySelector('[data-anstat="done"]') || document.querySelector('[data-sumstat="completed"]') || document.querySelector('[data-stat="done"]');
      // If the source anchor is missing entirely, just release.
      if(!src){ fire(); return; }
      // No Completed target visible (analytics hidden) — burst right at the card + play sound.
      if(!bar){ const r=src.getBoundingClientRect(); this._burstAt(r.left+r.width/2, r.top+Math.min(20,r.height/2)); fire(); return; }
      const cr=src.getBoundingClientRect(), br=bar.getBoundingClientRect();
      const x0=cr.left+cr.width/2, y0=cr.top+Math.min(14,cr.height/2);
      const x1=br.left+br.width*0.5, y1=br.top+br.height*0.62;

      const layer=document.createElement('div');
      layer.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:visible';
      document.body.appendChild(layer);

      // Quadratic arc: control point pulled upward for a lofted "launch" feel.
      const cxp=(x0+x1)/2, cyp=Math.min(y0,y1)-Math.max(90,Math.abs(x1-x0)*0.28+(y0-y1)*0.2);
      const pt=(u)=>({ x:(1-u)*(1-u)*x0+2*(1-u)*u*cxp+u*u*x1, y:(1-u)*(1-u)*y0+2*(1-u)*u*cyp+u*u*y1 });

      const rocket=document.createElement('div');
      rocket.style.cssText='position:fixed;left:-7px;top:-7px;width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#8ff0c4,#2f9e6b 70%);box-shadow:0 0 14px 4px rgba(47,158,107,.55);will-change:transform,opacity';
      layer.appendChild(rocket);

      const steps=26, frames=[];
      for(let i=0;i<=steps;i++){ const u=i/steps, p=pt(u);
        frames.push({ transform:`translate(${p.x}px,${p.y}px) scale(${i===0?0.5:(i>steps-3?0.7:1)})`, opacity:(i>steps-2?0.85:1) });
      }
      const dur=640;
      const anim=rocket.animate(frames,{duration:dur,easing:'cubic-bezier(.45,.05,.4,1)',fill:'forwards'});

      // Spark trail: fading dots dropped along the path.
      const tcol=['#2f9e6b','#8ff0c4','#bfeed6'];
      for(let s=1;s<=9;s++){ const u=s/10, p=pt(u);
        const dot=document.createElement('div'); const sz=4+Math.random()*3;
        dot.style.cssText='position:fixed;left:'+(p.x-sz/2)+'px;top:'+(p.y-sz/2)+'px;width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:'+tcol[s%3]+';opacity:0;will-change:transform,opacity';
        layer.appendChild(dot);
        dot.animate([{opacity:0,transform:'scale(.4)'},{opacity:.9,transform:'scale(1)',offset:.3},{opacity:0,transform:'scale(.3)'}],
          {duration:420,delay:Math.round(dur*u*0.72),easing:'ease-out',fill:'forwards'});
      }

      const finish=()=>{ try{rocket.remove();}catch(_){}; this._burstAt(x1,y1); fire(); setTimeout(()=>{ try{layer.remove();}catch(_){} },1300); };
      if(anim&&anim.finished&&anim.finished.then) anim.finished.then(finish,finish);
      else if(anim){ anim.onfinish=finish; } else { finish(); }
      // Safety net in case onfinish never fires.
      setTimeout(()=>{ if(layer.isConnected && rocket.isConnected){ finish(); } },dur+220);
    }catch(_){ fire(); }
  }

  // Red ripple at the task's status tag (list) / card (board) when it turns Blocked.
  _blockedPulse(id){
    try{
      if(typeof document==='undefined' || this.reduceMotion()) return;
      requestAnimationFrame(()=>requestAnimationFrame(()=>{ try{
        const esc=(window.CSS&&CSS.escape)?CSS.escape(id||''):(id||'');
        const el=document.querySelector('[data-lstat="'+esc+'"]')||document.querySelector('[data-tid="'+esc+'"]');
        if(!el) return;
        const rc=el.getBoundingClientRect(), x=rc.left+rc.width/2, y=rc.top+rc.height/2;
        const layer=document.createElement('div');
        layer.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:visible';
        document.body.appendChild(layer);
        const ring=document.createElement('div');
        ring.style.cssText='position:fixed;left:'+(x-10)+'px;top:'+(y-10)+'px;width:20px;height:20px;border-radius:50%;border:2px solid rgba(209,75,75,.8);will-change:transform,opacity';
        layer.appendChild(ring);
        ring.animate([{transform:'scale(.5)',opacity:.95},{transform:'scale(3.2)',opacity:0}],{duration:600,easing:'cubic-bezier(.2,.7,.3,1)',fill:'forwards'});
        setTimeout(()=>{ try{layer.remove();}catch(_){} },800);
      }catch(_){} }));
    }catch(_){}
  }

  // Blocked-state sound: user-provided clip; falls back to the synthesized descending
  // tones if the file can't load/play.
  _blockedSound(){
    try{
      if(!this._blockedAudio){
        this._blockedAudio=new Audio((window.__resources&&window.__resources['assets/audio/notification-1.mp3'])||'uploads/data_pion-sfx32-blocked-534304.mp3');
        this._blockedAudio.preload='auto';
        this._blockedAudio.volume=0.385;
      }
      const a=this._blockedAudio; a.currentTime=0;
      const p=a.play();
      if(p&&p.catch) p.catch(()=>{ try{ this._blockedSynth(); }catch(_){} });
    }catch(_){ try{ this._blockedSynth(); }catch(__){} }
  }

  // Synthesized fallback: two soft, low descending tones (E4→B3) through a lowpass —
  // a muted "uh-oh" that signals friction without being an alarm.
  _blockedSynth(){
    try{
      const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
      if(!this._ac) this._ac=new AC();
      const ac=this._ac;
      if(ac.state==='suspended'){ try{ ac.resume(); }catch(_){} }
      const t0=ac.currentTime;
      const master=ac.createGain(); master.gain.value=0.16; master.connect(ac.destination);
      [[329.6,0],[246.9,0.16]].forEach(pair=>{
        const f=pair[0], off=pair[1];
        const o=ac.createOscillator(); o.type='sine'; o.frequency.value=f;
        const lp=ac.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=1200;
        const g=ac.createGain(); const st=t0+off;
        g.gain.setValueAtTime(0.0001,st);
        g.gain.exponentialRampToValueAtTime(0.3,st+0.02);
        g.gain.exponentialRampToValueAtTime(0.001,st+0.28);
        o.connect(lp); lp.connect(g); g.connect(master); o.start(st); o.stop(st+0.32);
      });
    }catch(_){}
  }

  // Celebration sound: user-provided "level up" clip; falls back to the synthesized
  // applause+chime if the file can't load/play.
  _celebrationSound(){
    try{
      if(!this._celebAudio){
        this._celebAudio=new Audio((window.__resources&&window.__resources['assets/audio/notification-2.mp3'])||'uploads/tithuh-level-up-02-528919.mp3');
        this._celebAudio.preload='auto';
        this._celebAudio.volume=0.275;
      }
      const a=this._celebAudio; a.currentTime=0;
      const p=a.play();
      if(p&&p.catch) p.catch(()=>{ try{ this._celebrationSynth(); }catch(_){} });
    }catch(_){ try{ this._celebrationSynth(); }catch(__){} }
  }

  componentDidMount(){
    requestAnimationFrame(()=>this._applyUiPolish());
    // pre-fetch the celebration + blocked clips so the first play fires instantly
    try{ this._celebAudio=new Audio((window.__resources&&window.__resources['assets/audio/notification-2.mp3'])||'uploads/tithuh-level-up-02-528919.mp3'); this._celebAudio.preload='auto'; this._celebAudio.volume=0.275; }catch(_){}
    try{ this._blockedAudio=new Audio((window.__resources&&window.__resources['assets/audio/notification-1.mp3'])||'uploads/data_pion-sfx32-blocked-534304.mp3'); this._blockedAudio.preload='auto'; this._blockedAudio.volume=0.385; }catch(_){}
    try{
      const reveal=()=>document.body.classList.add('mpb-data-ready');
      fetch('/api/state')
        .then(r=>{ if(!r.ok) throw new Error('Database request failed'); return r.json(); })
        .then(data=>{
          if(!data || !Array.isArray(data.mandates) || !Array.isArray(data.employees) || !Array.isArray(data.tasks)) throw new Error('Invalid database response');
          this.mandates=data.mandates.map(m=>({...m,hasChecklist:!!m.hasChecklist}));
          this.EMPLOYEES=data.employees;
          this.OWNERS=this.eligibleOwners().map(e=>e.name);
          this.ownerColors=data.employees.reduce((colors,e)=>{ colors[e.name]=e.color||'var(--gray-dark)'; return colors; },{});
          this.tasks=data.tasks;
          this.tasks.forEach(task=>{ const name=(task&&task.ws||'').trim(); if(name&&!this.WS.some(category=>category.toLocaleLowerCase()===name.toLocaleLowerCase())) this.WS.push(name); });
          if(!this.state.userId && this.EMPLOYEES.length){
            let saved=''; try{ saved=localStorage.getItem('mandate-playbook:selected-user')||''; }catch(_){}
            const savedUser=this.EMPLOYEES.find(e=>e.id===saved);
            const defaultManager=this.EMPLOYEES.find(e=>this.mandates.some(m=>m.pnlOwnerId===e.id));
            this.state.userId=(savedUser||defaultManager||this.EMPLOYEES[0]).id;
          }
          this._lastTaskSnapshot=JSON.stringify(this.tasks);
          this._remoteLoaded=true;
          this.forceUpdate();
          requestAnimationFrame(()=>{ document.querySelectorAll('*').forEach(el=>{ if(el.childElementCount)return; const text=(el.textContent||'').trim().toUpperCase(); if(text==='ROLE') el.style.display='none'; if(text==='VIEWING AS') el.textContent='Switch user'; }); this._applyUiPolish(); });
          reveal();
        })
        .catch(error=>{
          console.error('Mandate Playbook data load failed',error);
          document.body.innerHTML='<main style="font-family:Graphik,Arial,sans-serif;padding:40px;color:#101721"><h1 style="font-size:22px">Unable to load Mandate Playbook</h1><p style="margin-top:10px;color:#6B7785">The database could not be reached. Please refresh or try again shortly.</p></main>';
          reveal();
        });
    }catch(error){ console.error(error); document.body.classList.add('mpb-data-ready'); }
  }

  componentDidUpdate(){
    requestAnimationFrame(()=>{ document.querySelectorAll('*').forEach(el=>{ if(el.childElementCount)return; const text=(el.textContent||'').trim().toUpperCase(); if(text==='ROLE') el.style.display='none'; if(text==='VIEWING AS') el.textContent='Switch user'; }); this._applyUiPolish(); });
    if(!this._remoteLoaded) return;
    const snapshot=JSON.stringify(this.tasks);
    if(snapshot===this._lastTaskSnapshot) return;
    this._lastTaskSnapshot=snapshot;
    clearTimeout(this._taskSyncTimer);
    this._taskSyncTimer=setTimeout(()=>{
      fetch('/api/tasks/sync',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({userId:this.currentUserId(),tasks:this.tasks})})
        .then(async r=>{if(!r.ok){const body=await r.json().catch(()=>({}));throw new Error(body.error||'Save failed');}})
        .catch(error=>this.toast(error.message||'Tasks could not be saved to PostgreSQL','error'));
    },300);
  }

  // Synthesized fallback: a short professional "cheers" — applause (a dense wash of
  // micro-claps that swells and fades, ~1.5s) with a very soft two-tone chime accent on top.
  _celebrationSynth(){
    try{
      const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
      if(!this._ac) this._ac=new AC();
      const ac=this._ac;
      if(ac.state==='suspended'){ try{ ac.resume(); }catch(_){} }
      const t0=ac.currentTime;
      const master=ac.createGain(); master.gain.value=0.5; master.connect(ac.destination);
      // --- applause: many tiny random claps rendered into one noise buffer ---
      const dur=1.5, sr=ac.sampleRate;
      const buf=ac.createBuffer(1, Math.floor(sr*dur), sr);
      const d=buf.getChannelData(0);
      for(let c=0;c<180;c++){
        const at=Math.floor(Math.pow(Math.random(),1.4)*sr*dur*0.9);
        const len=Math.floor(sr*(0.006+Math.random()*0.018));
        const amp=0.3+Math.random()*0.7;
        for(let i=0;i<len && at+i<d.length;i++) d[at+i]+=(Math.random()*2-1)*amp*(1-i/len);
      }
      const src=ac.createBufferSource(); src.buffer=buf;
      const bp=ac.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=1900; bp.Q.value=0.7;
      const ag=ac.createGain();
      ag.gain.setValueAtTime(0.0001,t0);
      ag.gain.linearRampToValueAtTime(0.32,t0+0.1);
      ag.gain.setValueAtTime(0.32,t0+0.55);
      ag.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
      src.connect(bp); bp.connect(ag); ag.connect(master); src.start(t0);
      // --- soft chime accent (quiet, under the applause) ---
      const note=(f,st,peak,ndur)=>{
        [[1,1],[2,0.26],[3,0.09]].forEach(h=>{
          const o=ac.createOscillator(); o.type='sine'; o.frequency.value=f*h[0];
          const g=ac.createGain();
          g.gain.setValueAtTime(0.0001,st);
          g.gain.linearRampToValueAtTime(peak*h[1],st+0.012);
          g.gain.exponentialRampToValueAtTime(0.0001,st+ndur);
          o.connect(g); g.connect(master); o.start(st); o.stop(st+ndur+0.05);
        });
      };
      note(587.33,t0,0.13,0.5);
      note(880,t0+0.09,0.11,0.72);
    }catch(_){}
  }

  _burstAt(x,y){
    try{
      if(typeof document==='undefined') return;
      this._celebrationSound();
      const layer=document.createElement('div');
      layer.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:visible';
      document.body.appendChild(layer);
      // Ring pulse at the Done stat.
      const ring=document.createElement('div');
      ring.style.cssText='position:fixed;left:'+(x-9)+'px;top:'+(y-9)+'px;width:18px;height:18px;border-radius:50%;border:2px solid rgba(47,158,107,.85);will-change:transform,opacity';
      layer.appendChild(ring);
      ring.animate([{transform:'scale(.4)',opacity:.9},{transform:'scale(3.4)',opacity:0}],{duration:560,easing:'cubic-bezier(.2,.7,.3,1)',fill:'forwards'});
      // Confetti burst — biased upward/outward from the bar, emerald-led festive mix.
      const colors=['#2f9e6b','#8ff0c4','#6C5CE7','#e0b020','#2f6fdb','#ffffff'];
      const N=62;
      for(let i=0;i<N;i++){
        const p=document.createElement('div');
        const size=5+Math.random()*6, c=colors[i%colors.length], round=Math.random()<0.5;
        p.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;width:'+size+'px;height:'+(round?size:size*0.5)+'px;background:'+c+';border-radius:'+(round?'50%':'1px')+';will-change:transform,opacity';
        layer.appendChild(p);
        const ang=(-Math.PI/2)+(Math.random()-0.5)*Math.PI*1.35, vel=80+Math.random()*175;
        const vx=Math.cos(ang)*vel, vy=Math.sin(ang)*vel, rot=Math.random()*540-270, dur=920+Math.random()*820;
        p.animate([
          {transform:'translate(0,0) rotate(0deg)',opacity:1},
          {transform:'translate('+(vx*0.5)+'px,'+(vy*0.5+70)+'px) rotate('+(rot*0.5)+'deg)',opacity:1,offset:0.5},
          {transform:'translate('+vx+'px,'+(vy+320)+'px) rotate('+rot+'deg)',opacity:0}
        ],{duration:dur,easing:'cubic-bezier(.15,.6,.4,1)',fill:'forwards'});
      }
      setTimeout(()=>{ try{layer.remove();}catch(_){} },2100);
    }catch(_){}
  }

  // ============================================================ RENDER ============================================================
  renderVals(){
    const R=this, r=this.role(), rn=this.roleName(), st=this.state, perm=this.perm();
    const S=this.STATUS, P=this.PRIO;
    const chip=(active)=>active
      ? 'padding:6px 13px;border-radius:20px;border:1px solid var(--violet);background:var(--violet);color:#fff;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit'
      : 'padding:6px 13px;border-radius:20px;border:1px solid #D8D8D8;background:#fff;color:var(--gray-dark);font-size:12.5px;font-weight:500;cursor:pointer;font-family:inherit';
    const statusBadge=(k)=>`display:inline-block;font-size:11px;background:${S[k].bg};color:${S[k].fg};padding:4px 8px;border-radius:20px;font-weight:600;white-space:nowrap;border:1px solid ${S[k].fg}40`;
    const prioBadge=(k)=>`font-size:10.5px;background:${P[k].bg};color:${P[k].fg};padding:2px 8px;border-radius:5px;font-weight:600;text-transform:uppercase;letter-spacing:.3px`;
    const STAR_PATH='M12 3.822 L14.47 9.079 L20.557 9.797 L16.055 13.94 L17.249 20.178 L12 16.984 L6.751 20.178 L7.945 13.94 L3.443 9.797 L9.53 9.079 Z';
    const starSvg=(on)=>"width:16px;height:16px;display:inline-block;background-repeat:no-repeat;background-position:center;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='"+STAR_PATH+"' fill='"+(on?'%23F3AA07':'none')+"' stroke='"+(on?'%23F3AA07':'%239FA6B0')+"' stroke-width='"+(on?0:1.6)+"' stroke-linejoin='round'/%3E%3C/svg%3E\")";
    const flameOn=starSvg(true);
    const flameOff=starSvg(false);
    const flameCount={high:3,medium:2,low:1};
    const flames=(k)=>{ const n=flameCount[k]||1; return [0,1,2].map(i=>i<n?flameOn:flameOff); };
    const bar=(pct,color)=>`height:100%;width:${pct}%;background:${color||'var(--violet)'};border-radius:10px`;
    const risk=(m)=>{ if(!m.hasChecklist) return {label:'Not created',color:'#b06a00',bg:'#FFF4E0',show:true}; const c=this.counts(m.id), pr=this.progress(m.id); if(c.overdue>=3||c.blocked>=2) return {label:'At risk',color:'var(--red)',bg:'var(--red-light)',show:true}; if(pr.pct>=80) return {label:'On track',color:'var(--emerald)',bg:'var(--emerald-light)',show:true}; if(pr.pct<=10) return {label:'Just started',color:'var(--gray)',bg:'#EFEFEF',show:true}; return {label:'In progress',color:'#2f6fdb',bg:'#E7F0FE',show:true}; };
    const riskStyle=(rk)=> rk.show?`font-size:10px;background:${rk.bg};color:${rk.color};padding:2px 8px;border-radius:20px;font-weight:700;text-transform:uppercase;letter-spacing:.3px`:'display:none';

    const V={};
    const currentUser=this.currentUser();
    V.roleInitials=this.initials(rn);
    V.roleName=rn;
    V.roleScope=currentUser?currentUser.email:'';
    const selectedRole=this.currentUser()?this.userRoleLabel(this.currentUserId()):'';
    V.roleTrigger=rn?(rn+' · '+selectedRole):'Select user';
    V.roleMenuOpen=!!st.roleMenuOpen;
    V.onToggleRoleMenu=()=>this.setState(s=>({roleMenuOpen:!s.roleMenuOpen}));
    V.roles=[...this.EMPLOYEES].sort((a,b)=>this.userRoleRank(a.id)-this.userRoleRank(b.id)||a.name.localeCompare(b.name)).map(e=>({label:e.name+' · '+this.userRoleLabel(e.id), sub:e.email, active:e.id===this.currentUserId(), onClick:()=>this.setUser(e.id),
      menuOnClick:()=>this.setUser(e.id),
      menuItemStyle:'display:flex;flex-direction:column;gap:1px;width:100%;text-align:left;border:0;background:'+(e.id===this.currentUserId()?'#F1F1FF':'transparent')+';padding:9px 12px;border-radius:7px;cursor:pointer;font-family:inherit',
      style: e.id===this.currentUserId() ? 'padding:6px 13px;border-radius:7px;border:0;background:var(--violet);color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit'
                   : 'padding:6px 13px;border-radius:7px;border:1px solid rgba(255,255,255,.18);background:transparent;color:#c9c9e0;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit',
      navStyle: e.id===this.currentUserId() ? 'padding:6px 14px;border-radius:6px;border:0;background:#fff;color:var(--violet);font-size:13px;font-weight:700;cursor:pointer;font-family:inherit'
                      : 'padding:6px 14px;border-radius:6px;border:0;background:transparent;color:#fff;opacity:.72;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit' }));
    V.goLanding=()=>this.goLanding();
    { const scope=this.scopedMandates(r,rn); const mCount=scope.length;
      V.navProject = (st.view==='checklist' && st.mandateId)
        ? { name:(this.mandate(st.mandateId)||{}).name||'Mandate', meta:this.canManageMandate(st.mandateId)?'Mandate manager':'Task access' }
        : { name:'Mandate Playbook', meta:mCount+(mCount===1?' Mandate':' Mandates') };
      V.navTabs = [
        {label:'Home'},{label:'Leads'},{label:'Reports'},{label:'Genie Activity',beta:true},
        {label:'Mandate Playbook', active:true}
      ];
      V.onNavTab = (i,t)=>{ if(t && t.label==='Mandate Playbook'){ this.goLanding(); } else { this.toast((t?t.label:'Section')+' is outside this prototype','success'); } };
      V.navUser = { initials:this.initials(rn) };
      // ---- Global Filter (cascading, opens from project switcher) ----
      const committedGfSel=st.gfSel;
      const gfSel=st.gfOpen ? (st.gfDraft===undefined?st.gfSel:st.gfDraft) : st.gfSel; const gfq=(st.gfSearch||'').toLowerCase();
      const gfSelCount=committedGfSel?scope.filter(m=>committedGfSel[m.id]).length:scope.length;
      if(gfSel && gfSelCount!==scope.length){ V.navProject.meta = gfSelCount+' of '+mCount+' Mandates'; }
      V.gfParams=['BU + P&L','Mandate','Project','Developer','City'];
      V.gfParam=st.gfParam; V.gfTeams=!!st.gfTeams;
      V.gfOpen=!!st.gfOpen;
      V.topNavStyle='position:sticky;top:0;z-index:'+(st.gfOpen?10050:40)+';flex:none;display:flex;align-items:center;background:#4040B3';
      V.onProjectClick=()=>this.setState(s=>s.gfOpen?({gfOpen:false,gfDraft:undefined}):({gfOpen:true,gfDraft:s.gfSel?{...s.gfSel}:null}));
      V.onCloseGf=()=>this.setState({gfOpen:false,gfDraft:undefined});
      V.onGfSearch=(v)=>{ const val=(v&&v.target)?v.target.value:v; this.setState({gfSearch:val||''}); };
      V.onGfParam=(p)=>this.setState({gfParam:p, gfGroupSel:null, gfDrillMandate:null});
      V.onGfToggleTeams=()=>this.setState(s=>({gfTeams:!s.gfTeams}));
      const bu=(m)=> (m.mtype==='Commercial'?'Commercial':'Residential')+' | '+m.city;
      const paramVal=(m)=>{ switch(st.gfParam){ case 'Mandate':return m.name; case 'Project':return m.name; case 'Developer':return m.developer; case 'City':return m.city; default:return bu(m); } };
      // column 0 — parameter groups
      const groups=[...new Set(scope.map(paramVal))];
      const grpSel=st.gfGroupSel;
      const grpAllOn=!grpSel||groups.every(g=>grpSel[g]);
      const col0Rows=[{id:'__all0', label:'All', count:scope.length, checked:grpAllOn, bold:true }].concat(
        groups.map(g=>({ id:'g:'+g, label:g, count:scope.filter(m=>paramVal(m)===g).length, checked: !grpSel || !!grpSel[g] })));
      // mandates in the checked groups
      const activeGroups=grpSel?groups.filter(g=>grpSel[g]):groups;
      let colMandates=scope.filter(m=>activeGroups.includes(paramVal(m)));
      if(gfq) colMandates=colMandates.filter(m=>m.name.toLowerCase().includes(gfq));
      // demo aid: surface checklist-less mandates at the top so the create-checklist flow is easy to reach
      colMandates=[...colMandates].sort((a,b)=>(a.hasChecklist?1:0)-(b.hasChecklist?1:0));
      const mAllOn=!gfSel||colMandates.every(m=>gfSel[m.id]);
      const col1Rows=[{id:'__allM', label:'All', count:colMandates.length, checked:mAllOn, bold:true }].concat(
        colMandates.map(m=>({ id:m.id, label:m.name, count:m.hasChecklist?this.mTasks(m.id).length:'—', checked: !gfSel || !!gfSel[m.id] })));
      // column 2 — projects (owners of the drilled / shown mandates)
      const drillId=st.gfDrillMandate;
      const projSource = drillId ? this.mTasks(drillId) : colMandates.flatMap(m=>this.mTasks(m.id));
      const owners=[...new Set(projSource.map(t=>t.primary).filter(Boolean))];
      const col2Rows=[{id:'__allP', label:'All', count:owners.length, checked:false, bold:true }].concat(
        owners.map(n=>({ id:'p:'+n, label:n, count:projSource.filter(t=>t.primary===n).length, checked:false })));
      const setGroups=(fn)=>{ let sel=st.gfGroupSel; if(!sel){ sel={}; groups.forEach(g=>sel[g]=true); } else sel={...sel}; fn(sel); this.setState({gfGroupSel:sel}); };
      const setMandates=(fn)=>{ let sel=st.gfSel; if(!sel){ sel={}; scope.forEach(m=>sel[m.id]=true); } else sel={...sel}; fn(sel); this.setState({gfDraft:sel}); };
      const cols=[];
      // When the parameter IS "Mandate", column 0 would just duplicate the Mandate column — skip it
      if(st.gfParam!=='Mandate') cols.push(
        { key:'p0', title:st.gfParam, width:620, rows:col0Rows, emptyText:'No results',
          onToggle:(row)=>{ if(row.id==='__all0'){ this.setState({gfGroupSel: grpAllOn?({}):null}); return; } const g=row.label; setGroups(sel=>{ sel[g]=!(!grpSel?true:grpSel[g]); }); } });
      cols.push(
        { key:'mandate', title:'Mandate', width:st.gfParam==='Mandate'?620:280, rows:col1Rows, emptyText:'No mandates found',
          onToggle:(row)=>{ if(row.id==='__allM'){ if(mAllOn){ setMandates(sel=>colMandates.forEach(m=>sel[m.id]=false)); } else { setMandates(sel=>colMandates.forEach(m=>sel[m.id]=true)); } return; } setMandates(sel=>{ sel[row.id]=!(!gfSel?true:gfSel[row.id]); }); this.setState({gfDrillMandate:row.id}); } },
        { key:'project', title:'Project', width:280, rows:col2Rows, emptyText:'Select a mandate', onToggle:()=>{} }
      );
      if(st.gfTeams){ const teams=[...new Set(projSource.flatMap(t=>(t.supporting||[])))];
        cols.push({ key:'teams', title:'Teams', width:240, rows:teams.map(n=>({id:'t:'+n,label:n,checked:false})), emptyText:'No supporting owners', onToggle:()=>{} }); }
      V.gfColumns=cols;
      V.onGfClear=()=>this.setState({gfDraft:null, gfGroupSel:null, gfDrillMandate:null});
      V.onGfApply=()=>{
        const nextSelection=st.gfDraft ? {...st.gfDraft} : null;
        if(this.gfApplyTimer) clearTimeout(this.gfApplyTimer);
        // Let the selector disappear before changing the page beneath it. This
        // prevents newly selected mandate/category content showing through the
        // design-system dropdown during its closing frame.
        this.setState({gfOpen:false,gfDraft:undefined});
        this.gfApplyTimer=setTimeout(()=>{
          this.gfApplyTimer=null;
          this.setState({gfSel:nextSelection});
        },220);
      };
    }
    V.navDrawerOpen=!!this.state.navDrawerOpen;
    {
      const nc=!!this.state.navDrawerClosing;
      V.navOverlayStyle='position:absolute;inset:0;background:rgba(20,20,40,.4);animation:'+(nc?'wf-fade-out .2s ease-in forwards':'wf-fade .15s ease-out');
      V.navPanelStyle='position:absolute;left:0;top:0;bottom:0;width:300px;max-width:86%;background:#fff;box-shadow:2px 0 24px rgba(16,23,33,.22);display:flex;flex-direction:column;animation:'+(nc?'wf-drawer-l-out .22s cubic-bezier(.4,0,1,1) both':'wf-drawer-l .24s cubic-bezier(.16,.84,.44,1) both');
    }
    V.toggleNavDrawer=()=>this.toggleNavDrawer();
    V.onCloseNavDrawer=()=>this.closeNavDrawer();
    {
      const P=(props)=>React.createElement('svg',{key:'s',width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round',strokeLinejoin:'round'},props.map((d,i)=>React.createElement('path',{key:i,d})));
      const NAVICONS={
        home:P(['M3 10.5 12 4l9 6.5','M5 9.5V20h14V9.5']),
        incentives:P(['M4 6h9','M4 12h6','M4 18h9','M17 9l2 2 4-4']),
        mandates:P(['M4 20V6l6-3v17','M10 20h10V9l-6-2','M14 12h2M14 16h2M6.5 8h1M6.5 12h1M6.5 16h1']),
        bookings:P(['M7 4h10v4a5 5 0 0 1-10 0V4z','M7 5H4v2a3 3 0 0 0 3 3','M17 5h3v2a3 3 0 0 1-3 3','M12 13v4','M8 20h8']),
        postsales:P(['M3 12V4h8l9 9-8 8-9-9z','M7.5 8.5h.01']),
        myleads:P(['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z','M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5']),
        partners:P(['M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z','M2.5 19c1.2-2.8 3.6-4 6.5-4s5.3 1.2 6.5 4','M16.5 11a3 3 0 1 0-2-5.5','M17 15c2.4.3 4 1.6 4.8 4']),
        invoices:P(['M6 3h9l4 4v14H6V3z','M14 3v5h5','M9 12h6M9 16h6']),
        ppt:P(['M3 4h18','M5 4h14v11H5V4z','M12 15v3','M8.5 21 12 18l3.5 3','M9 8h6M9 11h4']),
        cityppt:P(['M3 21h18','M5 21V8l5-3v16','M14 21V11l5 2v8','M7.5 9.5h.01M7.5 13h.01M7.5 16.5h.01']),
        genie:P(['M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z','M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z']),
        marketing:P(['M3 11v2l11 4V7L3 11z','M14 8.5c2 .5 3 1.5 3 3s-1 2.5-3 3','M6.5 13.5V18a1.5 1.5 0 0 0 3 0v-3.4']),
        call:P(['M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z']),
        tracker:P(['M8 4h8v3H8V4z','M8 5H5v16h14V5h-3','M9 12l2 2 4-4.5','M9 17.5h6']),
        direct:P(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z','M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z','M12 12.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z'])
      };
      const base='width:100%;flex:none;display:flex;align-items:center;gap:12px;padding:11px 12px;background:transparent;border:0;border-radius:9px;cursor:pointer;font-family:inherit;font-size:13.5px;font-weight:600;color:rgba(16,23,33,.94);text-align:left';
      const mk=(label,ico,ext)=>({label, ico, ext:!!ext, iconEl:NAVICONS[ico], onClick:()=>this.closeNavDrawer(), style:base, hoverStyle:'background:#F1F1F5'});
      const items=[
        mk('Home','home'), mk('Incentives','incentives'), mk('Mandates','mandates'), mk('Bookings','bookings'),
        mk('Post Sales','postsales'), mk('My Leads','myleads'), mk('Channel Partners','partners'), mk('Invoices','invoices'),
        mk('Mandate Review PPT','ppt',true), mk('City Review PPT','cityppt',true), mk('Genie Dashboard','genie',true),
        mk('Marketing Panel','marketing',true), mk('Call Auditing','call',true)
      ];
      const trk=mk('Mandate Playbook','tracker');
      trk.style=base+';background:var(--violet);color:var(--violet-lightest);margin-top:10px';
      trk.hoverStyle='background:#E4E4FB';
      trk.iconEl=React.createElement('span',{style:{display:'flex',color:'var(--violet)'}},NAVICONS.tracker);
      trk.onClick=()=>{ this.closeNavDrawer(); this.goLanding(); };
      if(st.view==='direct'){ trk.style=base+';margin-top:10px'; trk.hoverStyle='background:#F1F1F5'; trk.iconEl=NAVICONS.tracker; }
      items.push(trk);
      const dir=mk('Direct','direct');
      dir.onClick=()=>{ this.closeNavDrawer(); this.openDirect(); };
      if(st.view==='direct'){ dir.style=base+';background:var(--violet);color:var(--violet-lightest)'; dir.hoverStyle='background:#E4E4FB'; dir.iconEl=React.createElement('span',{style:{display:'flex',color:'var(--violet)'}},NAVICONS.direct); }
      items.push(dir);
      V.navDrawerItems=items;
    }
    V.onNavHome=()=>{ this.closeNavDrawer(); this.goLanding(); };
    V.noop=()=>{};

    const isLanding = st.view==='landing';
    V.isLanding=isLanding; V.isChecklist=st.view==='checklist'||st.view==='direct'; V.isDirect=st.view==='direct';
    V.showPageBar = false;

    // ---- page title ----
    if(isLanding){
      const titles={pnl:'Mandate Portfolio', lead:'My Mandates', bsm:'My Mandates', dev:'My Developer Mandates'};
      const scopeCount=this.scopedMandates(r,rn).length;
      V.pageTitle=(titles[r]||'Mandate Onboarding Tracker')+' ('+scopeCount+')';
      V.pageSub='';
    } else if(st.view==='direct'){
      V.pageTitle='All Tasks'; V.pageSub='';
    } else {
      const m=this.mandate(st.mandateId); V.pageTitle=m?(m.name+'’s Tasks ('+this.mTasks(st.mandateId).length+')'):'Playbook'; V.pageSub='';
    }

    // ================= LANDING =================
    if(isLanding){
      V.isMonitor = r==='pnl';
      V.isTaskLanding = false;
      V.showMandateList = st.landingView==='list';
      V.showMandateGrid = st.landingView==='grid';
      V.landingHasSearch = true;

      const banners={
        pnl:'As P&L Head you land on a monitoring view — mandates that are at risk or launching soon are surfaced first. Drill into any mandate to see workstream progress and blocked or overdue tasks. You can edit, but the flow is built for oversight.',
        lead:'As Team Lead you own execution. Create playbooks, add/edit/delete tasks, assign owners, and follow up on overdue items across the mandates you lead.',
        bsm:'You land directly on your tasks, grouped by urgency. Open any task to update its status, add a remark, or set a revised date. You only edit tasks assigned to you.',
        dev:'You see only developer-side tasks assigned to you. Internal owners and remarks are hidden. Update status and add a remark or proof where allowed.'
      };
      V.roleBanner=banners[r];

      // KPI cards + filter
      V.landingSearch=st.landingSearch;
      V.onLandingSearch=e=>this.setState({landingSearch:e.target.value});
      V.landingView=st.landingView; V.landingListView=st.landingView==='list'; V.landingGridView=st.landingView==='grid';
      V.onLandingList=()=>this.setState({landingView:'list'}); V.onLandingGrid=()=>this.setState({landingView:'grid'});
      V.landingListToggleStyle = st.landingView==='list' ? 'padding:0 13px;height:32px;border:0;border-radius:6px;background:var(--violet);color:#fff;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit' : 'padding:0 13px;height:32px;border:0;border-radius:6px;background:transparent;color:var(--gray-dark);font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit';
      V.landingGridToggleStyle = st.landingView==='grid' ? 'padding:0 13px;height:32px;border:0;border-radius:6px;background:var(--violet);color:#fff;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit' : 'padding:0 13px;height:32px;border:0;border-radius:6px;background:transparent;color:var(--gray-dark);font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit';
      // sort control (mandate list/grid)
      const SORTS=[
        {k:'none', label:'Default order'},
        {k:'status', label:'Status'},
        {k:'pending', label:'Pending tasks'},
        {k:'wip', label:'In Progress tasks'},
        {k:'blocked', label:'Blocked tasks'},
        {k:'completed', label:'Completed tasks'},
        {k:'unassigned', label:'Unassigned tasks'},
      ];
      const curSort=st.mSortKey||'none';
      V.sortOpen=!!st.mSortOpen;
      V.onToggleSort=(e)=>{ try{e.stopPropagation();}catch(_){}; this.setState(s=>({mSortOpen:!s.mSortOpen})); };
      V.onCloseSort=(e)=>{ try{e.stopPropagation();}catch(_){}; this.setState({mSortOpen:false}); };
      V.sortBtnLabel = curSort==='none' ? 'Sort' : 'Sort: '+((SORTS.find(x=>x.k===curSort)||SORTS[0]).label);
      V.sortBtnStyle='display:flex;align-items:center;gap:7px;height:38px;padding:0 13px;background:'+(curSort!=='none'?'#F0F0FF':'#fff')+';border:1px solid '+(curSort!=='none'?'var(--violet)':'#E0E0E0')+';border-radius:10px;cursor:pointer;font-family:inherit;font-size:12.5px;font-weight:600;color:'+(curSort!=='none'?'var(--violet)':'rgba(16,23,33,.94)')+';flex:none';
      V.sortOptions=SORTS.map(o=>{ const active=o.k===curSort;
        return { label:o.label, active,
          rowStyle:'width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;text-align:left;border:0;background:'+(active?'#F4F4FF':'transparent')+';padding:8px 10px;border-radius:6px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:'+(active?'600':'500')+';color:'+(active?'var(--violet)':'rgba(16,23,33,.94)'),
          checkStyle:'display:'+(active?'flex':'none')+';align-items:center;color:var(--violet)',
          onPick:(e)=>{ try{e.stopPropagation();}catch(_){}; this.setState({mSortKey:o.k, mSortOpen:false}); } };
      });
      // right-side filter dropdowns
      V.landingFilterDropdowns=[];

      // base list scoped to role (before KPI filter) — for KPI counts
      const q=st.landingSearch.toLowerCase();
      const scoped=this.scopedMandates(r,rn);
      const mHasStatus=(m,key)=>{ const c=this.counts(m.id); if(!m.hasChecklist) return false; if(key==='notstarted'){const p=this.progress(m.id);return p.total>0&&c.notstarted===p.total;} if(key==='blocked')return c.blocked>0; if(key==='overdue')return c.overdue>0; if(key==='completed'){const p=this.progress(m.id);return p.total>0&&p.done===p.total;} return false; };
      const kpiCount=(key)=>{ if(key==='all')return scoped.length; if(key==='nocreated')return scoped.filter(m=>!m.hasChecklist).length; return scoped.filter(m=>mHasStatus(m,key)).length; };
      const kpiDefs=[
        {k:'all',label:'All Mandates',sub:'in your portfolio',color:'#6161FF',bg:'#ECECFF',
         icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="11" width="18" height="4" rx="1"/><rect x="3" y="18" width="18" height="3" rx="1"/></svg>'},
        {k:'blocked',label:'Blocked',sub:'mandates with blockers',color:'var(--red)',bg:'var(--red-light)',
         icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>'},
        {k:'overdue',label:'Overdue',sub:'past due date',color:'#E8833A',bg:'#FCEEE2',
         icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 16H3z"/><path d="M12 9v4M12 16v.5"/></svg>'},
        {k:'notstarted',label:'Task not Started',sub:'No progress on tasks yet',color:'#6B7785',bg:'#EFEFEF',
         icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></svg>'},
        {k:'nocreated',label:'Not Created',sub:'playbook pending',color:'#9a6a12',bg:'#FBF3E1',
         icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" stroke-dasharray="3 3"/><path d="M12 8v8M8 12h8"/></svg>'},
        {k:'completed',label:'Completed',sub:'fully done',color:'var(--emerald)',bg:'var(--emerald-light)',
         icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>'},
      ];
      V.kpiCards=kpiDefs.map(d=>{ const active=st.landingFilter===d.k;
        return {label:d.label, sub:d.sub, count:kpiCount(d.k),
          icon:React.createElement('span',{style:{display:'flex'},dangerouslySetInnerHTML:{__html:d.icon}}),
          onClick:()=>this.setState({landingFilter: active?'all':d.k}),
          cardStyle:`flex:1 0 230px;min-width:230px;height:104px;display:flex;align-items:center;gap:16px;background:#fff;border:1.5px solid ${active?d.color:'#E0E0E0'};border-radius:12px;padding:14px 16px 14px 24px;cursor:pointer;position:relative;transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease;box-sizing:border-box`,
          iconWrap:`width:36px;height:36px;border-radius:10px;background:#F2F2F2;color:${active?d.color:'#6B7785'};display:flex;align-items:center;justify-content:center;flex:none`,
          countStyle:`font-size:22px;font-weight:700;color:${active?d.color:'#101721'};line-height:1`};
      });

      const lfs=[{k:'all',l:'All'},{k:'attention',l:'Needs attention'},{k:'nochecklist',l:'No playbook'}];
      V.landingFilters=[];

      // mandate cards / rows
      let list=this.scopedMandates(r,rn).filter(m=> !q || (m.name+m.developer+m.city).toLowerCase().includes(q));
      if(st.gfSel) list=list.filter(m=>st.gfSel[m.id]);
      const lf=st.landingFilter;
      if(lf==='nocreated') list=list.filter(m=>!m.hasChecklist);
      else if(lf==='notstarted'||lf==='blocked'||lf==='overdue'||lf==='completed') list=list.filter(m=>mHasStatus(m,lf));
      // right-side filters
      if(st.fLaunch!=='all'){ const MS=['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
        const daysTo=(s)=>{ const p=s.toLowerCase().split(' '); const d=Date.UTC(+p[2],MS.indexOf(p[1]),+p[0]); return Math.round((d-Date.UTC(2026,6,9))/86400000); };
        list=list.filter(m=>{ const dd=daysTo(m.launch); if(st.fLaunch==='30')return dd<=30; if(st.fLaunch==='60')return dd<=60; if(st.fLaunch==='90')return dd<=90; if(st.fLaunch==='later')return dd>90; return true; }); }

      // ---- sort (mandate list/grid) ----
      const sk=st.mSortKey;
      if(sk && sk!=='none'){
        const sv=(m)=>{ const c=this.counts(m.id);
          switch(sk){
            case 'status':{ const rank={'At risk':0,'In progress':1,'Just started':2,'On track':3,'Not created':4}; return rank[risk(m).label] ?? 9; }
            case 'pending': return -c.notstarted;
            case 'completed': return -c.completed;
            case 'wip': return -c.inprog;
            case 'blocked': return -c.blocked;
            case 'unassigned': return -c.unassigned;
            default: return 0;
          } };
        list=list.slice().sort((a,b)=> sv(a)-sv(b) || a.name.localeCompare(b.name));
      }

      const mkCard=(m)=>{ const pr=this.progress(m.id), c=this.counts(m.id), rk=risk(m);
        return {name:m.name, developer:m.developer, city:m.city, launch:m.launch, onboardDate:m.hasChecklist?m.launch:'Not Yet', teamLead:m.teamLead, pnlHead:m.pnlHead, updated:m.updated,
          riskLabel:rk.label, riskStyle:riskStyle(rk),
          hasChecklist:m.hasChecklist, noChecklist:!m.hasChecklist,
          pct:pr.pct, progressLabel:pr.total?`${pr.done}/${pr.total} tasks done`:'No tasks',
          barStyle: bar(pr.pct, rk.color||'var(--violet)'),
          hasOverdue:c.overdue>0, overdue:c.overdue, hasBlocked:c.blocked>0, blocked:c.blocked,
          cInprog:c.inprog, cBlocked:c.blocked, cOverdue:c.overdue, cCompleted:c.completed, cNotStarted:c.notstarted, cUnassigned:c.unassigned, cTotal:pr.total,
          dTotal:m.hasChecklist?pr.total:'-', dInprog:m.hasChecklist?c.inprog:'-', dBlocked:m.hasChecklist?c.blocked:'-', dOverdue:m.hasChecklist?c.overdue:'-', dCompleted:m.hasChecklist?c.completed:'-', dPending:m.hasChecklist?c.notstarted:'-', dUnassigned:m.hasChecklist?c.unassigned:'-',
          hasInprog:c.inprog>0, hasBlockedN:c.blocked>0, hasOverdueN:c.overdue>0, hasDone:c.completed>0, hasPending:c.notstarted>0, hasUnassigned:c.unassigned>0,
          mtype:m.mtype,
          completionLabel: this.completionDate(m.id) || m.launch,
          mtypeStyle:(function(t){ const map={'New Launch':['var(--violet)','#ECECFF'],'Launched':['var(--emerald)','var(--emerald-light)'],'Sustenance':['#9a6a12','#FBF3E1']}; const c=map[t]||['var(--gray-dark)','#EEE']; return `font-size:11px;font-weight:600;color:${c[0]};background:${c[1]};border-radius:20px;padding:3px 10px;white-space:nowrap`; })(m.mtype),
          segDoneStyle:(function(){ const ts=R.mTasks(m.id),t=ts.length||1; const done=ts.filter(x=>x.status==='completed').length; return `height:100%;width:${done/t*100}%;background:#C9E9D6`; })(),
          segInprogStyle:(function(){ const ts=R.mTasks(m.id),t=ts.length||1; const n=ts.filter(x=>x.status==='in_progress').length; return `height:100%;width:${n/t*100}%;background:#CFE0FB`; })(),
          segUnassignedStyle:(function(){ const ts=R.mTasks(m.id),t=ts.length||1; const n=ts.filter(x=>x.status==='unassigned').length; return `height:100%;width:${n/t*100}%;background:#E8E8E8`; })(),
          segBlockedStyle:(function(){ const ts=R.mTasks(m.id),t=ts.length||1; const n=ts.filter(x=>x.status==='blocked').length; return `height:100%;width:${n/t*100}%;background:#F2C0C0`; })(),
          segNotStartedStyle:(function(){ const ts=R.mTasks(m.id),t=ts.length||1; const done=ts.filter(x=>x.status==='completed').length, inp=ts.filter(x=>x.status==='in_progress').length, bl=ts.filter(x=>x.status==='blocked').length, un=ts.filter(x=>x.status==='unassigned').length; const rest=ts.length-done-inp-bl-un; return `height:100%;width:${rest/t*100}%;background:#F5DCC2`; })(),
          segTotal:pr.total,
          cardStyle:'background:#fff;border:1px solid #E0E0E0;border-left:3px solid '+(rk.color||'var(--violet)')+';border-radius:10px;padding:16px 17px;cursor:pointer;position:relative;transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease',
          onOpen:()=>this.openMandate(m.id),
          cta: m.hasChecklist?'Playbook':'Create Playbook',
          ctaTitle: m.hasChecklist?'View Playbook':'Create Playbook',
          ctaIcon: React.createElement('span',{style:{display:'inline-flex',alignItems:'center',gap:'5px'}},
            React.createElement('span',{style:{display:'flex'},dangerouslySetInnerHTML:{__html:'<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l4 4-4 4"/></svg>'}})),
          ctaStyle: 'height:32px;padding:0 6px;display:inline-flex;align-items:center;justify-content:center;background:transparent;border:0;color:var(--violet);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;border-radius:6px',
          menuOpen: this.state.mandateMenuId===m.id,
          ctaLabel: m.hasChecklist?'View Playbook':'Create Playbook',
          ctaMenuColor: m.hasChecklist?'rgba(16,23,33,.94)':'var(--violet)',
          onToggleMenu:(e)=>this.toggleMandateMenu(m.id,e),
          onMenuCta:(e)=>{ try{e.stopPropagation();}catch(_){}; this.setState({mandateMenuId:null}); this.openMandate(m.id); },
          onMenuSettings:(e)=>{ try{e.stopPropagation();}catch(_){}; this.setState({mandateMenuId:null}); this.toast('Mandate settings','info'); },
          onCloseMenu:(e)=>{ try{e.stopPropagation();}catch(_){}; this.setState({mandateMenuId:null}); },
          rowBg: this.state.mRowHoverId===m.id ? '#F6F6FF' : '#fff',
          rowZ: this.state.mandateMenuId===m.id ? 5 : 'auto',
          onRowEnter:()=>this.setState({mRowHoverId:m.id}),
          onRowLeave:()=>this.setState(s=>s.mRowHoverId===m.id?{mRowHoverId:null}:null)
        };
      };

      if(r==='pnl'){
        V.atRiskCards=[];
        V.mandateRows=list.map(mkCard);
      } else {
        V.atRiskCards=[];
        V.mandateRows=list.map(mkCard);
      }

      // ---- resizable mandate-table columns (header-hover handles) ----
      {
        const CW=this.state.mColWidths, GAP=20, ACTION_W=this.state.mActionW;
        V.mGridTemplate = CW.map(w=>w+'px').join(' ')+' '+ACTION_W+'px';
        V.mTableMinWidth = (CW.reduce((a,b)=>a+b,0) + GAP*CW.length + ACTION_W) + 'px';
        V.mActionShowHandle = this.state.mActionHover || this.state.mActionResizing;
        V.mActionHandleStyle = 'position:absolute;top:0;bottom:0;left:-8px;width:16px;cursor:col-resize;display:flex;align-items:center;justify-content:center;z-index:6';
        V.mActionHandleBarStyle = 'width:3px;height:16px;border-radius:2px;background:'+(this.state.mActionResizing?'#6161FF':'#C6C6EE');
        V.onMActionEnter = ()=>this.setState(s=>s.mActionResizing?null:{mActionHover:true});
        V.onMActionLeave = ()=>this.setState(s=>s.mActionResizing?null:{mActionHover:false});
        V.onMActionDown = (e)=>this.startActionResize(e);
        const LABELS=['Mandate / Developer','Status','Task Progress','Total Tasks','In Progress Tasks','Blkd Tasks','Overdue Tasks','Completed Tasks','Pending Tasks','Unassigned Tasks','P&L Head','Last Updated','Type','Onboarding Date'];
        const CENTER=[false,false,false,true,true,true,true,true,true,true,false,false,false,false];
        V.headerCols = LABELS.map((label,i)=>({
          label, key:'hc'+i,
          wrapStyle: i===0
            ? `position:sticky;left:0;z-index:2;background:#FAFAFA;height:100%;display:flex;align-items:center;padding:11px 0 11px 16px;margin:-11px 0 -11px -16px;box-shadow:6px 0 8px -6px rgba(16,23,33,.12)`
            : `position:relative;height:100%;display:flex;align-items:center${CENTER[i]?';justify-content:center':''}`,
          onEnter:()=>this.setState(s=>s.mResizeCol==null?{mHoverCol:i}:null),
          onLeave:()=>this.setState(s=>s.mResizeCol==null?{mHoverCol:null}:null),
          showHandle: this.state.mHoverCol===i || this.state.mResizeCol===i,
          handleStyle:'position:absolute;top:0;bottom:0;right:-10px;width:16px;cursor:col-resize;display:flex;align-items:center;justify-content:center;z-index:6',
          handleBarStyle:`width:3px;height:16px;border-radius:2px;background:${this.state.mResizeCol===i?'#6161FF':'#C6C6EE'}`,
          onDown:(e)=>this.startColResize(i,e),
        }));
      }

      // BSM / Dev task buckets
      if(r==='bsm'||r==='dev'){
        let mine=this.tasks.filter(t=>this.isMine(t));
        if(r==='dev') mine=mine.filter(t=>t.external);
        const mkT=(t)=>{ const od=this.isOverdue(t); const m=this.mandate(t.mandateId);
          return {ws:t.ws+' · '+(m?m.name.split(' ')[0]:''), name:t.name, stage:t.stage,
            extTag:t.external, accent:S[t.status].accent,
            hasRemark: !!t.remark && r!=='dev', remarkPreview:(t.remark||'').slice(0,54),
            dueLabel:this.fmt(t.due), dueStyle:'font-size:12.5px;font-weight:600;'+(od?'color:var(--red)':'color:rgba(16,23,33,.94)'),
            hasRevised:!!t.revised, revisedLabel:this.fmt(t.revised),
            statusLabel:S[t.status].label, statusStyle:statusBadge(t.status),
            onOpen:()=>this.openView(t.id)}; };
        const buckets=[
          {key:'overdue',label:'Overdue',dot:'var(--red)',emptyMsg:'Nothing overdue — nice.'},
          {key:'today',label:'Due today',dot:'#c98a12',emptyMsg:'Nothing due today.'},
          {key:'week',label:'Due this week',dot:'#2f6fdb',emptyMsg:'Nothing due this week.'},
          {key:'upcoming',label:'Upcoming',dot:'var(--gray)',emptyMsg:'No upcoming tasks.'}
        ];
        V.taskBuckets=buckets.map(b=>{ const ts=mine.filter(t=>this.dueBucket(t)===b.key); 
          return {label:b.label, count:ts.length, dotStyle:`width:8px;height:8px;border-radius:50%;background:${b.dot}`,
            empty:ts.length===0, hasTasks:ts.length>0, emptyMsg:b.emptyMsg, tasks:ts.map(mkT)}; });
        V.landingEmpty = mine.length===0;
        V.landingEmptyTitle = r==='dev'?'No developer tasks assigned':'You have no tasks yet';
        V.landingEmptyMsg = r==='dev'?'When a Team Lead assigns you a developer-side task, it will show up here.':'When tasks are assigned to you, they’ll appear here grouped by urgency.';
        V.landingEmptyCta=false;
      } else {
        V.taskBuckets=[];
        V.landingEmpty = (r==='lead'||r==='pnl') && (V.mandateRows.length===0 && (!V.atRiskCards||V.atRiskCards.length===0));
        V.landingEmptyTitle = st.landingSearch||st.landingFilter!=='all' ? 'No mandates match' : 'No mandates yet';
        V.landingEmptyMsg = st.landingSearch||st.landingFilter!=='all' ? 'Try a different search or clear the filter.' : 'Mandates you lead will appear here.';
        V.landingEmptyCta=false;
      }
    }

    // ================= CHECKLIST =================
    if(st.view==='checklist'||st.view==='direct'){
      const isDirect=st.view==='direct';
      const dScope=isDirect?this.scopedMandates(r,rn):[];
      const dSel=st.directSel;
      const dIds=dScope.filter(x=>(!dSel||dSel[x.id])&&(!st.gfSel||st.gfSel[x.id])).map(x=>x.id);
      const m=isDirect?null:this.mandate(st.mandateId);
      const dSelM=isDirect?dIds.map(id=>this.mandate(id)).filter(Boolean):[];
      const dAllNoChecklist=isDirect&&dSelM.length>0&&dSelM.every(x=>!x.hasChecklist);
      const hasCl=isDirect?!dAllNoChecklist:m.hasChecklist;
      const _pageIds=isDirect?dIds:this.scopedMandates(r,rn).filter(mm=>!st.gfSel||st.gfSel[mm.id]).map(mm=>mm.id);
      let _pageTasks=this.tasks.filter(t=>_pageIds.includes(t.mandateId)); if(r==='dev') _pageTasks=_pageTasks.filter(t=>t.external && this.isMine(t));
      const _matchesActiveFilters=(t,ignore)=>{
        if(ignore!=='due'&&st.fDue==='overdue'&&!this.isOverdue(t)) return false;
        if(ignore!=='due'&&st.fDue==='today'&&this.dueBucket(t)!=='today') return false;
        if(ignore!=='due'&&st.fDue==='week'&&!(this.dueBucket(t)==='week'||this.dueBucket(t)==='today')) return false;
        if(ignore!=='status'&&st.fStatus!=='all'&&t.status!==st.fStatus) return false;
        if(st.fPrio!=='all'&&t.prio!==st.fPrio) return false;
        if(st.fMine&&!this.isMine(t)) return false;
        if(ignore!=='workstream'&&st.fTaskWs!=='all'&&t.ws!==st.fTaskWs) return false;
        if(ignore!=='owner'&&st.fTaskOwner!=='all'){
          if(st.fTaskOwner==='__unassigned__'){ if(t.primary&&t.primary!=='Unassigned') return false; }
          else if(t.primary!==st.fTaskOwner) return false;
        }
        if(ignore!=='owner'&&st.fOwnerOverdueOnly&&!this.isOverdue(t)) return false;
        if(ignore!=='due'&&st.fDue==='overdue'&&st.fOverdueRange!=='all'){
          const d=this.overdueDays(t);
          if(st.fOverdueRange==='le7'&&d>7) return false;
          if(st.fOverdueRange==='gt7'&&d<=7) return false;
          if(st.fOverdueRange==='gt10'&&d<=10) return false;
          if(st.fOverdueRange==='5to10'&&(d<5||d>10)) return false;
          if(st.fOverdueRange==='1to4'&&(d<1||d>4)) return false;
        }
        if(ignore!=='blockedRange'&&st.fStatus==='blocked'&&st.fBlockedRange!=='all'){
          const d=Math.max(this.overdueDays(t),0);
          if(st.fBlockedRange==='lt_week'&&d>7) return false;
          if(st.fBlockedRange==='8_15'&&(d<8||d>15)) return false;
          if(st.fBlockedRange==='15_30'&&(d<16||d>30)) return false;
          if(st.fBlockedRange==='gt_month'&&d<=30) return false;
        }
        if(ignore!=='revisedRange'&&st.fRevisedRange!=='all'){
          if(!t.revised) return false;
          const d=this.daysBetween(t.due,t.revised);
          if(d<=0) return false;
          if(st.fRevisedRange==='Less than a week'&&d>7) return false;
          if(st.fRevisedRange==='7-15 days'&&(d<8||d>15)) return false;
          if(st.fRevisedRange==='15-30 days'&&(d<16||d>30)) return false;
          if(st.fRevisedRange==='More than a month'&&d<=30) return false;
        }
        const q=(st.clSearch||'').trim().toLowerCase();
        return !q||((t.name||'')+' '+(t.stage||'')+' '+(t.primary||'')).toLowerCase().includes(q);
      };
      const _analyticsTasks=_pageTasks.filter(_matchesActiveFilters);
      V.showAnalytics = hasCl && _pageTasks.length>0;
      V.analyticsExpanded = !!st.analyticsOpen;
      V.analyticsCollapsed = !st.analyticsOpen;
      V.analyticsCtaLabel = 'Detailed Analytics';
      V.onToggleAnalytics=()=>this.setState(s=>({analyticsOpen:!s.analyticsOpen}));
      V.analyticsChevronStyle='transition:transform .15s ease;transform:rotate('+(st.analyticsOpen?180:0)+'deg)';
      if(_pageTasks.length>0){
        const mts=_analyticsTasks;
        // Faceted chart sources: a chart keeps its complete option set by
        // ignoring only the filter that chart owns. Every other active filter
        // still cross-filters it, and the board/list/timeline keep using mts.
        const summaryTasks=_pageTasks.filter(t=>_matchesActiveFilters(t,'status'));
        const dueTasks=_pageTasks.filter(t=>_matchesActiveFilters(t,'due'));
        const ownerTasks=_pageTasks.filter(t=>_matchesActiveFilters(t,'owner'));
        const blockedRangeTasks=_pageTasks.filter(t=>_matchesActiveFilters(t,'blockedRange'));
        const revisedRangeTasks=_pageTasks.filter(t=>_matchesActiveFilters(t,'revisedRange'));
        const workstreamTasks=_pageTasks.filter(t=>_matchesActiveFilters(t,'workstream'));
        const anTotal=summaryTasks.length;
        const setStatusF=(v)=>()=>this.setState(s=>({fStatus:s.fStatus===v?'all':v}));
        const setWsF=(v)=>()=>this.setState(s=>{ const reset=s.fTaskWs===v&&s.fStatus==='unassigned'; return {fTaskWs:reset?'all':v,fStatus:reset?'all':'unassigned'}; });
        const setOwnerF=(v)=>()=>this.setState(s=>{
          const reset=s.fTaskOwner===v&&s.fOwnerOverdueOnly;
          return {fTaskOwner:reset?'all':v, fOwnerOverdueOnly:!reset, fDue:reset?'all':'overdue', fOverdueRange:'all'};
        });
        const setOverdueF=(range)=>()=>this.setState(s=>({fDue:(s.fDue==='overdue'&&s.fOverdueRange===range)?'all':'overdue', fOverdueRange:(s.fDue==='overdue'&&s.fOverdueRange===range)?'all':range}));
        const setBlockedF=(range)=>()=>this.setState(s=>{ const reset=s.fStatus==='blocked'&&s.fBlockedRange===range; return {fStatus:reset?'all':'blocked',fBlockedRange:reset?'all':range}; });
        const setRevisedF=(range)=>()=>this.setState(s=>({fRevisedRange:s.fRevisedRange===range?'all':range}));
        const setDueF=(v)=>()=>this.setState(s=>({fDue:s.fDue===v?'all':v}));
        const rowStyle=(active)=>'display:flex;align-items:center;gap:7px;padding:3px 6px;border-radius:6px;cursor:pointer;'+(active?'background:#F0F0FF':'');
        const barRow=(active)=>'cursor:pointer;border-radius:6px;padding:4px 6px;'+(active?'background:#F0F0FF':'');
        const isPending=(t)=>t.status==='not_started';
        // ---- shared metrics ----
        const nCompleted=summaryTasks.filter(t=>t.status==='completed').length;
        const nInprog=summaryTasks.filter(t=>t.status==='in_progress').length;
        const nBlocked=summaryTasks.filter(t=>t.status==='blocked').length;
        const nPending=summaryTasks.filter(t=>isPending(t)).length;
        const nOverdue=ownerTasks.filter(t=>this.isOverdue(t)).length;
        const nSummaryUnassigned=summaryTasks.filter(t=>t.status==='unassigned').length;
        const nUnassigned=workstreamTasks.filter(t=>t.status==='unassigned').length;
        // 5.10.3 Overdue Task Breakdown — group overdue tasks by owner and keep
        // ownerless overdue work visible as an explicit Unassigned entry.
        const overdueOwnerKey=(t)=>(!t.primary||t.primary==='Unassigned')?'__unassigned__':t.primary;
        const overdueOwnerKeys=[...new Set(ownerTasks.filter(t=>this.isOverdue(t)).map(overdueOwnerKey))];
        const ownerStatsAll=overdueOwnerKeys.map(key=>{
          const overdue=ownerTasks.filter(t=>this.isOverdue(t)&&overdueOwnerKey(t)===key).length;
          return {key, n:key==='__unassigned__'?'Unassigned':key, total:overdue, overdue};
        }).filter(o=>o.total>0).sort((a,b)=>b.total-a.total);
        const overdueUnassigned=ownerStatsAll.find(o=>o.key==='__unassigned__');
        const ownerStats=(overdueUnassigned?[overdueUnassigned]:[])
          .concat(ownerStatsAll.filter(o=>o.key!=='__unassigned__').slice(0,overdueUnassigned?2:3))
          .sort((a,b)=>b.total-a.total);
        const ownerMax=Math.max(...ownerStats.map(o=>o.total),1);
        // 5.10.4 Revised Timeline — bucket tasks with a revised date by how far it shifted from the due date
        const revisedTasks=revisedRangeTasks.filter(t=>t.revised&&this.daysBetween(t.due,t.revised)>0);
        const revBucket=t=>{ const d=this.daysBetween(t.due,t.revised); if(d<=7) return 'Less than a week'; if(d<=15) return '7-15 days'; if(d<=30) return '15-30 days'; return 'More than a month'; };
        const revOrder=['Less than a week','7-15 days','15-30 days','More than a month'];
        const deptStats=revOrder.map(ws=>({ws, pending:revisedTasks.filter(t=>revBucket(t)===ws).length, overdue:0})).filter(d=>d.pending>0);
        const deptMax=Math.max(...deptStats.map(d=>d.pending+d.overdue),1);
        // 5.10.5 Blockers (bucket blocked tasks by age)
        const blockedTasks=blockedRangeTasks.filter(t=>t.status==='blocked');
        const nBlockedTasks=blockedTasks.length;
        const blkAge=(t)=>Math.max(this.overdueDays(t),0);
        const blkBuckets=[
          {k:'lt_week', label:'Blocked for less than a week', short:'< 1 week', test:d=>d<=7},
          {k:'8_15', label:'Blocked for 8-15 days', short:'8-15 days', test:d=>d>=8&&d<=15},
          {k:'15_30', label:'Blocked for 15-30 days', short:'15-30 days', test:d=>d>=16&&d<=30},
          {k:'gt_month', label:'Blocked for more than a month', short:'> 1 month', test:d=>d>30},
        ].map(b=>({k:b.k,label:b.label,short:b.short,count:blockedTasks.filter(t=>b.test(blkAge(t))).length}));
        // 5.10.6 On-Time Completion %
        const completedTasks=mts.filter(t=>t.status==='completed');
        const lateTasks=completedTasks.filter(t=>t.revised && this.daysBetween(t.due,t.revised)>0);
        const onTimeN=completedTasks.length-lateTasks.length;
        const onTimePct=completedTasks.length?Math.round(onTimeN/completedTasks.length*100):0;
        const avgDelay=lateTasks.length?Math.round(lateTasks.reduce((a,t)=>a+this.daysBetween(t.due,t.revised),0)/lateTasks.length):0;
        const topOwnerLoad=ownerStats.length?ownerStats[0].total:0;
        const topDeptLoad=deptStats.length?deptStats[0].pending+deptStats[0].overdue:0;

        // ---- collapsed compact chips (one per 5.10 KPI) ----
        const chipBase='min-width:0;background:#fff;border:0.5px solid transparent;border-radius:8px;padding:23px 13px;cursor:pointer;box-shadow:0.5px 1px 4px 1px rgba(16,23,33,.08);transition:border-color .15s ease,box-shadow .15s ease';
        const mkBar=(v,tot,color)=>'height:100%;width:'+(tot?Math.round(v/tot*100):0)+'%;background:'+color+';border-radius:4px';
        const _icoOverdue='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
        const _icoDept='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V8l7-4 7 4v13"/><path d="M3 21h18M9 21v-5h4v5"/></svg>';
        const _icoBlocked='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>';
        const _icoUnassigned='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.3 3.1-6 7-6"/><path d="M17 15v6M14 18h6"/></svg>';
        const _icoDone='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/></svg>';
        const _icoAll='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h10M7 17h6"/></svg>';
        V.anCompact=[
          {label:'All Tasks', ico:_icoAll, color:'var(--violet)', val:anTotal, total:anTotal, barStyle:mkBar(anTotal,anTotal,'var(--violet)'), onClick:setStatusF('all')},
          {label:'Overdue', ico:_icoOverdue, color:'var(--red)', val:nOverdue, total:anTotal, barStyle:mkBar(nOverdue,anTotal,'var(--red)'), onClick:setDueF('overdue')},
          {label:'Blocked', ico:_icoBlocked, color:'#E8833A', val:nBlocked, total:anTotal, barStyle:mkBar(nBlocked,anTotal,'#E8833A'), onClick:setStatusF('blocked')},
          {label:'Unassigned', ico:_icoUnassigned, color:'#8a8f98', val:nSummaryUnassigned, total:anTotal, barStyle:mkBar(nSummaryUnassigned,anTotal,'#8a8f98'), onClick:setStatusF('unassigned')},
          {label:'Completed', ico:_icoDone, color:'var(--emerald)', val:nCompleted, total:anTotal, mark:'done', barStyle:mkBar(nCompleted,anTotal,'var(--emerald)'), onClick:setStatusF('completed')},
        ].map(x=>({...x, mark:x.mark||'', chipStyle:chipBase, iconNode:React.createElement('span',{style:{display:'flex'},dangerouslySetInnerHTML:{__html:x.ico}}), iconWrap:'width:32px;height:32px;border-radius:8px;background:#F2F2F2;color:'+x.color+';display:flex;align-items:center;justify-content:center;flex:none'}));

        // ---- expanded detailed cards ----
        const halfDonut=(segs,total)=>{ let acc=0; const stops=segs.filter(s=>s.count>0).map(s=>{ const a=total?acc/total*50:0; acc+=s.count; const b=total?acc/total*50:0; return `${s.color} ${a}% ${b}%`; }).join(','); const fill=total?Math.min(acc/total*50,50):0; return 'width:100%;height:100%;border-radius:50%;background:conic-gradient(from 270deg'+(stops?','+stops:'')+',#EDEDED '+fill+'% 50%,transparent 50% 100%)'; };
        const segH=(v,max)=>v>0?Math.max(Math.round(v/(max||1)*70),4):0;
        // donuts: max 6 slices — anything beyond the top 6 rolls into a single "Other" slice
        const cap7=(segs)=>{ if(segs.length<=6) return segs; const top=segs.slice(0,5), rest=segs.slice(5);
          return top.concat([{k:'__other', label:'Other', ws:null, color:'#C9CDD4', count:rest.reduce((a,b)=>a+b.count,0)}]); };
        // bars: max 5, left-aligned — each column reserves 1/5 of the track so 3 bars sit left with slots 4-5 empty
        const colBase=(active)=>'flex:0 0 20%;max-width:20%;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;cursor:pointer;border-radius:6px;padding:4px 2px;min-width:0;'+(active?'background:#F0F0FF':'');

        // 5.10.1 Task Summary — half donut
        const sumSegs=[
          {k:'completed', label:'Completed', color:'var(--emerald)', count:nCompleted},
          {k:'in_progress', label:'In Progress', color:'#2f6fdb', count:nInprog},
          {k:'blocked', label:'Blocked', color:'#F3AA07', count:nBlocked},
          {k:'__pending', label:'Pending', color:'#8a8f98', count:nPending},
          {k:'unassigned', label:'Unassigned', color:'#b8bcc4', count:nSummaryUnassigned},
        ].filter(x=>x.count>0);
        V.anSummary={ total:anTotal, donutStyle:halfDonut(cap7(sumSegs),anTotal),
          rows: sumSegs.map(x=>({label:x.label, count:x.count, mark:(x.k==='completed'?'completed':''), onClick: x.k==='__pending'?setStatusF('not_started'):setStatusF(x.k), rowStyle:rowStyle(st.fStatus===x.k), dotStyle:'width:8px;height:8px;border-radius:50%;background:'+x.color+';flex:none'})) };

        // 5.10.2 Upcoming vs Overdue — vertical bars
        const uoRows=[
          {label:'Due Today', short:'Today', color:'var(--violet)', count:dueTasks.filter(t=>t.status!=='completed'&&this.dueBucket(t)==='today').length, onClick:setDueF('today'), active:st.fDue==='today'},
          {label:'Due This Week', short:'This Week', color:'#1F69FF', count:dueTasks.filter(t=>t.status!=='completed'&&!this.isOverdue(t)&&this.daysBetween(this.NOW,this.effDate(t))>=1&&this.daysBetween(this.NOW,this.effDate(t))<=7).length, onClick:setDueF('week'), active:st.fDue==='week'},
          {label:'Overdue ≤ 7 days', short:'OD ≤7d', color:'#E8833A', count:dueTasks.filter(t=>this.isOverdue(t)&&this.overdueDays(t)<=7).length, onClick:setOverdueF('le7'), active:st.fDue==='overdue'&&st.fOverdueRange==='le7'},
          {label:'Overdue > 7 days', short:'OD >7d', color:'var(--red)', count:dueTasks.filter(t=>this.isOverdue(t)&&this.overdueDays(t)>7).length, onClick:setOverdueF('gt7'), active:st.fDue==='overdue'&&st.fOverdueRange==='gt7'},
        ];
        const uoMax=Math.max(...uoRows.map(x=>x.count),1);
        V.anUpOverdue={ cols: uoRows.slice(0,5).map(x=>({label:x.label, short:x.short, count:x.count, onClick:x.onClick, colStyle:colBase(x.active),
          barStyle:'width:24px;height:'+segH(x.count,uoMax)+'px;background:'+x.color+';border-radius:4px 4px 0 0'})) };

        // 5.10.3 Overdue Task Breakdown — overdue tasks by owner
        const anOwnerRows=ownerStats.filter(o=>o.total>0);
        V.anSummaryFilterActive = (st.fStatus && st.fStatus!=='all') || st.fDue==='overdue';
        V.onResetSummaryFilter = ()=>this.setState({fStatus:'all', fDue:'all', fOverdueRange:'all'});
        V.anDeptFilterActive = st.fRevisedRange!=='all';
        V.onResetDeptFilter = ()=>this.setState({fRevisedRange:'all'});
        V.anUnassignedFilterActive = st.fTaskWs!=='all'&&st.fStatus==='unassigned';
        V.onResetUnassignedFilter = ()=>this.setState({fTaskWs:'all',fStatus:'all'});
        V.anBlockersFilterActive = st.fStatus==='blocked'&&st.fBlockedRange!=='all';
        V.onResetBlockersFilter = ()=>this.setState({fStatus:'all',fBlockedRange:'all'});
        V.anOwnerFilterActive = st.fTaskOwner!=='all'&&st.fOwnerOverdueOnly&&st.fDue==='overdue';
        V.onResetOwnerFilter = ()=>this.setState({fTaskOwner:'all',fOwnerOverdueOnly:false,fDue:'all',fOverdueRange:'all'});
        V.anHasMoreOwners = ownerStatsAll.length>ownerStats.length;
        V.anAllOwnerCount = ownerStatsAll.length;
        V.onOpenOverdueOwners = ()=>this.setState({overdueOwnersOpen:true,overdueOwnersSearch:''});
        V.overdueOwnersModalOpen = !!st.overdueOwnersOpen;
        V.overdueOwnersSearch = st.overdueOwnersSearch||'';
        V.onOverdueOwnersSearch = (e)=>this.setState({overdueOwnersSearch:e.target.value});
        V.onCloseOverdueOwners = ()=>this.setState({overdueOwnersOpen:false,overdueOwnersSearch:''});
        const overdueOwnersQ=V.overdueOwnersSearch.trim().toLowerCase();
        const overdueOwnersVisible=ownerStatsAll.filter(o=>!overdueOwnersQ||o.n.toLowerCase().includes(overdueOwnersQ));
        V.overdueOwnersHasResults=overdueOwnersVisible.length>0;
        V.overdueOwnersNoResults=!V.overdueOwnersHasResults;
        V.overdueOwnersRows=overdueOwnersVisible.map(o=>({
          name:o.n, count:o.total,
          active:st.fTaskOwner===o.key&&st.fOwnerOverdueOnly&&st.fDue==='overdue',
          rowStyle:'width:100%;display:flex;align-items:center;gap:12px;padding:11px 12px;border:1px solid '+((st.fTaskOwner===o.key&&st.fOwnerOverdueOnly&&st.fDue==='overdue')?'var(--violet)':'#E8E8EC')+';border-radius:8px;background:'+((st.fTaskOwner===o.key&&st.fOwnerOverdueOnly&&st.fDue==='overdue')?'#F5F5FF':'#fff')+';cursor:pointer;font-family:inherit;text-align:left',
          onPick:()=>this.setState({overdueOwnersOpen:false,overdueOwnersSearch:'',fTaskOwner:o.key,fOwnerOverdueOnly:true,fDue:'overdue',fOverdueRange:'all'})
        }));
        const ownerColStyle=(active)=>'flex:'+(anOwnerRows.length<=5?'1 1 0':'0 0 82px')+';max-width:100px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;cursor:pointer;border-radius:6px;padding:4px 3px;min-width:68px;'+(active?'background:#F0F0FF':'');
        V.anTopOwners={ total:nOverdue, has:anOwnerRows.length>0, empty:anOwnerRows.length===0, cols: anOwnerRows.map(o=>({ full:o.n, short:o.n, count:o.total, onClick:setOwnerF(o.key), colStyle:ownerColStyle(st.fTaskOwner===o.key),
          oBar:'width:24px;height:'+segH(o.overdue,ownerMax)+'px;background:var(--red);border-radius:'+(o.overdue?'4px 4px 0 0':'0'),
          pBar:'display:none'})) };

        // 5.10.4 Status by Department — vertical bars of open (pending+overdue) tasks
        const deptTop=deptStats.slice(0,5);
        const revisedColStyle=(active)=>'flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;cursor:pointer;border-radius:6px;padding:4px 2px;'+(active?'background:#F0F0FF':'');
        V.anByDept={ has:deptTop.length>0, empty:deptTop.length===0, total:revisedTasks.length, cols: deptTop.map(d=>({ full:d.ws, short:d.ws, count:d.pending, onClick:setRevisedF(d.ws), colStyle:revisedColStyle(st.fRevisedRange===d.ws),
          oBar:'width:28px;height:'+segH(d.pending,deptMax)+'px;background:#E8E8FF;border-radius:4px 4px 0 0', pBar:'display:none' })) };

        // 5.10.5 Blockers — horizontal bars by age bucket
        const blkMax=Math.max(...blkBuckets.map(b=>b.count),1);
        const blkColors=['#F3E0A0','#F3AA07','#E8833A','var(--red)'];
        V.anBlockers={ total:nBlockedTasks, has:nBlockedTasks>0, empty:nBlockedTasks===0, cols: blkBuckets.map((b,i)=>({label:b.label, short:b.short, count:b.count, onClick:setBlockedF(b.k),
          rowStyle:'width:100%;display:flex;align-items:center;gap:6px;padding:2px;border-radius:6px;cursor:pointer;overflow:hidden;'+(st.fStatus==='blocked'&&st.fBlockedRange===b.k?'background:#F0F0FF':''),
          barStyle:'width:'+Math.max(b.count/blkMax*100,3)+'%;height:100%;background:'+blkColors[i]+';border-radius:5px'})) };

        // 5.10.5b Unassigned by Department
        const uPalette=['var(--violet)','#1F69FF','#0EA5A4','#F3AA07','#E8407A','#8a8f98','#7C4DFF'];
        const unByDept=this.WS.map(ws=>({ws, count:workstreamTasks.filter(t=>t.ws===ws&&t.status==='unassigned').length}))
          .filter(d=>d.count>0).sort((a,b)=>b.count-a.count).map((d,i)=>({...d,label:d.ws,color:uPalette[i%uPalette.length]}));
        const unByDeptTop=unByDept.slice(0,5);
        V.anHasMoreUnassignedDepartments=unByDept.length>5;
        V.onOpenUnassignedDepartments=()=>this.setState({unassignedDepartmentsOpen:true,unassignedDepartmentsSearch:''});
        V.unassignedDepartmentsModalOpen=!!st.unassignedDepartmentsOpen;
        V.unassignedDepartmentsSearch=st.unassignedDepartmentsSearch||'';
        V.onUnassignedDepartmentsSearch=(e)=>this.setState({unassignedDepartmentsSearch:e.target.value});
        V.onCloseUnassignedDepartments=()=>this.setState({unassignedDepartmentsOpen:false,unassignedDepartmentsSearch:''});
        const unassignedDepartmentsQ=V.unassignedDepartmentsSearch.trim().toLowerCase();
        const unassignedDepartmentsVisible=unByDept.filter(d=>!unassignedDepartmentsQ||d.label.toLowerCase().includes(unassignedDepartmentsQ));
        V.unassignedDepartmentsHasResults=unassignedDepartmentsVisible.length>0;
        V.unassignedDepartmentsNoResults=!V.unassignedDepartmentsHasResults;
        V.unassignedDepartmentsRows=unassignedDepartmentsVisible.map(d=>({
          name:d.label,count:d.count,active:st.fTaskWs===d.ws,
          rowStyle:'width:100%;display:flex;align-items:center;gap:12px;padding:11px 12px;border:1px solid '+(st.fTaskWs===d.ws?'var(--violet)':'#E8E8EC')+';border-radius:8px;background:'+(st.fTaskWs===d.ws?'#F5F5FF':'#fff')+';cursor:pointer;font-family:inherit;text-align:left',
          onPick:()=>this.setState({unassignedDepartmentsOpen:false,unassignedDepartmentsSearch:'',fTaskWs:d.ws,fStatus:'unassigned'})
        }));
        V.anUnassigned={ total:nUnassigned, has:unByDept.length>0, empty:unByDept.length===0,
          donutStyle:halfDonut(unByDept.map(x=>({color:x.color,count:x.count})),nUnassigned),
          rows: unByDeptTop.map(x=>({label:x.label, count:x.count, onClick:setWsF(x.ws), rowStyle:rowStyle(st.fTaskWs===x.ws), dotStyle:'width:8px;height:8px;border-radius:50%;background:'+x.color+';flex:none'})) };

        // 5.10.6 On-Time Completion % — half donut
        const otSegs=[{label:'On time',color:'var(--emerald)',count:onTimeN},{label:'Late',color:'var(--red)',count:lateTasks.length}];
        V.anOnTime={ pct:onTimePct, onTime:onTimeN, late:lateTasks.length, avgDelay:avgDelay, donutStyle:halfDonut(otSegs,completedTasks.length||1) };
      }
      if(isDirect){
        V.mHeaderHasTasks=false; V.mHeaderNoTasks=false; V.mHeaderStats=[];
        const allSel=!dSel||dIds.length===dScope.length;
        V.directTotal=dScope.length;
        V.directOpen=!!st.directOpen;
        V.onToggleDirectSel=()=>this.setState(s=>({directOpen:!s.directOpen}));
        V.onCloseDirectSel=()=>this.setState({directOpen:false});
        V.directBtnLabel=allSel?('Mandates: All ('+dScope.length+')'):('Mandates: '+dIds.length+' of '+dScope.length);
        V.directBtnStyle='height:38px;padding:0 13px;border-radius:10px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:7px;'+(allSel?'background:#fff;border:1px solid #E0E0E0;color:rgba(16,23,33,.94)':'background:#F0F0FF;border:1px solid var(--violet);color:var(--violet)');
        V.directAllChecked=allSel;
        V.onDirectAll=()=>this.setState({directSel:null});
        V.directOptions=dScope.map(mm=>({label:mm.name, count:this.mTasks(mm.id).length, checked:!dSel||!!dSel[mm.id], onToggle:()=>this.toggleDirectMandate(mm.id)}));
      } else {
      const pr=this.progress(m.id), c=this.counts(m.id), rk=risk(m);
      V.mHeaderName=m.name; V.mHeaderDev=m.developer; V.mHeaderCity=m.city; V.mHeaderLaunch=m.launch;
      V.mHeaderPnl=m.pnlHead; V.mHeaderTl=m.teamLead;
      V.mHeaderShowInternal = r!=='dev';
      V.mHeaderRisk=rk.label; V.mHeaderRiskStyle=riskStyle(rk);
      V.mHeaderPct=pr.pct; V.mHeaderProgressLabel=pr.total?`${pr.done} of ${pr.total} done`:'No tasks'; V.mHeaderBarStyle=bar(pr.pct, rk.color||'var(--violet)');
      // compact 4-way status breakdown (inspired by segmented "N/Total" + thin bar widgets — sized to fit the existing header row)
      V.mHeaderHasTasks = pr.total>0; V.mHeaderNoTasks = !pr.total;
      const _cf=st.celebFreeze;
      V.mHeaderStats = !pr.total ? [] : [
        {label:'Completed', val:c.completed, color:'var(--emerald)', mark:'done'},
        {label:'Blocked', val:c.blocked, color:'var(--red)', mark:'blocked'},
        {label:'In Progress', val:c.inprog, color:'#2f6fdb', mark:'wip'},
        {label:'Pending', val:c.notstarted, color:'#8a8f98', mark:'pending'},
        {label:'Unassigned', val:c.unassigned, color:'#9a9aa2', mark:'unassigned'},
      ].map(s=>{
        // Hold the Done stat at its pre-completion value until the celebration cracker lands
        let val=s.val;
        if(s.mark==='done' && _cf!=null && typeof _cf.done==='number') val=_cf.done;
        const w = anTotal?Math.round(val/anTotal*100):0;
        const trans = s.mark==='done' ? ';transition:width .62s cubic-bezier(.22,1,.36,1)' : '';
        return {
          label:s.label, val, total:anTotal, mark:s.mark,
          barTrackStyle:'height:7px;width:100%;background:#EBEBEB;border-radius:4px;overflow:hidden;flex:none',
          barStyle:`height:100%;width:${w}%;background:${s.color};border-radius:4px${trans}`,
          valStyle:`font-size:12px;font-weight:700;color:${val>0?s.color:'rgba(16,23,33,.94)'}`,
        };
      });
      }

      const cbanners={
        pnl:'Monitoring view — expand any workstream to see progress. Overdue and blocked tasks are flagged. You can edit if needed, but day-to-day updates are owned by the Team Lead and BSMs.',
        lead:'You have full control here: add, edit, delete tasks, assign owners, and update status. Use quick filters to chase overdue and blocked items.',
        bsm:'Filtered to your tasks by default. Change a status inline, or open a task to add a remark or revised date. Fields you don’t own are read-only.',
        dev:'Restricted view — only developer-side tasks assigned to you are shown. Internal owners and remarks are hidden. You can update status and remarks.'
      };
      V.checklistRoleBanner=cbanners[r];

      V.checklistNotCreated=!hasCl;
      V.checklistCreated=hasCl;
      V.canAdd=perm.canAdd;
      V.cannotAddCreate=!perm.canAdd;
      const clwOpen=(step,mid)=>this.setState({modal:{type:'create'}, clw:{step:step, mandateId:mid||null, search:'', method:step>1?'standard':null}});
      V.onCreateStandard=()=>{ if(!dAllNoChecklist) return this.openStdTemplate();
        if(dSelM.length===1){ this.setState({mandateId:dSelM[0].id}); setTimeout(()=>this.openStdTemplate(),0); } else clwOpen(1); };
      V.onCreateBlank=()=>{ if(!dAllNoChecklist) return this.openAdd();
        if(dSelM.length===1){ this.setState({mandateId:dSelM[0].id}); setTimeout(()=>this.openAdd(),0); } else clwOpen(1); };
      V.onCreateStandardModal=()=>this.openStdTemplate();
      V.onCreateBlankModal=()=>this.openAdd();
      V.onCreateImport=()=>this.createChecklist('import');
      V.onOpenAdd=()=>this.openAdd();
      V.onOpenCreate=()=>this.openCreate();
      V.onOpenImport=()=>this.toast('Import flow — coming in build','success');

      // ---- standard template preview modal ----
      const sm2=st.stdModal; V.stdOpen=!!sm2;
      if(sm2){
        const tpl=this.stdTemplateTasks();
        const pm={high:{label:'High',bg:'#FDECEC',fg:'#c0392b'}, medium:{label:'Medium',bg:'#FFF4E0',fg:'#b06a00'}, low:{label:'Low',bg:'#EEF1F5',fg:'#5b6675'}};
        const chip=(on)=>'flex:none;display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 13px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;border:1px solid '+(on?'var(--violet)':'#E0E0E0')+';background:'+(on?'#F0F0FF':'#fff')+';color:'+(on?'var(--violet)':'var(--gray-dark)');
        const cats=[]; tpl.forEach(t=>{ if(!cats.includes(t.ws)) cats.push(t.ws); });
        const ac=sm2.cat||'All';
        V.stdChipRef = this._setStdChips || (this._setStdChips = (el)=>{ this._stdChips=el; });
        V.stdCats=[{key:'All',label:'All',count:tpl.length,style:chip(ac==='All'),onClick:()=>this.stdSetCat('All',0)}]
          .concat(cats.map((c,i)=>({key:c,label:c,count:tpl.filter(t=>t.ws===c).length,style:chip(ac===c),onClick:()=>this.stdSetCat(c,i+1)})));
        V.stdRows=tpl.map((t,i)=>({t,i})).filter(x=> ac==='All'||x.t.ws===ac).map(x=>({
          idx:x.i, name:x.t.name, cat:x.t.ws, checked:!!sm2.sel[x.i], onToggle:()=>this.stdToggle(x.i),
          startLabel:this.fmt(this.realToday()), dueLabel:this.fmt(this.realToday()), companyLabel: x.t.external?'External':'Internal',
          rowStyle:'display:grid;grid-template-columns:44px minmax(190px,1fr) 132px 92px 100px 100px 118px;align-items:center;border-top:1px solid #F1F1F4;min-height:46px;transition:opacity .12s'+(sm2.sel[x.i]?'':';opacity:.5'),
          prioLabel:(pm[x.t.prio]||{}).label||x.t.prio,
          prioStyle:'display:inline-block;font-size:10.5px;font-weight:700;padding:2px 9px;border-radius:11px;background:'+((pm[x.t.prio]||{}).bg||'#eee')+';color:'+((pm[x.t.prio]||{}).fg||'#555')
        }));
        const selCount=sm2.sel.filter(Boolean).length;
        V.stdSelCount=selCount; V.stdTotal=tpl.length;
        V.stdSelSummary=selCount+' of '+tpl.length+' selected';
        const vis=tpl.map((t,i)=>i).filter(i=> ac==='All'||tpl[i].ws===ac);
        V.stdAllVisibleChecked=vis.length>0&&vis.every(i=>sm2.sel[i]);
        V.stdCtaLabel=selCount>0?('Add '+selCount+'/'+tpl.length+(selCount===1?' Task':' Tasks')):'Select at least one task';
        V.stdCtaDisabled=selCount===0;
        V.stdCtaStyle='flex:none;height:40px;padding:0 22px;border-radius:10px;border:0;font-size:13px;font-weight:600;font-family:inherit;color:#fff;background:'+(selCount===0?'#C9C6E8':'var(--violet)')+';cursor:'+(selCount===0?'not-allowed':'pointer');
        V.onStdToggleAll=()=>this.stdToggleAllVisible();
        V.onStdConfirm=()=>this.stdConfirm();
        V.onStdClose=()=>this.closeStd();
        const _stdSeamless=!!st.stdEnter;
        V.stdBackdropStyle='position:absolute;inset:0;background:rgba(20,20,40,.45);'+(_stdSeamless?'':'animation:wf-fade .15s ease-out');
        V.stdBoxStyle='position:relative;width:820px;max-width:100%;height:720px;max-height:88vh;display:flex;flex-direction:column;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 24px 70px rgba(16,23,33,.3);'+(_stdSeamless?'':'animation:wf-pop .18s ease-out');
        V.onStdBack=()=>this.stdBackToWizard(2);
        V.onStdBackTo1=()=>this.stdBackToWizard(1);
        V.stdConfirmOpen=!!st.stdConfirmOpen;
        V.stdConfirmTitle='Add '+selCount+(selCount===1?' task?':' tasks?');
        V.stdConfirmCta='Confirm & add';
        V.onStdReallyAdd=()=>this.stdReallyAdd();
        V.onStdCancelConfirm=()=>this.stdCancelConfirm();
      }

      V.clSearch=st.clSearch; V.onClSearch=e=>this.setState({clSearch:e.target.value}); V.onClSearchV=v=>this.setState({clSearch:v});
      V.clSearchPlaceholder=isDirect?'Search tasks across mandates':'Search tasks in this playbook';
      V.sortValue=st.sort; V.onSort=e=>this.setState({sort:e.target.value});
      V.sortOptions=[{value:'start',label:'Start date'},{value:'due',label:'Due date'},{value:'revised',label:'Revised date'},{value:'status',label:'Status'},{value:'priority',label:'Priority'},{value:'spoc',label:'SPOC / Owner'},{value:'workstream',label:'Workstream'}];
      V.clSortOpen=!!st.clSortOpen;
      V.onToggleClSort=(e)=>{ try{e.stopPropagation();}catch(_){}; this.setState(s=>({clSortOpen:!s.clSortOpen})); };
      V.onCloseClSort=(e)=>{ try{e.stopPropagation();}catch(_){}; this.setState({clSortOpen:false}); };
      V.clSortBtnStyle='display:flex;align-items:center;justify-content:center;height:38px;width:38px;flex:none;background:'+(st.clSortOpen?'#F0F0FF':'#fff')+';border:1px solid '+(st.clSortOpen?'var(--violet)':'#E0E0E0')+';border-radius:10px;color:'+(st.clSortOpen?'var(--violet)':'rgba(16,23,33,.94)')+';cursor:pointer;font-family:inherit';
      V.clSortMenu=V.sortOptions.map(o=>{ const active=o.value===st.sort;
        return { label:o.label, active,
          rowStyle:'width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;text-align:left;border:0;background:'+(active?'#F4F4FF':'transparent')+';padding:8px 10px;border-radius:7px;font-size:12.5px;font-weight:'+(active?'600':'500')+';color:rgba(16,23,33,.94);cursor:pointer;font-family:inherit',
          checkStyle:'display:'+(active?'flex':'none')+';align-items:center;color:var(--violet)',
          onPick:(e)=>{ try{e.stopPropagation();}catch(_){}; this.setState({sort:o.value, clSortOpen:false}); } };
      });

      // quick filters
      let all=isDirect?this.tasks.filter(t=>dIds.includes(t.mandateId)):this.mTasks(m.id);
      if(r==='dev') all=all.filter(t=>t.external && this.isMine(t));
      if(isDirect) V.pageTitle='All Tasks ('+all.length+')';
      const dueMatch=(t)=>{ switch(st.fDue){ case 'overdue':return this.isOverdue(t); case 'today':return this.dueBucket(t)==='today'; case 'week':return this.dueBucket(t)==='week'||this.dueBucket(t)==='today'; default:return true; } };
      const statusMatch=(t)=> st.fStatus==='all' ? true : t.status===st.fStatus;
      const prioMatch=(t)=> st.fPrio==='all' ? true : t.prio===st.fPrio;
      const mineMatch=(t)=> st.fMine ? this.isMine(t) : true;
      const wsFMatch=(t)=> st.fTaskWs==='all' ? true : t.ws===st.fTaskWs;
      const ownerFMatch=(t)=> st.fTaskOwner==='all' ? true : st.fTaskOwner==='__unassigned__' ? (!t.primary||t.primary==='Unassigned') : t.primary===st.fTaskOwner;
      const ownerOverdueMatch=(t)=> !st.fOwnerOverdueOnly || this.isOverdue(t);
      const overdueRangeMatch=(t)=>{ if(st.fDue!=='overdue'||st.fOverdueRange==='all') return true; const d=this.overdueDays(t); if(st.fOverdueRange==='le7') return d<=7; if(st.fOverdueRange==='gt7') return d>7; if(st.fOverdueRange==='gt10') return d>10; if(st.fOverdueRange==='5to10') return d>=5&&d<=10; if(st.fOverdueRange==='1to4') return d>=1&&d<=4; return true; };
      const blockedRangeMatch=(t)=>{ if(st.fStatus!=='blocked'||st.fBlockedRange==='all') return true; const d=Math.max(this.overdueDays(t),0); if(st.fBlockedRange==='lt_week') return d<=7; if(st.fBlockedRange==='8_15') return d>=8&&d<=15; if(st.fBlockedRange==='15_30') return d>=16&&d<=30; if(st.fBlockedRange==='gt_month') return d>30; return true; };
      const revisedRangeMatch=(t)=>{ if(st.fRevisedRange==='all') return true; if(!t.revised) return false; const d=this.daysBetween(t.due,t.revised); if(d<=0) return false; if(st.fRevisedRange==='Less than a week') return d<=7; if(st.fRevisedRange==='7-15 days') return d>=8&&d<=15; if(st.fRevisedRange==='15-30 days') return d>=16&&d<=30; if(st.fRevisedRange==='More than a month') return d>30; return true; };
      V.dueValue=st.fDue; V.onDueFilter=(e)=>this.setState({fDue:e.target.value}); V.onDueFilterV=(v)=>this.setState({fDue:v}); V.dueTinted=st.fDue!=='all';
      V.statusValue=st.fStatus; V.onStatusFilter=(e)=>this.setState({fStatus:e.target.value,fBlockedRange:'all'}); V.onStatusFilterV=(v)=>this.setState({fStatus:v,fBlockedRange:'all'}); V.statusTinted=st.fStatus!=='all';
      V.prioValue=st.fPrio; V.onPrioFilter=(e)=>this.setState({fPrio:e.target.value}); V.onPrioFilterV=(v)=>this.setState({fPrio:v}); V.prioTinted=st.fPrio!=='all';
      V.mineActive=st.fMine; V.mineToggleStyle = st.fMine
        ? 'height:38px;padding:0 14px;background:var(--violet);border:1px solid var(--violet);color:#fff;border-radius:10px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit'
        : 'height:38px;padding:0 14px;background:#fff;border:1px solid #E0E0E0;color:rgba(16,23,33,.94);border-radius:10px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit';
      V.onToggleMine=()=>this.setState(s=>({fMine:!s.fMine}));
      V.dueOptions=[{value:'all',label:'Due: All'},{value:'overdue',label:'Overdue'},{value:'today',label:'Due Today'},{value:'week',label:'Due This Week'}];
      V.prioOptions=[{value:'all',label:'Priority: All'},{value:'high',label:'High'},{value:'medium',label:'Medium'},{value:'low',label:'Low'}];
      V.statusOptionsFilter=[{value:'all',label:'Status: All'},{value:'unassigned',label:'Unassigned'},{value:'not_started',label:'Pending'},{value:'in_progress',label:'In Progress'},{value:'blocked',label:'Blocked'},{value:'completed',label:'Completed'}];

      const q=st.clSearch.toLowerCase();
      let filtered=all.filter(_matchesActiveFilters);

      const inner=(a,b)=>{ switch(st.sort){ case 'start':return (a.start||'').localeCompare(b.start||''); case 'due':return a.due.localeCompare(b.due); case 'revised':return this.effDate(a).localeCompare(this.effDate(b)); case 'status':{const o={blocked:0,in_progress:1,not_started:2,completed:3};return o[a.status]-o[b.status];} case 'priority':{const o={high:0,medium:1,low:2};return o[a.prio]-o[b.prio];} case 'spoc':return a.primary.localeCompare(b.primary); default:return 0; } };
      const sortFn=(a,b)=> ((this.canDrag(b)?1:0)-(this.canDrag(a)?1:0)) || inner(a,b);

      const mkRow=(t)=>{ const m=this.mandate(t.mandateId); const od=this.isOverdue(t); const eff=this.effDate(t); const delta=this.revisedDeltaDays(t); const canInline=this.canChangeTaskStatus(t); const locked=t.status==='completed';
        const canEditDueReal = this.canManageMandate(t.mandateId) && !locked && !(m&&m.closed);
        const canEditRevisedInline = this.isMine(t) && !locked && !(m&&m.closed);
        const canEditDateCell = canEditDueReal || canEditRevisedInline;
        const sup=(t.supporting||[]).filter(s=> r!=='dev');
        const subs=t.subtasks||[]; const hasSubs=subs.length>0; const subOpen=!!(st.listExpanded||{})[t.id];
        const subDone=subs.filter(x=>x.status==='completed').length;
        return {
          tid:t.id,
          isSub:false, notSub:true,
          hasSubs, noSubs:!hasSubs, subOpen,
          caretChar: subOpen?'▾':'▸',
          caretStyle:`width:18px;height:18px;flex:none;display:flex;align-items:center;justify-content:center;border:1px solid ${subOpen?'var(--violet)':'#D8D8D8'};border-radius:10px;background:${subOpen?'#EFEFFF':'#fff'};color:${subOpen?'var(--violet)':'var(--gray-dark)'};font-size:9px;cursor:pointer`,
          onToggleList:(e)=>{ try{e.stopPropagation();}catch(_){}; this.toggleListSub(t.id); },
          subCountLabel: hasSubs?(subDone+'/'+subs.length):'',
          rowStyle:'display:grid;grid-template-columns:2.2fr 1.4fr .9fr 1.2fr .8fr 1.6fr .9fr;gap:10px;padding:12px 18px;border-top:1px solid #F1F1F1;align-items:center',
          gridHeadStyle:'display:grid;grid-template-columns:2.2fr 1.4fr .9fr 1.2fr .8fr 1.6fr .9fr;gap:10px;padding:9px 18px;background:#FAFAFA;border-top:1px solid #EDEDED;font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:var(--gray);font-weight:600',
          name:t.name, stage:t.stage, extTag:t.external, wsName:(isDirect&&m)?(t.ws+' · '+m.name.split(' ')[0]):t.ws,
          onOpen:()=>this.openView(t.id),
          primaryName:t.primary, primaryInitials:this.initials(t.primary), ownerColor:this.ownerColors[t.primary]||'var(--gray-dark)',
          canTransfer:this.canManageMandate(t.mandateId), onTransfer:this.canManageMandate(t.mandateId)?((e)=>this.openTransfer(t.id,e)):(()=>{}),
          ownerAvatarStyle:'width:24px;height:24px;border-radius:50%;background:'+(this.ownerColors[t.primary]||'var(--gray-dark)')+';color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none'+(this.canManageMandate(t.mandateId)?';cursor:pointer':''),
          ownerHoverStyle:this.canManageMandate(t.mandateId)?'filter:brightness(1.08)':'',
          ownerTitle:this.canManageMandate(t.mandateId)?'Click to transfer task owner':'',
          hasSupporting:sup.length>0, supportingLabel:'+'+sup.length+' supporting',
          companyLabel: t.external?'External':'Internal', external:!!t.external,
          canNudge:this.canManageMandate(t.mandateId) && !!t.primary && t.status!=='completed', onNudge:(e)=>{ try{e.stopPropagation();}catch(_){}; this.openNudge(t.id); },
          dueLabel:this.fmt(eff), dueStyle:'font-size:12px;font-weight:600;'+(od?'color:var(--red)':'color:rgba(16,23,33,.94)'),
          startLabel:this.fmt(t.start),
          // inline due-date edit (click cell → native calendar): Team Lead / P&L Head change the due date directly;
          // BSM / Dev use the same calendar affordance to set a revised date (with a mandatory reason).
          canEditDue: canEditDateCell, showDueIcon: !locked,
          dueEditing: st.dueEdit===t.id, dueViewMode: st.dueEdit!==t.id,
          dueTitle: canEditDueReal ? 'Click to change due date' : canEditRevisedInline ? 'Click to set a revised date' : locked ? 'Completed and locked — reopen to change the date.' : (m&&m.closed) ? 'Mandate is launched — the playbook is locked.' : '',
          onDueClick: canEditDateCell ? ((e)=>this.startDueEdit(t.id,e,canEditDueReal?t.due:(t.revised||t.due))) : (()=>{}),
          dueCellStyle:'font-size:12px;font-weight:600;padding:2px 6px;margin:-2px -6px;border-radius:5px;'+(canEditDateCell?'display:inline-flex;align-items:center;gap:7px;cursor:pointer;':'display:inline-block;')+'color:rgba(16,23,33,.94)',
          dueHoverStyle: canEditDateCell ? 'background:var(--violet);color:var(--violet-lightest)' : '',
          onDueEnter: canEditDateCell ? (()=>this.setState({dueHoverId:t.id})) : (()=>{}),
          onDueLeave: canEditDateCell ? (()=>this.setState(s=>s.dueHoverId===t.id?{dueHoverId:null}:null)) : (()=>{}),
          dueIconStyle:'flex:none;color:'+(canEditDateCell?'inherit':'var(--gray)')+';transition:opacity .12s ease;opacity:'+(canEditDateCell?(st.dueHoverId===t.id?'1':'0'):'0.6'),
          dueInputVal: canEditDueReal ? t.due : (t.revised||t.due),
          dueInputMin: ((t.start||'')>this.realToday()?(t.start||''):this.realToday()),
          onDueInputChange: canEditDueReal ? ((e)=>this.saveDueEdit(t.id, e.target.value)) : ((e)=>this.openReviseModal(t.id, e.target.value)),
          onDueInputBlur:()=>this.cancelDueEdit(),
          onDueInputKeyDown:(e)=>{ if(e.key==='Escape') this.cancelDueEdit(); },
          dueInputRef:(el)=>{ if(el){ this._dueRefs=this._dueRefs||{}; this._dueRefs[t.id]=el; } },
          dueInputStyle:'position:absolute;left:0;top:0;width:122px;height:28px;opacity:0;pointer-events:none;border:0;padding:0',
          hasRevised:!!t.revised, revisedLabel:this.fmt(t.revised),
          hasDueStatus: !locked, dueStatusLabel: this.dueTagLabel(t),
          dueStatusStyle:'display:inline-block;font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:.3px;padding:2px 8px;border-radius:5px;white-space:nowrap;margin-bottom:3px;'+(od?'background:var(--red-light);color:var(--red)':(this.dueSoon(t)?'background:var(--yellow-light);color:#b0810f':'background:#EFEFEF;color:var(--gray-dark)')),
          hasDueRange: !!t.revised && r!=='dev', noDueRange: !(!!t.revised && r!=='dev'),
          dueOldLabel: this.fmt(t.due), dueNewLabel: this.fmt(t.revised),
          dueRangeLabel: this.fmt(eff),
          hasDelta: false, deltaLabel:'('+(delta>0?'+':'')+delta+'d)',
          deltaStyle:'font-size:10.5px;font-weight:600;margin-left:6px;'+(delta>0?'color:#9a6a12':'color:#1f8a5b'),
          canEditInline:canInline, statusReadonly:!canInline, locked,
          statusKey:t.status, statusLabel:S[t.status].label, statusStyle:statusBadge(t.status),
          statusStyleFixed:statusBadge(t.status)+';width:118px;height:28px;box-sizing:border-box;text-align:center;font-size:12.5px;display:flex;align-items:center;justify-content:center',
          statusOptions:Object.keys(S).map(k=>({value:k,label:S[k].label,active:k===t.status,rowStyle:'width:100%;height:32px;padding:0 10px;border:0;border-radius:5px;background:'+(k===t.status?S[k].bg:'#fff')+';color:'+(k===t.status?S[k].fg:'rgba(16,23,33,.94)')+';font:500 12.5px/16px Graphik,Inter,system-ui,sans-serif;text-align:left;cursor:pointer',onPick:(e)=>this.pickListStatus(t.id,k,e)})),
          statusSelectStyle:`width:118px;box-sizing:border-box;text-align:center;font-size:11px;font-weight:600;border-radius:20px;padding:4px 8px;cursor:pointer;font-family:inherit;border:1px solid ${S[t.status].fg}40;background:${S[t.status].bg};color:${S[t.status].fg};outline:0`,
          statusFieldStyle:`position:relative;width:118px;--list-status-bg:${S[t.status].bg};--list-status-fg:${S[t.status].fg};--list-status-border:${S[t.status].fg}40`,
          statusMenuOpen:st.listStatusMenuId===t.id,
          statusMenuStyle:'position:absolute;top:32px;left:0;z-index:10005;width:148px;padding:4px;background:#fff;border:1px solid #E0E0E0;border-radius:8px;box-shadow:0 10px 26px rgba(16,23,33,.18)',
          onToggleStatusMenu:(e)=>this.toggleListStatusMenu(t.id,e),
          onCloseStatusMenu:(e)=>this.closeListStatusMenu(e),
          onStatusChange:(e)=>this.updateStatus(t.id,e.target.value),
          onStatusChangeV:(v)=>this.updateStatus(t.id,v),
          prioLabel:P[t.prio].label, prioStyle:prioBadge(t.prio), prioFlames:flames(t.prio),
          canEditPriority:this.canManageMandate(t.mandateId),
          onPriorityClick:this.canManageMandate(t.mandateId)?((e)=>this.openPriority(t.id,e)):(()=>{}),
          priorityCellStyle:'display:flex;align-items:center;gap:3px;width:max-content;padding:5px 7px;margin:-5px -7px;border-radius:6px;'+(this.canManageMandate(t.mandateId)?'cursor:pointer;':'cursor:default;'),
          priorityTitle:this.canManageMandate(t.mandateId)?'Click to change priority':'',
          remarkCell: r==='dev' ? (t.remark?'—':'') : (t.remark?('“'+t.remark.slice(0,44)+(t.remark.length>44?'…':'')+'”'):'—'),
          showEdit:this.canEditTask(t), showDelete:this.canManageMandate(t.mandateId),
          menuOpen: st.rowMenuId===t.id,
          rowZ: (st.rowMenuId===t.id||st.listStatusMenuId===t.id) ? 10004 : 'auto',
          rowBg: st.rowHoverId===t.id ? '#F6F6FF' : '#fff',
          onRowEnter:()=>this.setState({rowHoverId:t.id}),
          onRowLeave:()=>this.setState(s=>s.rowHoverId===t.id?{rowHoverId:null}:null),
          selChecked: !!(st.selTasks||{})[t.id],
          selDisabled: t.status==='completed',
          selDisabledTitle: t.status==='completed' ? 'Completed tasks can’t be bulk-selected' : '',
          selCheckboxStyle: 'width:15px;height:15px;accent-color:var(--violet);'+(t.status==='completed'?'cursor:not-allowed;opacity:.35':'cursor:pointer'),
          onSelToggle: t.status==='completed' ? undefined : (()=>this.toggleTaskSel(t.id)),
          onToggleMenu:(e)=>this.toggleRowMenu(t.id,e),
          onMenuView:()=>{ this.setState({rowMenuId:null}); this.openView(t.id); },
          onMenuEdit:()=>{ this.setState({rowMenuId:null}); this.openEdit(t.id); },
          onMenuDelete:()=>{ this.setState({rowMenuId:null}); this.openDelete(t.id); },
          onEdit:()=>this.openEdit(t.id), onDelete:()=>this.openDelete(t.id)
        };
      };
      const mkSubRow=(sub,idx,parent)=>{ const sc=S[sub.status]||S.not_started;
        return { isSub:true,
          name:sub.name, code:'ST-'+((sub.id||'').replace(/\D/g,'')||(idx+1)),
          ownerInitials:this.initials(parent.primary), ownerColor:this.ownerColors[parent.primary]||'var(--gray-dark)',
          statusLabel:sc.label, statusStyle:statusBadge(sub.status),
          onOpen:()=>this.openView(parent.id) };
      };

      // group by workstream
      const groups=[];
      this.WS.forEach(ws=>{ let ts=filtered.filter(t=>t.ws===ws); if(!ts.length) return; ts=[...ts].sort(sortFn);
        const wsAll=all.filter(t=>t.ws===ws); const done=wsAll.filter(t=>t.status==='completed').length; const pct=wsAll.length?Math.round(done/wsAll.length*100):0;
        const od=ts.filter(t=>this.isOverdue(t)).length; const open=!st.collapsed[ws];
        groups.push({ ws, count:ts.length, open, headerBorder: open?'1px solid #EDEDED':'0',
          caretStyle:'font-size:11px;color:var(--gray-dark);transition:transform .15s;display:inline-block;transform:rotate('+(open?90:0)+'deg)',
          hasOverdue:od>0, overdue:od, barStyle:bar(pct,'var(--violet)'), doneLabel:done+'/'+wsAll.length+' done',
          onToggle:()=>this.toggleWs(ws), tasks:ts.map(mkRow),
          gridHeadStyle:'display:grid;grid-template-columns:2.2fr 1.4fr .9fr 1.2fr .8fr 1.6fr .9fr;gap:10px;padding:9px 18px;background:#FAFAFA;font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:var(--gray);font-weight:600' });
      });
      V.groups=groups;
      // view toggle
      const clView=st.clView||'board';
      V.clListView=clView==='list'; V.clBoardView=clView==='board'; V.clGanttView=clView==='gantt';
      V.onListView=()=>this.setClView('list'); V.onBoardView=()=>this.setClView('board'); V.onGanttView=()=>this.setClView('gantt');
      const segOn='padding:0 15px;height:32px;border:0;border-radius:6px;background:var(--violet);color:#fff;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit';
      const segOff='padding:0 15px;height:32px;border:0;border-radius:6px;background:transparent;color:var(--gray-dark);font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit';
      V.listToggleStyle=V.clListView?segOn:segOff; V.boardToggleStyle=V.clBoardView?segOn:segOff; V.ganttToggleStyle=V.clGanttView?segOn:segOff;
      // list-view-only states
      V.hasGroups = false; // list view now uses the configurable table below
      const flatTasks=[...filtered].sort(sortFn);
      V.showTable = V.clListView && flatTasks.length>0;
      // gantt / timeline
      V.showGantt = V.clGanttView && filtered.length>0;
      if(V.clGanttView) V.gantt = this.timelineData([...filtered].sort(sortFn));
      V.ganttFabVisible = V.isChecklist && V.showGantt;
      const listRows=[];
      flatTasks.forEach(t=>{ const row=mkRow(t); listRows.push(row);
        if(row.hasSubs && row.subOpen){ (t.subtasks||[]).forEach((sub,idx)=>listRows.push(mkSubRow(sub,idx,t))); }
      });
      V.listRows = listRows;
      {
        const selMap = st.selTasks||{};
        const topIds = flatTasks.filter(x=>x.status!=='completed').map(x=>x.id);
        const selectedTopIds = topIds.filter(id=>selMap[id]);
        const allSel = topIds.length>0 && selectedTopIds.length===topIds.length;
        const someSel = selectedTopIds.length>0 && !allSel;
        V.selAllChecked = allSel;
        V.onSelAllToggle = ()=>this.toggleAllTaskSel(topIds);
        V.selAllRef = (el)=>{ if(el) el.indeterminate = someSel; };
        V.selCount = Object.keys(selMap).length;
        V.selTotal = topIds.length;
        V.canBulkSel = perm.canDelete;
        V.noBulkSel = !perm.canDelete;
        V.showSelBar = V.selCount>0 && perm.canDelete;
        V.selBarLabel = V.selCount + (V.selCount===1?' task selected':' tasks selected');
        V.onSelClear = ()=>this.clearTaskSel();
        V.onBulkDelete = ()=>this.openBulkDeleteConfirm();
        V.selTaskWord = V.selCount===1?'task':'tasks';
      }
      const DEFCOL={ws:false,stage:false,start:true,owner:true,support:false,due:true,status:true,prio:true,remark:true,company:false};
      const lc=st.listCols||{}; const cv=(k)=> lc[k]===undefined?DEFCOL[k]:lc[k];
      V.visWs=cv('ws'); V.visStage=cv('stage'); V.visStart=cv('start'); V.visOwner=cv('owner'); V.visSupport=cv('support');
      V.visDue=cv('due'); V.visStatus=cv('status'); V.visPrio=cv('prio'); V.visRemark=cv('remark'); V.visCompany=cv('company');
      V.listColsOpen=!!st.listColsOpen; V.onToggleListCols=()=>this.setState(s=>({listColsOpen:!s.listColsOpen}));
      V.listColsBtnStyle='display:flex;align-items:center;justify-content:center;height:38px;width:38px;flex:none;background:'+(st.listColsOpen?'#F0F0FF':'#fff')+';border:1px solid '+(st.listColsOpen?'var(--violet)':'#E0E0E0')+';border-radius:10px;color:'+(st.listColsOpen?'var(--violet)':'rgba(16,23,33,.94)')+';cursor:pointer;font-family:inherit';
      V.checklistWrapStyle = !hasCl ? 'max-width:none;margin:0 auto;height:100%;display:flex;flex-direction:column' : (clView==='board' ? 'max-width:none;margin:0 auto;height:100%;min-height:0;display:flex;flex-direction:column' : 'max-width:none;margin:0 auto');
      // ---------- resizable checklist task-table columns (header-hover handles) ----------
      {
        const DEFW={task:340,ws:150,stage:130,due:190,status:160,prio:110,owner:170,support:140,remark:240,start:110,company:110,nudge:70};
        const tw=st.taskColW||{};
        const W=(k)=> tw[k]||DEFW[k];
        const COLDEFS=[
          ['task','Task/Category',true],
          ['ws','Workstream',V.visWs],
          ['stage','Stage',V.visStage],
          ['due','Due / Revised Date',V.visDue],
          ['status','Status',V.visStatus],
          ['nudge','Nudge',true],
          ['prio','Priority',V.visPrio],
          ['owner','Task Owner',V.visOwner],
          ['company','Company',V.visCompany],
          ['support','Supporting',V.visSupport],
          ['remark','Latest remark',V.visRemark],
          ['start','Start',V.visStart],
        ];
        const visCols = COLDEFS.filter(c=>c[2]);
        const ACTION_W=112, CHK_W=40;
        const chkPrefix = V.canBulkSel ? (CHK_W+'px ') : '';
        V.taskGridTemplate = chkPrefix+visCols.map(c=>'minmax('+W(c[0])+'px,'+W(c[0])+'fr)').join(' ')+' '+ACTION_W+'px';
        V.taskTableMinWidth = ((V.canBulkSel?CHK_W:0) + visCols.reduce((a,c)=>a+W(c[0]),0) + ACTION_W) + 'px';
        V.taskHeaderCols = visCols.map(c=>{
          const key=c[0];
          return {
            label:c[1], key,
            wrapStyle: key==='task' ? 'position:relative;height:100%;display:flex;align-items:center;padding:11px 12px 11px 90px' : 'position:relative;height:100%;display:flex;align-items:center;padding:11px 12px',
            onEnter:()=>this.setState(s=>s.taskResizeCol==null?{taskHoverCol:key}:null),
            onLeave:()=>this.setState(s=>s.taskResizeCol==null?{taskHoverCol:null}:null),
            showHandle: this.state.taskHoverCol===key || this.state.taskResizeCol===key,
            handleStyle:'position:absolute;top:0;bottom:0;right:-1px;width:16px;cursor:col-resize;display:flex;align-items:center;justify-content:center;z-index:6',
            handleBarStyle:`width:3px;height:16px;border-radius:2px;background:${this.state.taskResizeCol===key?'#6161FF':'#C6C6EE'}`,
            onDown:(e)=>this.startTaskColResize(key,e),
          };
        });
      }
      // ---------- resizable Gantt frozen-column (header-hover handle) ----------
      {
        V.ganttColWpx = (st.ganttColW||300)+'px';
        V.ganttColShowHandle = !!st.ganttHoverCol || !!st.ganttResizeCol;
        V.onGanttColEnter=()=>this.setState(s=>s.ganttResizeCol?null:{ganttHoverCol:true});
        V.onGanttColLeave=()=>this.setState(s=>s.ganttResizeCol?null:{ganttHoverCol:false});
        V.ganttColHandleBarStyle=`width:3px;height:16px;border-radius:2px;background:${st.ganttResizeCol?'#6161FF':'#C6C6EE'}`;
        V.onGanttColResizeDown=(e)=>this.startGanttColResize(e);
      }
      V.colOptions=[['ws','Workstream'],['stage','Stage'],['start','Start date'],['owner','Task Owner'],['company','Company'],['support','Supporting'],['due','Due date'],['status','Status'],['prio','Priority'],['remark','Latest remark']].map(c=>({key:c[0],label:c[1],checked:cv(c[0]),onToggle:()=>this.toggleListCol(c[0])}));
      V.checklistZeroTasks = (V.clListView||V.clGanttView) && hasCl && all.length===0;
      V.noResults = (V.clListView||V.clGanttView) && hasCl && all.length>0 && groups.length===0;
      V.allMandatesHeading = isDirect ? 'All Mandates Task ('+filtered.length+')' : '';
      V.onClearFilters=()=>this.setState({fDue:'all',fStatus:'all',fPrio:'all',fMine:false,clSearch:'',fTaskWs:'all',fTaskOwner:'all',fOwnerOverdueOnly:false,fOverdueRange:'all',fBlockedRange:'all',fRevisedRange:'all'});

      // ---- kanban board ----
      const ro = m?!!m.closed:false;
      V.boardReadOnly=ro;
      V.boardCaption = ro
        ? 'Read-only board — dragging is disabled for your role. Open any card to view its details.'
        : 'Drag a card into another column to update its status. On smaller screens, open a card and change status from the drawer.';
      V.boardFail=!!st.boardFail; V.toggleBoardFail=(e)=>this.toggleBoardFail(e);
      const dragId=st.dragTaskId, overS=st.dragOverStatus, jm=st.justMovedId;
      const colDefs=[['unassigned','#a0a0a8'],['not_started','#b0b0b0'],['in_progress','#2f6fdb'],['blocked','var(--red)'],['completed','var(--emerald)']];
      const dropTint={unassigned:'#F0F0F2', not_started:'#FDF3DC', in_progress:'var(--violet-lightest)', blocked:'var(--red-light)', completed:'#E6F6EE'};
      const dropEdge={unassigned:'#a0a0a8', not_started:'var(--yellow)', in_progress:'var(--violet)', blocked:'var(--red)', completed:'var(--emerald)'};
      const colWrapStyle=(hi,sk)=>`flex:1 0 258px;min-width:258px;display:flex;flex-direction:column;background:${hi?(dropTint[sk]||'#ECECFF'):'#F7F7F9'};border:${hi?'2px dashed '+(dropEdge[sk]||'var(--violet)'):'1px solid transparent'};border-radius:10px;padding:10px 4px;transition:background .12s,border-color .12s`;
      const colBodyStyle='flex:1 1 auto;min-height:0;overflow-y:auto;overflow-x:hidden;margin:0;padding:2px 0';
      const buildCols=(subset, laneKey)=>{
        const mkCard=(t, noDrag)=>{ const canD=this.canDrag(t) && !noDrag; const reason=canD?'':(noDrag?'Assign an owner before this card can move through the workflow':this.dragReason(t)); const od=this.isOverdue(t); const dragging=dragId===t.id; const moved=jm===t.id;
            const locked=t.status==='completed'; const eff=this.effDate(t);
            const subs0=t.subtasks||[];
            // One-shot entrance: gated to a short window after the move so a later re-render
            // (e.g. the celebration burst releasing celebFreeze) can't replay wf-insert.
            const animMoved = moved && !this.reduceMotion() && (Date.now()-(this._moveAt||0) < 680);
            const _mh=128;
            const seenBefore=!!(this._seen&&this._seen[t.id]); (this._seen=this._seen||{})[t.id]=1;
            let cs='background:#fff;border:0.5px solid transparent;border-radius:8px;padding:16px;margin-bottom:4px;position:relative;box-sizing:border-box;display:flex;flex-direction:column;box-shadow:0.5px 1px 4px 1px rgba(16,23,33,.08);transition:box-shadow .45s ease,border-color .45s ease;';
            cs+='min-height:'+_mh+'px;';
            cs+= canD ? 'cursor:grab;' : (noDrag ? 'cursor:pointer;' : 'cursor:pointer;opacity:.82;background:#FAFAFA;');
            if(dragging) cs+='opacity:.5;transform:rotate(2deg);box-shadow:0 12px 26px rgba(0,0,0,.2);border-color:var(--violet);';
            if(moved){ const mGlow={unassigned:'rgba(160,160,168,.18)', not_started:'rgba(243,170,7,.20)', in_progress:'rgba(97,97,255,.16)', blocked:'rgba(209,75,75,.17)', completed:'rgba(47,158,107,.16)'};
              cs+='border-color:'+(dropEdge[t.status]||'var(--violet)')+';box-shadow:0 0 0 3px '+(mGlow[t.status]||'rgba(97,97,255,.16)')+';'; }
            else if(!dragging) cs+='border-color:transparent;'; // keep explicit to avoid currentColor fallback; transparent = no visible stroke
            if(animMoved) cs+='animation:wf-insert .42s cubic-bezier(.16,.84,.44,1);';
            else if(seenBefore) cs+='animation:none;'; // already shown once — suppress the wf-card entrance so an insert/reorder remount can't replay it (pushed-down cards only move, never reload)
            const subs=t.subtasks||[]; const subDone=subs.filter(x=>x.status==='completed').length; const subOpen=!!(st.expandedSubs||{})[t.id];
            const dueBg = od?'var(--red-light)':(this.dueSoon(t)?'var(--yellow-light)':'#EFEFEF');
            const dueFg = od?'var(--red)':(this.dueSoon(t)?'#b0810f':'var(--gray-dark)');
            return {
              tid:t.id,
              hasSubs:subs.length>0, subLabel:subDone+'/'+subs.length, subsOpen:subOpen, external:!!t.external,
              subBarStyle:`height:100%;width:${subs.length?Math.round(subDone/subs.length*100):0}%;background:var(--violet);border-radius:10px`,
              subCaret:'color:var(--gray);display:inline-flex;transition:transform .15s;transform:rotate('+(subOpen?-180:0)+'deg)',
              onToggleSubs:(e)=>{ try{e.stopPropagation();}catch(_){}; this.toggleSubs(t.id); },
              subItems:subs.map((x,i)=>({name:x.name, ownerName:x.primary||'Unassigned', ownerInitials:this.initials(x.primary||''), ownerColor:this.ownerColors[x.primary]||'var(--gray-dark)'})),
              name:t.name, ws:isDirect?(t.ws+' · '+((this.mandate(t.mandateId)||{name:''}).name.split(' ')[0])):t.ws, stage:t.stage, extTag:t.external,
              hasDueStatus: !locked,
              dueStatusLabel: this.dueTagLabel(t),
              dueStatusStyle:'font-size:10.5px;font-weight:600;text-transform:uppercase;letter-spacing:.3px;padding:2px 8px;border-radius:5px;white-space:nowrap;flex:none;background:'+dueBg+';color:'+dueFg,
              hasDueRange: !!t.revised && r!=='dev', noDueRange: !(!!t.revised && r!=='dev'),
              dueOldLabel: this.fmt(t.due), dueNewLabel: this.fmt(t.revised),
              dueRangeLabel: this.fmt(eff),
              dueStyle:'font-size:10.5px;font-weight:600;color:rgba(16,23,33,.94);white-space:nowrap;min-width:0',
              cardFooterStyle:'display:flex;align-items:center;gap:6px;margin-top:auto;padding-top:9px;'+(t.revised?'flex-wrap:wrap':'flex-wrap:nowrap'),
              cardOwnerStyle:'margin-left:auto;display:flex;align-items:center;gap:5px;'+(t.revised?'flex:0 0 100%;justify-content:flex-end':'flex:0 0 auto'),
              prioLabel:P[t.prio].label, prioStyle:prioBadge(t.prio), prioFlames:flames(t.prio),
              primaryInitials:this.initials(t.primary), primaryName:t.primary, primaryFirstName:(t.primary||'').split(' ')[0], ownerColor:this.ownerColors[t.primary]||'var(--gray-dark)',
              canTransfer:this.canManageMandate(t.mandateId), onTransfer:this.canManageMandate(t.mandateId)?((e)=>this.openTransfer(t.id,e)):(()=>{}),
              ownerAvatarStyle:'width:22px;height:22px;border-radius:50%;background:'+(this.ownerColors[t.primary]||'var(--gray-dark)')+';color:#fff;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none'+(this.canManageMandate(t.mandateId)?';cursor:pointer':''),
              ownerHoverStyle:this.canManageMandate(t.mandateId)?'filter:brightness(1.08)':'',
              ownerTitle:this.canManageMandate(t.mandateId)?'Click to transfer task owner':t.primary,
              canNudge:this.canManageMandate(t.mandateId) && !!t.primary && t.status!=='completed', canTransfer:this.canManageMandate(t.mandateId) && t.status!=='completed' && t.status!=='unassigned', primaryName:t.primary||'', showAvatar: t.status==='unassigned', onNudge:(e)=>{ try{e.stopPropagation();}catch(_){}; this.openNudge(t.id); },
              isBlockedWithRemark: t.status==='blocked' && !!t.remark, remark:t.remark||'',
              draggable:canD, dragTitle:reason, showDisabledNote:!canD, handleIcon: canD?'⠿':'🔒',
              cardStyle:cs, status:t.status,
              onDragStart:(e)=>{ try{ e.dataTransfer.setData('text/plain',t.id); e.dataTransfer.effectAllowed='move'; }catch(_){} this.dragStart(t.id); },
              onDragEnd:()=>this.dragEnd(),
              onOpen:()=>{ if(this._justDragged) return; this.openView(t.id); }
            };
        };
        const statusCols=colDefs.map(cd=>{ const key=cd[0], color=cd[1];
          const fullKey=laneKey+'::'+key;
          const MO=this._moveOrder||{};
          const ctasks=subset.filter(t=>t.status===key).sort((a,b)=>((MO[b.id]||0)-(MO[a.id]||0)) || ((this.canDrag(b)?1:0)-(this.canDrag(a)?1:0)));
          const hi = overS===fullKey && !!dragId;
          const infoTexts={unassigned:'No Task Owner / SPOC has been assigned yet. Assign an owner before moving this task forward.', not_started:'Task is created and assigned, but work hasn\'t started.', in_progress:'Task is actively being worked on by the owner.', blocked:'Task is stuck — something outside the owner\'s control is stopping progress.', completed:'Task is done and closed.'};
          return { key, label:(key==='completed'?'Completed':key==='in_progress'?'In-Progress':S[key].label), count:ctasks.length, empty:ctasks.length===0, showDrop: ctasks.length===0 && !!dragId,
            infoOpen: st.colInfoOpen===fullKey, infoText: infoTexts[key]||'', onInfoToggle:(e)=>{ try{e.stopPropagation();}catch(_){}; this.setState(s=>({colInfoOpen: s.colInfoOpen===fullKey?null:fullKey})); }, onInfoStop:(e)=>{ try{e.stopPropagation();}catch(_){}; },
            style:colWrapStyle(hi,key), dropStyle:`border:1.5px dashed ${dropEdge[key]||'#8f8ff0'};border-radius:10px;padding:18px 10px;text-align:center;font-size:11.5px;font-weight:600;color:${dropEdge[key]||'#7a7ad0'};background:${dropTint[key]||'#F4F4FF'}`, bodyStyle:colBodyStyle,
            headStyle:'display:flex;align-items:center;gap:8px;padding:4px 6px 10px;flex:none',
            dot:`width:9px;height:9px;border-radius:50%;background:${color};flex:none`,
            onDragOver:(e)=>{ e.preventDefault(); this.colOver(fullKey); },
            onDrop:(e)=>{ e.preventDefault(); this.colDrop(key); },
            onDragLeave:()=>this.colLeave(fullKey),
            tasks:ctasks.map(t=>mkCard(t,false)) };
        });
        return statusCols;
      };
      // group-by → swimlanes
      const groupBy=st.boardGroup||'none';
      V.boardNoGroupHeading = (groupBy==='none') ? (isDirect?'All Mandates Task ('+filtered.length+')':'') : '';
      V.boardGroup=groupBy; V.onBoardGroup=(e)=>this.setBoardGroup(e.target.value); V.onBoardGroupV=(v)=>this.setBoardGroup(v); V.boardGroupTinted=groupBy!=='none';
      V.boardGroupOptions=[{value:'none',label:'Group By: None'},{value:'mandate',label:'Group By: Mandate'},{value:'workstream',label:'Group By: Workstream'},{value:'owner',label:'Group By: Owner / SPOC'},{value:'priority',label:'Group By: Priority'}];
      let lanes;
      if(groupBy==='mandate'){
        let mSource=filtered;
        if(!isDirect){ const ids2=this.scopedMandates(r,rn).filter(mm=>!st.gfSel||st.gfSel[mm.id]).map(mm=>mm.id);
          let allM=this.tasks.filter(t=>ids2.includes(t.mandateId)); if(r==='dev') allM=allM.filter(t=>t.external && this.isMine(t));
          mSource=allM.filter(t=>dueMatch(t)&&statusMatch(t)&&prioMatch(t)&&mineMatch(t)&&wsFMatch(t)&&ownerFMatch(t)&&overdueRangeMatch(t)).filter(t=> !q || (t.name+t.stage+t.primary).toLowerCase().includes(q)); }
        const ids=[...new Set(mSource.map(t=>t.mandateId))]; lanes=ids.map(mid=>{ const mm=this.mandate(mid); return {key:'md_'+mid,label:(mm&&mm.name)||mid,isOwner:false,tasks:mSource.filter(t=>t.mandateId===mid)}; }).filter(l=>l.tasks.length);
      }
      else if(groupBy==='workstream') lanes=this.WS.map(ws=>({key:'ws_'+ws,label:ws,isOwner:false,tasks:filtered.filter(t=>t.ws===ws)})).filter(l=>l.tasks.length);
      else if(groupBy==='owner'){ const nm=[...new Set(filtered.map(t=>t.primary))].sort(); lanes=nm.map(n=>({key:'ow_'+n,label:n,isOwner:true,tasks:filtered.filter(t=>t.primary===n)})); }
      else if(groupBy==='priority') lanes=[['high','High priority'],['medium','Medium priority'],['low','Low priority']].map(p=>({key:'pr_'+p[0],label:p[1],isOwner:false,tasks:filtered.filter(t=>t.prio===p[0])})).filter(l=>l.tasks.length);
      else lanes=[{key:'all',label:'',isOwner:false,tasks:filtered}];
      V.boardGroups=lanes.map(l=>{ const collapsed=!!st.collapsedLanes[l.key];
        return { key:l.key, label:l.label, count:l.tasks.length, showHeader:groupBy!=='none', open:!collapsed,
          laneWrapStyle: 'margin-bottom:6px',
          rowStyle: 'display:flex;gap:14px;overflow-x:auto;overflow-y:hidden;padding-bottom:4px;align-items:stretch',
          isOwner:l.isOwner, initials:l.isOwner?this.initials(l.label):'', ownerColor:l.isOwner?(this.ownerColors[l.label]||'var(--gray-dark)'):'',
          caretStyle:'color:var(--gray-dark);display:inline-flex;align-items:center;transition:transform .15s;transform:rotate('+(collapsed?-90:0)+'deg)',
          onToggle:()=>this.toggleLane(l.key),
          columns:buildCols(l.tasks, l.key) };
      });
    }

    // ================= DRAWER =================
    const dw=st.drawer;
    V.drawerOpen=!!dw;
    V.onCloseDrawer=()=>this.closeDrawer();
    if(dw){
      V.drawerView = dw.mode==='view';
      V.drawerForm = dw.mode==='add'||dw.mode==='edit';
      V.drawerFormFooter = (dw.mode==='add') || (dw.mode==='edit' && (st.drawerTab||'details')==='details');
      V.drawerIsAdd = dw.mode==='add';
      V.drawerNotAdd = dw.mode!=='add';
      // container: centered modal for Add, left drawer for View/Edit
      V.drawerWrapStyle = dw.mode==='add'
        ? 'position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;padding:24px'
        : 'position:fixed;inset:0;z-index:60;display:flex;justify-content:flex-end';
      const dClosing = st.drawerClosing;
      V.drawerOverlayStyle = 'position:absolute;inset:0;background:rgba(20,20,40,.34);animation:'+(dClosing?'wf-fade-out .22s ease-in forwards':'wf-fade .18s ease-out');
      V.drawerBoxStyle = dw.mode==='add'
        ? 'position:relative;width:560px;max-width:100%;max-height:90vh;background:#fff;border-radius:10px;overflow:auto;box-shadow:0 20px 60px rgba(16,23,33,.28);animation:'+(dClosing?'wf-pop-out .2s ease-in forwards':'wf-pop .18s ease-out')+';display:flex;flex-direction:column'
        : 'position:relative;width:460px;max-width:92vw;background:#fff;height:100%;overflow:auto;box-shadow:-8px 0 30px rgba(0,0,0,.14);animation:'+(dClosing?'wf-drawer-out .24s cubic-bezier(.4,0,1,1) forwards':'wf-drawer-in .28s cubic-bezier(.22,.61,.36,1)')+';display:flex;flex-direction:column';
      // tabs (view/edit only)
      const tab = dw.mode==='add' ? 'details' : (st.drawerTab||'details');
      V.drawerShowTabs = dw.mode!=='add';
      V.tabDetails=tab==='details'; V.tabDates=tab==='dates'; V.tabTimeline=tab==='timeline';
      const tabOn='padding:0 2px 10px;border:0;background:transparent;font-size:13px;font-weight:600;color:var(--violet);border-bottom:2px solid var(--violet);cursor:pointer;font-family:inherit;margin-right:22px';
      const tabOff='padding:0 2px 10px;border:0;background:transparent;font-size:13px;font-weight:500;color:var(--gray-dark);border-bottom:2px solid transparent;cursor:pointer;font-family:inherit;margin-right:22px';
      V.tabDetailsStyle=tab==='details'?tabOn:tabOff; V.tabDatesStyle=tab==='dates'?tabOn:tabOff; V.tabTimelineStyle=tab==='timeline'?tabOn:tabOff;
      V.onTabDetails=()=>this.setDrawerTab('details'); V.onTabDates=()=>this.setDrawerTab('dates'); V.onTabTimeline=()=>this.setDrawerTab('timeline');
      // dates + timeline data (from the task, view or edit)
      const dt=this.tasks.find(x=>x.id===dw.taskId)||{};
      V.drawerCanDelete = dw.mode!=='add' && !!dt.id && this.canManageMandate(dt.mandateId);
      V.onDeleteFromDrawer = ()=>this.openDelete(dt.id);
      V.dtStart=this.fmt(dt.start)||'—';
      { const dtOd=this.isOverdue(dt); const dtDelta=this.revisedDeltaDays(dt);
        V.dtShowDueField = (r!=='dev');
        V.dtDue=this.fmt(dt.due)||'—';
        V.dtDueStyle='font-size:14px;color:'+((dtOd&&!dt.revised)?'var(--red)':'rgba(16,23,33,.94)');
        V.dtShowRevisedField = (r==='dev') ? true : !!dt.revised;
        V.dtRevisedFieldLabel = (r==='dev') ? (dt.revised?'Revised date':'Due date') : 'Latest revised date';
        V.dtRevised = (r==='dev') ? (this.fmt(this.effDate(dt))||'—') : (dt.revised?this.fmt(dt.revised):'');
        V.dtRevisedStyle = 'font-size:14px;font-weight:600;color:'+(dt.revised?'#c98a12':'rgba(16,23,33,.94)');
        V.dtHasDelta = (r!=='dev') && !!dt.revised && dtDelta!==0;
        V.dtDeltaLabel = (dtDelta>0?'+':'')+dtDelta+'d';
        V.dtDeltaStyle = 'font-size:10px;font-weight:700;padding:1px 6px;border-radius:8px;'+(dtDelta>0?'background:#FBEBD3;color:#9a6a12':'background:#DFF3E6;color:#1f8a5b');
        V.dtHasOverdueCaption = dtOd;
        V.dtOverdueCaptionLabel = 'Late by '+this.overdueDays(dt)+'d';
      }
      const rh=this.revisedHistory(dt).map(rv=>({...rv, showFrom:r!=='dev'})); V.revisedHistory=rh; V.hasRevisedHistory=rh.length>0;
      V.revisedSteps=rh.map(rv=>({ label:(rv.showFrom&&rv.from?rv.from+' → ':'')+rv.to, description:rv.when+' · '+rv.by+(rv.reason?' — '+rv.reason:'') }));
      V.revisedCurrent=rh.length;
      V.timelineEvents=this.taskTimeline(dt);
      if(dw.mode==='view'){
        const t=this.tasks.find(x=>x.id===dw.taskId)||{};
        V.drawerKicker=t.ws; V.drawerTitle=t.name;
        V.vStatusLabel=S[t.status].label; V.vStatusStyle=statusBadge(t.status);
        V.vPrioLabel=P[t.prio].label; V.vPrioStyle=prioBadge(t.prio); V.vPrioFlames=flames(t.prio);
        V.vWorkstream=t.ws; V.vStage=t.stage||'—'; V.vDesc=t.desc||'No description added.';
        { const vOd=this.isOverdue(t); const vDelta=this.revisedDeltaDays(t);
          V.vShowDueField = (r!=='dev');
          V.vDue=this.fmt(t.due)+' 2026'; V.vDueStyle='font-size:13.5px;font-weight:600;'+((vOd&&!t.revised)?'color:var(--red)':'color:rgba(16,23,33,.94)');
          V.vShowRevisedField = (r==='dev') ? true : !!t.revised;
          V.vRevisedFieldLabel = (r==='dev') ? (t.revised?'Revised date':'Due date') : 'Revised date';
          V.vRevised = (r==='dev') ? (this.fmt(this.effDate(t))+' 2026') : (t.revised?(this.fmt(t.revised)+' 2026'):'');
          V.vRevisedStyle = 'font-size:13.5px;font-weight:600;color:#c98a12';
          V.vHasDelta = (r!=='dev') && !!t.revised && vDelta!==0;
          V.vDeltaLabel = (vDelta>0?'+':'')+vDelta+'d';
          V.vDeltaStyle = 'font-size:10px;font-weight:700;padding:1px 6px;border-radius:8px;margin-left:6px;'+(vDelta>0?'background:#FBEBD3;color:#9a6a12':'background:#DFF3E6;color:#1f8a5b');
          V.vHasOverdueCaption = vOd;
          V.vOverdueCaptionLabel = 'Late by '+this.overdueDays(t)+'d';
        }
        V.vPrimaryName=t.primary; V.vOwnerInitials=this.initials(t.primary); V.vOwnerColor=this.ownerColors[t.primary]||'var(--gray-dark)';
        const sup=(t.supporting||[]).filter(s=> r!=='dev');
        V.vShowSupporting=sup.length>0; V.vSupporting=sup.join(', ');
        const showRemark = r!=='dev';
        V.vHasRemark= showRemark && !!t.remark; V.vNoRemark= !V.vHasRemark; V.vRemark=t.remark;
        V.vLocked=t.status==='completed';
        V.vCanReopen=this.canDrag(t); V.vReopenNote=V.vCanReopen?'Reopen to update its status.':'Only the assigned task owner or the mandate P&L owner/TL can reopen it.';
        V.onReopen=()=>this.reopen(t.id);
        V.vCanEdit=this.canEditTask(t) && (t.status!=='completed' || r==='lead' || r==='pnl');
        V.vCanDelete=this.canManageMandate(t.mandateId);
        V.vShowQuick=V.vCanEdit||V.vCanDelete;
        V.onEditFromView=()=>this.editFromView();
        V.onDeleteFromView=()=>this.openDelete(t.id);
      } else {
        const d=st.draft||{};
        V.drawerKicker = dw.mode==='add'?'New task':'Editing';
        V.drawerTitle = dw.mode==='add'?'Add Task':(d.name||'Edit Task');
        V.saveLabel = dw.mode==='add'?'Save Task':'Save Changes';
        V.isEditMode = dw.mode==='edit';
        V.isAddMode = dw.mode==='add';
        // --- add-task 2-step wizard ---
        const _astep = st.addStep||1;
        V.addShowStepper = dw.mode==='add';
        V.addStep1 = (dw.mode!=='add') || _astep===1;
        V.addStep2 = (dw.mode!=='add') || _astep===2;
        const _dotB='width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex:none';
        V.st1DotStyle = _astep>1 ? _dotB+';background:#E8E8FF;color:var(--violet)' : _dotB+';background:var(--violet);color:#fff';
        V.st2DotStyle = _astep===2 ? _dotB+';background:var(--violet);color:#fff' : _dotB+';background:#EDEDEF;color:#9AA1AC';
        V.st1TextColor = 'rgba(16,23,33,.94)';
        V.st2TextColor = _astep===2 ? 'rgba(16,23,33,.94)' : '#9AA1AC';
        V.stConnColor = _astep===2 ? 'var(--violet)' : '#E4E4E8';
        V.showStepNext = dw.mode==='add' && _astep===1;
        V.showStepBack = dw.mode==='add' && _astep===2;
        V.showCancelBtn = !(dw.mode==='add' && _astep===2);
        V.showSaveBtn = (dw.mode==='edit') || (dw.mode==='add' && _astep===2);
        V.onAddNext=()=>this.addNext();
        V.onAddBack=()=>{ if(this.state.addStep===2) this.addBack(); else this.closeDrawer(); };
        if(dw.mode==='add'){
          V.addModalWrapStyle='position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;padding:24px';
          V.addModalPopStyle='position:relative;max-width:100%;animation:'+(dClosing?'wf-pop-out .2s ease-in forwards':'wf-pop .22s cubic-bezier(.22,.61,.36,1)');
          V.addBackLabel=_astep===2?'Prev Step':'Cancel';
          V.addRailTitle=_astep===1?'Add Basic Details':'Schedule & Other details';
          V.addBodyStyle={flex:'none',height:'478px',overflowY:'auto'};
          V.addSecondaryLabel=_astep===2?'Cancel':'';
          V.addPrimaryLabel=_astep===1?'Next':'Save Task';
          V.addPrimaryAction=_astep===1?(()=>this.addNext()):(()=>this.saveDraft());
          V.setWv=v=>this.setCategoryValue(v); V.setWsSelect=e=>this.setCategoryValue(e.target.value); V.setPrimarySelect=e=>this.setPrimaryAndDepartment(e.target.value); V.setStatusSelect=e=>this.setD('status',e.target.value); V.setPrioSelect=e=>this.setD('prio',e.target.value); V.setPriov=v=>this.setD('prio',v); V.setPrimaryv=v=>this.setPrimaryAndDepartment(v); V.setStatusv=v=>this.setD('status',v);
          { const _today=this.realToday(), _sd=d.start||_today; V.dDueMin=_sd>_today?_sd:_today; }
          V.setMandateSelect=e=>this.setD('mandateId',e.target.value);
          V.setMandateV=v=>{
            if(this.mandateSelectTimer) clearTimeout(this.mandateSelectTimer);
            this.setState(s=>({draft:{...s.draft,mandateId:v},mandateDropdownClosing:true}));
            this.mandateSelectTimer=setTimeout(()=>{
              this.mandateSelectTimer=null;
              this.setState({mandateDropdownClosing:false});
            },220);
          }; V.setWsV=v=>this.setCategoryValue(v); V.setPrimaryV=v=>this.setPrimaryAndDepartment(v); V.setDeptV=v=>this.setD('dept',v); V.setStatusV=v=>this.setD('status',v); V.setPrioV=v=>this.setD('prio',v);
          V.setDeptSelect=e=>this.setD('dept',e.target.value);
          V.dDept=d.dept||'';
          V.deptDDOptions=[{value:'',label:'Select department'}].concat(['Technology','Marketing','Strategic Development Initiative','CEO Office','Operations','Sales','Chairman Office','Legal','Admin','CTO Office','Call Center','Research','Corporate Sales','Vice Chairman Office','Finance','Transaction Services','HR','Transport'].map(x=>({value:x,label:x})));
          V.dMandate=(d.mandateId)||st.mandateId||'';
          V.mandateDropdownClosing=!!st.mandateDropdownClosing;
          { let selM=this.mandates.filter(m=>this.canManageMandate(m)); if(st.gfSel) selM=selM.filter(m=>st.gfSel[m.id]);
            if(V.dMandate && !selM.some(m=>m.id===V.dMandate)){ const cur=this.mandate(V.dMandate); if(cur) selM=[cur].concat(selM); }
            V.addMandateOptions=selM.map(m=>({value:m.id,label:m.name})); }
          V.wsDDOptions=this.categoryNames().map(w=>({value:w,label:w})).concat([{value:'__add_new_category__',label:'+ Add New'}]);
          V.prioDDOptions=[{value:'high',label:'High'},{value:'medium',label:'Medium'},{value:'low',label:'Low'}];
          V.spocDDOptions=[{value:'',label:'Select employee…'}].concat(this.OWNERS.map(o=>({value:o,label:o})));
          V.statusDDOptions=[{value:'unassigned',label:'Unassigned'},{value:'not_started',label:'Pending'},{value:'in_progress',label:'In Progress'},{value:'blocked',label:'Blocked'},{value:'completed',label:'Completed'}];
          const _sr=(n,label,stt)=>{const bg=stt==='active'?'#6161FF':stt==='done'?'#E8E8FF':'#EDEDED';const fg=stt==='active'?'#fff':stt==='done'?'#6161FF':'#9FA6B0';const txt=stt==='todo'?'#9FA6B0':'#101721';return React.createElement('div',{key:n,style:{display:'flex',alignItems:'center',gap:12}},React.createElement('div',{style:{width:28,height:28,borderRadius:'50%',background:bg,color:fg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:700,flex:'none'}},stt==='done'?'\u2713':String(n)),React.createElement('div',{style:{fontSize:13.5,fontWeight:600,color:txt}},label));};
          V.addRailNode=React.createElement('div',{style:{display:'flex',flexDirection:'column',gap:14}},_sr(1,'Task details',_astep>1?'done':'active'),React.createElement('div',{style:{width:2,height:16,background:'#E8E8FF',marginLeft:13,borderRadius:2}}),_sr(2,'Schedule & ownership',_astep===2?'active':'todo'));
        }
        V.dInputDisabledStyle = 'width:100%;height:38px;border:1px solid #E0E0E0;border-radius:10px;padding:0 11px;font-size:13px;font-family:inherit;background:#F3F3F3;color:#9FA6B0;outline:0';
        // read-only display for fields this role cannot edit (shown as label + value like the View drawer)
        V.roLabelStyle='font-size:11px;line-height:14px;text-transform:uppercase;letter-spacing:.45px;color:var(--gray);font-weight:600;white-space:nowrap';
        V.roValStyle='font-size:14px;color:rgba(16,23,33,.94);margin-top:7px;line-height:20px';
        const origTask = dw.taskId ? this.tasks.find(x=>x.id===dw.taskId) : null;
        const drawerMandateId=d.mandateId||(origTask&&origTask.mandateId)||st.mandateId;
        const coreEnabled=this.canManageMandate(drawerMandateId);
        const statusEnabled=!!(origTask&&this.canChangeTaskStatus(origTask));
        const statusOnly=!!(origTask&&this.isMine(origTask)&&!coreEnabled);
        V.dCoreReadonly=!coreEnabled; V.dCoreEditable=coreEnabled;
        V.dTaskOwnerStatusEditable=!coreEnabled&&statusEnabled;
        V.dTaskOwnerStatusReadonly=!coreEnabled&&!statusEnabled;
        V.drawerShowExternalTag=dw.mode==='edit'&&!!d.external;
        V.dShowExternalInput=dw.mode==='add';
        V.formGridStyle = coreEnabled ? 'display:flex;flex-direction:column;gap:15px' : 'display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);column-gap:32px;row-gap:18px;align-items:start;padding:0 8px 12px';
        V.ownerDeptRowStyle='display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;grid-column:1/-1;align-items:start';
        V.departmentFieldStyle=coreEnabled?'grid-column:1/-1;max-width:620px;width:100%':'min-width:0;width:100%';
        const draftPrimaryEmployee=this.EMPLOYEES.find(e=>(d.primaryOwnerId&&e.id===d.primaryOwnerId)||e.name===d.primary);
        const resolvedDraftDept=d.dept||(draftPrimaryEmployee&&(draftPrimaryEmployee.department||draftPrimaryEmployee.dept))||'';
        V.roCategory=d.ws||'—'; V.roName=d.name||'—'; V.roDescVal=(d.desc&&d.desc.trim())?d.desc:'No description added.'; V.roDeptVal=resolvedDraftDept||'—';
        V.roStatusVal=(S[d.status]&&S[d.status].label)||d.status||'—';
        V.roPrioVal=(this.PRIO[d.prio]||{}).label||d.prio; V.roPrioFlames=flames(d.prio); V.roDueVal=this.fmt(d.due)||'—';
        V.roPrimaryVal=d.primary||'Unassigned'; V.roPrimaryInitials=this.initials(d.primary||''); V.roPrimaryColor=this.ownerColors[d.primary]||'var(--gray-dark)';
        V.roHasSubs=(d.subs||[]).filter(s=>s&&s.name&&s.name.trim()).length>0; V.roSubs=(d.subs||[]).filter(s=>s&&s.name&&s.name.trim()).map(s=>({name:s.name, owner:s.owner||'Unassigned'}));
        const revisedEnabled=!!(origTask&&this.isMine(origTask));
        V.dRevisedEditable=revisedEnabled;
        V.dRevisedEditRow=revisedEnabled;
        V.showClosingField = coreEnabled && dw.mode==='edit' && d.status==='completed' && !(origTask && origTask.status==='completed');
        V.dRevisedChanged = revisedEnabled && ((d.revised||'')!==(origTask.revised||''));
        V.showRevisedReason = V.dRevisedChanged && coreEnabled;
        V.dRevisedReason = d.revisedReason||'';
        V.setRevisedReason = e=>this.setD('revisedReason', e.target.value);
        V.dReasonStyle = 'width:100%;min-height:60px;border:1px solid #E0D3AE;border-radius:10px;padding:9px 11px;font-size:13px;font-family:inherit;outline:0;resize:vertical;background:#fff';
        // role-based field permissions
        const remarkEnabled = coreEnabled || statusEnabled;
        V.showRemarkField=remarkEnabled;
        V.dCoreDisabled=!coreEnabled;
        V.dCoreHelp = statusEnabled?'As the task owner, you can update status and provide a revised date.':'You can view this task, but only its mandate P&L owner or TL can edit details.';
        V.dStatusDisabled=!statusEnabled; V.dRemarkDisabled=!remarkEnabled; V.dRevisedDisabled=!revisedEnabled;
        const inp='width:100%;height:46px;border:1px solid #E0E0E0;border-radius:4px;padding:0 14px;font-size:14px;font-family:inherit;outline:0;background:#fff;color:#101721';
        const inpDis='width:100%;height:46px;border:1px solid #EEE;border-radius:4px;padding:0 14px;font-size:14px;font-family:inherit;outline:0;background:#F7F7F7;color:var(--gray)';
        V.dInputStyle= coreEnabled?inp:inpDis;
        const _chevImg="background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 16 16' fill='none' stroke='%236B7785' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M4 6l4 4 4-4'/></svg>\");background-repeat:no-repeat;background-position:right 14px center";
        const _selBase='width:100%;height:46px;border-radius:4px;padding:0 38px 0 14px;font-size:14px;font-family:inherit;outline:0;color:#101721;appearance:none;-webkit-appearance:none;';
        V.dSelectStyle= _selBase + (coreEnabled?'border:1px solid #E0E0E0;background-color:#fff;':'border:1px solid #EEE;background-color:#F7F7F7;color:var(--gray);') + _chevImg;
        V.dStatusSelStyle= _selBase + (statusEnabled?'border:1px solid #E0E0E0;background-color:#fff;':'border:1px solid #EEE;background-color:#F7F7F7;color:var(--gray);') + _chevImg;
        const _chev="";
        V.dStatusStyle= statusEnabled?inp:inpDis;
        V.dRevisedStyle= revisedEnabled?inp:inpDis;
        V.dRevisedMin=((d.start||'')>this.realToday()?(d.start||''):this.realToday());
        V.dRemarkStyle= remarkEnabled?'width:100%;min-height:64px;border:1px solid #E0E0E0;border-radius:4px;padding:11px 14px;font-size:14px;font-family:inherit;outline:0;resize:vertical':'width:100%;min-height:64px;border:1px solid #EEE;border-radius:4px;padding:11px 14px;font-size:14px;font-family:inherit;outline:0;resize:vertical;background:#F7F7F7;color:var(--gray)';
        V.dTextareaStyle= coreEnabled?'width:100%;min-height:60px;border:1px solid #E0E0E0;border-radius:4px;padding:11px 14px;font-size:14px;font-family:inherit;outline:0;resize:vertical':'width:100%;min-height:60px;border:1px solid #EEE;border-radius:4px;padding:11px 14px;font-size:14px;font-family:inherit;outline:0;resize:vertical;background:#F7F7F7;color:var(--gray)';
        V.dWs=d.ws; V.dName=d.name; V.dPrio=d.prio; V.dDesc=d.desc; V.dStart=d.start||this.realToday(); V.startDateMin=dw.mode==='add'?this.realToday():''; V.dDue=d.due; V.dRevised=d.revised; V.dStatus=d.status; V.dPrimary=d.primary; V.dRemark=d.remark; V.dClosing=d.closeRemark||''; V.dFail=!!d.fail;
        const validateRequired=!!d.validationAttempted;
        V.mandateMissing=dw.mode==='add'&&validateRequired&&!String(d.mandateId||'').trim();
        V.categoryMissing=validateRequired&&coreEnabled&&!String(d.ws||'').trim();
        V.taskMissing=validateRequired&&coreEnabled&&!String(d.name||'').trim();
        V.startMissing=dw.mode==='add'&&validateRequired&&!String(d.start||'').trim();
        V.dueMissing=validateRequired&&coreEnabled&&!String(d.due||'').trim();
        V.statusMissing=validateRequired&&(dw.mode==='add'||statusEnabled)&&!String(d.status||'').trim();
        V.priorityMissing=validateRequired&&coreEnabled&&!String(d.prio||'').trim();
        V.ownerRequired=d.status!=='unassigned';
        V.ownerMissing=validateRequired&&coreEnabled&&V.ownerRequired&&!String(d.primary||'').trim();
        V.remarkRequired=(statusOnly&&V.dRevisedChanged)||d.status==='blocked';
        V.remarkMissing=validateRequired&&V.remarkRequired&&!String(d.remark||'').trim();
        V.taskInputStyle=V.taskMissing?V.dInputStyle+';border-color:var(--red);box-shadow:0 0 0 1px var(--red)':V.dInputStyle;
        V.dCompany = d.external?'external':'internal'; V.dExternal=!!d.external; V.setExternal=e=>this.setD('external',!!e.target.checked); V.setCompanyV=v=>this.setD('external', v==='external');
        V.typeNode=React.createElement('label',{style:{height:46,display:'flex',alignItems:'center',gap:9,fontSize:14,color:'#101721',cursor:'pointer'}},
          React.createElement('input',{type:'checkbox',checked:V.dExternal,onChange:V.setExternal,style:{width:17,height:17,accentColor:'var(--violet)',cursor:'pointer'}}),
          'Managed by External Vendor');
        V.companyDDOptions=[{value:'internal',label:'Internal'},{value:'external',label:'External'}];
        V.roCompanyVal = d.external?'Yes':'No';
        V.dCanNudge=coreEnabled && !!d.primary; V.onDrawerNudge=()=>this.sendDrawerNudge(dw.taskId, d.remark);
        V.showBlockerOwner=d.status==='blocked';
        V.dBlockerOwner=d.blockerOwner||'';
        V.blockerOwnerOptions=this.EMPLOYEES.map(e=>({value:e.id,label:e.name}));
        V.onBlockerOwnerChange=e=>{ const id=e.target.value, employee=this.EMPLOYEES.find(item=>item.id===id); this.setState(s=>({draft:{...s.draft,blockerOwnerId:id,blockerOwner:employee?employee.name:'',error:''}})); };
        V.dDept=resolvedDraftDept; V.setDeptSelect=e=>this.setD('dept',e.target.value);
        V.setWv=v=>this.setCategoryValue(v); V.setPrimaryV=v=>this.setPrimaryAndDepartment(v); V.setDeptV=v=>this.setD('dept',v); V.setStatusV=v=>this.setD('status',v); V.setPrioV=v=>this.setD('prio',v);
        V.newCategoryOpen=coreEnabled&&!!d.newCategoryOpen;
        if(V.newCategoryOpen) V.dWs='__new_category_active__';
        V.wsDDOptions=(V.newCategoryOpen?[{value:'__new_category_active__',label:'New Category'}]:[]).concat(this.categoryNames().map(w=>({value:w,label:w}))).concat(coreEnabled?[{value:'__add_new_category__',label:'+ Add new Category'}]:[]);
        V.newCategoryName=d.newCategoryName||'';
        V.newCategoryError=d.newCategoryError||'';
        V.hasNewCategoryError=!!V.newCategoryError;
        V.onNewCategoryName=e=>this.setNewCategoryName(e.target.value);
        V.onConfirmNewCategory=()=>this.confirmNewCategory();
        V.onCancelNewCategory=()=>this.cancelNewCategory();
        V.newCategoryInputStyle='width:100%;height:46px;box-sizing:border-box;border:1px solid '+(V.hasNewCategoryError?'var(--red)':'#E0E0E0')+';border-radius:4px;padding:0 16px;font:500 14px/18px Graphik,Inter,system-ui,sans-serif;outline:0;color:rgba(16,23,33,.94);background:#fff';
        V.prioDDOptions=[{value:'high',label:'High'},{value:'medium',label:'Medium'},{value:'low',label:'Low'}];
        V.spocDDOptions=[{value:'',label:'Select employee…'}].concat(this.OWNERS.map(o=>({value:o,label:o})));
        V.statusDDOptions=(d.primary?[]:[{value:'unassigned',label:'Unassigned'}]).concat([{value:'not_started',label:'Pending'},{value:'in_progress',label:'In Progress'},{value:'blocked',label:'Blocked'},{value:'completed',label:'Completed'}]);
        V.deptDDOptions=[{value:'',label:'Select department'}].concat(['Technology','Marketing','Strategic Development Initiative','CEO Office','Operations','Sales','Chairman Office','Legal','Admin','CTO Office','Call Center','Research','Corporate Sales','Vice Chairman Office','Finance','Transaction Services','HR','Transport'].map(x=>({value:x,label:x})));
        V.today=this.NOW;
        V.wsOptions=this.WS; V.ownerOptions=this.OWNERS;
        V.setW=e=>this.setD('ws',e.target.value); V.setName=e=>this.setD('name',e.target.value);
        V.setPrio=e=>this.setD('prio',e.target.value); V.setDesc=e=>this.setD('desc',e.target.value); V.setDue=e=>this.setDueDate(e.target.value); V.setStart=e=>this.setStartDate(e.target.value);
        V.setRevised=e=>this.setD('revised',e.target.value); V.setStatus=e=>this.setD('status',e.target.value); V.setPrimary=e=>this.setPrimaryAndDepartment(e.target.value);
        V.setRemark=e=>this.setD('remark',e.target.value); V.setClosing=e=>this.setD('closeRemark',e.target.value); V.toggleFail=e=>this.setD('fail',e.target.checked);
        // sub-tasks (add-form only, editable roles)
        V.dShowSub=coreEnabled;
        const subs=d.subs||[];
        V.subOwnerOptions=[{value:'',label:'Select Task Owner…'}].concat(this.OWNERS.map(o=>({value:o,label:o})));
        V.subRows=subs.map((s,i)=>{ const hasName=!!String(s.name||'').trim(), hasOwner=!!s.owner, validate=!!d.validationAttempted; return {value:s.name||'',owner:s.owner||'',nameMissing:validate&&hasOwner&&!hasName,ownerMissing:validate&&hasName&&!hasOwner,onInput:(e)=>this.setSub(i,'name',e.target.value),onOwnerChange:(v)=>this.setSub(i,'owner',v),onRemove:()=>this.removeSub(i)}; });
        V.onAddSub=()=>this.addSub();
        // revised conditional: mandatory if due date is in the future (> today)
        V.dRevisedReq = '';
        V.dRemarkPlaceholder = V.dRevisedChanged ? 'Reason for revised timeline' : d.status==='blocked' ? 'What is blocking this task?' : d.status==='completed' ? 'Add a closing remark' : 'Add a remark…';
        V.dRevisedHelp=false; V.dRevisedHelpMsg='';
        V.formHasRoleNote = false;
        V.formRoleNote = statusEnabled?'Task details are locked. You can update status only.':'This task is read-only for the selected user.';
        V.showSaveBtn = (dw.mode==='add'&&coreEnabled&&_astep===2)||(dw.mode==='edit'&&(coreEnabled||statusEnabled));
        V.remarkErrorMsg=V.remarkMissing?d.error:'';
        V.formError=!!d.error&&!V.remarkMissing; V.formErrorMsg=d.error;
        V.onSaveDraft=()=>this.saveDraft();
      }
    }

    // ================= DELETE MODAL =================
    const md=st.modal;
    V.deleteOpen = md&&md.type==='delete';
    V.createOpen = md&&md.type==='create';
    if(V.createOpen){
      const w=st.clw||{step:1,mandateId:null,search:'',method:'standard'};
      V.clwStep1=w.step===1; V.clwStep2=w.step===2; V.clwStep3=w.step===3;
      V.clwSearch=w.search;
      V.onClwSearch=e=>this.clwSearch(e.target.value);
      V.onClwBack=()=>this.clwBack();
      V.onClwPrimary=()=>this.clwPrimary();
      V.onClwPickStandard=()=>this.clwSetMethod('standard');
      V.onClwPickBlank=()=>this.clwSetMethod('blank');
      V.clwCanBack=w.step>1;
      // step header
      const stepDefs=[{num:'1',label:'Mandate'},{num:'2',label:'Method'},{num:'3',label:'Preview'}];
      V.clwSteps=stepDefs.map((d,i)=>{ const n=i+1; const active=w.step===n, done=w.step>n;
        return {num: done?'✓':d.num, label:d.label,
          dotStyle:'width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex:none;'+(active?'background:var(--violet);color:#fff':done?'background:var(--violet);color:var(--violet-lightest)':'background:#EDEDED;color:var(--gray)'),
          labelStyle:'font-size:12px;font-weight:600;'+(active?'color:rgba(16,23,33,.94)':'color:var(--gray)'),
          sepStyle: n<3?'width:22px;height:1px;background:#DADADA;margin:0 4px':'display:none'};
      });
      // step 1 — mandates without checklist
      const q=(w.search||'').toLowerCase();
      const avail=this.mandates.filter(m=>this.canManageMandate(m)&&!m.hasChecklist && (!this.state.gfSel || !!this.state.gfSel[m.id])).filter(m=>!q||((m.name||'').toLowerCase().includes(q)||(m.developer||'').toLowerCase().includes(q)||(m.city||'').toLowerCase().includes(q)));
      V.clwHasMandates=avail.length>0; V.clwNoMandates=avail.length===0;
      V.clwSelectedId=w.mandateId||null;
      const NS=(window.AnarockResidentialDesignSystem_019e08)||{};
      V.clwOnItemClick=(it)=>this.clwPick(it.id);
      V.clwListItems=avail.map(m=>({ id:m.id, title:m.name, meta:[m.developer,m.city].filter(Boolean).join(' · '),
        leading:React.createElement('div',{style:{display:'flex',alignItems:'center',gap:12}},
          React.createElement(NS.Radio,{key:'r',checked:w.mandateId===m.id,size:'sm',onChange:()=>this.clwPick(m.id)}),
          React.createElement('div',{key:'i',style:{width:32,height:32,borderRadius:8,background:'#F0F0F2',color:'#6B7785',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}},
            React.createElement('svg',{width:17,height:17,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.6,strokeLinecap:'round',strokeLinejoin:'round'},
              React.createElement('path',{key:'a',d:'M3 21h18M6 21V8l6-4 6 4v13'}),
              React.createElement('path',{key:'b',d:'M10 21v-5h4v5'})))),
        trailing:React.createElement('span',{style:{fontSize:11,fontWeight:600,color:'#b06a00',background:'#FFF4E0',border:'1px solid #FFE0B0',padding:'4px 9px',borderRadius:5,whiteSpace:'nowrap'}},'Playbook pending')
      }));
      // step 2
      const cm=w.mandateId&&this.mandate(w.mandateId);
      V.clwMandateName=cm?cm.name:'this mandate';
      V.clwStdCardStyle='border:1.5px solid '+(w.method==='standard'?'var(--violet)':'#CFCFF5')+';border-radius:10px;padding:14px 15px;cursor:pointer;background:'+(w.method==='standard'?'#F7F7FF':'#fff')+';box-shadow:0 1px 3px rgba(97,97,255,.08);transition:border-color .15s ease,box-shadow .15s ease,transform .15s ease';
      V.clwBlankCardStyle='border:1.5px solid '+(w.method==='blank'?'#909090':'#D6D6D6')+';border-radius:10px;padding:14px 15px;cursor:pointer;background:'+(w.method==='blank'?'#F7F7F9':'#fff')+';box-shadow:0 1px 3px rgba(0,0,0,.06);transition:border-color .15s ease,box-shadow .15s ease,transform .15s ease';
      // step 3
      V.clwPreviewStandard=w.method==='standard'; V.clwPreviewBlank=w.method==='blank';
      const tpl=this.stdTemplateTasks();
      V.clwPreviewTasks=tpl.map(t=>({ws:t.ws,name:t.name}));
      V.clwPreviewHint=w.method==='standard'?('These '+tpl.length+' tasks will be added to '+(cm?cm.name:'the mandate')+' in the Unassigned bucket. You can edit every task after adding.'):('Review before creating '+(cm?cm.name:'the mandate')+'\u2019s playbook.');
      // footer primary
      V.clwPrimaryLabel=w.step===3?(w.method==='standard'?'Add tasks':'Create playbook'):(w.step===1?'Next: Choose Method for Playbook':'Final Step: Preview Task');
      V.clwPrimaryStyle='height:40px;padding:0 20px;background:var(--violet);border:0;color:#fff;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit';
    }
    V.onCancelModal=()=>this.cancelModal();
    V.bulkDeleteOpen = md&&md.type==='bulkDelete';
    V.bulkDeleteCount = V.selCount;
    V.bulkDeleteWord = V.selCount===1?'task':'tasks';
    V.bulkDeleteWordCap = V.selCount===1?'Task':'Tasks';
    V.bulkDelReason = this.state.bulkDelReason||'';
    V.onBulkDelReason = (e)=>this.setState({bulkDelReason:e.target.value, bulkDelReasonError:false});
    V.bulkDelReasonError = !!this.state.bulkDelReasonError;
    V.bulkDelReasonStyle = 'width:100%;box-sizing:border-box;padding:9px 11px;border:1px solid '+(this.state.bulkDelReasonError?'var(--red)':'#C8C8C8')+';border-radius:8px;font-size:13px;font-family:inherit;color:rgba(16,23,33,.94);resize:vertical;outline:none;line-height:1.45';
    const bulkHasReason = !!(this.state.bulkDelReason||'').trim();
    V.bulkDelCtaStyle = 'flex:1;height:40px;border:0;border-radius:10px;font-size:13px;font-weight:600;font-family:inherit;'+(bulkHasReason?'background:var(--red);color:#fff;cursor:pointer':'background:#F3B3A3;color:#fff;cursor:not-allowed');
    V.onConfirmBulkDelete=()=>this.bulkDeleteTasks();
    if(V.deleteOpen){ const t=this.tasks.find(x=>x.id===md.taskId)||{};
      V.delTaskName=t.name; V.delWs=t.ws; V.delCompleted=t.status==='completed';
      V.delRemark=st.delRemark; V.onDelRemark=e=>this.setState({delRemark:e.target.value, delError:''});
      V.delConfirm=st.delConfirm; V.onToggleDelConfirm=e=>this.setState({delConfirm:e.target.checked, delError:''});
      V.delError=!!st.delError; V.delErrorMsg=st.delError;
      V.onConfirmDelete=()=>this.confirmDelete();
      V.delBtnStyle='flex:1;height:40px;background:var(--red);border:0;color:#fff;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit';
    }
    // ================= NUDGE MODAL (Mini) =================
    const ng=st.nudge; V.nudgeOpen=!!ng;
    if(ng){ const t=this.tasks.find(x=>x.id===ng.taskId)||{}; V.nudgeOwnerName=t.primary||'Owner'; V.nudgeMsg=ng.msg||''; V.onNudgeMsg=(e)=>this.setNudgeMsg(e.target.value); V.onCloseNudge=()=>this.closeNudge(); V.onSendNudge=()=>this.sendNudge(); }
    // ================= TRANSFER OWNER / SPOC MODAL (Mini) =================
    const tr=st.transfer;
    V.transferOpen=!!tr;
    if(tr){
      const t=this.tasks.find(x=>x.id===tr.taskId)||{};
      V.transferTaskName=t.name||'';
      V.transferCurrentName=t.primary||'Unassigned';
      V.transferCurrentInitials=this.initials(t.primary);
      V.transferCurrentColor=this.ownerColors[t.primary]||'var(--gray-dark)';
      V.transferSearch=tr.search;
      V.onTransferSearch=(e)=>this.setTransferSearch(e.target.value);
      V.onCloseTransfer=()=>this.closeTransfer();
      const q=(tr.search||'').trim().toLowerCase();
      const list=this.eligibleOwners().filter(e=> !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q));
      V.transferEmpCount=list.length;
      V.transferHasResults=list.length>0;
      V.transferList=list.map(e=>{
        const picked=tr.pickedId===e.id;
        const isCurrent=e.name===t.primary;
        return {
          id:e.id, name:e.name, email:e.email, initials:this.initials(e.name),
          color:this.ownerColors[e.name]||'var(--gray-dark)',
          isCurrent, picked,
          rowStyle:`display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:6px;cursor:pointer;border:1px solid ${picked?'var(--violet)':'transparent'};background:${picked?'var(--violet-lightest)':'#fff'}`,
          onPick:()=>this.pickTransfer(e.id),
        };
      });
      const curEmp=this.EMPLOYEES.find(e=>e.name===t.primary);
      V.transferCanConfirm=!!(tr.pickedId && (!curEmp || tr.pickedId!==curEmp.id));
      V.transferConfirmDisabled=!V.transferCanConfirm;
      V.transferNoResults=!V.transferHasResults;
      V.onConfirmTransfer=()=>this.confirmTransfer();
      V.transferBodyStyle = {flex:'0 0 380px', height:380, overflow:'auto', padding:'0 24px 24px', display:'flex', flexDirection:'column'};
      V.transferFooterNode = React.createElement(React.Fragment, null,
          React.createElement('button', {type:'button', onClick:V.onCloseTransfer, style:{height:40,padding:'0 18px',borderRadius:4,font:'500 13px/1 Graphik,Inter,sans-serif',cursor:'pointer',border:'1px solid #E0E0E0',background:'#fff',color:'#6B7785'}}, 'Cancel'),
          React.createElement('span', {style:{flex:1}}),
          React.createElement('button', {type:'button', onClick:V.transferConfirmDisabled?undefined:V.onConfirmTransfer, disabled:V.transferConfirmDisabled, style:{height:40,padding:'0 20px',borderRadius:4,font:'600 13px/1 Graphik,Inter,sans-serif',cursor:V.transferConfirmDisabled?'not-allowed':'pointer',border:'none',background:V.transferConfirmDisabled?'#F3F3F3':'var(--violet)',color:V.transferConfirmDisabled?'#9FA6B0':'#fff'}}, 'Transfer')
        );
    }
    const pm=st.priorityModal;
    V.priorityModalOpen=!!pm;
    if(pm){
      const t=this.tasks.find(x=>x.id===pm.taskId)||{};
      const labels={high:'High',medium:'Medium',low:'Low'};
      V.priorityTaskName=t.name||'';
      V.priorityCurrentLabel=labels[t.prio]||t.prio||'';
      V.priorityOptions=['high','medium','low'].map(value=>{
        const picked=pm.picked===value, current=t.prio===value;
        return {value,label:labels[value],picked,current,stars:[0,1,2].map(i=>starSvg(i<(value==='high'?3:value==='medium'?2:1))),onPick:()=>this.pickPriority(value),rowStyle:'display:flex;align-items:center;gap:12px;padding:12px;border-radius:6px;cursor:pointer;border:1px solid '+(picked?'var(--violet)':'transparent')+';background:'+(picked?'var(--violet-lightest)':'#fff')};
      });
      const changed=!!pm.picked&&pm.picked!==t.prio;
      V.priorityConfirmDisabled=!changed;
      V.onClosePriority=()=>this.closePriority();
      V.onConfirmPriority=()=>this.confirmPriority();
      V.priorityBodyStyle={flex:'0 0 300px',height:300,overflow:'auto',padding:'0 24px 24px',display:'flex',flexDirection:'column'};
      V.priorityFooterNode=React.createElement(React.Fragment,null,
        React.createElement('button',{type:'button',onClick:V.onClosePriority,style:{height:40,padding:'0 18px',borderRadius:4,font:'500 13px/1 Graphik,Inter,sans-serif',cursor:'pointer',border:'1px solid #E0E0E0',background:'#fff',color:'#6B7785'}},'Cancel'),
        React.createElement('span',{style:{flex:1}}),
        React.createElement('button',{type:'button',onClick:changed?V.onConfirmPriority:undefined,disabled:!changed,style:{height:40,padding:'0 20px',borderRadius:4,font:'600 13px/1 Graphik,Inter,sans-serif',cursor:changed?'pointer':'not-allowed',border:'none',background:changed?'var(--violet)':'#F3F3F3',color:changed?'#fff':'#9FA6B0'}},'Change Priority')
      );
    }
    const tdm=st.timelineDateModal;
    V.timelineDateModalOpen=!!tdm;
    if(tdm){
      const parentId=String(tdm.id||'').split('::')[0];
      const t=this.tasks.find(x=>x.id===parentId)||{};
      V.timelineDateTaskName=t.name||'Task';
      V.timelineDateChangeLabel=tdm.edge==='start'?'Start date':'Due / revised date';
      V.timelineOldStart=this.fmt(this.ganttDate(tdm.oldStart));
      V.timelineNewStart=this.fmt(this.ganttDate(tdm.newStart));
      V.timelineOldEnd=this.fmt(this.ganttDate(tdm.oldEnd));
      V.timelineNewEnd=this.fmt(this.ganttDate(tdm.newEnd));
      V.timelineStartChanged=tdm.oldStart!==tdm.newStart;
      V.timelineEndChanged=tdm.oldEnd!==tdm.newEnd;
      V.timelineStartUnchanged=!V.timelineStartChanged;
      V.timelineEndUnchanged=!V.timelineEndChanged;
      V.timelineNewStartStyle='font-size:13px;font-weight:600;color:'+(V.timelineStartChanged?'var(--violet)':'rgba(16,23,33,.94)');
      V.timelineNewEndStyle='font-size:13px;font-weight:600;color:'+(V.timelineEndChanged?'var(--violet)':'rgba(16,23,33,.94)');
      V.onCancelTimelineDate=()=>this.cancelTimelineDateChange();
      V.onConfirmTimelineDate=()=>this.confirmTimelineDateChange();
      V.timelineDateBodyStyle={flex:'0 0 260px',height:260,overflow:'auto',padding:'0 24px 24px',display:'flex',flexDirection:'column'};
      V.timelineDateFooterNode=React.createElement(React.Fragment,null,
        React.createElement('button',{type:'button',onClick:V.onCancelTimelineDate,style:{height:40,padding:'0 18px',borderRadius:4,font:'500 13px/1 Graphik,Inter,sans-serif',cursor:'pointer',border:'1px solid #E0E0E0',background:'#fff',color:'#6B7785'}},'Cancel'),
        React.createElement('span',{style:{flex:1}}),
        React.createElement('button',{type:'button',onClick:V.onConfirmTimelineDate,style:{height:40,padding:'0 20px',borderRadius:4,font:'600 13px/1 Graphik,Inter,sans-serif',cursor:'pointer',border:'none',background:'var(--violet)',color:'#fff'}},'Confirm Date Change')
      );
    }

    // ================= STATUS-CHANGE MODAL =================
    const sm=st.statusModal;
    V.smOpen=!!sm;
    if(sm){ const t=this.tasks.find(x=>x.id===sm.id)||{};
      V.smKind=sm.kind; V.smIsComplete=sm.kind==='complete'; V.smIsBlock=sm.kind==='block'; V.smIsReopen=sm.kind==='reopen'; V.smIsUnassign=sm.kind==='unassign'; V.smIsRevise=sm.kind==='revise'; V.smIsDue=sm.kind==='due';
      V.smTaskName=t.name;
      V.smTitle= sm.kind==='complete'?'Mark task as completed?' : sm.kind==='block'?'Mark task as blocked?' : sm.kind==='unassign'?'Move to unassigned?' : sm.kind==='revise'?'Set a revised date?' : sm.kind==='due'?'Change due date?' : 'Reopen this task?';
      const smDisplayTarget=sm.kind==='unassign'&&sm.reopenOwner!=='__no_owner__'?'not_started':sm.target;
      V.smTargetLabel= smDisplayTarget?S[smDisplayTarget].label:'';
      V.smSourceLabel=(S[t.status]&&S[t.status].label)||t.status||'';
      V.smDueLabel=this.fmt(t.due); V.smDate=sm.date; V.smReviseReason=sm.reviseReason;
      V.smDateMin=((t.start||'')>this.realToday()?(t.start||''):this.realToday());
      V.onSMDate=(e)=>this.setSM('date',e.target.value);
      V.onSMReviseReason=(e)=>this.setSM('reviseReason',e.target.value);
      V.smClosing=sm.closingRemark; V.smBlockerReason=sm.blockerReason; V.smBlockerOwner=sm.blockerOwner; V.smReopen=sm.reopenReason; V.smReopenOwner=sm.reopenOwner||'';
      V.onSMClosing=(e)=>this.setSM('closingRemark',e.target.value);
      V.onSMBlockerReason=(e)=>this.setSM('blockerReason',e.target.value);
      V.onSMBlockerOwner=(e)=>this.setSM('blockerOwner',e.target.value);
      V.onSMReopen=(e)=>this.setSM('reopenReason',e.target.value);
      V.onSMReopenOwner=(value)=>this.setSM('reopenOwner',value);
      V.smError=!!sm.error; V.smErrorMsg=sm.error;
      V.smClosingMissing=false;
      V.smBlockerReasonMissing=V.smError&&V.smIsBlock&&!String(sm.blockerReason||'').trim();
      V.smDateMissing=V.smError&&(V.smIsRevise||V.smIsDue)&&!String(sm.date||'').trim();
      V.smReviseReasonMissing=V.smError&&V.smIsRevise&&!String(sm.reviseReason||'').trim();
      const smInvalid=missing=>'border:'+(missing?'1px solid var(--red);box-shadow:0 0 0 1px var(--red)':'1px solid #E0E0E0');
      V.smClosingStyle='width:100%;min-height:64px;border-radius:10px;padding:10px 12px;font-size:13px;font-family:inherit;outline:0;resize:vertical;'+smInvalid(V.smClosingMissing);
      V.smBlockerReasonStyle='width:100%;min-height:60px;border-radius:10px;padding:10px 12px;font-size:13px;font-family:inherit;outline:0;resize:vertical;margin-bottom:12px;'+smInvalid(V.smBlockerReasonMissing);
      V.smDateStyle='width:100%;height:38px;border-radius:10px;padding:0 11px;font-size:13px;font-family:inherit;outline:0;background:#fff;'+smInvalid(V.smDateMissing);
      V.smReviseReasonStyle='width:100%;min-height:60px;border-radius:10px;padding:10px 12px;font-size:13px;font-family:inherit;outline:0;resize:vertical;'+smInvalid(V.smReviseReasonMissing);
      V.smCta= sm.kind==='complete'?'Mark as Completed' : sm.kind==='block'?'Mark as Blocked' : sm.kind==='unassign'?(sm.reopenOwner==='__no_owner__'?'Move to Unassigned':'Move to Pending') : sm.kind==='revise'?'Save Revised Date' : sm.kind==='due'?'Save Due Date' : 'Reopen Task';
      V.smCtaStyle= 'flex:1;height:40px;border:0;color:#fff;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;background:'
        + (sm.kind==='block' ? 'var(--red)' : sm.kind==='complete' ? 'var(--emerald)' : sm.kind==='revise' ? '#c98a12' : 'var(--violet)');
      V.smOwnerOptions=this.OWNERS;
      V.smReopenOwnerOptions=[{value:'__no_owner__',label:'No owner'}].concat(this.eligibleOwners().map(e=>({value:e.name,label:e.name})));
      V.onConfirmSM=()=>this.confirmSM(); V.onCancelSM=()=>this.cancelSM();
    }
    const ua=st.unassignedAssign;
    V.unassignedBlockOpen=!!ua;
    if(ua){
      const ut=this.tasks.find(x=>x.id===ua.taskId)||{};
      V.unassignedBlockName=ut.name||'';
      V.unassignedOwnerId=ua.pickedId||'';
      V.unassignedOwnerOptions=[{value:'',label:'Select task owner…'},...this.eligibleOwners().map(e=>({value:e.id,label:e.name}))];
      V.onUnassignedOwner=v=>this.setUnassignedOwner(v);
      V.unassignedCanContinue=!!ua.pickedId;
      V.unassignedContinueDisabled=!ua.pickedId;
      V.unassignedContinueStyle='width:100%;height:40px;border-radius:6px;border:0;font-size:13px;font-weight:600;font-family:inherit;'+(ua.pickedId?'background:var(--violet);color:#fff;cursor:pointer':'background:#EDEDED;color:var(--gray);cursor:not-allowed');
    }
    V.onCloseUnassignedBlock=()=>this.closeUnassignedBlock(); V.onConfirmUnassignedOwner=()=>this.confirmUnassignedOwner();

    // ================= TOAST =================
    V.toastOpen=!!st.toast;
    if(st.toast){
      const kind=st.toast.type||'success';
      V.toastMsg=st.toast.msg;
      V.toastType = kind==='success' ? 'success' : kind==='error' ? 'error' : 'default';
      V.toastExtraProps = kind==='move' ? {style:{background:'var(--violet)'}} : null;
      V.onDismissToast = ()=>this.dismissToast();
    }

    return V;
  }
}
