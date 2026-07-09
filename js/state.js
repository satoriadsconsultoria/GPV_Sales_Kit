// Estado global da aplicação (appState) — mantido em memória durante toda a sessão.
export const appState = {
  company: null, // objeto completo da marca selecionada (data/companies.json)
  client: {
    name: "",
    phone: "",
    email: "",
    logoFile: null,
    logoPreviewUrl: "",
  },
  services: {
    selectedServiceIds: [],
    customServicesText: "",
  },
  commercial: {
    proposalValue: { raw: 0, formatted: "" },
    notes: "",
    deliveryDeadline: "",
    proposalValidity: "",
    issuer: { name: "", role: "", phone: "", email: "" },
  },
  meta: {
    currentPage: 1,
  },
};

export function resetState() {
  appState.company = null;
  appState.client = { name: "", phone: "", email: "", logoFile: null, logoPreviewUrl: "" };
  appState.services = { selectedServiceIds: [], customServicesText: "" };
  appState.commercial = {
    proposalValue: { raw: 0, formatted: "" },
    notes: "",
    deliveryDeadline: "",
    proposalValidity: "",
    issuer: { name: "", role: "", phone: "", email: "" },
  };
  appState.meta.currentPage = 1;
}
