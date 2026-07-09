const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return EMAIL_REGEX.test(String(value).trim());
}

export function isValidPhone(value) {
  const digits = String(value).replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 11;
}

export function formatPhoneInput(value) {
  const digits = String(value).replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function parseCurrencyToNumber(value) {
  const text = String(value).trim();
  if (!text) return 0;

  const normalized = text.replace(/\s/g, "").replace(/^R\$/i, "");
  if (normalized.includes(",")) {
    const decimal = normalized.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "");
    return Number(decimal) || 0;
  }

  const digits = normalized.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

export function formatCurrencyInput(value) {
  const raw = parseCurrencyToNumber(value);
  if (!raw) return "";
  return raw.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Usuario digita so o numero; o campo formata automaticamente como "1 dia" / "N dias".
export function formatDaysInput(value) {
  const digits = String(value).replace(/\D/g, "");
  if (!digits) return "";
  const n = Number(digits);
  return `${n} ${n === 1 ? "dia" : "dias"}`;
}

// Aplica/limpa o estado visual de erro em um campo e sua mensagem associada.
export function setFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.querySelector(`[data-error-for="${fieldId}"]`);
  if (field) field.classList.toggle("is-invalid", Boolean(message));
  if (errorEl) errorEl.textContent = message || "";
}

export function clearFieldErrors(fieldIds) {
  fieldIds.forEach((id) => setFieldError(id, ""));
}
