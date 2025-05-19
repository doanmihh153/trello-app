import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            {/* Tối ưu UI giữa các Browsers */}
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>,
);