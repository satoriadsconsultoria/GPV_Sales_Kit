import { appState } from "./state.js";
import { setMotifVisible } from "./motif.js";

const pages = Array.from(document.querySelectorAll(".page"));
const progressNav = document.getElementById("progress-nav");
const progressItems = Array.from(document.querySelectorAll(".progress-nav__item"));
const progressFill = document.getElementById("progress-fill");
const FIRST_STEP = 2;
const LAST_STEP = 6;

export function goToPage(pageNumber) {
  pages.forEach((section) => {
    const isTarget = Number(section.dataset.page) === pageNumber;
    section.classList.toggle("page--active", isTarget);
  });

  appState.meta.currentPage = pageNumber;

  if (pageNumber >= 2) {
    progressNav.classList.remove("is-hidden");
  } else {
    progressNav.classList.add("is-hidden");
  }

  setMotifVisible(pageNumber >= 2);

  progressItems.forEach((item) => {
    const step = Number(item.dataset.step);
    item.classList.toggle("is-active", step === pageNumber);
    item.classList.toggle("is-done", step < pageNumber);
  });

  const progress = Math.min(1, Math.max(0, (pageNumber - FIRST_STEP) / (LAST_STEP - FIRST_STEP)));
  progressFill.style.width = `${progress * 100}%`;

  window.scrollTo({ top: 0, behavior: "smooth" });

  document.dispatchEvent(new CustomEvent("gpv:page-enter", { detail: { page: pageNumber } }));
}

export function goToPreviousPage() {
  const current = appState.meta.currentPage;
  if (current <= 1) return;
  goToPage(current - 1);
}

// Após concluir uma página de edição disparada a partir da Página 5 (Conferência),
// o fluxo deve retornar à conferência em vez de seguir a sequência linear.
export function goToNextPage(defaultNext) {
  if (appState.meta.returnToReview) {
    appState.meta.returnToReview = false;
    goToPage(5);
    return;
  }
  goToPage(defaultNext);
}

export function editFromReview(targetPage) {
  appState.meta.returnToReview = true;
  goToPage(targetPage);
}

export function bindBackButtons() {
  document.querySelectorAll("[data-nav-back]").forEach((btn) => {
    btn.addEventListener("click", () => goToPreviousPage());
  });
}
