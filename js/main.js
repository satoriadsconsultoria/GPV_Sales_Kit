import "./pdf-export-fix.js";
import "./executive-clean-polish.js";
import { loadData } from "./data.js";
import { applyGroupTheme } from "./theme.js";
import { bindBackButtons } from "./navigation.js";
import { initPage1 } from "./pages/page1.js";
import { initPage2 } from "./pages/page2.js";
import { initPage3 } from "./pages/page3.js";
import { initPage4 } from "./pages/page4.js";
import { initPage5 } from "./pages/page5.js";
import { initPage6 } from "./pages/page6.js";

function loadStylesheets() {
  [
    "css/premium-redesign.css",
    "css/institutional-first-page.css",
    "css/experience-polish.css",
  ].forEach((href) => {
    if (document.querySelector(`link[href="${href}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  });
}

async function bootstrap() {
  loadStylesheets();

  const data = await loadData();

  applyGroupTheme(data.config);

  initPage1(data);
  initPage2();
  initPage3();
  initPage4();
  initPage5(data);
  initPage6();

  bindBackButtons();
}

bootstrap().catch((err) => {
  console.error("Falha ao inicializar o GPV Sales Kit:", err);
  document.body.innerHTML =
    '<p style="padding:2rem;color:#fff;font-family:sans-serif;">Não foi possível carregar os dados do sistema. Verifique se o site está sendo servido via HTTP (não file://) e recarregue a página.</p>';
});
