export const lightPalette = {
  primary: {
    main: '#5b6fd8',
    light: '#7d8fe5',
    dark: '#4356b8',
    contrast: '#ffffff',
  },
  secondary: {
    main: '#6d4c94',
    light: '#8b6aae',
    dark: '#543a75',
    contrast: '#ffffff',
  },
  background: {
    default: '#e8eaed',
    paper: '#f3f4f6',
    elevated: '#ffffff',
  },
  text: {
    primary: '#1a2332',
    secondary: '#4a5568',
    disabled: '#8f9bb3',
  },
  border: {
    main: '#dde2e9',
    light: '#edf1f7',
  },
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

export const darkPalette = {
  primary: {
    main: '#8b9cf5',
    light: '#a4b3f7',
    dark: '#667eea',
    contrast: '#000000',
  },
  secondary: {
    main: '#9b6bc8',
    light: '#b389d8',
    dark: '#764ba2',
    contrast: '#000000',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
    elevated: '#2a2a2a',
  },
  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    disabled: '#757575',
  },
  border: {
    main: '#333333',
    light: '#2a2a2a',
  },
  success: '#66bb6a',
  error: '#ef5350',
  warning: '#ffa726',
  info: '#42a5f5',
};

export type Palette = typeof lightPalette;
export type ThemeMode = 'light' | 'dark';

