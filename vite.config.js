import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        eslint(),
        svgr(),
    ],

    // Cấu hình  Absolute & Relative import --> ../../*/*
    resolve: {
        alias: [
            { find: '~', replacement: '/src' },
        ]
    }
});
