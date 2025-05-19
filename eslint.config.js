// eslint.config.js (Flat Config - Vite/ESLint 9+ style)
// Cấu hình cho project React dùng Vite + hỗ trợ React Refresh + Hooks + Clean code
// File này thây thế cho file .eslintrc.cjs cũ --> 2 file này sẽ giữ nguyên để so sánh!

import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    // Bỏ qua thư mục dist
    { ignores: ['dist'] },

    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: '18.2', // Cần khai báo rõ version nếu không sẽ warning
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // Base JS rules từ ESLint khuyến nghị
            ...js.configs.recommended.rules,

            // --- React / React-Hooks Rules ---
            'react-hooks/rules-of-hooks': 'error', // Hooks phải tuân thủ đúng quy tắc (phải gọi ở top-level)
            'react-hooks/exhaustive-deps': 'warn', // Cảnh báo khi useEffect thiếu dependency
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true }, // Cho phép export component hằng số
            ],
            'react/prop-types': 'off', // Tắt check prop-types vì dùng TypeScript hoặc không cần
            'react/display-name': 'off', // Không bắt buộc đặt tên hiển thị cho component

            // --- Material UI - chống import sâu quá mức ---
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['@mui/*/*/'], // Không cho import sâu 3 cấp ví dụ: @mui/material/Button/Button.js
                },
            ],

            // --- Các rule để clean code hơn ---
            'no-console': 'off', // Có thể giữ console.log để debug dev, tắt nếu build production
            'no-lonely-if': 'warn', // Cảnh báo if không cần thiết (có thể viết gọn hơn)
            'no-unused-vars': 'off', // Cảnh báo biến khai báo mà không dùng
            'no-trailing-spaces': 'warn', // Không được dư space cuối dòng
            'no-multi-spaces': 'warn', // Không được dư nhiều khoảng trắng giữa các token
            'no-multiple-empty-lines': 'warn', // Không để quá nhiều dòng trống
            'space-before-blocks': ['error', 'always'], // Phải có space trước { mở block
            'object-curly-spacing': ['warn', 'always'], // Phải có space giữa dấu ngoặc object
            'indent': ['warn', 4], // 4 khoảng trắng cho 1 tab (thay đổi thành 2 nếu cần)
            'semi': ['error', 'always'], // Bắt buộc có dấu chấm phẩy ;
            'quotes': ['error', 'single'], // Sử dụng dấu nháy đơn ' thay vì nháy kép "
            'array-bracket-spacing': 'warn', // Cảnh báo spacing trong mảng
            'linebreak-style': 'off', // Bỏ qua cảnh báo xuống dòng (windows vs unix)
            'no-unexpected-multiline': 'warn', // Tránh lỗi không dùng dấu ; mà xuống dòng sai cách
            'keyword-spacing': 'warn', // Thêm khoảng trắng đúng cách với từ khóa: if, else, return...
            'comma-dangle': 'off', // Dấu phẩy cuối object, array (bắt buộc hoặc cảnh báo)
            'comma-spacing': 'warn', // Khoảng cách sau dấu phẩy
            'arrow-spacing': 'warn', // Khoảng trắng giữa `=>`
            'no-unused-expressions': 'warn', // Nếu muốn import rõ ràng hãy bật lên == 'warn'
        },
    },
];
