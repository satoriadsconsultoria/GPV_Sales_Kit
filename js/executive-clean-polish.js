const CLEAN_COVER_TITLE = 'Estratégia clara.<br>Execução forte.<br>Resultado visível.';

function ensureCleanPdfStyles() {
  if (document.getElementById('executive-clean-polish')) return;

  const style = document.createElement('style');
  style.id = 'executive-clean-polish';
  style.textContent = `
    .pdf-page {
      padding: 46px 58px 40px !important;
      overflow: hidden !important;
      background:
        linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px),
        linear-gradient(0deg, rgba(255,255,255,.018) 1px, transparent 1px),
        radial-gradient(circle at 88% 18%, var(--pdf-accent-soft, rgba(250,1,21,.16)), transparent 21%),
        var(--pdf-bg, #0d0f12) !important;
      background-size: 56px 56px, 56px 56px, auto, auto !important;
      color: #fff !important;
    }

    .pdf-page *, .pdf-page *::before, .pdf-page *::after {
      box-sizing: border-box !important;
    }

    .pdf-page img,
    .pdf-page img[class*='logo'],
    .pdf-cover__logo-card img,
    .pdf-edney__brands img,
    .pdf-closing__logos img,
    .pdf-summary__client-logo img {
      object-fit: contain !important;
      object-position: center !important;
      max-width: 100% !important;
    }

    .pdf-page::before {
      inset: 22px !important;
      border: 1px solid rgba(255,255,255,.10) !important;
      opacity: 1 !important;
      background: transparent !important;
    }

    .pdf-page::after,
    .pdf-page__watermark {
      opacity: 0 !important;
    }

    .pdf-page__brandbar {
      height: 8px !important;
      grid-template-columns: 1fr 220px 90px !important;
    }

    .pdf-topmark {
      height: 62px !important;
      flex: 0 0 62px !important;
      padding-bottom: 16px !important;
      border-bottom: 1px solid rgba(255,255,255,.12) !important;
    }

    .pdf-topmark__logo {
      width: 112px !important;
      height: 38px !important;
      padding: 7px 10px !important;
      border-radius: 6px !important;
      background: #f7f6f2 !important;
      object-fit: contain !important;
    }

    .pdf-topmark__client {
      color: #fff !important;
      font-size: 11px !important;
      font-weight: 760 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
    }

    .pdf-topmark__label {
      padding: 8px 13px !important;
      border: 1px solid rgba(255,255,255,.22) !important;
      border-radius: 999px !important;
      background: rgba(0,0,0,.22) !important;
      color: #fff !important;
      font-size: 10px !important;
      font-weight: 950 !important;
      letter-spacing: .08em !important;
    }

    .pdf-page__body {
      height: calc(100% - 96px) !important;
      padding-top: 24px !important;
    }

    .pdf-footer {
      left: 58px !important;
      right: 58px !important;
      bottom: 27px !important;
      height: 26px !important;
      margin-top: 0 !important;
      padding-top: 8px !important;
      color: #c9cdd1 !important;
      font-size: 9px !important;
      font-weight: 760 !important;
    }

    .pdf-page__eyebrow,
    .pdf-cover__eyebrow,
    .pdf-summary__label,
    .pdf-closing__contact-label {
      display: inline-flex !important;
      padding: 7px 11px !important;
      border-radius: 5px !important;
      background: var(--pdf-accent, #fa0115) !important;
      color: #fff !important;
      font-size: 9px !important;
      font-weight: 950 !important;
      letter-spacing: .14em !important;
      text-transform: uppercase !important;
    }

    .pdf-page__title {
      margin-top: 14px !important;
      max-width: 780px !important;
      font-size: 37px !important;
      line-height: 1.04 !important;
      letter-spacing: 0 !important;
    }

    .pdf-page__subtitle,
    .pdf-page__lead {
      margin-top: 11px !important;
      max-width: 810px !important;
      color: var(--pdf-muted, #b7bbc0) !important;
      font-size: 13px !important;
      line-height: 1.52 !important;
    }

    .pdf-cover {
      padding: 50px 64px 48px !important;
      display: grid !important;
      grid-template-rows: 76px minmax(0, 1fr) 78px !important;
      grid-template-columns: minmax(0, 1fr) 348px !important;
      gap: 24px 40px !important;
    }

    .pdf-cover__frame { inset: 28px !important; border: 1px solid rgba(255,255,255,.10) !important; border-radius: 0 !important; }
    .pdf-cover__frame::before, .pdf-cover__frame::after, .pdf-cover__grid { display: none !important; }

    .pdf-cover__header {
      grid-column: 1 / -1 !important;
      margin: 0 !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: flex-start !important;
      color: #cfd3d7 !important;
      font-size: 10px !important;
      font-weight: 900 !important;
      letter-spacing: .12em !important;
      text-transform: uppercase !important;
    }

    .pdf-cover__content {
      grid-column: 1 / -1 !important;
      min-height: 0 !important;
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) 348px !important;
      gap: 40px !important;
      align-items: center !important;
    }

    .pdf-cover__copy { padding-right: 18px !important; }

    .pdf-cover__title {
      margin-top: 22px !important;
      max-width: 570px !important;
      color: #fff !important;
      font-size: 55px !important;
      line-height: .98 !important;
      letter-spacing: 0 !important;
    }

    .pdf-cover__client { margin-top: 22px !important; color: #e5e7ea !important; font-size: 18px !important; line-height: 1.4 !important; }
    .pdf-cover__pillars { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 12px !important; margin-top: 34px !important; }

    .pdf-cover__pillars div,
    .pdf-summary__objective,
    .pdf-summary__client-card,
    .pdf-summary__fact,
    .pdf-edney__strategy-strip div,
    .pdf-edney__experience,
    .pdf-edney__brands img,
    .pdf-scope-investment__scope,
    .pdf-scope-investment__commercial,
    .pdf-scope-investment__group,
    .pdf-scope-investment__value,
    .pdf-scope-investment__conditions div,
    .pdf-scope-investment__note,
    .pdf-closing__step,
    .pdf-closing__contact-card {
      border: 1px solid rgba(255,255,255,.14) !important;
      border-radius: 8px !important;
      background: linear-gradient(135deg, rgba(255,255,255,.075), rgba(255,255,255,.035)) !important;
      box-shadow: 0 18px 42px rgba(0,0,0,.24) !important;
    }

    .pdf-cover__pillars div { min-height: 108px !important; padding: 16px 15px !important; border-top: 4px solid var(--pdf-accent, #fa0115) !important; }
    .pdf-cover__pillars span { color: var(--pdf-accent, #fa0115) !important; font-size: 11px !important; font-weight: 950 !important; }
    .pdf-cover__pillars strong { margin-top: 11px !important; font-size: 15px !important; }
    .pdf-cover__pillars small { margin-top: 7px !important; font-size: 10px !important; line-height: 1.35 !important; }

    .pdf-cover__logos { width: 100% !important; display: grid !important; grid-template-rows: 1fr 42px 1fr !important; gap: 18px !important; align-self: stretch !important; }
    .pdf-cover__logo-card { height: auto !important; gap: 13px !important; padding: 20px !important; border-radius: 10px !important; background: #f7f6f2 !important; box-shadow: none !important; }
    .pdf-cover__logo-card img { width: 228px !important; height: 84px !important; object-fit: contain !important; }
    .pdf-cover__connector { height: 42px !important; gap: 9px !important; }
    .pdf-cover__meta { grid-column: 1 / -1 !important; display: grid !important; grid-template-columns: 1fr 1fr 120px !important; gap: 28px !important; padding-top: 16px !important; border-top: 1px solid rgba(255,255,255,.16) !important; }

    .pdf-summary__layout { grid-template-columns: minmax(0, 1fr) 290px !important; gap: 18px !important; margin-top: 22px !important; }
    .pdf-summary__objective { min-height: 292px !important; padding: 27px !important; border-left: 6px solid var(--pdf-accent, #fa0115) !important; }
    .pdf-summary__objective p { margin-top: 18px !important; max-width: 620px !important; font-size: 23px !important; line-height: 1.28 !important; font-weight: 780 !important; }
    .pdf-summary__client-card { min-height: 292px !important; padding: 24px !important; }
    .pdf-summary__client-logo { width: 164px !important; height: 86px !important; padding: 12px !important; border-radius: 8px !important; background: #f7f6f2 !important; }
    .pdf-summary__facts { grid-template-columns: 1.25fr .85fr .85fr .85fr !important; gap: 12px !important; margin-top: 18px !important; }
    .pdf-summary__fact { min-height: 88px !important; padding: 17px !important; border-top: 4px solid var(--pdf-accent, #fa0115) !important; }

    .pdf-edney { display: grid !important; grid-template-columns: 320px minmax(0, 1fr) !important; gap: 40px !important; height: 100% !important; align-items: stretch !important; }
    .pdf-edney__visual { display: grid !important; grid-template-rows: minmax(0, 1fr) 72px !important; gap: 14px !important; min-height: 0 !important; }
    .pdf-edney__visual::before { display: none !important; }
    .pdf-edney__photo { position: relative !important; inset: auto !important; min-height: 0 !important; height: auto !important; border: 1px solid rgba(255,255,255,.14) !important; border-radius: 10px !important; overflow: hidden !important; box-shadow: none !important; }
    .pdf-edney__photo::after { content: '' !important; position: absolute !important; inset: 15px !important; border: 3px solid var(--pdf-accent, #fa0115) !important; border-radius: 8px !important; pointer-events: none !important; }
    .pdf-edney__experience { position: relative !important; left: auto !important; right: auto !important; bottom: auto !important; display: flex !important; align-items: center !important; gap: 12px !important; padding: 15px 17px !important; border-left: 5px solid var(--pdf-accent, #fa0115) !important; }
    .pdf-edney__content { align-self: center !important; padding-top: 0 !important; }
    .pdf-edney__content .pdf-page__title { font-size: 36px !important; }
    .pdf-edney__strategy-strip { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 12px !important; margin-top: 20px !important; }
    .pdf-edney__strategy-strip div { min-height: 74px !important; padding: 14px 15px !important; border-top: 4px solid var(--pdf-accent, #fa0115) !important; }
    .pdf-edney__bio-list { gap: 8px !important; margin-top: 21px !important; }
    .pdf-edney__bio-list li { grid-template-columns: 8px minmax(0, 1fr) !important; gap: 11px !important; font-size: 11px !important; line-height: 1.35 !important; }
    .pdf-edney__brands { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; gap: 10px !important; margin-top: 20px !important; }
    .pdf-edney__brands img { width: 100% !important; height: 42px !important; padding: 7px !important; border-radius: 7px !important; background: #f7f6f2 !important; }

    .pdf-scope-investment .pdf-page__title { max-width: 780px !important; font-size: 37px !important; }
    .pdf-scope-investment .pdf-page__subtitle { max-width: 810px !important; font-size: 13px !important; line-height: 1.52 !important; }
    .pdf-scope-investment__layout { height: 432px !important; display: grid !important; grid-template-columns: minmax(0, 1fr) 310px !important; gap: 18px !important; margin-top: 18px !important; }
    .pdf-scope-investment__scope { padding: 18px !important; }
    .pdf-scope-investment__section-head { padding-bottom: 13px !important; border-bottom: 1px solid rgba(255,255,255,.13) !important; }
    .pdf-scope-investment__groups { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 11px !important; margin-top: 13px !important; }
    .pdf-scope-investment__group { min-height: 166px !important; padding: 13px 14px !important; border-top: 4px solid var(--pdf-accent, #fa0115) !important; }
    .pdf-scope-investment__group li { grid-template-columns: 8px minmax(0, 1fr) !important; gap: 7px !important; font-size: 8.9px !important; line-height: 1.28 !important; }
    .pdf-scope-investment__commercial { gap: 10px !important; padding: 15px !important; background: rgba(250,1,21,.09) !important; }
    .pdf-scope-investment__value { padding: 18px !important; border-left: 5px solid var(--pdf-accent, #fa0115) !important; }
    .pdf-scope-investment__value strong { font-size: 32px !important; color: var(--pdf-accent, #fa0115) !important; }
    .pdf-scope-investment__conditions div, .pdf-scope-investment__note { padding: 12px 13px !important; }

    .pdf-closing__headline .pdf-page__title { max-width: 690px !important; font-size: 39px !important; }
    .pdf-closing__layout { grid-template-columns: minmax(0, 1fr) 330px !important; gap: 20px !important; margin-top: 28px !important; }
    .pdf-closing__steps { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 13px !important; }
    .pdf-closing__step { min-height: 214px !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; padding: 22px 18px !important; }
    .pdf-closing__step > span { color: var(--pdf-accent, #fa0115) !important; font-size: 28px !important; font-weight: 950 !important; }
    .pdf-closing__contact-card { padding: 24px !important; border-top: 5px solid var(--pdf-accent, #fa0115) !important; background: rgba(250,1,21,.10) !important; }
  `;
  document.head.appendChild(style);
}

function setHtmlIfChanged(element, value) {
  if (element && element.innerHTML !== value) element.innerHTML = value;
}

function setTextIfChanged(element, value) {
  if (element && element.textContent !== value) element.textContent = value;
}

function updateCleanCopy(root = document) {
  root.querySelectorAll('.pdf-cover__title').forEach((title) => {
    setHtmlIfChanged(title, CLEAN_COVER_TITLE);
  });

  root.querySelectorAll('.pdf-cover__pillars div').forEach((pillar, index) => {
    const strong = pillar.querySelector('strong');
    const small = pillar.querySelector('small');
    if (index === 1) {
      setTextIfChanged(strong, 'Ritmo');
      setTextIfChanged(small, 'Plano de execução com operação e acompanhamento.');
    }
    if (index === 2) {
      setTextIfChanged(strong, 'Conversão');
      setTextIfChanged(small, 'Foco em avanço comercial e vendas.');
    }
  });

  root.querySelectorAll('.pdf-edney').forEach((pageBody) => {
    const page = pageBody.closest('.pdf-page');
    if (page && page.dataset.section !== 'Edney Ulisses') page.dataset.section = 'Edney Ulisses';
  });
}

function renumberCleanPages(root = document) {
  const pageSets = [];
  const pdfRoot = document.getElementById('pdf-template-root');
  if (pdfRoot) pageSets.push([...pdfRoot.querySelectorAll(':scope > .pdf-page')]);
  document.querySelectorAll('.proposal-preview__stack').forEach((stack) => {
    pageSets.push([...stack.querySelectorAll('.proposal-preview__canvas > .pdf-page')]);
    stack.querySelectorAll('.proposal-preview__sheet').forEach((sheet, index) => {
      const first = sheet.querySelector('.proposal-preview__sheet-heading span:first-child');
      setTextIfChanged(first, `Página ${String(index + 1).padStart(2, '0')}`);
      const page = sheet.querySelector('.pdf-page');
      const last = sheet.querySelector('.proposal-preview__sheet-heading span:last-child');
      if (page) setTextIfChanged(last, page.dataset.section || 'Proposta');
    });
  });

  pageSets.forEach((pages) => {
    const total = pages.length;
    pages.forEach((page, index) => {
      const pageNumber = String(index + 1).padStart(2, '0');
      const totalNumber = String(total).padStart(2, '0');
      const label = page.dataset.section || 'Proposta';
      setHtmlIfChanged(page.querySelector('.pdf-topmark__label'), `${pageNumber} &nbsp; ${label}`);
      setTextIfChanged(page.querySelector('.pdf-footer span:last-child'), `${pageNumber} / ${totalNumber}`);
      setTextIfChanged(page.querySelector('.pdf-cover__meta div:last-child strong'), totalNumber);
    });
  });
}

function runCleanPolish() {
  ensureCleanPdfStyles();
  updateCleanCopy();
  renumberCleanPages();
}

let cleanPolishTimer = 0;
function scheduleCleanPolish() {
  window.clearTimeout(cleanPolishTimer);
  cleanPolishTimer = window.setTimeout(runCleanPolish, 60);
}

runCleanPolish();
const cleanObserver = new MutationObserver(scheduleCleanPolish);
cleanObserver.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
