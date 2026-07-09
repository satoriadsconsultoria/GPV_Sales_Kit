import { appState } from "../state.js";
import { goToNextPage } from "../navigation.js";
import { isValidEmail, isValidPhone, formatPhoneInput, setFieldError, clearFieldErrors } from "../validation.js";

const FIELD_IDS = ["client-name", "client-phone", "client-email", "client-logo"];

export function initPage2() {
  const form = document.getElementById("form-client");
  const nameInput = document.getElementById("client-name");
  const phoneInput = document.getElementById("client-phone");
  const emailInput = document.getElementById("client-email");
  const uploadBox = document.getElementById("upload-box");
  const fileInput = document.getElementById("client-logo");
  const preview = document.getElementById("client-logo-preview");
  const hint = uploadBox.querySelector(".upload-box__hint");

  [nameInput, phoneInput, emailInput].forEach((input) => {
    input.addEventListener("input", updateSidePreview);
  });

  phoneInput.addEventListener("input", () => {
    phoneInput.value = formatPhoneInput(phoneInput.value);
    updateSidePreview();
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) handleLogoFile(file, preview, hint);
  });

  ["dragover", "dragenter"].forEach((evt) => {
    uploadBox.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadBox.classList.add("is-dragover");
    });
  });

  ["dragleave", "dragend", "drop"].forEach((evt) => {
    uploadBox.addEventListener(evt, () => uploadBox.classList.remove("is-dragover"));
  });

  uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    fileInput.files = e.dataTransfer.files;
    handleLogoFile(file, preview, hint);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validatePage2()) return;

    appState.client.name = document.getElementById("client-name").value.trim();
    appState.client.phone = phoneInput.value.trim();
    appState.client.email = document.getElementById("client-email").value.trim();

    goToNextPage(3);
  });
}

function handleLogoFile(file, preview, hint) {
  appState.client.logoFile = file;
  const reader = new FileReader();
  reader.onload = () => {
    appState.client.logoPreviewUrl = reader.result;
    preview.src = reader.result;
    preview.classList.remove("is-hidden");
    hint.classList.add("is-hidden");
    updateSidePreview();
  };
  reader.readAsDataURL(file);
}

// Painel lateral reage em tempo real ao que o usuário digita, reforçando a
// sensação de "prévia ao vivo" da proposta.
function updateSidePreview() {
  const name = document.getElementById("client-name").value.trim();
  const phone = document.getElementById("client-phone").value.trim();
  const email = document.getElementById("client-email").value.trim();

  document.getElementById("side-client-name").textContent = name || "Nome do cliente";
  document.getElementById("side-client-contact").textContent =
    [phone, email].filter(Boolean).join(" · ") || "Preencha os dados ao lado";

  const logoEl = document.getElementById("side-client-logo");
  const placeholderEl = document.getElementById("side-client-placeholder");
  if (appState.client.logoPreviewUrl) {
    logoEl.src = appState.client.logoPreviewUrl;
    logoEl.classList.remove("is-hidden");
    placeholderEl.style.display = "none";
  } else {
    logoEl.classList.add("is-hidden");
    placeholderEl.style.display = "";
  }
}

function validatePage2() {
  clearFieldErrors(FIELD_IDS);
  let valid = true;

  const name = document.getElementById("client-name").value.trim();
  if (!name) {
    setFieldError("client-name", "Informe o nome do cliente.");
    valid = false;
  }

  const phone = document.getElementById("client-phone").value.trim();
  if (!isValidPhone(phone)) {
    setFieldError("client-phone", "Informe um telefone válido com DDD.");
    valid = false;
  }

  const email = document.getElementById("client-email").value.trim();
  if (!isValidEmail(email)) {
    setFieldError("client-email", "Informe um e-mail válido.");
    valid = false;
  }

  if (!appState.client.logoFile) {
    setFieldError("client-logo", "Envie o logotipo do cliente.");
    document.getElementById("upload-box").classList.add("is-invalid");
    valid = false;
  } else {
    document.getElementById("upload-box").classList.remove("is-invalid");
  }

  return valid;
}
