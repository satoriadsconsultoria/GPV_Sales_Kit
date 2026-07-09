import { appState } from "./state.js";

const pages = Array.from(document.querySelectorAll(".page"));
const progressNav = document.getElementById("progress-nav");
const progressItems = Array.from(document.querySelectorAll(".progress-nav__item"));

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

  progressItems.forEach((item) => {
    const step = Number(item.dataset.step);
    item.classList.toggle("is-active", step === pageNumber);
    item.classList.toggle("is-done", step < pageNumber);
  });

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
