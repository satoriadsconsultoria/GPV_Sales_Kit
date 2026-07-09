// Motivo decorativo de fundo por marca — reforça a identidade visual sem
// disputar atenção com o conteúdo (opacidade baixa, atrás de tudo).
const MOTIF_BY_COMPANY = {
  "grand-prix": "f1",
  champions: "f1",
  veloce: "f1",
  conquista: "buildings",
  edney: "charts",
};

const motifEl = document.getElementById("page-motif");

export function setMotifForCompany(companyId) {
  const motif = MOTIF_BY_COMPANY[companyId];
  motifEl.classList.remove("page-motif--f1", "page-motif--buildings", "page-motif--charts");
  if (motif) motifEl.classList.add(`page-motif--${motif}`);
}

export function setMotifVisible(visible) {
  motifEl.classList.toggle("is-visible", visible);
}

export function getMotifPath(companyId) {
  const motif = MOTIF_BY_COMPANY[companyId];
  return motif ? `assets/backgrounds/motif-${motif}.jpg` : null;
}
