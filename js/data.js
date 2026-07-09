// Carregamento dos bancos de dados locais em JSON.
let cachedData = null;

export async function loadData() {
  if (cachedData) return cachedData;

  const [companies, config, navigation, services] = await Promise.all([
    fetch("data/companies.json").then((r) => r.json()),
    fetch("data/config.json").then((r) => r.json()),
    fetch("data/navigation.json").then((r) => r.json()),
    fetch("data/services.json").then((r) => r.json()),
  ]);

  cachedData = { companies, config, navigation, services };
  return cachedData;
}

export function getCompanyById(data, companyId) {
  return data.companies.find((c) => c.id === companyId) || null;
}

export function getServicesByCompanyId(data, companyId) {
  return data.services.filter((s) => s.companyId === companyId);
}
