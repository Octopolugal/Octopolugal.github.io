(() => {
  "use strict";
  const content = window.SIT_CONTENT;
  if (!content) return;
  const escape = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
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
  const sampleBadge = sample => sample ? '<span class="sample-badge">Sample entry</span>' : "";
  const empty = (title, description) => `<div class="empty-state"><h2>${escape(title)}</h2><p>${escape(description)}</p></div>`;
  const set = (selector, html) => { const element = document.querySelector(selector); if (element) element.innerHTML = html; };
  const text = (selector, value) => document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
  const list = name => Array.isArray(content[name]) ? content[name] : [];

  text("[data-lab-name]", content.lab.name);
  text("[data-full-name]", content.lab.fullName);
  text("[data-description]", content.lab.description);
  text("[data-tagline]", content.lab.tagline);
  text("[data-year]", new Date().getFullYear());
  if (content.lab.institution) text("[data-institution]", content.lab.institution);
  const contact = [
    content.lab.institution ? `<p>${escape(content.lab.institution)}</p>` : "",
    content.lab.location ? `<p>${escape(content.lab.location)}</p>` : "",
    emailLink(content.lab.email, content.lab.email),
    link(content.lab.scholarUrl, "Google Scholar"),
    link(content.lab.githubUrl, "GitHub")
  ].join("");
  if (contact) set("[data-contact]", `<h2>Connect with the lab</h2><div class="footer-contact">${contact}</div>`);

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-navigation");
  const closeMenu = () => { if (menu && nav) { menu.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); } };
  if (menu && nav) {
    menu.hidden = false;
    menu.addEventListener("click", () => {
      const expanded = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { closeMenu(); menu.focus(); }
    });
    document.addEventListener("click", event => { if (!event.target.closest(".site-header")) closeMenu(); });
    nav.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
  }

  const areas = list("researchAreas");
  set("#research-areas", areas.map((area, i) => `<article class="research-area"><span class="index-number">0${i + 1}</span><h3>${escape(area.title)}</h3><p>${escape(area.description)}</p></article>`).join(""));

  const students = list("students");
  set("#student-grid", students.length ? students.map((student, i) => {
    const photo = safeUrl(student.photo);
    const position = /^(center|top|bottom|left|right)$/.test(student.photoPosition) ? student.photoPosition : "center";
    return `<article class="student-card"><div class="portrait${photo ? " has-photo" : ""}">
      ${photo ? `<img src="${escape(photo)}" alt="${escape(student.name)}" loading="lazy" style="object-position:${position}">` : ""}
      <div class="portrait-placeholder"${photo ? ' hidden' : ""}><span class="portrait-number">${String(i + 1).padStart(2, "0")}</span><span>Photo to come</span></div>
      ${student.sample ? '<span class="portrait-label">Sample profile</span>' : ""}
    </div><div class="student-body"><h2>${escape(student.name)}</h2><p class="student-role">${escape(student.role)}</p><p class="student-interests">${escape(student.interests)}</p><div class="resource-links">${link(student.website, "Website")}${emailLink(student.email, "Email")}</div></div></article>`;
  }).join("") : empty("Meet our students soon", "Student profiles will be added here."));
  document.querySelectorAll(".portrait img").forEach(img => img.addEventListener("error", () => {
    img.hidden = true;
    img.parentElement.classList.remove("has-photo");
    img.parentElement.querySelector(".portrait-placeholder").hidden = false;
  }));

  const publications = [...list("publications")].sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
  let previousYear;
  set("#publication-list", publications.length ? publications.map((publication, i) => {
    const year = publication.year || "Undated";
    const heading = previousYear !== year ? `<h2 class="year-heading">${escape(year)}</h2>` : "";
    previousYear = year;
    return `${heading}<article class="publication"><div class="publication-index">${String(i + 1).padStart(2, "0")}</div><div class="publication-body"><div class="item-meta"><span>${escape(publication.type)}</span>${sampleBadge(publication.sample)}</div><h3>${escape(publication.title)}</h3><p class="authors">${escape(publication.authors)}</p><p class="venue">${escape(publication.venue)}</p><div class="resource-links">${link(publication.paperUrl, "Paper")}${link(publication.codeUrl, "Code")}${link(publication.dataUrl, "Data")}</div>${publication.abstract ? `<details class="abstract"><summary>Abstract</summary><p>${escape(publication.abstract)}</p></details>` : ""}</div></article>`;
  }).join("") : empty("Publications are on the way", "Our published research will appear here."));

  const talks = [...list("presentations")].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  const dateText = item => {
    if (!item.date) return escape(item.dateLabel || "Date to be announced");
    const date = new Date(`${item.date}T12:00:00`);
    if (Number.isNaN(date.getTime())) return escape(item.dateLabel || item.date);
    return `<time datetime="${escape(item.date)}">${date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>`;
  };
  set("#presentation-list", talks.length ? talks.map((talk, i) => `<article class="talk"><div class="talk-date"><span class="index-number">${String(i + 1).padStart(2, "0")}</span><span>${dateText(talk)}</span></div><div class="talk-main"><div class="item-meta"><span>${escape(talk.type)}</span>${sampleBadge(talk.sample)}</div><h2>${escape(talk.title)}</h2><p class="talk-event">${escape(talk.event)}</p><p class="talk-summary">${escape(talk.summary)}</p><div class="talk-bottom"><span class="speaker">${escape(talk.speaker)}</span><div class="resource-links">${link(talk.slidesUrl, "Slides")}${link(talk.videoUrl, "Recording")}${link(talk.eventUrl, "Event")}</div></div></div></article>`).join("") : empty("More conversations to come", "Conference talks, invited presentations, and posters will appear here."));

  const projects = list("projects");
  set("#project-list", projects.length ? projects.map((project, i) => `<article class="project" id="project-${i + 1}"><div class="project-side"><span class="project-number">${String(i + 1).padStart(2, "0")}</span><span class="project-category">${escape(project.category)}</span></div><div class="project-body"><div class="item-meta"><span class="status">${escape(project.status)}</span>${sampleBadge(project.sample)}</div><h2>${escape(project.title)}</h2><p class="project-summary">${escape(project.summary)}</p><div class="project-detail-grid">${project.question ? `<div><h3>Research question</h3><p>${escape(project.question)}</p></div>` : ""}${project.approach ? `<div><h3>Our approach</h3><p>${escape(project.approach)}</p></div>` : ""}</div>${project.team ? `<p class="project-note"><strong>Team</strong> ${escape(project.team)}</p>` : ""}${project.funding ? `<p class="project-note"><strong>Support</strong> ${escape(project.funding)}</p>` : ""}<div class="resource-links">${link(project.projectUrl, "Project website")}${link(project.codeUrl, "Code")}</div></div></article>`).join("") : empty("New questions, new projects", "Our ongoing research projects will appear here."));

  const currentPage = document.body.dataset.page;
  const pageRecords = { students, publications, presentations: talks, projects }[currentPage];
  if (pageRecords && !pageRecords.some(record => record.sample)) {
    const note = document.querySelector(".preview-note");
    if (note) note.remove();
  }
})();
