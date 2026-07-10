const COVER_PILLARS = [
  ["01", "Clareza", "Escopo estruturado para decisão executiva."],
  ["02", "Execução", "Operação orientada por método e acompanhamento."],
  ["03", "Resultado", "Foco em avanço comercial e conversão."],
];

const INVESTMENT_INCLUDES = ["Planejamento", "Operação", "Acompanhamento"];

const EDNEY_STRATEGY_ITEMS = [
  ["Marketing", "posicionamento e demanda"],
  ["Operação", "ritmo, equipe e método"],
  ["Vendas", "conversão e resultado"],
];

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
    strip.innerHTML = EDNEY_STRATEGY_ITEMS.map(([title, text]) => `
      <div><span>${title}</span><strong>${text}</strong></div>
    `).join("");
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
  enhancePdfTemplate();
  refineCoverLayout();
  refineEdneyPages();
  enhanceProposalPreview();
}

runExecutivePolish();

const observer = new MutationObserver(() => runExecutivePolish());
observer.observe(document.documentElement, { childList: true, subtree: true });
