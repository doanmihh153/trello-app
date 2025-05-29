import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';

import { Toaster } from 'react-hot-toast';

import theme from './theme.js';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <ThemeProvider theme={theme}>
        {/* Tối ưu UI giữa các Browsers */}
        <CssBaseline />
        <App />
        <Toaster position='top-right'/>
    </ThemeProvider>
    // </StrictMode>,
);