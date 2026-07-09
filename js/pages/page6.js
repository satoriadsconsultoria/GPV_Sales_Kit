import { appState } from "../state.js";
import { getSelectedService } from "./page3.js";
import { getMutedTextColor } from "../theme.js";

let sharedData = null;

export function initPage6() {
  document.getElementById("download-pdf-btn").addEventListener("click", downloadPdf);
}

export function buildProposal(data) {
  sharedData = data;
  const ctx = collectProposalContext(data);
  document.getElementById("proposal-viewer").innerHTML = "";
  document.getElementById("proposal-viewer").appendChild(buildInteractiveProposal(ctx));

  const pdfRoot = document.getElementById("pdf-template-root");
  pdfRoot.innerHTML = "";
  pdfRoot.appendChild(buildPdfTemplate(ctx));
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
      <div style="display:flex;justify-content:center;gap:32px;align-items:center;margin-bottom:16px;">
        <img class="logo-chip" src="${ctx.company.logo}" alt="${ctx.company.name}" style="height:56px;" />
        ${ctx.client.logoPreviewUrl ? `<img class="logo-chip" src="${ctx.client.logoPreviewUrl}" alt="${ctx.client.name}" style="height:56px;" />` : ""}
      </div>
      <h2 style="font-size:1.8rem;font-weight:800;">Proposta Comercial</h2>
      <p style="color:var(--color-muted);margin-top:8px;">${ctx.client.name}</p>
    </div>`
  ));

  wrapper.appendChild(section(
    "Edney Ulisses — Institucional",
    `<div class="form-card">
      <p>Edney Ulisses é fundador e especialista à frente das soluções do Grupo GPV, referência em aceleração comercial no mercado brasileiro.</p>
      <div style="display:flex;flex-wrap:wrap;gap:24px;margin-top:16px;align-items:center;">
        ${ctx.allBrandLogos.map((b) => `<img class="logo-chip" src="${b.logo}" alt="${b.name}" style="height:32px;" />`).join("")}
      </div>
    </div>`
  ));

  wrapper.appendChild(section(
    "Edney Ulisses — Formação e Experiência",
    `<div class="form-card">
      <p>Trajetória consolidada em treinamento, consultoria e desenvolvimento comercial para equipes de alta performance, com atuação direta na aceleração de resultados das marcas do Grupo GPV.</p>
    </div>`
  ));

  wrapper.appendChild(section("Proposta e Escopo", buildScopeHtml(ctx.service)));

  wrapper.appendChild(section(
    "Investimento e Condições",
    `<div class="form-card">
      <div style="font-size:2rem;font-weight:800;color:var(--color-accent);">${ctx.commercial.proposalValue.formatted}</div>
      ${ctx.commercial.notes ? `<p style="margin-top:12px;">${ctx.commercial.notes}</p>` : ""}
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
      <img class="logo-chip" src="${ctx.company.logo}" alt="${ctx.company.name}" style="height:40px;margin-top:16px;" />
    </div>`
  ));

  return wrapper;
}

function section(title, innerHtml) {
  const el = document.createElement("section");
  el.innerHTML = `<h3 style="font-size:0.85rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--color-muted);margin-bottom:12px;">${title}</h3>${innerHtml}`;
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

function buildPdfTemplate(ctx) {
  const fragment = document.createDocumentFragment();
  const theme = ctx.company.theme;
  const pdfVars = `--pdf-bg:${theme.backgroundColor};--pdf-text:${theme.textColor};--pdf-accent:${theme.accentColor};--pdf-muted:${getMutedTextColor(theme)};`;

  fragment.appendChild(pdfCover(ctx, pdfVars));
  fragment.appendChild(pdfEdneyOne(ctx, pdfVars));
  fragment.appendChild(pdfEdneyTwo(ctx, pdfVars));
  fragment.appendChild(pdfScope(ctx, pdfVars));
  fragment.appendChild(pdfInvestment(ctx, pdfVars));
  fragment.appendChild(pdfClosing(ctx, pdfVars));

  return fragment;
}

function pdfPage(className, styleVars, innerHtml) {
  const div = document.createElement("div");
  div.className = `pdf-page ${className}`;
  div.style.cssText = styleVars;
  div.innerHTML = innerHtml;
  return div;
}

function pdfCover(ctx, vars) {
  return pdfPage("pdf-cover", vars, `
    <div class="pdf-cover__logos">
      <img class="pdf-cover__logo" src="${ctx.company.logo}" alt="${ctx.company.name}" />
      ${ctx.client.logoPreviewUrl ? `<img class="pdf-cover__client-logo" src="${ctx.client.logoPreviewUrl}" alt="${ctx.client.name}" />` : ""}
    </div>
    <div class="pdf-cover__title">Proposta Comercial</div>
    <div class="pdf-cover__client">${ctx.client.name}</div>
  `);
}

function pdfEdneyOne(ctx, vars) {
  return pdfPage("pdf-edney", vars, `
    <img class="pdf-edney__photo" src="${ctx.edneyAssets.photoOne}" alt="Edney Ulisses" />
    <div class="pdf-edney__content">
      <div class="pdf-page__eyebrow">Grupo GPV</div>
      <div class="pdf-page__title">Edney Ulisses</div>
      <div class="pdf-divider"></div>
      <p class="pdf-edney__text">Fundador e especialista à frente das soluções do Grupo GPV, referência em aceleração comercial no mercado brasileiro.</p>
      <div class="pdf-edney__brands">
        ${ctx.allBrandLogos.map((b) => `<img src="${b.logo}" alt="${b.name}" />`).join("")}
      </div>
    </div>
  `);
}

function pdfEdneyTwo(ctx, vars) {
  return pdfPage("pdf-edney", vars, `
    <img class="pdf-edney__photo" src="${ctx.edneyAssets.photoTwo}" alt="Edney Ulisses" />
    <div class="pdf-edney__content">
      <div class="pdf-page__eyebrow">Formação e Experiência</div>
      <div class="pdf-page__title">Autoridade Comercial</div>
      <div class="pdf-divider"></div>
      <p class="pdf-edney__text">Trajetória consolidada em treinamento, consultoria e desenvolvimento comercial para equipes de alta performance, com atuação direta na aceleração de resultados das marcas do Grupo GPV.</p>
    </div>
  `);
}

function pdfScope(ctx, vars) {
  const service = ctx.service;
  let sections = "";
  if (service?.offeredServices?.length) {
    sections += pdfListSection(service.offeredServicesTitle, service.offeredServices);
  }
  if (service?.eventConditions?.length) {
    sections += pdfListSection(service.eventConditionsTitle, service.eventConditions);
  }
  if (service?.customServices?.enabled) {
    sections += pdfListSection(service.customServices.fieldLabel, [appState.services.customServicesText]);
  }

  return pdfPage("", vars, `
    <div class="pdf-page__eyebrow">${ctx.company.name}</div>
    <div class="pdf-page__title">${service ? service.selectionLabel : "Proposta e Escopo"}</div>
    <div class="pdf-divider"></div>
    ${sections}
  `);
}

function pdfListSection(title, items) {
  return `
    <div class="pdf-scope__section">
      <h4>${title || "Detalhes"}</h4>
      <ul class="pdf-scope__list">${items.map((i) => `<li>${i}</li>`).join("")}</ul>
    </div>`;
}

function pdfInvestment(ctx, vars) {
  const com = ctx.commercial;
  return pdfPage("", vars, `
    <div class="pdf-page__eyebrow">Investimento</div>
    <div class="pdf-page__title">Condições Comerciais</div>
    <div class="pdf-divider"></div>
    <div class="pdf-investment__grid">
      <div>
        <div class="pdf-investment__value">${com.proposalValue.formatted}</div>
        ${com.notes ? `<p style="margin-top:12px;font-size:14px;">${com.notes}</p>` : ""}
      </div>
      <div>
        ${com.deliveryDeadline ? `<div class="pdf-investment__row"><span>Prazo de entrega</span><span>${com.deliveryDeadline}</span></div>` : ""}
        <div class="pdf-investment__row"><span>Validade da proposta</span><span>${com.proposalValidity}</span></div>
      </div>
    </div>
  `);
}

function pdfClosing(ctx, vars) {
  const issuer = ctx.commercial.issuer;
  return pdfPage("pdf-closing", vars, `
    <div>
      <div class="pdf-page__eyebrow">Encerramento</div>
      <div class="pdf-page__title">Validade e Responsável</div>
      <div class="pdf-divider"></div>
      <div>Validade da proposta: ${ctx.commercial.proposalValidity}</div>
      <div class="pdf-closing__issuer">
        <strong>${issuer.name}</strong>
        <span>${issuer.role}</span>
        <span>${issuer.phone}</span>
        <span>${issuer.email}</span>
      </div>
    </div>
    <div class="pdf-closing__footer">
      <span>${ctx.client.name}</span>
      <img src="${ctx.company.logo}" alt="${ctx.company.name}" />
    </div>
  `);
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
