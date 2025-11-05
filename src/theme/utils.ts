import { Palette, ThemeMode } from './palette';

export function applyThemeToDocument(palette: Palette, mode: ThemeMode) {
  const root = document.documentElement;

  root.style.setProperty('--color-primary-main', palette.primary.main);
  root.style.setProperty('--color-primary-light', palette.primary.light);
  root.style.setProperty('--color-primary-dark', palette.primary.dark);
  root.style.setProperty('--color-primary-contrast', palette.primary.contrast);

  root.style.setProperty('--color-secondary-main', palette.secondary.main);
  root.style.setProperty('--color-secondary-light', palette.secondary.light);
  root.style.setProperty('--color-secondary-dark', palette.secondary.dark);
  root.style.setProperty('--color-secondary-contrast', palette.secondary.contrast);

  root.style.setProperty('--color-bg-default', palette.background.default);
  root.style.setProperty('--color-bg-paper', palette.background.paper);
  root.style.setProperty('--color-bg-elevated', palette.background.elevated);

  root.style.setProperty('--color-text-primary', palette.text.primary);
  root.style.setProperty('--color-text-secondary', palette.text.secondary);
  root.style.setProperty('--color-text-disabled', palette.text.disabled);

  root.style.setProperty('--color-border-main', palette.border.main);
  root.style.setProperty('--color-border-light', palette.border.light);

  root.style.setProperty('--color-success', palette.success);
  root.style.setProperty('--color-error', palette.error);
  root.style.setProperty('--color-warning', palette.warning);
  root.style.setProperty('--color-info', palette.info);

  root.setAttribute('data-theme', mode);
}

