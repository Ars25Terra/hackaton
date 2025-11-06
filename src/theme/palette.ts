export const lightPalette = {
  primary: {
    main: '#6b7fd7',
    light: '#8a9ae3',
    dark: '#5264b8',
    contrast: '#ffffff',
  },
  secondary: {
    main: '#7d5ba6',
    light: '#9b7bbe',
    dark: '#614588',
    contrast: '#ffffff',
  },
  background: {
    default: '#f0f2f5',
    paper: '#f8f9fb',
    elevated: '#ffffff',
  },
  text: {
    primary: '#2d3748',
    secondary: '#5a6c7d',
    disabled: '#a0aec0',
  },
  border: {
    main: '#e2e8f0',
    light: '#f1f5f9',
  },
  success: '#48bb78',
  error: '#f56565',
  warning: '#ed8936',
  info: '#4299e1',
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

