import { appState } from "../state.js";
import { getSelectedService } from "./page3.js";
import { getMutedTextColor, getOnAccentColor } from "../theme.js";
import { getMotifPath } from "../motif.js";

const PDF_PAGE_WIDTH = 1123;
const PDF_PAGE_HEIGHT = 794;
const SCOPE_CARD_MAX_UNITS = 15;

let previewObserver = null;

export function initPage6() {
  document.getElementById("download-pdf-btn").addEventListener("click", downloadPdf);
}

export function buildProposal(data) {
  const ctx = collectProposalContext(data);
  const pdfRoot = document.getElementById("pdf-template-root");
  const viewer = document.getElementById("proposal-viewer");

  pdfRoot.innerHTML = "";
  pdfRoot.appendChild(buildPdfTemplate(ctx));

  viewer.innerHTML = "";
  viewer.appendChild(buildInteractiveProposal(ctx, pdfRoot));
}

function collectProposalContext(data) {
  const company = appState.company;
  const service = getSelectedService();
  const client = appState.client;
  const commercial = appState.commercial;
  const createdAt = new Date();
  const dateKey = [
    createdAt.getFullYear(),
    String(createdAt.getMonth() + 1).padStart(2, "0"),
    String(createdAt.getDate()).padStart(2, "0"),
  ].join("");

  return {
    company,
    service,
    client,
    commercial,
    groupBrand: data.config.groupBrand,
    edneyAssets: data.config.edneyInstitutionalAssets,
    allBrandLogos: data.companies.map((item) => ({
      id: item.id,
      name: item.name,
      logo: item.logo,
    })),
    createdAt,
    proposalDate: createdAt.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    proposalCode: `GPV-${String(company.id).toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-${dateKey}`,
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function displayText(value, fallback = "-") {
  const text = String(value ?? "").trim();
  return escapeHtml(text || fallback);
}

function imageMarkup(src, alt, className = "") {
  if (!src) return "";
  return `<img class="${className}" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`;
}

function hexToRgba(hex, alpha) {
  const normalized = String(hex || "").replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return `rgba(91, 191, 200, ${alpha})`;
  const value = Number.parseInt(normalized, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/* ------------------------- PREVIA INTERATIVA DO PDF ------------------------- */

function buildInteractiveProposal(ctx, pdfRoot) {
  const wrapper = document.createElement("div");
  wrapper.className = "proposal-preview";

  const pages = Array.from(pdfRoot.querySelectorAll(".pdf-page"));
  wrapper.innerHTML = `
    <div class="proposal-preview__intro">
      <div class="proposal-preview__intro-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M8 13h8M8 17h6" />
        </svg>
      </div>
      <div>
        <span class="proposal-preview__kicker">Documento executivo pronto</span>
        <h2>Prévia exata da proposta</h2>
        <p>${pages.length} páginas diagramadas para ${displayText(ctx.client.name)} com a identidade visual da ${displayText(ctx.company.name)}.</p>
      </div>
      <div class="proposal-preview__status"><span></span> Pronto para exportar</div>
    </div>
    <div class="proposal-preview__stack" aria-label="Páginas da proposta"></div>
  `;

  const stack = wrapper.querySelector(".proposal-preview__stack");
  pages.forEach((page, index) => {
    const sheet = document.createElement("section");
    sheet.className = "proposal-preview__sheet";
    sheet.setAttribute("aria-label", `Página ${index + 1} de ${pages.length}`);
    sheet.innerHTML = `
      <div class="proposal-preview__sheet-heading">
        <span>Página ${String(index + 1).padStart(2, "0")}</span>
        <span>${displayText(page.dataset.section, "Proposta")}</span>
      </div>
      <div class="proposal-preview__stage"><div class="proposal-preview__canvas"></div></div>
    `;
    sheet.querySelector(".proposal-preview__canvas").appendChild(page.cloneNode(true));
    stack.appendChild(sheet);
  });

  requestAnimationFrame(() => setupPreviewScaling(wrapper));
  return wrapper;
}

function setupPreviewScaling(root) {
  if (previewObserver) previewObserver.disconnect();

  const resize = () => {
    root.querySelectorAll(".proposal-preview__stage").forEach((stage) => {
      const canvas = stage.querySelector(".proposal-preview__canvas");
      const availableWidth = Math.max(280, stage.clientWidth);
      const scale = Math.min(1, availableWidth / PDF_PAGE_WIDTH);

      canvas.style.width = `${PDF_PAGE_WIDTH}px`;
      canvas.style.height = `${PDF_PAGE_HEIGHT}px`;
      canvas.style.transform = `scale(${scale})`;
      stage.style.height = `${Math.round(PDF_PAGE_HEIGHT * scale)}px`;
    });
  };

  resize();
  if (typeof ResizeObserver === "function") {
    previewObserver = new ResizeObserver(resize);
    previewObserver.observe(root);
  }
}

/* --------------------------- TEMPLATE EXECUTIVO PDF --------------------------- */

const EDNEY_ICONS = [
  {
    label: "Tecnologia",
    description: "Estratégia conectada à execução.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
  },
  {
    label: "Inteligência Artificial",
    description: "Automação aplicada à performance.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l1.8 5.3 5.3 1.8-5.3 1.8L12 16.7l-1.8-5.3-5.3-1.8 5.3-1.8L12 2.5z"/><path d="M19 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"/></svg>',
  },
  {
    label: "Vendas",
    description: "Método orientado à conversão.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  },
  {
    label: "Crescimento",
    description: "Decisões guiadas por resultado.",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V11M10 20V4M16 20v-8M22 20v-5"/></svg>',
  },
];

const EDNEY_BIO = [
  "Formado em Marketing.",
  "Especialista em Marketing e Vendas no setor automotivo, com mais de 20 anos de experiência.",
  "Criador do Departamento de Vendas Web e da House de Marketing e Eventos da Automob, com atuação em 17 marcas e mais de 70 concessionárias.",
  "Participação decisiva em uma das startups pioneiras do mercado de compra e venda de veículos no Brasil.",
  "Fundador de projetos que transformam eventos e operações comerciais em experiências de alto impacto.",
];

function getPdfVariables(ctx) {
  const theme = ctx.company.theme;
  return [
    `--pdf-bg:${theme.backgroundColor}`,
    `--pdf-text:${theme.textColor}`,
    `--pdf-accent:${theme.accentColor}`,
    `--pdf-primary:${theme.primaryColor}`,
    `--pdf-secondary:${theme.secondaryColor}`,
    `--pdf-muted:${getMutedTextColor(theme)}`,
    `--pdf-on-accent:${getOnAccentColor(theme)}`,
    `--pdf-accent-soft:${hexToRgba(theme.accentColor, 0.14)}`,
    `--pdf-accent-faint:${hexToRgba(theme.accentColor, 0.07)}`,
  ].join(";");
}

export function buildPdfTemplate(ctx) {
  const fragment = document.createDocumentFragment();
  const scopeCards = buildScopeCards(ctx.service);
  const scopePages = chunkArray(scopeCards, 2);
  const definitions = [
    { label: "Capa", render: pdfCover },
    { label: "Visão executiva", render: pdfExecutiveSummary },
    { label: "Grupo GPV", render: pdfEdneyOne },
    { label: "Experiência", render: pdfEdneyTwo },
    ...scopePages.map((cards, index) => ({
      label: scopePages.length > 1 ? `Escopo ${index + 1}/${scopePages.length}` : "Escopo",
      render: (base) => pdfScopePage({ ...base, cards, scopeIndex: index, scopeTotal: scopePages.length }),
    })),
    { label: "Condições comerciais", render: pdfInvestment },
    { label: "Próximos passos", render: pdfClosing },
  ];

  const base = {
    ctx,
    vars: getPdfVariables(ctx),
    motifUrl: getMotifPath(ctx.company.id),
    total: definitions.length,
  };

  definitions.forEach((definition, index) => {
    fragment.appendChild(definition.render({
      ...base,
      num: index + 1,
      sectionLabel: definition.label,
    }));
  });

  return fragment;
}

function pdfPage({ className = "", vars, motifUrl, ctx, num, total, sectionLabel, chrome = true, bodyHtml }) {
  const page = document.createElement("div");
  page.className = "pdf-page";
  page.dataset.section = sectionLabel;
  page.style.cssText = vars;
  if (motifUrl) {
    page.style.backgroundImage = `linear-gradient(rgba(5, 7, 9, 0.90), rgba(5, 7, 9, 0.90)), url("${motifUrl}")`;
  }

  const topmark = chrome
    ? `<div class="pdf-topmark">
        <div class="pdf-topmark__brand">
          ${imageMarkup(ctx.company.logo, ctx.company.name, "pdf-topmark__logo")}
          <span class="pdf-topmark__rule"></span>
          <span class="pdf-topmark__client">${displayText(ctx.client.name)}</span>
        </div>
        <span class="pdf-topmark__label">${String(num).padStart(2, "0")} &nbsp; ${displayText(sectionLabel)}</span>
      </div>`
    : "";

  const footer = chrome
    ? `<div class="pdf-footer">
        <span><strong>${displayText(ctx.proposalCode)}</strong> &nbsp; Documento confidencial</span>
        <span>${String(num).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
      </div>`
    : "";

  page.innerHTML = `
    <div class="pdf-page__brandbar"><span></span><span></span><span></span></div>
    ${chrome ? `<div class="pdf-page__watermark">${String(num).padStart(2, "0")}</div>` : ""}
    ${topmark}
    <div class="pdf-page__body ${className}">${bodyHtml}</div>
    ${footer}
  `;
  return page;
}

function pdfCover({ ctx, vars, motifUrl, num, total, sectionLabel }) {
  return pdfPage({
    className: "pdf-cover",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    sectionLabel,
    chrome: false,
    bodyHtml: `
      <div class="pdf-cover__frame"></div>
      <div class="pdf-cover__grid"></div>
      <div class="pdf-cover__header">
        ${imageMarkup(ctx.groupBrand.logo, ctx.groupBrand.name, "pdf-cover__group-logo")}
        <span>Documento executivo &nbsp; ${displayText(ctx.proposalCode)}</span>
      </div>
      <div class="pdf-cover__content">
        <div class="pdf-cover__eyebrow">Proposta comercial personalizada</div>
        <h1 class="pdf-cover__title">Estratégia que se<br />transforma em resultado.</h1>
        <p class="pdf-cover__client">Preparada para <strong>${displayText(ctx.client.name)}</strong></p>
        <div class="pdf-cover__logos">
          <div class="pdf-cover__logo-card pdf-cover__logo-card--brand">
            <span>Proponente</span>
            ${imageMarkup(ctx.company.logo, ctx.company.name)}
          </div>
          <div class="pdf-cover__connector"><span></span><i></i><span></span></div>
          <div class="pdf-cover__logo-card pdf-cover__logo-card--client">
            <span>Cliente</span>
            ${ctx.client.logoPreviewUrl
              ? imageMarkup(ctx.client.logoPreviewUrl, ctx.client.name)
              : `<strong>${displayText(ctx.client.name)}</strong>`}
          </div>
        </div>
      </div>
      <div class="pdf-cover__meta">
        <div><span>Emissão</span><strong>${displayText(ctx.proposalDate)}</strong></div>
        <div><span>Solução</span><strong>${displayText(ctx.service?.selectionLabel, "Proposta personalizada")}</strong></div>
        <div><span>Páginas</span><strong>${String(total).padStart(2, "0")}</strong></div>
      </div>
    `,
  });
}

function pdfExecutiveSummary({ ctx, vars, motifUrl, num, total, sectionLabel }) {
  const objective = ctx.service?.objective || ctx.company.positioning || ctx.service?.description;
  const facts = [
    ["Solução", ctx.service?.selectionLabel || "Proposta personalizada"],
    ["Investimento", ctx.commercial.proposalValue.formatted],
    ["Validade", ctx.commercial.proposalValidity],
  ];
  if (ctx.commercial.deliveryDeadline) facts.push(["Prazo", ctx.commercial.deliveryDeadline]);

  return pdfPage({
    className: "pdf-summary",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    sectionLabel,
    bodyHtml: `
      <div class="pdf-page__eyebrow">Visão executiva</div>
      <h2 class="pdf-page__title">Uma proposta construída para avançar.</h2>
      <p class="pdf-page__subtitle">Clareza sobre o objetivo, o escopo e as condições para uma decisão segura.</p>
      <div class="pdf-summary__layout">
        <div class="pdf-summary__objective">
          <span class="pdf-summary__label">Objetivo central</span>
          <p>${displayText(objective, "Desenvolver uma solução comercial alinhada aos objetivos do cliente.")}</p>
          <div class="pdf-summary__signature">
            <span></span>
            <small>${displayText(ctx.company.positioning)}</small>
          </div>
        </div>
        <div class="pdf-summary__client-card">
          <span class="pdf-summary__label">Preparado especialmente para</span>
          <div class="pdf-summary__client-logo">
            ${ctx.client.logoPreviewUrl
              ? imageMarkup(ctx.client.logoPreviewUrl, ctx.client.name)
              : `<strong>${displayText(ctx.client.name)}</strong>`}
          </div>
          <strong>${displayText(ctx.client.name)}</strong>
          <small>${displayText(ctx.client.email)}<br />${displayText(ctx.client.phone)}</small>
        </div>
      </div>
      <div class="pdf-summary__facts">
        ${facts.map(([label, value], index) => `
          <div class="pdf-summary__fact ${index === 0 ? "pdf-summary__fact--wide" : ""}">
            <span>${displayText(label)}</span>
            <strong>${displayText(value)}</strong>
          </div>`).join("")}
      </div>
    `,
  });
}

function pdfEdneyOne({ ctx, vars, motifUrl, num, total, sectionLabel }) {
  return pdfPage({
    className: "pdf-edney",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    sectionLabel,
    bodyHtml: `
      <div class="pdf-edney__visual">
        <div class="pdf-edney__photo" style="background-image:url('${escapeHtml(ctx.edneyAssets.photoOne)}')"></div>
        <div class="pdf-edney__experience"><strong>20+</strong><span>anos de experiência</span></div>
      </div>
      <div class="pdf-edney__content">
        <div class="pdf-page__eyebrow">Liderança e visão comercial</div>
        <h2 class="pdf-page__title">Edney Ulisses</h2>
        <p class="pdf-page__subtitle">Experiência de mercado conectada à criação de soluções que aproximam estratégia, operação e vendas.</p>
        <ul class="pdf-edney__bio-list">
          ${EDNEY_BIO.map((item) => `<li><span>${displayText(item)}</span></li>`).join("")}
        </ul>
        <div class="pdf-edney__brands">
          ${ctx.allBrandLogos.map((brand) => imageMarkup(brand.logo, brand.name)).join("")}
        </div>
      </div>
    `,
  });
}

function pdfEdneyTwo({ ctx, vars, motifUrl, num, total, sectionLabel }) {
  return pdfPage({
    className: "pdf-edney pdf-edney--expertise",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    sectionLabel,
    bodyHtml: `
      <div class="pdf-edney__visual">
        <div class="pdf-edney__photo" style="background-image:url('${escapeHtml(ctx.edneyAssets.photoTwo)}')"></div>
        <div class="pdf-edney__visual-caption">Estratégia. Método. Execução.</div>
      </div>
      <div class="pdf-edney__content">
        <div class="pdf-page__eyebrow">Formação e experiência</div>
        <h2 class="pdf-page__title">Autoridade que gera movimento.</h2>
        <p class="pdf-edney__lead">Trajetória consolidada em treinamento, consultoria e desenvolvimento comercial para equipes de alta performance.</p>
        <div class="pdf-edney__icons">
          ${EDNEY_ICONS.map((item) => `
            <div class="pdf-edney__icon-item">
              <span class="pdf-edney__icon-badge">${item.svg}</span>
              <span><strong>${displayText(item.label)}</strong><small>${displayText(item.description)}</small></span>
            </div>`).join("")}
        </div>
      </div>
    `,
  });
}

function getScopeSections(service) {
  if (!service) return [];
  const sections = [];
  if (service.offeredServices?.length) sections.push([service.offeredServicesTitle || "Serviços oferecidos", service.offeredServices]);
  if (service.eventConditions?.length) sections.push([service.eventConditionsTitle || "Condições", service.eventConditions]);
  if (service.differentials?.length) sections.push(["Diferenciais", service.differentials]);
  if (service.premises?.length) sections.push(["Premissas", service.premises]);
  if (service.customServices?.enabled) {
    const customItems = String(appState.services.customServicesText || "")
      .split(/\r?\n/)
      .map((item) => item.replace(/^[-*•]\s*/, "").trim())
      .filter(Boolean);
    sections.push([service.customServices.fieldLabel || "Escopo personalizado", customItems.length ? customItems : ["Escopo personalizado conforme alinhamento comercial."]]);
  }
  return sections;
}

function estimateScopeUnits(value) {
  return Math.max(1, Math.ceil(String(value || "").length / 74));
}

function buildScopeCards(service) {
  const cards = [];
  getScopeSections(service).forEach(([title, items], sectionIndex) => {
    let cardItems = [];
    let units = 0;
    let part = 1;

    items.forEach((item) => {
      const itemUnits = estimateScopeUnits(item);
      if (cardItems.length && units + itemUnits > SCOPE_CARD_MAX_UNITS) {
        cards.push({ title, items: cardItems, sectionIndex, part });
        cardItems = [];
        units = 0;
        part += 1;
      }
      cardItems.push(item);
      units += itemUnits;
    });

    if (cardItems.length) cards.push({ title, items: cardItems, sectionIndex, part });
  });

  if (!cards.length) {
    cards.push({
      title: "Escopo da proposta",
      items: [service?.description || "Escopo personalizado conforme alinhamento comercial."],
      sectionIndex: 0,
      part: 1,
    });
  }
  return cards;
}

function chunkArray(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) chunks.push(items.slice(index, index + size));
  return chunks;
}

function pdfScopePage({ ctx, vars, motifUrl, num, total, sectionLabel, cards, scopeIndex, scopeTotal }) {
  const service = ctx.service;
  return pdfPage({
    className: "pdf-scope-page",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    sectionLabel,
    bodyHtml: `
      <div class="pdf-page__eyebrow">Escopo executivo ${scopeTotal > 1 ? `${scopeIndex + 1} de ${scopeTotal}` : ""}</div>
      <h2 class="pdf-page__title">${displayText(service?.selectionLabel, "Proposta e escopo")}</h2>
      <p class="pdf-page__subtitle">${scopeIndex === 0
        ? displayText(service?.description, "Entregas organizadas para garantir clareza e alinhamento.")
        : "Continuação das entregas e condições que compõem esta proposta."}</p>
      <div class="pdf-scope__grid ${cards.length === 1 ? "pdf-scope__grid--single" : ""}">
        ${cards.map((card, cardIndex) => `
          <section class="pdf-scope__card">
            <header>
              <span>${String(scopeIndex * 2 + cardIndex + 1).padStart(2, "0")}</span>
              <h3>${displayText(card.title)}${card.part > 1 ? " <small>continuação</small>" : ""}</h3>
            </header>
            <ul>${card.items.map((item) => `<li><span></span><p>${displayText(item)}</p></li>`).join("")}</ul>
          </section>`).join("")}
        ${cards.length === 1 ? `
          <aside class="pdf-scope__aside">
            <div>
              <span class="pdf-scope__aside-label">Visão consolidada</span>
              <h3>Escopo preparado para ${displayText(ctx.client.name)}</h3>
              <p>${displayText(service?.objective || service?.description, "Entregas organizadas para uma execução clara, alinhada e orientada a resultados.")}</p>
            </div>
            <div class="pdf-scope__aside-meta">
              <div><small>Itens nesta etapa</small><strong>${cards[0].items.length}</strong></div>
              <div><small>Solução</small><strong>${displayText(service?.selectionLabel, "Personalizada")}</strong></div>
            </div>
          </aside>` : ""}
      </div>
    `,
  });
}

function pdfInvestment({ ctx, vars, motifUrl, num, total, sectionLabel }) {
  const commercial = ctx.commercial;
  const conditions = [
    ["Solução", ctx.service?.selectionLabel || "Proposta personalizada"],
    ...(commercial.deliveryDeadline ? [["Prazo de entrega", commercial.deliveryDeadline]] : []),
    ["Validade da proposta", commercial.proposalValidity],
  ];

  return pdfPage({
    className: "pdf-investment",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    sectionLabel,
    bodyHtml: `
      <div class="pdf-page__eyebrow">Condições comerciais</div>
      <h2 class="pdf-page__title">Investimento com clareza.</h2>
      <p class="pdf-page__subtitle">Condições vinculadas ao escopo executivo apresentado neste documento.</p>
      <div class="pdf-investment__layout">
        <div class="pdf-investment__hero">
          <span>Investimento total</span>
          <strong>${displayText(commercial.proposalValue.formatted)}</strong>
          <small>para execução do escopo descrito</small>
        </div>
        <div class="pdf-investment__conditions">
          ${conditions.map(([label, value], index) => `
            <div class="pdf-investment__condition">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <div><small>${displayText(label)}</small><strong>${displayText(value)}</strong></div>
            </div>`).join("")}
        </div>
      </div>
      ${commercial.notes ? `
        <div class="pdf-investment__notes">
          <span>Observações comerciais</span>
          <p>${displayText(commercial.notes)}</p>
        </div>` : ""}
    `,
  });
}

function pdfClosing({ ctx, vars, motifUrl, num, total, sectionLabel }) {
  const issuer = ctx.commercial.issuer;
  const steps = [
    ["Aprovação", "Confirmação formal das condições apresentadas."],
    ["Alinhamento", "Definição do cronograma e dos responsáveis."],
    ["Início", "Ativação da operação conforme o escopo aprovado."],
  ];

  return pdfPage({
    className: "pdf-closing",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    sectionLabel,
    bodyHtml: `
      <div class="pdf-closing__headline">
        <div class="pdf-page__eyebrow">Próximos passos</div>
        <h2 class="pdf-page__title">Vamos transformar esta proposta em resultado.</h2>
        <p>Obrigado pela oportunidade de construir este próximo capítulo com ${displayText(ctx.client.name)}.</p>
      </div>
      <div class="pdf-closing__layout">
        <div class="pdf-closing__steps">
          ${steps.map(([title, description], index) => `
            <div class="pdf-closing__step">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <div><strong>${displayText(title)}</strong><p>${displayText(description)}</p></div>
            </div>`).join("")}
        </div>
        <div class="pdf-closing__contact-card">
          <span class="pdf-closing__contact-label">Contato responsável</span>
          <strong>${displayText(issuer.name)}</strong>
          <small>${displayText(issuer.role)}</small>
          <div class="pdf-closing__contact-lines">
            <span>${displayText(issuer.phone)}</span>
            <span>${displayText(issuer.email)}</span>
          </div>
          <div class="pdf-closing__logos">
            ${imageMarkup(ctx.company.logo, ctx.company.name)}
            ${imageMarkup(ctx.groupBrand.logoPositiveReference || ctx.groupBrand.logo, ctx.groupBrand.name)}
          </div>
        </div>
      </div>
    `,
  });
}

/* ------------------------------- EXPORTACAO PDF ------------------------------- */

function slugify(text) {
  return String(text || "proposta")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function waitForImages(root) {
  const images = Array.from(root.querySelectorAll("img"));
  return Promise.all(images.map((img) => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    });
  }));
}

async function downloadPdf() {
  const company = appState.company;
  const filename = `Proposta_Comercial_${slugify(company.id)}_${slugify(appState.client.name)}.pdf`;
  const pdfRoot = document.getElementById("pdf-template-root");
  const pageElements = Array.from(pdfRoot.querySelectorAll(".pdf-page"));
  const button = document.getElementById("download-pdf-btn");
  const originalLabel = button.textContent;

  button.disabled = true;
  button.textContent = "Gerando PDF...";

  try {
    await waitForImages(pdfRoot);
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "px", format: [PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT], orientation: "landscape" });

    for (let index = 0; index < pageElements.length; index += 1) {
      const canvas = await window.html2canvas(pageElements[index], {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        width: PDF_PAGE_WIDTH,
        height: PDF_PAGE_HEIGHT,
      });
      const imageData = canvas.toDataURL("image/jpeg", 0.96);
      if (index > 0) pdf.addPage([PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT], "landscape");
      pdf.addImage(imageData, "JPEG", 0, 0, PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT);
    }

    pdf.save(filename);
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}
