// Utilidades compartilhadas entre as páginas 2 a 6, que exibem a identidade da marca selecionada.
const HEADER_LOGO_IDS = [
  "page2-brand-logo",
  "page3-brand-logo",
  "page4-brand-logo",
  "page5-brand-logo",
];

export function updateBrandHeaders(company) {
  HEADER_LOGO_IDS.forEach((id) => {
    const img = document.getElementById(id);
    if (!img) return;
    img.src = company.logo;
    img.alt = company.name;
  });
}
