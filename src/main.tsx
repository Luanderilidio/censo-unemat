import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR as coreptBR } from '@mui/material/locale';
import App from './App.tsx';
import './index.css';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  coreptBR,
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
