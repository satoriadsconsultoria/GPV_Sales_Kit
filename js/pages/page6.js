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

  const watermark = `<div class="pdf-page__watermark">${String(num).padStart(2, "0")}</div>`;

  div.innerHTML = `${watermark}${topmark}<div class="pdf-page__body ${className}">${bodyHtml}</div>${footer}`;
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
      <div class="pdf-cover__eyebrow">Grupo GPV apresenta</div>
      <div class="pdf-cover__logos">
        <img class="pdf-cover__logo" src="${ctx.company.logo}" alt="${ctx.company.name}" />
        ${ctx.client.logoPreviewUrl ? `<div class="pdf-cover__divider"></div><img class="pdf-cover__client-logo" src="${ctx.client.logoPreviewUrl}" alt="${ctx.client.name}" />` : ""}
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
        <img class="pdf-edney__photo" src="${ctx.edneyAssets.photoOne}" alt="Edney Ulisses" />
        <div class="pdf-edney__dots"><span></span><span></span><span></span></div>
      </div>
      <div class="pdf-edney__content">
        <div class="pdf-page__eyebrow">Grupo GPV</div>
        <div class="pdf-page__title">Edney Ulisses</div>
        <div class="pdf-divider"></div>
        <p class="pdf-edney__text">Fundador e especialista à frente das soluções do Grupo GPV, referência em aceleração comercial no mercado brasileiro.</p>
        <div class="pdf-edney__brands">
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
        <img class="pdf-edney__photo" src="${ctx.edneyAssets.photoTwo}" alt="Edney Ulisses" />
        <div class="pdf-edney__dots"><span></span><span></span><span></span></div>
      </div>
      <div class="pdf-edney__content">
        <div class="pdf-page__eyebrow">Formação e Experiência</div>
        <div class="pdf-page__title">Autoridade Comercial</div>
        <div class="pdf-divider"></div>
        <p class="pdf-edney__text">Trajetória consolidada em treinamento, consultoria e desenvolvimento comercial para equipes de alta performance, com atuação direta na aceleração de resultados das marcas do Grupo GPV.</p>
        <div class="pdf-edney__tags">
          ${["Treinamento", "Consultoria", "Desenvolvimento comercial", "Alta performance"].map((t) => `<span class="pdf-edney__tag">${t}</span>`).join("")}
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

  // Só divide em duas colunas quando há conteúdo suficiente para preencher a página
  // com equilíbrio — do contrário uma coluna fica vazia e desperdiça espaço.
  const totalItems = sections.reduce((sum, [, items]) => sum + items.length, 0);
  const splitClass = totalItems >= 6 ? " pdf-scope__columns--split" : "";

  return pdfPage({
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
      <div class="pdf-scope__columns${splitClass}">
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
          <div class="pdf-investment__value">${com.proposalValue.formatted}</div>
          <div class="pdf-investment__value-label">valor total do investimento</div>
        </div>
        ${com.notes ? `<div class="pdf-investment__notes">${com.notes}</div>` : ""}
        <div class="pdf-investment__stats">
          ${com.deliveryDeadline ? `<div><div class="pdf-investment__stat-label">Prazo de entrega</div><div class="pdf-investment__stat-value">${com.deliveryDeadline}</div></div>` : ""}
          <div><div class="pdf-investment__stat-label">Validade da proposta</div><div class="pdf-investment__stat-value">${com.proposalValidity}</div></div>
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
      <div class="pdf-page__eyebrow">Encerramento</div>
      <div class="pdf-page__title">Vamos acelerar seus resultados</div>
      <div class="pdf-divider"></div>
      <div class="pdf-closing__thanks">Agradecemos a oportunidade de apresentar esta proposta. Seguimos à disposição para esclarecer qualquer detalhe.</div>
      <div class="pdf-closing__issuer">
        <strong>${issuer.name}</strong>
        <span>${issuer.role}</span>
        <span>${issuer.phone} &middot; ${issuer.email}</span>
      </div>
      <div class="pdf-closing__validity">Válida por <strong>${ctx.commercial.proposalValidity}</strong></div>
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
