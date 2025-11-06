# Theme System

Universal theme system with light/dark mode support. Designed to work seamlessly with any UI library.

## Features

- Light and Dark themes
- TypeScript support
- CSS variables for universal compatibility
- localStorage persistence
- System preference detection
- Smooth transitions

## Usage

### Basic Usage

```tsx
import { useTheme } from './theme';

function MyComponent() {
  const { palette, mode, toggleTheme } = useTheme();
  
  return (
    <div style={{ color: palette.text.primary }}>
      Current mode: {mode}
    </div>
  );
}
```

### With CSS Variables

```css
.my-element {
  color: var(--color-text-primary);
  background: var(--color-bg-paper);
  border: 1px solid var(--color-border-main);
}
```

### With Material-UI (MUI)

A helper function is already provided in `src/theme/muiTheme.ts`:

```tsx
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useTheme } from './theme';
import { createMuiTheme } from './theme/muiTheme';

function MyComponent() {
  const { palette, mode } = useTheme();
  const muiTheme = createMuiTheme(palette, mode);
  
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Button variant="contained" color="primary">
        MUI Button
      </Button>
    </MuiThemeProvider>
  );
}
```

See `src/examples/MuiExample.tsx` for a complete working example.

### With Tailwind CSS

Configure your `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          main: 'var(--color-primary-main)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
        bg: {
          default: 'var(--color-bg-default)',
          paper: 'var(--color-bg-paper)',
        },
      },
    },
  },
};
```

Then use in components:

```tsx
<div className="bg-bg-paper text-text-primary">
  Themed content
</div>
```

## Color Palette

### Light Theme
- Primary: #667eea
- Secondary: #764ba2
- Background: #ffffff
- Text: #333333

### Dark Theme
- Primary: #8b9cf5
- Secondary: #9b6bc8
- Background: #121212
- Text: #ffffff

## API

### useTheme()

Returns:
- `mode: 'light' | 'dark'` - Current theme mode
- `palette: Palette` - Current color palette object
- `toggleTheme: () => void` - Function to toggle between light/dark modes

### Palette Object Structure

```typescript
{
  primary: { main, light, dark, contrast },
  secondary: { main, light, dark, contrast },
  background: { default, paper, elevated },
  text: { primary, secondary, disabled },
  border: { main, light },
  success: string,
  error: string,
  warning: string,
  info: string,
}
```

