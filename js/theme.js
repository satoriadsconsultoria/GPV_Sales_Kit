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
  return theme.mutedTextColor || blendHexColors(theme.textColor, theme.backgroundColor, 0.6);
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
}

export function applyGroupTheme(config) {
  applyTheme(config.groupBrand.theme);
}
