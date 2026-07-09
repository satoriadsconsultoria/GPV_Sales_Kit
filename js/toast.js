const toastRoot = document.getElementById("toast-root");

export function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastRoot.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}
