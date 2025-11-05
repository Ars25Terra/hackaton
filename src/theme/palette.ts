export const lightPalette = {
  primary: {
    main: '#667eea',
    light: '#8b9cf5',
    dark: '#4c5fd4',
    contrast: '#ffffff',
  },
  secondary: {
    main: '#764ba2',
    light: '#9b6bc8',
    dark: '#5a3880',
    contrast: '#ffffff',
  },
  background: {
    default: '#ffffff',
    paper: '#f5f5f5',
    elevated: '#ffffff',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
    disabled: '#999999',
  },
  border: {
    main: '#e0e0e0',
    light: '#f0f0f0',
  },
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
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

