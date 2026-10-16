// @ts-check
// Options d'Expressive Code, à part car themeCssSelector est une fonction (non sérialisable),
// ce que le composant <Code> exige. Lu automatiquement par astro-expressive-code.
import { defineEcConfig } from 'astro-expressive-code';

export default defineEcConfig({
  // Clair par défaut, sombre quand <html> porte la classe .dark (bouton du header)
  themes: ['github-light', 'github-dark'],
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => (theme.type === 'dark' ? '.dark' : false),
  styleOverrides: {
    borderRadius: '0.5rem',
    codeFontFamily: "'JetBrains Mono Variable', ui-monospace, monospace",
  },
  defaultProps: {
    wrap: false,
  },
});
