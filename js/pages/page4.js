import { appState } from "../state.js";
import { goToNextPage } from "../navigation.js";
import { getSelectedService } from "./page3.js";
import {
  isValidEmail,
  isValidPhone,
  formatPhoneInput,
  formatCurrencyInput,
  parseCurrencyToNumber,
  setFieldError,
  clearFieldErrors,
} from "../validation.js";

const FIELD_IDS = [
  "proposal-value",
  "delivery-deadline",
  "proposal-validity",
  "issuer-name",
  "issuer-role",
  "issuer-phone",
  "issuer-email",
];

export function initPage4() {
  const form = document.getElementById("form-commercial");
  const valueInput = document.getElementById("proposal-value");
  const deadlineInput = document.getElementById("delivery-deadline");
  const issuerPhoneInput = document.getElementById("issuer-phone");

  valueInput.addEventListener("input", () => {
    valueInput.value = formatCurrencyInput(valueInput.value);
    updateSummary();
  });

  issuerPhoneInput.addEventListener("input", () => {
    issuerPhoneInput.value = formatPhoneInput(issuerPhoneInput.value);
  });

  deadlineInput.addEventListener("input", updateSummary);
  document.getElementById("proposal-validity").addEventListener("input", updateSummary);

  document.addEventListener("gpv:page-enter", (e) => {
    if (e.detail.page === 4) updateSummary();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validatePage4()) return;

    appState.commercial.proposalValue = {
      raw: parseCurrencyToNumber(valueInput.value),
      formatted: valueInput.value.trim(),
    };
    appState.commercial.notes = document.getElementById("proposal-notes").value.trim();
    appState.commercial.deliveryDeadline = deadlineInput.value.trim();
    appState.commercial.proposalValidity = document.getElementById("proposal-validity").value.trim();
    appState.commercial.issuer = {
      name: document.getElementById("issuer-name").value.trim(),
      role: document.getElementById("issuer-role").value.trim(),
      phone: issuerPhoneInput.value.trim(),
      email: document.getElementById("issuer-email").value.trim(),
    };

    goToNextPage(5);
  });
}

// O prazo de entrega é obrigatório somente para a marca VELOCE (RF015).
export function refreshCommercialRules() {
  const isVeloce = appState.company?.id === "veloce";
  const field = document.getElementById("delivery-deadline-field");
  field.dataset.required = String(isVeloce);
  document.getElementById("delivery-deadline").required = isVeloce;
  updateSummary();
}

function summaryRow(label, value) {
  return `<div class="side-panel__summary-row"><span>${label}</span><span>${value}</span></div>`;
}

function updateSummary() {
  const container = document.getElementById("page4-summary-rows");
  if (!container) return;

  const service = getSelectedService();
  const value = document.getElementById("proposal-value").value.trim();
  const deadline = document.getElementById("delivery-deadline").value.trim();
  const validity = document.getElementById("proposal-validity").value.trim();

  let html = summaryRow("Serviço/Plano", service ? service.selectionLabel : "—");
  html += summaryRow("Valor", value || "—");
  if (deadline) html += summaryRow("Prazo", deadline);
  if (validity) html += summaryRow("Validade", validity);

  container.innerHTML = html;
}

function validatePage4() {
  clearFieldErrors(FIELD_IDS);
  let valid = true;

  const value = parseCurrencyToNumber(document.getElementById("proposal-value").value);
  if (!value || value <= 0) {
    setFieldError("proposal-value", "Informe o valor da proposta.");
    valid = false;
  }

  const isVeloce = appState.company?.id === "veloce";
  const deadline = document.getElementById("delivery-deadline").value.trim();
  if (isVeloce && !deadline) {
    setFieldError("delivery-deadline", "Prazo de entrega é obrigatório para VELOCE.");
    valid = false;
  }

  const validity = document.getElementById("proposal-validity").value.trim();
  if (!validity) {
    setFieldError("proposal-validity", "Informe a validade da proposta.");
    valid = false;
  }

  const issuerName = document.getElementById("issuer-name").value.trim();
  if (!issuerName) {
    setFieldError("issuer-name", "Informe o nome do emissor.");
    valid = false;
  }

  const issuerRole = document.getElementById("issuer-role").value.trim();
  if (!issuerRole) {
    setFieldError("issuer-role", "Informe a função do emissor.");
    valid = false;
  }

  const issuerPhone = document.getElementById("issuer-phone").value.trim();
  if (!isValidPhone(issuerPhone)) {
    setFieldError("issuer-phone", "Informe um telefone válido.");
    valid = false;
  }

  const issuerEmail = document.getElementById("issuer-email").value.trim();
  if (!isValidEmail(issuerEmail)) {
    setFieldError("issuer-email", "Informe um e-mail válido.");
    valid = false;
  }

  return valid;
}
