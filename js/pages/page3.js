import { appState } from "../state.js";
import { getServicesByCompanyId } from "../data.js";
import { goToNextPage } from "../navigation.js";
import { showToast } from "../toast.js";

let currentServices = [];
const MIN_CUSTOM_LENGTH = 5;

export function initPage3() {
  document.getElementById("services-continue-btn").addEventListener("click", () => {
    if (!isSelectionValid()) {
      showToast("Selecione um serviço/plano e preencha os campos obrigatórios.");
      return;
    }
    goToNextPage(4);
  });
}

export function renderServices(companyId, data) {
  currentServices = getServicesByCompanyId(data, companyId);
  appState.services.selectedServiceIds = [];
  appState.services.customServicesText = "";

  const container = document.getElementById("services-container");
  container.innerHTML = "";
  container.classList.add("stagger");

  currentServices.forEach((service) => {
    container.appendChild(buildServiceCard(service));
  });

  updateContinueButton();
}

function buildServiceCard(service) {
  const card = document.createElement("div");
  card.className = "service-card";
  card.dataset.serviceId = service.id;

  const header = document.createElement("div");
  header.className = "service-card__header";
  header.innerHTML = `
    <span class="service-card__checkbox"></span>
    <div>
      <div class="service-card__title">${service.selectionLabel}</div>
      <div class="service-card__description">${service.description || ""}</div>
    </div>
  `;
  header.addEventListener("click", () => toggleSelection(service, card));

  const details = document.createElement("div");
  details.className = "service-card__details";
  const detailsInner = document.createElement("div");
  detailsInner.className = "service-card__details-inner";
  detailsInner.appendChild(buildDetailsContent(service));
  details.appendChild(detailsInner);

  card.appendChild(header);
  card.appendChild(details);
  return card;
}

function buildDetailsContent(service) {
  const wrapper = document.createElement("div");
  const sections = service.pageThreeBehavior?.detailsSections || [];

  sections.forEach((section) => {
    if (section === "offeredServices" && service.offeredServices?.length) {
      wrapper.appendChild(buildList(service.offeredServicesTitle, service.offeredServices));
    }
    if (section === "eventConditions" && service.eventConditions?.length) {
      wrapper.appendChild(buildList(service.eventConditionsTitle, service.eventConditions));
    }
    if (section === "customServices" && service.customServices?.enabled) {
      wrapper.appendChild(buildCustomServicesField(service));
    }
  });

  return wrapper;
}

function buildList(title, items) {
  const section = document.createElement("div");
  section.className = "service-detail-section";
  const heading = document.createElement("h4");
  heading.textContent = title || "Detalhes";
  const list = document.createElement("ul");
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  section.appendChild(heading);
  section.appendChild(list);
  return section;
}

function buildCustomServicesField(service) {
  const section = document.createElement("div");
  section.className = "service-detail-section";
  const heading = document.createElement("h4");
  heading.textContent = service.customServices.fieldLabel || "Serviços personalizados";
  const textarea = document.createElement("textarea");
  textarea.rows = 4;
  textarea.placeholder = service.customServices.placeholder || "";
  textarea.value = appState.services.customServicesText;
  textarea.addEventListener("click", (e) => e.stopPropagation());
  textarea.addEventListener("input", () => {
    appState.services.customServicesText = textarea.value;
    updateContinueButton();
  });
  section.appendChild(heading);
  section.appendChild(textarea);
  return section;
}

function toggleSelection(service, card) {
  const isSelected = appState.services.selectedServiceIds.includes(service.id);

  if (isSelected) {
    appState.services.selectedServiceIds = [];
    card.classList.remove("is-selected");
    updateContinueButton();
    return;
  }

  // Dentro de um mesmo planGroup (ex.: planos VELOCE), a seleção é exclusiva.
  if (service.planGroup) {
    currentServices
      .filter((s) => s.planGroup === service.planGroup)
      .forEach((s) => {
        document.querySelector(`[data-service-id="${s.id}"]`)?.classList.remove("is-selected");
      });
  } else {
    currentServices.forEach((s) => {
      document.querySelector(`[data-service-id="${s.id}"]`)?.classList.remove("is-selected");
    });
  }

  appState.services.selectedServiceIds = [service.id];
  appState.services.customServicesText = "";
  card.classList.add("is-selected");
  updateContinueButton();
}

function isSelectionValid() {
  if (appState.services.selectedServiceIds.length !== 1) return false;
  const selected = currentServices.find((s) => s.id === appState.services.selectedServiceIds[0]);
  if (!selected) return false;
  if (selected.customServices?.required) {
    return appState.services.customServicesText.trim().length >= (selected.customServices.minLength || MIN_CUSTOM_LENGTH);
  }
  return true;
}

function updateContinueButton() {
  document.getElementById("services-continue-btn").disabled = !isSelectionValid();
}

export function getSelectedService() {
  return currentServices.find((s) => s.id === appState.services.selectedServiceIds[0]) || null;
}
