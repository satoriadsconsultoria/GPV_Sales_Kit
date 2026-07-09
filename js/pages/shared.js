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

  const sidePanelLogo = document.getElementById("side-panel-logo");
  if (sidePanelLogo) {
    sidePanelLogo.src = company.logo;
    sidePanelLogo.alt = company.name;
  }
  const sidePanelName = document.getElementById("side-panel-name");
  if (sidePanelName) sidePanelName.textContent = company.name;
  const sidePanelDescription = document.getElementById("side-panel-description");
  if (sidePanelDescription) sidePanelDescription.textContent = company.shortDescription || "";

  const page4Logo = document.getElementById("page4-side-logo");
  if (page4Logo) {
    page4Logo.src = company.logo;
    page4Logo.alt = company.name;
  }
  const page4Name = document.getElementById("page4-side-name");
  if (page4Name) page4Name.textContent = company.name;
}
