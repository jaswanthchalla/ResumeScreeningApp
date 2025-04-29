import { createContext } from 'react';

// Create context for color mode switching
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});
