const COVER_PILLARS = [
  ["01", "Clareza", "Escopo estruturado para decisão executiva."],
  ["02", "Execução", "Operação orientada por método e acompanhamento."],
  ["03", "Resultado", "Foco em avanço comercial e conversão."],
];

const INVESTMENT_INCLUDES = ["Planejamento", "Operação", "Acompanhamento"];
const SCOPE_MAX_UNITS = 7;
let isReflowingScope = false;

function ensureFinalPolishStyles() {
  if (document.getElementById("executive-final-layout-guard")) return;
  const style = document.createElement("style");
  style.id = "executive-final-layout-guard";
  style.textContent = `
    .pdf-page img,
    .pdf-page img[class*="logo"],
    .pdf-cover__logo-card img,
    .pdf-edney__brands img,
    .pdf-closing__logos img,
    .pdf-summary__client-logo img {
      object-fit: contain !important;
      object-position: center !important;
    }
    .pdf-scope__grid--single {
      grid-template-columns: minmax(0, 1.32fr) 276px !important;
      gap: 20px !important;
    }
    .pdf-scope__card { padding: 18px 20px !important; }
    .pdf-scope__card ul { gap: 7px !important; }
    .pdf-scope__card li {
      font-size: 10.8px !important;
      line-height: 1.38 !important;
    }
    .pdf-scope__aside { padding: 18px !important; }
    .pdf-scope__aside h3 {
      font-size: 18px !important;
      line-height: 1.18 !important;
    }
    .pdf-scope__aside p {
      font-size: 10.3px !important;
      line-height: 1.45 !important;
    }
    .pdf-edney {
      grid-template-columns: 292px minmax(0, 1fr) !important;
      gap: 46px !important;
    }
    .pdf-edney__content .pdf-page__title { font-size: 30px !important; }
    .pdf-edney__bio-list {
      gap: 6px !important;
      margin-top: 14px !important;
    }
    .pdf-edney__bio-list li {
      font-size: 10.4px !important;
      line-height: 1.34 !important;
    }
  `;
  document.head.appendChild(style);
}

function enhancePdfTemplate(root = document) {
  root.querySelectorAll(".pdf-cover").forEach((cover) => {
    if (cover.querySelector(".pdf-cover__pillars")) return;
    const client = cover.querySelector(".pdf-cover__client");
    if (!client) return;
    const pillars = document.createElement("div");
    pillars.className = "pdf-cover__pillars";
    pillars.innerHTML = COVER_PILLARS.map(([number, title, text]) => `
      <div><span>${number}</span><strong>${title}</strong><small>${text}</small></div>
    `).join("");
    client.insertAdjacentElement("afterend", pillars);
  });

  root.querySelectorAll(".pdf-investment__hero").forEach((hero) => {
    if (hero.querySelector(".pdf-investment__includes")) return;
    const includes = document.createElement("div");
    includes.className = "pdf-investment__includes";
    includes.innerHTML = INVESTMENT_INCLUDES.map((item) => `<div><span></span>${item}</div>`).join("");
    hero.appendChild(includes);
  });
}

function refineCoverLayout(root = document) {
  root.querySelectorAll(".pdf-cover").forEach((cover) => {
    cover.querySelector(".pdf-cover__group-logo")?.remove();
    const content = cover.querySelector(".pdf-cover__content");
    const logos = cover.querySelector(".pdf-cover__logos");
    if (!content || !logos || content.querySelector(".pdf-cover__copy")) return;
    const copy = document.createElement("div");
    copy.className = "pdf-cover__copy";
    [".pdf-cover__eyebrow", ".pdf-cover__title", ".pdf-cover__client", ".pdf-cover__pillars"].forEach((selector) => {
      const element = content.querySelector(`:scope > ${selector}`);
      if (element) copy.appendChild(element);
    });
    content.insertBefore(copy, logos);
  });
}

function refineEdneyPages(root = document) {
  const edneyPages = Array.from(root.querySelectorAll(".pdf-edney"));
  const edneyOne = edneyPages[0];
  const edneyTwo = edneyPages[1];

  if (edneyOne && !edneyOne.querySelector(".pdf-edney__strategy-strip")) {
    const subtitle = edneyOne.querySelector(".pdf-page__subtitle");
    const strip = document.createElement("div");
    strip.className = "pdf-edney__strategy-strip";
    strip.innerHTML = `
      <div><span>Marketing</span><strong>posicionamento e demanda</strong></div>
      <div><span>Operação</span><strong>ritmo, equipe e método</strong></div>
      <div><span>Vendas</span><strong>conversão e resultado</strong></div>
    `;
    subtitle?.insertAdjacentElement("afterend", strip);
  }

  if (edneyTwo && !edneyTwo.querySelector(".pdf-edney__quote")) {
    const lead = edneyTwo.querySelector(".pdf-page__lead");
    const quote = document.createElement("div");
    quote.className = "pdf-edney__quote";
    quote.innerHTML = `
      <span></span>
      <strong>Método, tecnologia e presença comercial trabalhando juntos para acelerar decisões e transformar planejamento em vendas.</strong>
    `;
    lead?.insertAdjacentElement("afterend", quote);
  }
}

function estimateUnits(text) {
  return Math.max(1, Math.ceil(String(text || "").trim().length / 74));
}

function splitItems(items) {
  const chunks = [];
  let current = [];
  let units = 0;
  items.forEach((item) => {
    const itemUnits = estimateUnits(item.textContent);
    if (current.length && units + itemUnits > SCOPE_MAX_UNITS) {
      chunks.push(current);
      current = [];
      units = 0;
    }
    current.push(item);
    units += itemUnits;
  });
  if (current.length) chunks.push(current);
  return chunks;
}

function collectScopeCards(scopePages) {
  const cards = [];
  scopePages.forEach((page) => {
    page.querySelectorAll(".pdf-scope__card").forEach((card) => {
      const items = Array.from(card.querySelectorAll("li"));
      splitItems(items).forEach((chunk, chunkIndex) => {
        const clone = card.cloneNode(true);
        const list = clone.querySelector("ul");
        if (list) list.innerHTML = "";
        chunk.forEach((item) => list?.appendChild(item.cloneNode(true)));
        if (chunkIndex > 0) {
          const title = clone.querySelector("h3");
          if (title && !/continuação/i.test(title.textContent)) title.insertAdjacentHTML("beforeend", " <small>continuação</small>");
        }
        cards.push(clone);
      });
    });
  });
  return cards;
}

function makeScopeAside(page, card) {
  const client = page.querySelector(".pdf-topmark__client")?.textContent?.trim() || "cliente";
  const solution = page.querySelector(".pdf-page__title")?.textContent?.trim() || "Proposta personalizada";
  const objective = page.querySelector(".pdf-page__subtitle")?.textContent?.trim() || "Entregas organizadas para uma execução clara, alinhada e orientada a resultados.";
  const itemsCount = card.querySelectorAll("li").length;
  const aside = document.createElement("aside");
  aside.className = "pdf-scope__aside";
  aside.innerHTML = `
    <div>
      <span class="pdf-scope__aside-label">Visão consolidada</span>
      <h3>Escopo preparado para ${client}</h3>
      <p>${objective}</p>
    </div>
    <div class="pdf-scope__aside-meta">
      <div><small>Itens nesta etapa</small><strong>${itemsCount}</strong></div>
      <div><small>Solução</small><strong>${solution}</strong></div>
    </div>
  `;
  return aside;
}

function reflowScopePages(container) {
  if (!container || container.dataset.scopeReflowed === "true") return false;
  const scopePages = Array.from(container.querySelectorAll(":scope > .pdf-page"))
    .filter((page) => page.querySelector(".pdf-scope-page"));
  if (!scopePages.length) return false;
  const cards = collectScopeCards(scopePages);
  if (!cards.length) return false;
  const template = scopePages[0];
  const rebuilt = cards.map((card, index) => {
    const page = template.cloneNode(true);
    page.dataset.section = cards.length > 1 ? `Escopo ${index + 1}/${cards.length}` : "Escopo";
    const eyebrow = page.querySelector(".pdf-page__eyebrow");
    if (eyebrow) eyebrow.textContent = cards.length > 1 ? `Escopo executivo ${index + 1} de ${cards.length}` : "Escopo executivo";
    const subtitle = page.querySelector(".pdf-page__subtitle");
    if (subtitle && index > 0) subtitle.textContent = "Continuação das entregas e condições que compõem esta proposta.";
    const grid = page.querySelector(".pdf-scope__grid");
    if (grid) {
      grid.classList.add("pdf-scope__grid--single");
      grid.innerHTML = "";
      grid.appendChild(card);
      grid.appendChild(makeScopeAside(page, card));
    }
    const number = card.querySelector("header > span");
    if (number) number.textContent = String(index + 1).padStart(2, "0");
    return page;
  });
  scopePages[0].replaceWith(...rebuilt);
  scopePages.slice(1).forEach((page) => page.remove());
  container.dataset.scopeReflowed = "true";
  return true;
}

function buildSheetForPage(page, index) {
  const sheet = document.createElement("section");
  sheet.className = "proposal-preview__sheet";
  sheet.setAttribute("aria-label", `Página ${index + 1}`);
  sheet.innerHTML = `
    <div class="proposal-preview__sheet-heading">
      <span>Página ${String(index + 1).padStart(2, "0")}</span>
      <span>${page.dataset.section || "Proposta"}</span>
    </div>
    <div class="proposal-preview__stage"><div class="proposal-preview__canvas"></div></div>
  `;
  sheet.querySelector(".proposal-preview__canvas").appendChild(page.cloneNode(true));
  return sheet;
}

function resizePreviewStages(preview) {
  preview.querySelectorAll(".proposal-preview__stage").forEach((stage) => {
    const canvas = stage.querySelector(".proposal-preview__canvas");
    if (!canvas) return;
    const availableWidth = Math.max(280, stage.clientWidth);
    const scale = Math.min(1, availableWidth / 1123);
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
  if (!pdfRoot || !stack || !preview || preview.dataset.scopeReflowed === "true") return;
  const pages = Array.from(pdfRoot.querySelectorAll(":scope > .pdf-page"));
  if (!pages.length || !pages.some((page) => page.querySelector(".pdf-scope-page"))) return;
  stack.innerHTML = "";
  pages.forEach((page, index) => stack.appendChild(buildSheetForPage(page, index)));
  preview.querySelector(".proposal-preview__nav")?.remove();
  preview.dataset.scopeReflowed = "true";
  resizePreviewStages(preview);
}

function renumberPageSet(pages) {
  const total = pages.length;
  pages.forEach((page, index) => {
    const pageNumber = String(index + 1).padStart(2, "0");
    const totalNumber = String(total).padStart(2, "0");
    const label = page.dataset.section || "Proposta";
    const topLabel = page.querySelector(".pdf-topmark__label");
    if (topLabel) topLabel.innerHTML = `${pageNumber} &nbsp; ${label}`;
    const footer = page.querySelector(".pdf-footer span:last-child");
    if (footer) footer.textContent = `${pageNumber} / ${totalNumber}`;
    const watermark = page.querySelector(".pdf-page__watermark");
    if (watermark) watermark.textContent = pageNumber;
  });
}

function renumberPdfPages(root = document) {
  const pdfRoot = root.getElementById?.("pdf-template-root") || document.getElementById("pdf-template-root");
  if (pdfRoot) renumberPageSet(Array.from(pdfRoot.querySelectorAll(":scope > .pdf-page")));
  root.querySelectorAll?.(".proposal-preview__stack").forEach((stack) => {
    const pages = Array.from(stack.querySelectorAll(".proposal-preview__canvas > .pdf-page"));
    renumberPageSet(pages);
    stack.querySelectorAll(".proposal-preview__sheet").forEach((sheet, index) => {
      const heading = sheet.querySelector(".proposal-preview__sheet-heading span:first-child");
      if (heading) heading.textContent = `Página ${String(index + 1).padStart(2, "0")}`;
    });
  });
}

function reflowExecutivePdf() {
  if (isReflowingScope) return;
  isReflowingScope = true;
  try {
    const changed = reflowScopePages(document.getElementById("pdf-template-root"));
    if (changed) rebuildPreviewFromPdfRoot();
    renumberPdfPages();
  } finally {
    isReflowingScope = false;
  }
}

function enhanceProposalPreview(root = document) {
  root.querySelectorAll(".proposal-preview").forEach((preview) => {
    if (preview.querySelector(".proposal-preview__nav")) return;
    const stack = preview.querySelector(".proposal-preview__stack");
    const intro = preview.querySelector(".proposal-preview__intro");
    if (!stack || !intro) return;
    const sheets = Array.from(stack.querySelectorAll(".proposal-preview__sheet"));
    if (!sheets.length) return;
    const nav = document.createElement("div");
    nav.className = "proposal-preview__nav";
    nav.setAttribute("aria-label", "Navegação pelas páginas da proposta");
    nav.innerHTML = sheets.map((sheet, index) => {
      const labels = Array.from(sheet.querySelectorAll(".proposal-preview__sheet-heading span"));
      const label = labels[1]?.textContent?.trim() || "Proposta";
      return `<button type="button" data-page-target="${index}"><span>${String(index + 1).padStart(2, "0")}</span>${label}</button>`;
    }).join("");
    nav.querySelectorAll("[data-page-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = sheets[Number(button.dataset.pageTarget)];
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    intro.insertAdjacentElement("afterend", nav);
  });
}

function runExecutivePolish() {
  ensureFinalPolishStyles();
  enhancePdfTemplate();
  refineCoverLayout();
  refineEdneyPages();
  reflowExecutivePdf();
  enhanceProposalPreview();
}

runExecutivePolish();
const observer = new MutationObserver(() => runExecutivePolish());
observer.observe(document.documentElement, { childList: true, subtree: true });