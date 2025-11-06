import { createTheme, Theme } from '@mui/material/styles';
import { Palette as CustomPalette, ThemeMode } from './palette';

export function createMuiTheme(palette: CustomPalette, mode: ThemeMode): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: palette.primary.main,
        light: palette.primary.light,
        dark: palette.primary.dark,
        contrastText: palette.primary.contrast,
      },
      secondary: {
        main: palette.secondary.main,
        light: palette.secondary.light,
        dark: palette.secondary.dark,
        contrastText: palette.secondary.contrast,
      },
      background: {
        default: palette.background.default,
        paper: palette.background.paper,
      },
      text: {
        primary: palette.text.primary,
        secondary: palette.text.secondary,
        disabled: palette.text.disabled,
      },
      success: {
        main: palette.success,
      },
      error: {
        main: palette.error,
      },
      warning: {
        main: palette.warning,
      },
      info: {
        main: palette.info,
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  });
}

