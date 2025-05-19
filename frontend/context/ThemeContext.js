import { createContext } from 'react';

export const ThemeContext = createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  colors: {
    background: '#fff',
    text: '#000',
    card: '#f0f0f0'
  }
});