import { appState } from "../state.js";
import { getSelectedService } from "./page3.js";
import { getMutedTextColor } from "../theme.js";
import { getMotifPath } from "../motif.js";

let sharedData = null;

export function initPage6() {
  document.getElementById("download-pdf-btn").addEventListener("click", downloadPdf);
}

export function buildProposal(data) {
  sharedData = data;
  const ctx = collectProposalContext(data);
  document.getElementById("proposal-viewer").innerHTML = "";
  document.getElementById("proposal-viewer").appendChild(buildInteractiveProposal(ctx));
  animateInvestmentCounter(ctx.commercial.proposalValue.raw);

  const pdfRoot = document.getElementById("pdf-template-root");
  pdfRoot.innerHTML = "";
  pdfRoot.appendChild(buildPdfTemplate(ctx));
}

// Conta do zero até o valor da proposta — pequeno toque de interatividade
// no momento de maior impacto da proposta final.
function animateInvestmentCounter(target) {
  const el = document.getElementById("investment-value-counter");
  if (!el || !target) return;

  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const elapsed = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    el.textContent = (target * eased).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    if (elapsed < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function collectProposalContext(data) {
  const company = appState.company;
  const service = getSelectedService();
  const client = appState.client;
  const commercial = appState.commercial;

  return {
    company,
    service,
    client,
    commercial,
    groupBrand: data.config.groupBrand,
    edneyAssets: data.config.edneyInstitutionalAssets,
    allBrandLogos: data.companies.map((c) => ({ id: c.id, name: c.name, logo: c.logo })),
  };
}

/* ---------------------------- PROPOSTA INTERATIVA ---------------------------- */

function buildInteractiveProposal(ctx) {
  const wrapper = document.createElement("div");
  wrapper.className = "stagger";

  wrapper.appendChild(section(
    "Capa",
    `<div class="form-card animate-scale-in" style="text-align:center;">
      <div style="display:flex;justify-content:center;gap:40px;align-items:center;margin-bottom:22px;">
        <img class="logo-chip" src="${ctx.company.logo}" alt="${ctx.company.name}" style="height:72px;" />
        ${ctx.client.logoPreviewUrl ? `<img class="logo-chip" src="${ctx.client.logoPreviewUrl}" alt="${ctx.client.name}" style="height:72px;" />` : ""}
      </div>
      <h2 style="font-size:2.4rem;font-weight:800;letter-spacing:-0.01em;">Proposta Comercial</h2>
      <p style="color:var(--color-muted);margin-top:10px;font-size:1.15rem;">${ctx.client.name}</p>
    </div>`
  ));

  wrapper.appendChild(section(
    "Edney Ulisses — Institucional",
    `<div class="form-card">
      <p style="font-size:1.08rem;line-height:1.65;">Edney Ulisses é fundador e especialista à frente das soluções do Grupo GPV, referência em aceleração comercial no mercado brasileiro.</p>
      <div style="display:flex;flex-wrap:wrap;gap:28px;margin-top:22px;align-items:center;">
        ${ctx.allBrandLogos.map((b) => `<img class="logo-chip" src="${b.logo}" alt="${b.name}" style="height:42px;" />`).join("")}
      </div>
    </div>`
  ));

  wrapper.appendChild(section(
    "Edney Ulisses — Formação e Experiência",
    `<div class="form-card">
      <p style="font-size:1.08rem;line-height:1.65;">Trajetória consolidada em treinamento, consultoria e desenvolvimento comercial para equipes de alta performance, com atuação direta na aceleração de resultados das marcas do Grupo GPV.</p>
    </div>`
  ));

  wrapper.appendChild(section("Proposta e Escopo", buildScopeHtml(ctx.service)));

  wrapper.appendChild(section(
    "Investimento e Condições",
    `<div class="form-card">
      <div id="investment-value-counter" class="investment-value">R$ 0,00</div>
      ${ctx.commercial.notes ? `<p style="margin-top:16px;font-size:1.05rem;">${ctx.commercial.notes}</p>` : ""}
      ${ctx.commercial.deliveryDeadline ? row("Prazo de entrega", ctx.commercial.deliveryDeadline) : ""}
      ${row("Validade da proposta", ctx.commercial.proposalValidity)}
    </div>`
  ));

  wrapper.appendChild(section(
    "Encerramento",
    `<div class="form-card">
      ${row("Validade da proposta", ctx.commercial.proposalValidity)}
      ${row("Emissor", ctx.commercial.issuer.name)}
      ${row("Função", ctx.commercial.issuer.role)}
      ${row("Telefone", ctx.commercial.issuer.phone)}
      ${row("E-mail", ctx.commercial.issuer.email)}
      <img class="logo-chip" src="${ctx.company.logo}" alt="${ctx.company.name}" style="height:52px;margin-top:20px;" />
    </div>`
  ));

  return wrapper;
}

function section(title, innerHtml) {
  const el = document.createElement("section");
  el.innerHTML = `<h3 style="font-size:1.02rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--color-accent);margin-bottom:16px;">${title}</h3>${innerHtml}`;
  return el;
}

function row(label, value) {
  return `<div class="review-row"><span class="review-row__label">${label}</span><span class="review-row__value">${value || "—"}</span></div>`;
}

function buildScopeHtml(service) {
  if (!service) return `<div class="form-card">Nenhum serviço selecionado.</div>`;

  let html = `<div class="form-card"><h4 style="margin-bottom:8px;">${service.selectionLabel}</h4>`;
  if (service.description) html += `<p style="color:var(--color-muted);margin-bottom:12px;">${service.description}</p>`;

  if (service.offeredServices?.length) {
    html += listBlock(service.offeredServicesTitle, service.offeredServices);
  }
  if (service.eventConditions?.length) {
    html += listBlock(service.eventConditionsTitle, service.eventConditions);
  }
  if (service.customServices?.enabled) {
    html += listBlock(service.customServices.fieldLabel, [appState.services.customServicesText]);
  }
  html += "</div>";
  return html;
}

function listBlock(title, items) {
  return `
    <div class="service-detail-section">
      <h4>${title || "Detalhes"}</h4>
      <ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>
    </div>`;
}

/* ---------------------------- TEMPLATE DEDICADO DO PDF ---------------------------- */

const PDF_SECTIONS = [
  "Capa",
  "Grupo GPV",
  "Formação",
  "Proposta",
  "Investimento",
  "Encerramento",
];

const EDNEY_ICONS = [
  {
    label: "Tecnologia",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
  },
  {
    label: "Inteligência Artificial",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l1.8 5.3 5.3 1.8-5.3 1.8L12 16.7l-1.8-5.3-5.3-1.8 5.3-1.8L12 2.5z"/><path d="M19 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"/></svg>',
  },
  {
    label: "Vendas",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
  },
  {
    label: "Crescimento",
    svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V11"/><path d="M10 20V4"/><path d="M16 20v-8"/><path d="M22 20v-5"/></svg>',
  },
];

const EDNEY_BIO = [
  "Formado em Marketing.",
  "Especialista em Marketing e Vendas no setor automotivo, com mais de 20 anos de experiência no mercado.",
  "Criador do Departamento de Vendas Web e House de Marketing e Eventos da Automob, gerenciando 17 marcas e mais de 70 concessionárias.",
  "Foi peça-chave em uma das startups pioneiras que revolucionaram o mercado de compra e venda de veículos no Brasil, com crescimento de 25% nas vendas ao mês e conversão de 70% de leads em oportunidades concretas.",
  "Fundador do projeto que transforma eventos em experiências de alto impacto.",
];

function buildPdfTemplate(ctx) {
  const fragment = document.createDocumentFragment();
  const theme = ctx.company.theme;
  const pdfVars = `--pdf-bg:${theme.backgroundColor};--pdf-text:${theme.textColor};--pdf-accent:${theme.accentColor};--pdf-muted:${getMutedTextColor(theme)};`;
  const motifUrl = getMotifPath(ctx.company.id);
  const base = { ctx, vars: pdfVars, motifUrl, total: PDF_SECTIONS.length };

  fragment.appendChild(pdfCover({ ...base, num: 1 }));
  fragment.appendChild(pdfEdneyOne({ ...base, num: 2 }));
  fragment.appendChild(pdfEdneyTwo({ ...base, num: 3 }));
  fragment.appendChild(pdfScope({ ...base, num: 4 }));
  fragment.appendChild(pdfInvestment({ ...base, num: 5 }));
  fragment.appendChild(pdfClosing({ ...base, num: 6 }));

  return fragment;
}

// Toda página compartilha o mesmo "chrome" (selo de marca + rótulo de seção no topo,
// rodapé com cliente e numeração) — dá sensação de deck executivo coeso, como um
// material de apresentação internacional, em vez de páginas soltas.
function pdfPage({ className = "", vars, motifUrl, ctx, num, total, chrome = true, bodyHtml }) {
  const div = document.createElement("div");
  div.className = "pdf-page";
  div.style.cssText = motifUrl
    ? `${vars}background-image:linear-gradient(rgba(6,7,9,0.86),rgba(6,7,9,0.86)),url("${motifUrl}");`
    : vars;

  const topmark = chrome
    ? `<div class="pdf-topmark">
        <img class="pdf-topmark__logo" src="${ctx.company.logo}" alt="${ctx.company.name}" />
        <span class="pdf-topmark__label">${String(num).padStart(2, "0")} — ${PDF_SECTIONS[num - 1]}</span>
      </div>`
    : "";

  const footer = chrome
    ? `<div class="pdf-footer">
        <span>Proposta Comercial &middot; <strong>${ctx.client.name}</strong></span>
        <span>${String(num).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
      </div>`
    : "";

  const watermark = chrome ? `<div class="pdf-page__watermark">${String(num).padStart(2, "0")}</div>` : "";
  const spine = chrome ? `<div class="pdf-page__spine"></div>` : "";

  div.innerHTML = `${watermark}${spine}${topmark}<div class="pdf-page__body ${className}">${bodyHtml}</div>${footer}`;
  return div;
}

function pdfCover({ ctx, vars, motifUrl, num, total }) {
  return pdfPage({
    className: "pdf-cover",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    chrome: false,
    bodyHtml: `
      <div class="pdf-cover__ring"></div>
      <div class="pdf-cover__ring pdf-cover__ring--inner"></div>
      <div class="pdf-cover__bracket pdf-cover__bracket--tl"></div>
      <div class="pdf-cover__bracket pdf-cover__bracket--br"></div>
      <div class="pdf-cover__dotgrid">${"<span></span>".repeat(10)}</div>
      <div class="pdf-cover__dotgrid pdf-cover__dotgrid--left">${"<span></span>".repeat(10)}</div>
      <div class="pdf-cover__eyebrow">Grupo GPV apresenta</div>
      <div class="pdf-cover__logos">
        <div class="pdf-cover__logo-circle pdf-cover__logo-circle--brand">
          <img src="${ctx.company.logo}" alt="${ctx.company.name}" />
        </div>
        ${ctx.client.logoPreviewUrl ? `<div class="pdf-cover__divider"></div><div class="pdf-cover__logo-circle pdf-cover__logo-circle--client"><img src="${ctx.client.logoPreviewUrl}" alt="${ctx.client.name}" /></div>` : ""}
      </div>
      <div class="pdf-cover__title">Proposta Comercial</div>
      <div class="pdf-cover__client">${ctx.client.name}</div>
      <div class="pdf-cover__accent"></div>
    `,
  });
}

function pdfEdneyOne({ ctx, vars, motifUrl, num, total }) {
  return pdfPage({
    className: "pdf-edney",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    bodyHtml: `
      <div class="pdf-edney__photo-wrap">
        <div class="pdf-edney__accent-circle"></div>
        <div class="pdf-edney__photo" style="background-image:url('${ctx.edneyAssets.photoOne}')"></div>
        <div class="pdf-edney__dots"><span></span><span></span><span></span></div>
      </div>
      <div class="pdf-edney__content">
        <div class="pdf-page__eyebrow">Grupo GPV</div>
        <div class="pdf-page__title">Edney Ulisses</div>
        <div class="pdf-divider"></div>
        <ul class="pdf-edney__bio-list">
          ${EDNEY_BIO.map((item) => `<li><span>${item}</span></li>`).join("")}
        </ul>
        <div class="pdf-edney__brands pdf-edney__brands--compact">
          ${ctx.allBrandLogos.map((b) => `<img src="${b.logo}" alt="${b.name}" />`).join("")}
        </div>
      </div>
    `,
  });
}

function pdfEdneyTwo({ ctx, vars, motifUrl, num, total }) {
  return pdfPage({
    className: "pdf-edney",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    bodyHtml: `
      <div class="pdf-edney__photo-wrap">
        <div class="pdf-edney__accent-circle"></div>
        <div class="pdf-edney__photo" style="background-image:url('${ctx.edneyAssets.photoTwo}')"></div>
        <div class="pdf-edney__dots"><span></span><span></span><span></span></div>
      </div>
      <div class="pdf-edney__content">
        <div class="pdf-page__eyebrow">Formação e Experiência</div>
        <div class="pdf-page__title">Autoridade Comercial</div>
        <div class="pdf-divider"></div>
        <p class="pdf-edney__text">Trajetória consolidada em treinamento, consultoria e desenvolvimento comercial para equipes de alta performance, com atuação direta na aceleração de resultados das marcas do Grupo GPV.</p>
        <div class="pdf-edney__icons">
          ${EDNEY_ICONS.map((i) => `<div class="pdf-edney__icon-item"><span class="pdf-edney__icon-badge">${i.svg}</span><span class="pdf-edney__icon-label">${i.label}</span></div>`).join("")}
        </div>
      </div>
    `,
  });
}

function pdfScope({ ctx, vars, motifUrl, num, total }) {
  const service = ctx.service;
  const sections = [];
  if (service?.offeredServices?.length) sections.push([service.offeredServicesTitle, service.offeredServices]);
  if (service?.eventConditions?.length) sections.push([service.eventConditionsTitle, service.eventConditions]);
  if (service?.differentials?.length) sections.push(["Diferenciais", service.differentials]);
  if (service?.premises?.length) sections.push(["Premissas", service.premises]);
  if (service?.customServices?.enabled) sections.push([service.customServices.fieldLabel, [appState.services.customServicesText]]);

  // Quatro níveis de densidade evitam que conteúdo extenso (ex.: Grand Prix, com
  // ~36 itens somados entre todas as seções) seja cortado pela altura fixa da página:
  // uma coluna quando cabe folgado, duas quando há conteúdo médio, três + tipografia
  // compacta quando o total é grande, e um nível "ultra" ainda mais compacto — com
  // quebra de coluna liberada dentro das seções — para os casos mais extremos.
  const totalItems = sections.reduce((sum, [, items]) => sum + items.length, 0);
  let densityClass = "";
  let pageClass = "";
  if (totalItems >= 24) {
    densityClass = " pdf-scope__columns--dense pdf-scope__columns--ultra";
    pageClass = "pdf-scope--dense pdf-scope--ultra";
  } else if (totalItems >= 14) {
    densityClass = " pdf-scope__columns--dense";
    pageClass = "pdf-scope--dense";
  } else if (totalItems >= 6) {
    densityClass = " pdf-scope__columns--split";
  }

  return pdfPage({
    className: pageClass,
    vars,
    motifUrl,
    ctx,
    num,
    total,
    bodyHtml: `
      <div class="pdf-page__eyebrow">${ctx.company.name}</div>
      <div class="pdf-page__title">${service ? service.selectionLabel : "Proposta e Escopo"}</div>
      ${service?.description ? `<div class="pdf-page__subtitle">${service.description}</div>` : ""}
      <div class="pdf-divider"></div>
      <div class="pdf-scope__columns${densityClass}">
        ${sections.map(([title, items]) => pdfListSection(title, items)).join("")}
      </div>
    `,
  });
}

function pdfListSection(title, items) {
  return `
    <div class="pdf-scope__section">
      <h4>${title || "Detalhes"}</h4>
      <ul class="pdf-scope__list">${items.map((i) => `<li>${i}</li>`).join("")}</ul>
    </div>`;
}

function pdfInvestment({ ctx, vars, motifUrl, num, total }) {
  const com = ctx.commercial;
  return pdfPage({
    vars,
    motifUrl,
    ctx,
    num,
    total,
    bodyHtml: `
      <div class="pdf-page__eyebrow">Investimento</div>
      <div class="pdf-page__title">Condições Comerciais</div>
      <div class="pdf-divider"></div>
      <div class="pdf-investment">
        <div class="pdf-investment__hero">
          <div class="pdf-investment__badge">Investimento total</div>
          <div class="pdf-investment__value">${com.proposalValue.formatted}</div>
          <div class="pdf-investment__value-label">para o escopo descrito nesta proposta</div>
        </div>
        ${com.notes ? `<div class="pdf-investment__notes">${com.notes}</div>` : ""}
        <div class="pdf-investment__stats">
          ${com.deliveryDeadline ? `<div class="pdf-investment__stat"><div class="pdf-investment__stat-icon"></div><div class="pdf-investment__stat-label">Prazo de entrega</div><div class="pdf-investment__stat-value">${com.deliveryDeadline}</div></div>` : ""}
          <div class="pdf-investment__stat"><div class="pdf-investment__stat-icon"></div><div class="pdf-investment__stat-label">Validade da proposta</div><div class="pdf-investment__stat-value">${com.proposalValidity}</div></div>
        </div>
      </div>
    `,
  });
}

function pdfClosing({ ctx, vars, motifUrl, num, total }) {
  const issuer = ctx.commercial.issuer;
  return pdfPage({
    className: "pdf-closing",
    vars,
    motifUrl,
    ctx,
    num,
    total,
    bodyHtml: `
      <div class="pdf-closing__quote">&rdquo;</div>
      <div class="pdf-page__eyebrow">Encerramento</div>
      <div class="pdf-page__title">Vamos acelerar seus resultados</div>
      <div class="pdf-divider"></div>
      <div class="pdf-closing__thanks">Agradecemos a oportunidade de apresentar esta proposta. Seguimos à disposição para esclarecer qualquer detalhe.</div>
      <div class="pdf-closing__signature-card">
        <div class="pdf-closing__issuer">
          <strong>${issuer.name}</strong>
          <span class="pdf-closing__role">${issuer.role}</span>
          <span class="pdf-closing__contact">${issuer.phone} &middot; ${issuer.email}</span>
        </div>
      </div>
    `,
  });
}

/* ---------------------------- EXPORTAÇÃO PDF ---------------------------- */

function slugify(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function waitForImages(root) {
  const images = Array.from(root.querySelectorAll("img"));
  return Promise.all(
    images.map((img) => (img.complete ? Promise.resolve() : new Promise((resolve) => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    })))
  );
}

const PDF_PAGE_WIDTH = 1123;
const PDF_PAGE_HEIGHT = 794;

// Cada .pdf-page é capturada isoladamente e inserida como uma página própria do PDF.
// Evita depender do plugin de paginação automática de bibliotecas de PDF-a-partir-de-HTML,
// que se mostrou instável com este layout (canvas capturado com altura zerada).
async function downloadPdf() {
  const company = appState.company;
  const filename = `proposta-${slugify(company.id)}-${slugify(appState.client.name)}.pdf`;
  const pdfRoot = document.getElementById("pdf-template-root");
  const pageElements = Array.from(pdfRoot.querySelectorAll(".pdf-page"));

  const button = document.getElementById("download-pdf-btn");
  button.disabled = true;
  const originalLabel = button.textContent;
  button.textContent = "Gerando PDF...";

  try {
    await waitForImages(pdfRoot);

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "px", format: [PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT], orientation: "landscape" });

    for (let i = 0; i < pageElements.length; i++) {
      const canvas = await window.html2canvas(pageElements[i], {
        scale: 2,
        useCORS: true,
        width: PDF_PAGE_WIDTH,
        height: PDF_PAGE_HEIGHT,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      if (i > 0) pdf.addPage([PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT], "landscape");
      pdf.addImage(imgData, "JPEG", 0, 0, PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT);
    }

    pdf.save(filename);
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}
