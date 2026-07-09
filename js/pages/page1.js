import { appState } from "../state.js";
import { getCompanyById } from "../data.js";
import { applyTheme } from "../theme.js";
import { goToNextPage } from "../navigation.js";
import { updateBrandHeaders } from "./shared.js";
import { renderServices } from "./page3.js";
import { refreshCommercialRules } from "./page4.js";
import { setMotifForCompany } from "../motif.js";

export function initPage1(data) {
  const grid = document.getElementById("brand-grid");
  grid.innerHTML = "";

  data.navigation.pageOneNavigation.forEach((item) => {
    if (item.type === "dropdown") {
      grid.appendChild(buildDropdownCard(item, data));
    } else {
      grid.appendChild(buildDirectCard(item, data));
    }
  });
}

// Leve inclinação 3D que acompanha o cursor — reforça a sensação premium/interativa
// da tela de entrada sem exagerar (rotação limitada a poucos graus).
function attachTilt(card) {
  const MAX_DEG = 7;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${(-py * MAX_DEG).toFixed(2)}deg) rotateY(${(px * MAX_DEG).toFixed(2)}deg) translateY(-4px) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
}

function buildDirectCard(item, data) {
  const card = document.createElement("div");
  card.className = "brand-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.style.setProperty("--card-hover-color", item.hoverColor);

  card.innerHTML = `
    <img class="brand-card__logo" src="${item.logo}" alt="${item.label}" />
    <span class="brand-card__label">${item.label}</span>
  `;

  const select = () => selectCompany(item.companyId, data);
  card.addEventListener("click", select);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select();
    }
  });
  attachTilt(card);

  return card;
}

function buildDropdownCard(item, data) {
  const wrapper = document.createElement("div");
  wrapper.className = "brand-card-wrapper";

  const card = document.createElement("div");
  card.className = "brand-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-expanded", "false");

  card.innerHTML = `
    <img class="brand-card__logo" src="${item.logo}" alt="${item.label}" />
    <span class="brand-card__label">${item.label} <span class="brand-card__label-chevron">▾</span></span>
    <span class="brand-card__hint">Selecione a solução</span>
  `;

  const submenu = document.createElement("div");
  submenu.className = "brand-submenu";
  const inner = document.createElement("div");
  inner.className = "brand-submenu__inner";
  const options = document.createElement("div");
  options.className = "brand-submenu__options";

  item.options.forEach((option) => {
    const optionEl = document.createElement("button");
    optionEl.type = "button";
    optionEl.className = "brand-suboption";
    optionEl.style.setProperty("--suboption-hover-color", option.hoverColor);
    optionEl.textContent = option.label;
    optionEl.title = option.description || option.label;
    optionEl.addEventListener("click", (e) => {
      e.stopPropagation();
      selectCompany(option.companyId, data);
    });
    options.appendChild(optionEl);
  });

  inner.appendChild(options);
  submenu.appendChild(inner);

  const toggle = () => {
    const isOpen = card.classList.toggle("is-open");
    submenu.classList.toggle("is-open", isOpen);
    card.setAttribute("aria-expanded", String(isOpen));
    card.style.setProperty("--card-hover-color", isOpen ? item.hoverColor : "");
  };

  card.addEventListener("click", toggle);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
  card.addEventListener("mouseenter", () => card.style.setProperty("--card-hover-color", item.hoverColor));
  card.addEventListener("mouseleave", () => {
    if (!card.classList.contains("is-open")) card.style.setProperty("--card-hover-color", "");
  });
  attachTilt(card);

  wrapper.appendChild(card);
  wrapper.appendChild(submenu);
  return wrapper;
}

function selectCompany(companyId, data) {
  const company = getCompanyById(data, companyId);
  if (!company) return;

  appState.company = company;
  applyTheme(company.theme);
  setMotifForCompany(company.id);
  updateBrandHeaders(company);
  renderServices(company.id, data);
  refreshCommercialRules();
  goToNextPage(2);
}
