import { appState } from "../state.js";
import { editFromReview, goToPage } from "../navigation.js";
import { getSelectedService } from "./page3.js";
import { showToast } from "../toast.js";
import { buildProposal } from "./page6.js";

let sharedData = null;

export function initPage5(data) {
  sharedData = data;

  document.addEventListener("gpv:page-enter", (e) => {
    if (e.detail.page === 5) renderReviewBlocks();
  });

  document.getElementById("generate-proposal-btn").addEventListener("click", () => {
    const missingPage = findIncompletePage();
    if (missingPage) {
      showToast("Complete os dados obrigatórios antes de gerar a proposta.");
      goToPage(missingPage);
      return;
    }
    buildProposal(sharedData);
    goToPage(6);
  });
}

function findIncompletePage() {
  if (!appState.company) return 1;
  const { name, phone, email, logoFile } = appState.client;
  if (!name || !phone || !email || !logoFile) return 2;
  if (appState.services.selectedServiceIds.length !== 1) return 3;
  const { proposalValue, proposalValidity, issuer } = appState.commercial;
  if (!proposalValue.raw || !proposalValidity || !issuer.name || !issuer.email) return 4;
  return null;
}

function renderReviewBlocks() {
  const container = document.getElementById("review-blocks");
  container.innerHTML = "";

  container.appendChild(buildBrandBlock());
  container.appendChild(buildClientBlock());
  container.appendChild(buildServicesBlock());
  container.appendChild(buildCommercialBlock());
}

function buildBlock(title, targetPage, rowsHtml) {
  const block = document.createElement("div");
  block.className = "review-block";
  block.innerHTML = `
    <div class="review-block__header">
      <h3>${title}</h3>
      <button type="button" class="review-block__edit">Editar</button>
    </div>
    ${rowsHtml}
  `;
  block.querySelector(".review-block__edit").addEventListener("click", () => editFromReview(targetPage));
  return block;
}

function row(label, value) {
  return `<div class="review-row"><span class="review-row__label">${label}</span><span class="review-row__value">${value || "—"}</span></div>`;
}

function buildBrandBlock() {
  const company = appState.company;
  return buildBlock("Marca selecionada", 1, row("Marca", company ? company.name : "Não selecionada"));
}

function buildClientBlock() {
  const c = appState.client;
  return buildBlock(
    "Dados do cliente",
    2,
    row("Nome", c.name) + row("Telefone", c.phone) + row("E-mail", c.email) + row("Logo", c.logoFile ? c.logoFile.name : "Não enviado")
  );
}

function buildServicesBlock() {
  const service = getSelectedService();
  let rows = row("Serviço/Plano", service ? service.selectionLabel : "Não selecionado");
  if (service?.customServices?.enabled) {
    rows += row("Serviços personalizados", appState.services.customServicesText || "Não preenchido");
  }
  return buildBlock("Serviços/planos selecionados", 3, rows);
}

function buildCommercialBlock() {
  const com = appState.commercial;
  let rows = row("Valor da proposta", com.proposalValue.formatted);
  if (com.notes) rows += row("Observações", com.notes);
  if (com.deliveryDeadline) rows += row("Prazo de entrega", com.deliveryDeadline);
  rows += row("Validade da proposta", com.proposalValidity);
  rows += row("Emissor", com.issuer.name);
  rows += row("Função do emissor", com.issuer.role);
  rows += row("Telefone do emissor", com.issuer.phone);
  rows += row("E-mail do emissor", com.issuer.email);
  return buildBlock("Dados comerciais e emissor", 4, rows);
}
