// Mistura duas cores hexadecimais — usado para derivar um tom "muted" com contraste
// garantido, já que nem toda marca cadastrada define mutedTextColor (ex.: VELOCE tem
// secondaryColor quase idêntico ao backgroundColor, o que tornaria o texto ilegível).
function blendHexColors(hexA, hexB, weightA) {
  const a = parseInt(hexA.replace("#", ""), 16);
  const b = parseInt(hexB.replace("#", ""), 16);
  const channel = (shift) => {
    const va = (a >> shift) & 0xff;
    const vb = (b >> shift) & 0xff;
    return Math.round(va * weightA + vb * (1 - weightA));
  };
  const r = channel(16);
  const g = channel(8);
  const bch = channel(0);
  return `#${[r, g, bch].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export function getMutedTextColor(theme) {
  return theme.mutedTextColor || blendHexColors(theme.textColor, theme.backgroundColor, 0.72);
}

function relativeLuminance(hex) {
  const value = parseInt(hex.replace("#", ""), 16);
  const channel = (shift) => {
    const c = ((value >> shift) & 0xff) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(16) + 0.7152 * channel(8) + 0.0722 * channel(0);
}

function contrastRatio(lumA, lumB) {
  const lighter = Math.max(lumA, lumB) + 0.05;
  const darker = Math.min(lumA, lumB) + 0.05;
  return lighter / darker;
}

// Algumas marcas têm accentColor muito claro (ex.: branco no Projeto Conquista, ciano
// claro na VELOCE), o que tornaria texto branco fixo ilegível sobre botões/elementos
// que usam essa cor de fundo. Escolhe branco ou um tom quase-preto, o que der mais contraste.
export function getOnAccentColor(theme) {
  const luminance = relativeLuminance(theme.accentColor);
  const contrastWithWhite = contrastRatio(luminance, 1);
  const contrastWithDark = contrastRatio(luminance, 0.02);
  return contrastWithWhite >= contrastWithDark ? "#FFFFFF" : "#14161a";
}

// Aplica a paleta de cores de uma marca como CSS custom properties globais.
export function applyTheme(theme) {
  const root = document.documentElement.style;
  root.setProperty("--color-primary", theme.primaryColor);
  root.setProperty("--color-secondary", theme.secondaryColor);
  root.setProperty("--color-accent", theme.accentColor);
  root.setProperty("--color-bg", theme.backgroundColor);
  root.setProperty("--color-text", theme.textColor);
  root.setProperty("--color-muted", getMutedTextColor(theme));
  root.setProperty("--color-on-accent", getOnAccentColor(theme));
}

export function applyGroupTheme(config) {
  applyTheme(config.groupBrand.theme);
}
