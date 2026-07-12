const COVER_PILLARS = [
  ["01", "Clareza", "Escopo estruturado para decisão executiva."],
  ["02", "Execução", "Operação orientada por método e acompanhamento."],
  ["03", "Resultado", "Foco em avanço comercial e conversão."],
];

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function textOf(root, selector, fallback = "") {
  return root?.querySelector(selector)?.textContent?.trim() || fallback;
}

function setTextIfChanged(element, value) {
  if (element && element.textContent !== value) element.textContent = value;
}

function setHtmlIfChanged(element, value) {
  if (element && element.innerHTML !== value) element.innerHTML = value;
}

function ensureFinalPolishStyles() {
  if (document.getElementById("executive-final-layout-guard")) return;
  const style = document.createElement("style");
  style.id = "executive-final-layout-guard";
  style.textContent = `
    .pdf-page { padding: 42px 62px 36px !important; }
    .pdf-page__body { padding-top: 22px !important; }
    .pdf-cover { padding: 16px 8px 0 !important; }
    .pdf-page img,
    .pdf-page img[class*="logo"],
    .pdf-cover__logo-card img,
    .pdf-edney__brands img,
    .pdf-closing__logos img,
    .pdf-summary__client-logo img {
      object-fit: contain !important;
      object-position: center !important;
    }
    .pdf-edney { grid-template-columns: 286px minmax(0, 1fr) !important; gap: 44px !important; }
    .pdf-edney__visual::before { inset: 12px 0 0 12px !important; }
    .pdf-edney__content .pdf-page__title { font-size: 30px !important; }
    .pdf-edney__bio-list { gap: 6px !important; margin-top: 14px !important; }
    .pdf-edney__bio-list li { font-size: 10px !important; line-height: 1.32 !important; }
    .pdf-scope-investment { display: flex !important; flex-direction: column !important; }
    .pdf-scope-investment .pdf-page__title { max-width: 830px !important; font-size: 29px !important; }
    .pdf-scope-investment .pdf-page__subtitle { max-width: 940px !important; font-size: 11.5px !important; line-height: 1.46 !important; }
    .pdf-scope-investment__layout { flex: 1 !important; min-height: 0 !important; display: grid !important; grid-template-columns: minmax(0, 1fr) 310px !important; gap: 18px !important; margin-top: 18px !important; }
    .pdf-scope-investment__scope,
    .pdf-scope-investment__commercial,
    .pdf-scope-investment__group,
    .pdf-scope-investment__value,
    .pdf-scope-investment__conditions div,
    .pdf-scope-investment__note { border: 1px solid rgba(255,255,255,.14) !important; border-radius: 8px !important; background: rgba(255,255,255,.06) !important; box-shadow: 0 18px 40px rgba(0,0,0,.22) !important; }
    .pdf-scope-investment__scope { min-height: 0 !important; display: flex !important; flex-direction: column !important; padding: 17px !important; }
    .pdf-scope-investment__section-head { display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 18px !important; padding: 0 0 12px !important; border-bottom: 1px solid rgba(255,255,255,.12) !important; }
    .pdf-scope-investment__section-head span,
    .pdf-scope-investment__value span,
    .pdf-scope-investment__conditions span,
    .pdf-scope-investment__note span { color: var(--pdf-accent,#5bbfc8) !important; font-size: 8.4px !important; font-weight: 950 !important; letter-spacing: .14em !important; text-transform: uppercase !important; }
    .pdf-scope-investment__section-head strong { color: var(--pdf-text,#fff) !important; font-size: 14px !important; }
    .pdf-scope-investment__groups { min-height: 0 !important; display: grid !important; grid-template-columns: repeat(2,minmax(0,1fr)) !important; gap: 10px !important; margin-top: 13px !important; }
    .pdf-scope-investment__group { min-height: 0 !important; padding: 12px 13px !important; border-top: 4px solid var(--pdf-accent,#5bbfc8) !important; }
    .pdf-scope-investment__group header { display: flex !important; align-items: center !important; gap: 9px !important; margin-bottom: 9px !important; }
    .pdf-scope-investment__group header > span { width: 24px !important; height: 24px !important; flex: 0 0 24px !important; display: flex !important; align-items: center !important; justify-content: center !important; border-radius: 5px !important; background: var(--pdf-accent,#5bbfc8) !important; color: var(--pdf-on-accent,#151719) !important; font-size: 8px !important; font-weight: 950 !important; }
    .pdf-scope-investment__group h3 { color: var(--pdf-text,#fff) !important; font-size: 10.6px !important; line-height: 1.18 !important; text-transform: uppercase !important; }
    .pdf-scope-investment__group ul { display: grid !important; gap: 5.5px !important; }
    .pdf-scope-investment__group li { display: grid !important; grid-template-columns: 10px minmax(0,1fr) !important; gap: 7px !important; color: var(--pdf-text,#fff) !important; font-size: 8.9px !important; line-height: 1.28 !important; }
    .pdf-scope-investment__group li > span { width: 8px !important; height: 8px !important; margin-top: 2px !important; border-radius: 2px !important; background: var(--pdf-accent,#5bbfc8) !important; }
    .pdf-scope-investment__group p { margin: 0 !important; }
    .pdf-scope-investment__commercial { min-height: 0 !important; display: flex !important; flex-direction: column !important; gap: 11px !important; padding: 15px !important; background: var(--pdf-accent-faint,rgba(91,191,200,.07)) !important; }
    .pdf-scope-investment__value { padding: 18px !important; border-left: 5px solid var(--pdf-accent,#5bbfc8) !important; background: rgba(255,255,255,.08) !important; }
    .pdf-scope-investment__value strong { display: block !important; margin-top: 10px !important; color: var(--pdf-accent,#5bbfc8) !important; font-size: 31px !important; line-height: 1 !important; }
    .pdf-scope-investment__value small { display: block !important; margin-top: 8px !important; color: var(--pdf-muted,#b9bdc1) !important; font-size: 9.2px !important; }
    .pdf-scope-investment__conditions { display: grid !important; gap: 8px !important; }
    .pdf-scope-investment__conditions div { min-height: 54px !important; padding: 11px 13px !important; }
    .pdf-scope-investment__conditions strong { display: block !important; margin-top: 5px !important; color: var(--pdf-text,#fff) !important; font-size: 12.2px !important; line-height: 1.2 !important; }
    .pdf-scope-investment__note { margin-top: auto !important; padding: 12px 13px !important; }
    .pdf-scope-investment__note p { margin-top: 7px !important; color: var(--pdf-muted,#b9bdc1) !important; font-size: 8.7px !important; line-height: 1.34 !important; }
  `;
  document.head.appendChild(style);
}

function enhancePdfTemplate(root = document) {
  root.querySelectorAll(".pdf-cover").forEach((cover) => {
    if (!cover.querySelector(".pdf-cover__pillars")) {
      const client = cover.querySelector(".pdf-cover__client");
      if (client) {
        const pillars = document.createElement("div");
        pillars.className = "pdf-cover__pillars";
        pillars.innerHTML = COVER_PILLARS.map(([number, title, text]) => `<div><span>${number}</span><strong>${title}</strong><small>${text}</small></div>`).join("");
        client.insertAdjacentElement("afterend", pillars);
      }
    }
    cover.querySelector(".pdf-cover__group-logo")?.remove();
    const content = cover.querySelector(".pdf-cover__content");
    const logos = cover.querySelector(".pdf-cover__logos");
    if (content && logos && !content.querySelector(".pdf-cover__copy")) {
      const copy = document.createElement("div");
      copy.className = "pdf-cover__copy";
      [".pdf-cover__eyebrow", ".pdf-cover__title", ".pdf-cover__client", ".pdf-cover__pillars"].forEach((selector) => {
        const element = content.querySelector(`:scope > ${selector}`);
        if (element) copy.appendChild(element);
      });
      content.insertBefore(copy, logos);
    }
  });
}

function summarizeItems(items, limit = 4) {
  const clean = items.map((item) => item.trim()).filter(Boolean);
  const selected = clean.slice(0, limit);
  if (clean.length > limit) selected.push(`+ ${clean.length - limit} itens complementares detalhados no alinhamento operacional.`);
  return selected;
}

function collectScopeGroups(pages) {
  const grouped = new Map();
  pages.filter((page) => page.querySelector(".pdf-scope-page")).forEach((page) => {
    page.querySelectorAll(".pdf-scope__card").forEach((card) => {
      const title = textOf(card, "h3", "Escopo").replace(/continuação/gi, "").trim();
      const items = [...card.querySelectorAll("li")].map((li) => li.textContent.trim()).filter(Boolean);
      if (!grouped.has(title)) grouped.set(title, []);
      grouped.get(title).push(...items);
    });
  });
  const groups = [...grouped.entries()].slice(0, 4).map(([title, items], index) => ({
    title,
    items: summarizeItems(items, index === 0 ? 5 : 4),
  }));
  if (!groups.length) groups.push({ title: "Escopo da proposta", items: ["Escopo executivo consolidado conforme alinhamento comercial."] });
  return groups;
}

function readCommercial(pages) {
  const investment = pages.find((page) => page.querySelector(".pdf-investment"));
  const value = textOf(investment, ".pdf-investment__hero > strong", "Investimento a definir");
  const conditions = investment
    ? [...investment.querySelectorAll(".pdf-investment__condition")].map((item) => [textOf(item, "small"), textOf(item, "strong")]).filter(([, valueText]) => valueText)
    : [];
  const note = textOf(investment, ".pdf-investment__notes p");
  return { value, conditions, note };
}

function buildScopeInvestmentPage(pages) {
  const existing = pages.find((page) => page.querySelector(".pdf-scope-investment"));
  if (existing) return existing;

  const template = pages.find((page) => page.querySelector(".pdf-scope-page")) || pages.find((page) => page.querySelector(".pdf-investment")) || pages[1];
  if (!template) return null;

  const page = template.cloneNode(true);
  page.dataset.section = "Escopo e investimento";
  const body = page.querySelector(".pdf-page__body");
  if (!body) return page;

  const groups = collectScopeGroups(pages);
  const commercial = readCommercial(pages);
  const title = textOf(template, ".pdf-page__title", "Proposta executiva");
  const subtitle = textOf(template, ".pdf-page__subtitle", "Escopo consolidado em formato executivo para decisão comercial.");
  const conditions = commercial.conditions.length ? commercial.conditions : [["Investimento", commercial.value]];

  body.className = "pdf-page__body pdf-scope-investment";
  body.innerHTML = `
    <div class="pdf-page__eyebrow">Escopo e investimento</div>
    <h2 class="pdf-page__title">${escapeHtml(title)}</h2>
    <p class="pdf-page__subtitle">${escapeHtml(subtitle)}</p>
    <div class="pdf-scope-investment__layout">
      <section class="pdf-scope-investment__scope">
        <div class="pdf-scope-investment__section-head"><span>Escopo consolidado</span><strong>Entregas principais</strong></div>
        <div class="pdf-scope-investment__groups">
          ${groups.map((group, groupIndex) => `
            <article class="pdf-scope-investment__group">
              <header><span>${String(groupIndex + 1).padStart(2, "0")}</span><h3>${escapeHtml(group.title)}</h3></header>
              <ul>${group.items.map((item) => `<li><span></span><p>${escapeHtml(item)}</p></li>`).join("")}</ul>
            </article>`).join("")}
        </div>
      </section>
      <aside class="pdf-scope-investment__commercial">
        <div class="pdf-scope-investment__value"><span>Investimento total</span><strong>${escapeHtml(commercial.value)}</strong><small>para execução do escopo consolidado</small></div>
        <div class="pdf-scope-investment__conditions">
          ${conditions.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
        </div>
        ${commercial.note ? `<div class="pdf-scope-investment__note"><span>Observação</span><p>${escapeHtml(commercial.note)}</p></div>` : ""}
      </aside>
    </div>`;
  return page;
}

function chooseFivePages(root) {
  const pages = [...root.querySelectorAll(":scope > .pdf-page")];
  if (!pages.length) return [];
  const cover = pages[0];
  const summary = pages.find((page) => /visão|visao/i.test(page.dataset.section || "")) || pages[1];
  const edney = pages.find((page) => page.querySelector(".pdf-edney"));
  const scopeInvestment = buildScopeInvestmentPage(pages);
  const closing = pages.find((page) => page.querySelector(".pdf-closing")) || pages[pages.length - 1];
  return [cover, summary, edney, scopeInvestment, closing].filter(Boolean).slice(0, 5);
}

function renumberPageSet(pages) {
  const total = pages.length;
  pages.forEach((page, index) => {
    const pageNumber = String(index + 1).padStart(2, "0");
    const totalNumber = String(total).padStart(2, "0");
    const label = page.dataset.section || "Proposta";
    setHtmlIfChanged(page.querySelector(".pdf-topmark__label"), `${pageNumber} &nbsp; ${escapeHtml(label)}`);
    setTextIfChanged(page.querySelector(".pdf-footer span:last-child"), `${pageNumber} / ${totalNumber}`);
    setTextIfChanged(page.querySelector(".pdf-page__watermark"), pageNumber);
    const coverPages = page.querySelector(".pdf-cover__meta div:last-child strong");
    setTextIfChanged(coverPages, totalNumber);
  });
}

function buildSheetForPage(page, index) {
  const sheet = document.createElement("section");
  sheet.className = "proposal-preview__sheet";
  sheet.setAttribute("aria-label", `Página ${index + 1}`);
  sheet.innerHTML = `<div class="proposal-preview__sheet-heading"><span>Página ${String(index + 1).padStart(2, "0")}</span><span>${escapeHtml(page.dataset.section || "Proposta")}</span></div><div class="proposal-preview__stage"><div class="proposal-preview__canvas"></div></div>`;
  sheet.querySelector(".proposal-preview__canvas").appendChild(page.cloneNode(true));
  return sheet;
}

function resizePreviewStages(preview) {
  preview.querySelectorAll(".proposal-preview__stage").forEach((stage) => {
    const canvas = stage.querySelector(".proposal-preview__canvas");
    if (!canvas) return;
    const scale = Math.min(1, Math.max(280, stage.clientWidth) / 1123);
    canvas.style.width = "1123px";
    canvas.style.height = "794px";
    canvas.style.transform = `scale(${scale})`;
    stage.style.height = `${Math.round(794 * scale)}px`;
  });
}

function rebuildPreviewFromPdfRoot() {
  const pdfRoot = document.getElementById("pdf-template-root");
  const stack = document.querySelector(".proposal-preview__stack");
  const preview = stack?.closest(".proposal-preview");
  if (!pdfRoot || !stack || !preview) return;
  const pages = [...pdfRoot.querySelectorAll(":scope > .pdf-page")];
  const signature = pages.map((page) => page.dataset.section || "Proposta").join("|");
  if (stack.dataset.fivePageSignature === signature) return;
  stack.innerHTML = "";
  pages.forEach((page, index) => stack.appendChild(buildSheetForPage(page, index)));
  preview.querySelector(".proposal-preview__nav")?.remove();
  stack.dataset.fivePageSignature = signature;
  resizePreviewStages(preview);
}

function enhanceProposalPreview(root = document) {
  root.querySelectorAll(".proposal-preview").forEach((preview) => {
    if (preview.querySelector(".proposal-preview__nav")) return;
    const stack = preview.querySelector(".proposal-preview__stack");
    const intro = preview.querySelector(".proposal-preview__intro");
    if (!stack || !intro) return;
    const sheets = [...stack.querySelectorAll(".proposal-preview__sheet")];
    if (!sheets.length) return;
    const nav = document.createElement("div");
    nav.className = "proposal-preview__nav";
    nav.setAttribute("aria-label", "Navegação pelas páginas da proposta");
    nav.innerHTML = sheets.map((sheet, index) => {
      const label = sheet.querySelector(".proposal-preview__sheet-heading span:last-child")?.textContent?.trim() || "Proposta";
      return `<button type="button" data-page-target="${index}"><span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(label)}</button>`;
    }).join("");
    nav.querySelectorAll("[data-page-target]").forEach((button) => {
      button.addEventListener("click", () => sheets[Number(button.dataset.pageTarget)]?.scrollIntoView({ behavior: "smooth", block: "start" }));
    });
    intro.insertAdjacentElement("afterend", nav);
  });
}

function forceFivePagePdf() {
  const root = document.getElementById("pdf-template-root");
  if (!root) return;
  const desired = chooseFivePages(root);
  if (desired.length !== 5) return;
  const current = [...root.querySelectorAll(":scope > .pdf-page")];
  const already = current.length === 5 && current.every((page, index) => page === desired[index]);
  if (!already) root.replaceChildren(...desired);
  renumberPageSet([...root.querySelectorAll(":scope > .pdf-page")]);
  rebuildPreviewFromPdfRoot();
}

function runExecutivePolish() {
  ensureFinalPolishStyles();
  enhancePdfTemplate();
  forceFivePagePdf();
  enhanceProposalPreview();
}

runExecutivePolish();
const observer = new MutationObserver(() => runExecutivePolish());
observer.observe(document.documentElement, { childList: true, subtree: true });