(() => {
  "use strict";
  const content = window.SIT_CONTENT;
  if (!content) return;
  const escape = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const safeUrl = value => {
    const url = String(value || "").trim();
    if (!url || /[\u0000-\u001f]/.test(url) || url.startsWith("//") || url.includes("\\")) return "";
    if (/^(https?:|mailto:)/i.test(url)) return url;
    if (/^[a-z][a-z\d+.-]*:/i.test(url)) return "";
    return url;
  };
  const link = (url, label, className = "resource-link") => {
    const safe = safeUrl(url);
    return safe ? `<a class="${className}" href="${escape(safe)}">${escape(label)}</a>` : "";
  };
  const emailLink = (email, label) => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? link(`mailto:${email}`, label) : "";
  const badge = (sample,label="Sample entry") => sample ? `<span class="sample-badge">${label}</span>` : "";
  const empty = (title,description) => `<div class="empty-state"><h2>${escape(title)}</h2><p>${escape(description)}</p></div>`;
  const set = (selector,html) => {const el=document.querySelector(selector);if(el) el.innerHTML=html;};
  const text = (selector,value) => document.querySelectorAll(selector).forEach(el=>{el.textContent=value;});
  const list = name => Array.isArray(content[name]) ? content[name] : [];
  const number = i => String(i+1).padStart(2,"0");
  const lab=content.lab || {};
  text("[data-lab-name]",lab.name || "SIT Lab");
  text("[data-full-name]",lab.fullName || "Spatial-Info(rmation)-(in)Telligence");
  text("[data-description]",lab.description || "");
  text("[data-tagline]",lab.tagline || "");
  text("[data-year]",new Date().getFullYear());
  set("[data-contact]",[
    lab.institution ? `<p>${escape(lab.institution)}</p>` : "",
    lab.location ? `<p>${escape(lab.location)}</p>` : "",
    emailLink(lab.email,lab.email),link(lab.scholarUrl,"Google Scholar"),link(lab.githubUrl,"GitHub")
  ].join(""));

  const menu=document.querySelector(".menu-toggle");
  const nav=document.querySelector("#main-navigation");
  function closeMenu(){if(menu && nav){menu.setAttribute("aria-expanded","false");menu.textContent="Menu";nav.classList.remove("is-open");document.body.classList.remove("menu-open");}}
  if(menu && nav){
    menu.hidden=false;
    menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"Close":"Menu";nav.classList.toggle("is-open",open);document.body.classList.toggle("menu-open",open);});
    document.addEventListener("keydown",event=>{if(event.key==="Escape" && menu.getAttribute("aria-expanded")==="true"){closeMenu();menu.focus();}});
    document.addEventListener("click",event=>{if(!event.target.closest(".site-header")) closeMenu();});
    nav.addEventListener("click",event=>{if(event.target.closest("a")) closeMenu();});
    window.addEventListener("resize",()=>{if(window.innerWidth>880) closeMenu();},{passive:true});
  }
  set("#research-areas",list("researchAreas").map((area,i)=>`<article class="research-area" data-reveal><span class="index">${number(i)}</span><h3>${escape(area.title)}</h3><p>${escape(area.description)}</p></article>`).join(""));
  // Degree order, then alphabetical order by the displayed name.
  const studentDegreeRank=student=>{
    const role=String(student.role||"").toLowerCase().replace(/[.\s’']/g,"");
    if(/phd|doctoral|doctorate/.test(role)) return 0;
    if(/master/.test(role)) return 1;
    if(/undergrad|bachelor/.test(role)) return 2;
    return 3;
  };
  const students=[...list("students")].sort((a,b)=>studentDegreeRank(a)-studentDegreeRank(b)||String(a.name||"").localeCompare(String(b.name||""),"en",{sensitivity:"base"}));
  function studentCard(student,i,heading){
    const photo=safeUrl(student.photo);
    const position=/^(center|top|bottom|left|right)$/.test(student.photoPosition)?student.photoPosition:"center";
    const links=link(student.website,"Website")+emailLink(student.email,"Email");
    return `<article class="student-card" data-reveal style="--delay:${i%3*65}ms"><div class="portrait${photo?" has-photo":""}">${photo?`<img src="${escape(photo)}" alt="${escape(student.name)}" loading="lazy" style="object-position:${position}">`:""}<div class="portrait-placeholder"${photo?" hidden":""}><span class="portrait-number" aria-hidden="true">${number(i)}</span><span>Photo to come</span></div>${student.sample?'<span class="portrait-label">Sample profile</span>':""}</div><div class="student-body"><${heading}>${escape(student.name)}</${heading}>${student.role?`<p class="student-role">${escape(student.role)}</p>`:""}${student.interests?`<p class="student-interests">${escape(student.interests)}</p>`:""}${links?`<div class="resource-links">${links}</div>`:""}</div></article>`;
  }
  set("#student-grid",students.length?students.map((s,i)=>studentCard(s,i,"h2")).join(""):empty("Meet the people soon","Lab member profiles will be added here."));
  set("#home-student-grid",students.length?students.slice(0,6).map((s,i)=>studentCard(s,i,"h3")).join(""):empty("Meet the people soon","Lab member profiles will be added here."));
  document.querySelectorAll(".portrait img").forEach(img=>{
    const fallback=()=>{img.hidden=true;img.parentElement.classList.remove("has-photo");img.parentElement.querySelector(".portrait-placeholder").hidden=false;};
    img.addEventListener("error",fallback);if(img.complete && !img.naturalWidth) fallback();
  });
  const publications=[...list("publications")].sort((a,b)=>(Number(b.year)||0)-(Number(a.year)||0));
  let previousYear;
  set("#publication-list",publications.length?publications.map((p,i)=>{
    const year=p.year||"Undated";const heading=previousYear!==year?`<h2 class="year-heading">${escape(year)}</h2>`:"";previousYear=year;
    return `${heading}<article class="publication" id="publication-${i+1}" data-reveal><div class="publication-index">${number(i)}</div><div class="publication-body"><div class="item-meta"><span>${escape(p.type)}</span>${badge(p.sample)}</div><h3>${escape(p.title)}</h3><p class="authors">${escape(p.authors)}</p><p class="venue">${escape(p.venue)}</p><div class="resource-links">${link(p.paperUrl,"Paper")}${link(p.codeUrl,"Code")}${link(p.dataUrl,"Data")}</div>${p.abstract?`<details class="abstract"><summary>Abstract</summary><p>${escape(p.abstract)}</p></details>`:""}</div></article>`;
  }).join(""):empty("Publications are on the way","Our published research will appear here."));
  set("#home-publications",publications.length?publications.slice(0,3).map((p,i)=>`<article class="mini-publication"><span class="index">${escape(p.year||"—")}</span><div><h3><a href="publications.html#publication-${i+1}">${escape(p.title)}</a></h3><p>${escape(p.venue)}</p>${badge(p.sample)}</div></article>`).join(""):empty("Work in progress","Our published research will appear here."));
  const talks=[...list("presentations")].sort((a,b)=>String(b.date||"").localeCompare(String(a.date||"")));
  function dateText(item){
    if(!item.date) return escape(item.dateLabel||"Date to be announced");
    const date=new Date(`${item.date}T12:00:00`);
    if(Number.isNaN(date.getTime())) return escape(item.dateLabel||item.date);
    return `<time datetime="${escape(item.date)}">${date.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}</time>`;
  }
  set("#presentation-list",talks.length?talks.map((t,i)=>`<article class="talk" id="talk-${i+1}" data-reveal><div class="talk-date"><span class="index">${number(i)} /</span><span>${dateText(t)}</span></div><div class="talk-main"><div class="item-meta"><span>${escape(t.type)}</span>${badge(t.sample)}</div><h2>${escape(t.title)}</h2><p class="talk-event">${escape(t.event)}</p><p class="talk-summary">${escape(t.summary)}</p><div class="talk-bottom"><span class="speaker">${escape(t.speaker)}</span><div class="resource-links">${link(t.slidesUrl,"Slides")}${link(t.videoUrl,"Recording")}${link(t.eventUrl,"Event")}</div></div></div></article>`).join(""):empty("More conversations to come","Conference talks, invited presentations, and posters will appear here."));
  set("#home-presentations",talks.length?talks.slice(0,2).map((t,i)=>`<article class="mini-talk"><div class="item-meta"><span>${escape(t.type)}</span>${badge(t.sample)}</div><h3><a href="presentations.html#talk-${i+1}">${escape(t.title)}</a></h3><p>${escape(t.event)}</p></article>`).join(""):empty("More conversations to come","Talks and presentations will appear here."));
  const projects=list("projects");
  const landscape="assets/images/spatial-landscape.webp";
  const projectImage=p=>safeUrl(p.image)||landscape;
  set("#project-showcase",projects.length?projects.slice(0,3).map((p,i)=>`<article class="showcase-card" data-reveal><a class="showcase-image" href="projects.html#project-${i+1}" aria-label="Read about ${escape(p.title)}"><span class="image-index">${number(i)} /</span><img src="${escape(projectImage(p))}" width="1536" height="1024" alt="${escape(p.imageAlt||"")}" loading="lazy"></a><div class="showcase-body"><div class="item-meta"><span>${escape(p.category)}</span>${badge(p.sample,"Example project")}</div><h3><a href="projects.html#project-${i+1}">${escape(p.title)}</a></h3><p>${escape(p.question||p.summary)}</p></div></article>`).join(""):empty("New questions, new projects","Our ongoing research projects will appear here."));
  set("#project-list",projects.length?projects.map((p,i)=>`<article class="project" id="project-${i+1}" data-reveal><div class="project-side"><span class="project-number">${number(i)}</span><span class="project-category">${escape(p.category)}</span><img src="${escape(projectImage(p))}" width="1536" height="1024" alt="${escape(p.imageAlt||"")}" loading="lazy"></div><div class="project-body"><div class="item-meta"><span>${escape(p.status)}</span>${badge(p.sample,"Example project")}</div><h2>${escape(p.title)}</h2><p class="project-summary">${escape(p.summary)}</p><div class="project-detail-grid">${p.question?`<div><h3>Research question</h3><p>${escape(p.question)}</p></div>`:""}${p.approach?`<div><h3>Our approach</h3><p>${escape(p.approach)}</p></div>`:""}</div>${p.team?`<p class="project-note"><strong>Team</strong>${escape(p.team)}</p>`:""}${p.funding?`<p class="project-note"><strong>Support</strong>${escape(p.funding)}</p>`:""}<div class="resource-links">${link(p.projectUrl,"Project website")}${link(p.codeUrl,"Code")}</div></div></article>`).join(""):empty("New questions, new projects","Our ongoing research projects will appear here."));
  document.querySelectorAll("[data-note-for]").forEach(note=>{if(!list(note.dataset.noteFor).some(record=>record.sample)) note.remove();});

  // Motion progressively enhances the page; no scroll hijacking or continuous loop.
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionButton=document.querySelector(".motion-toggle");
  let userReduced=false;
  try{userReduced=localStorage.getItem("sit-reduce-motion")==="true";}catch(_){}
  let motionOff=userReduced||reduced.matches;
  let observer;
  function syncMotion(){
    motionOff=userReduced||reduced.matches;
    document.documentElement.classList.toggle("motion-disabled",motionOff);
    document.documentElement.classList.toggle("motion-enabled",!motionOff && "IntersectionObserver" in window);
    if(motionButton){motionButton.hidden=false;motionButton.setAttribute("aria-pressed",String(motionOff));motionButton.textContent=reduced.matches?"Reduced motion · device setting":motionOff?"Enable motion":"Reduce motion";motionButton.disabled=reduced.matches;}
    if(observer) observer.disconnect();
    if(!motionOff && "IntersectionObserver" in window){
      observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.06,rootMargin:"0px 0px -30px 0px"});
      document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach(el=>observer.observe(el));
    }
    updateScroll();
  }
  const progress=document.querySelector(".scroll-progress");
  const heroImage=document.querySelector(".hero-visual img");
  let ticking=false;
  function updateScroll(){
    const distance=document.documentElement.scrollHeight-window.innerHeight;
    if(progress) progress.style.transform=`scaleX(${distance>0?Math.min(1,Math.max(0,window.scrollY/distance)):0})`;
    if(heroImage && !motionOff && window.innerWidth>760 && window.scrollY<window.innerHeight*1.5) heroImage.style.transform=`translateY(${Math.min(window.scrollY*.12,105)}px) scale(1.05)`;
    else if(heroImage) heroImage.style.transform="";
    ticking=false;
  }
  window.addEventListener("scroll",()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll);}},{passive:true});
  window.addEventListener("resize",updateScroll,{passive:true});
  if(reduced.addEventListener) reduced.addEventListener("change",syncMotion);
  if(motionButton) motionButton.addEventListener("click",()=>{userReduced=!motionOff;try{localStorage.setItem("sit-reduce-motion",String(userReduced));}catch(_){}syncMotion();});
  syncMotion();
  window.addEventListener("sit:route",()=>{closeMenu();syncMotion();});
  // A no-script visitor can still use every navigation link on narrow screens.
})();
