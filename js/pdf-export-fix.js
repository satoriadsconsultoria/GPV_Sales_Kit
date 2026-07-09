import { showToast } from "./toast.js";

const PDF_PAGE_WIDTH = 1123;
const PDF_PAGE_HEIGHT = 794;
const UNSAFE_CAPTURE_STYLESHEETS = [
  "premium-redesign.css",
  "institutional-first-page.css",
  "experience-polish.css",
];

const scriptPromises = new Map();

function slugify(text) {
  return String(text || "proposta")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "proposta";
}

function loadScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return Promise.resolve();
  if (scriptPromises.has(src)) return scriptPromises.get(src);

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    document.head.appendChild(script);
  });

  scriptPromises.set(src, promise);
  return promise;
}

async function ensureGlobal(check, urls, label) {
  if (check()) return;

  for (const url of urls) {
    try {
      await loadScript(url);
      if (check()) return;
    } catch (err) {
      console.warn(err);
    }
  }

  throw new Error(`${label} nao foi carregado.`);
}

async function ensurePdfLibraries() {
  await ensureGlobal(
    () => typeof window.html2canvas === "function",
    [
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
      "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
      "https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js",
    ],
    "html2canvas"
  );

  await ensureGlobal(
    () => Boolean(window.jspdf?.jsPDF),
    [
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
      "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
      "https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js",
    ],
    "jsPDF"
  );
}

function waitForImages(root) {
  const images = Array.from(root.querySelectorAll("img"));
  return Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    })
  );
}

function getBackgroundUrls(root) {
  const urls = new Set();
  const elements = [root, ...root.querySelectorAll("*")];

  elements.forEach((el) => {
    const value = `${el.style.backgroundImage || ""} ${getComputedStyle(el).backgroundImage || ""}`;
    value.replace(/url\(["']?([^"')]+)["']?\)/g, (_, url) => {
      urls.add(url);
      return url;
    });
  });

  return Array.from(urls);
}

function waitForBackgroundImages(root) {
  return Promise.all(
    getBackgroundUrls(root).map((src) => new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    }))
  );
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

async function withCanvasSafeStyles(action) {
  const disabledLinks = [];

  document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (UNSAFE_CAPTURE_STYLESHEETS.some((name) => href.includes(name))) {
      disabledLinks.push(link);
      link.disabled = true;
    }
  });

  await nextFrame();

  try {
    return await action();
  } finally {
    disabledLinks.forEach((link) => {
      link.disabled = false;
    });
    await nextFrame();
  }
}

function getFilename() {
  const company = document.querySelector(".pdf-topmark__logo")?.alt || "gpv";
  const client = document.querySelector(".pdf-cover__client")?.textContent || "cliente";
  return `proposta-${slugify(company)}-${slugify(client)}.pdf`;
}

async function exportPdf(button) {
  if (button.dataset.exporting === "true") return;

  const pdfRoot = document.getElementById("pdf-template-root");
  const pageElements = Array.from(pdfRoot?.querySelectorAll(".pdf-page") || []);
  if (!pageElements.length) {
    showToast("Gere a proposta final antes de baixar o PDF.");
    return;
  }

  const originalLabel = button.textContent;
  button.dataset.exporting = "true";
  button.disabled = true;
  button.textContent = "Gerando PDF...";

  try {
    await ensurePdfLibraries();
    await waitForImages(pdfRoot);
    await waitForBackgroundImages(pdfRoot);

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "px", format: [PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT], orientation: "landscape" });

    await withCanvasSafeStyles(async () => {
      for (let i = 0; i < pageElements.length; i += 1) {
        const canvas = await window.html2canvas(pageElements[i], {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          width: PDF_PAGE_WIDTH,
          height: PDF_PAGE_HEIGHT,
          windowWidth: PDF_PAGE_WIDTH,
          windowHeight: PDF_PAGE_HEIGHT,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        if (i > 0) pdf.addPage([PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT], "landscape");
        pdf.addImage(imgData, "JPEG", 0, 0, PDF_PAGE_WIDTH, PDF_PAGE_HEIGHT);
      }
    });

    pdf.save(getFilename());
    showToast("PDF gerado com sucesso.");
  } catch (err) {
    console.error("Falha ao gerar PDF:", err);
    showToast("Não foi possível gerar o PDF. Recarregue a página e tente novamente.");
  } finally {
    button.dataset.exporting = "false";
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

document.addEventListener("click", (event) => {
  const button = event.target.closest?.("#download-pdf-btn");
  if (!button) return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  exportPdf(button);
}, true);
