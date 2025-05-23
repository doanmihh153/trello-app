# 📢 CẢNH BÁO QUAN TRỌNG

> 🚨 Clone này được xây dựng với mục đích **học tập**, **phi thương mại**, **không kinh doanh**. Mọi bản quyền thuộc về Trello. Hãy truy cập trang chính thức: [https://trello.com/home](https://trello.com/home) để sử dụng dịch vụ chính chủ.

---

# 📘 Tài liệu các thư viện sử dụng trong dự án Frontend (React + Vite)

## 🚀 Scripts sử dụng

```bash
# Chạy development server
yarn dev

# Build production
yarn build

# Preview production build
yarn preview

# Lint toàn bộ source code
yarn lint
```

## 1. Dependencies

### `@dnd-kit/*`

* **Chức năng:** DnD Kit là thư viện Drag and Drop cho React, hiện đại và có khả năng tuỳ biến cao.
* **Gói gồm:**

  * `@dnd-kit/core`: core engine.
  * `@dnd-kit/sortable`: hỗ trợ kéo thả và sắp xếp.
  * `@dnd-kit/utilities`: tiện ích đi kèm.

### `@emotion/react` & `@emotion/styled`

* **Chức năng:** Styled components cho React, thường dùng với Material UI để viết CSS-in-JS.
* **So sánh:** Tương tự như styled-components, nhưng nhẹ hơn.

### `@mui/material` & `@mui/icons-material`

* **Material UI:** Bộ component UI hiện đại theo tiêu chuẩn Google Material Design.
* **Ưu điểm:** Dễ dùng, responsive, tùy chỉnh linh hoạt.

### `lodash`

* **Chức năng:** Thư viện tiện ích hỗ trợ xử lý mảng, object, function, clone sâu, debounce, throttle,...
* **Lưu ý:** Chỉ import function cần dùng để tối ưu bundle:

  ```js
  import debounce from 'lodash/debounce'
  ```

### `react` & `react-dom`

* **React 19**: Phiên bản mới nhất với cải tiến về rendering và hooks.
* **React DOM**: Render tree vào DOM.

## 2. DevDependencies

### `vite`

* **Bundler:** Siêu nhanh, thay thế Webpack.
* **Ưu điểm:** ESM-native, HMR tốt, build nhanh.

### `@vitejs/plugin-react-swc`

* **Chức năng:** Hỗ trợ JSX và React Fast Refresh, dùng compiler SWC thay vì Babel để tăng tốc độ build.

### `vite-plugin-eslint`

* **Tích hợp ESLint vào build pipeline của Vite.**

### `vite-plugin-svgr`

* **Chức năng:** Import SVG dưới dạng React Component:

  ```js
  import { ReactComponent as Logo } from './logo.svg'
  ```

### `eslint`, `eslint-plugin-*`

* **Công dụng:** Kiểm tra và enforce chuẩn code.

  * `eslint-plugin-react`: rule cho React.
  * `eslint-plugin-react-hooks`: kiểm tra hook đúng quy tắc.
  * `eslint-plugin-unused-imports`: tự cảnh báo import không dùng.
  * `@eslint/js`, `globals`: hỗ trợ cấu hình rule JS và global var.

### `@types/react`, `@types/react-dom`

* **Type support:** Cho TypeScript (hoặc dùng VSCode IntelliSense).


### BASE Cơ bản của Eslint:

```bash
// eslint.config.js (Flat Config - Vite/ESLint 9+ style)
// Cấu hình cho project React dùng Vite + hỗ trợ React Refresh + Hooks + Clean code
// File này thay thế cho file .eslintrc.cjs cũ --> 2 file này sẽ giữ nguyên để so sánh!

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
                    patterns: ['@mui/*/*/*'], // Không cho import sâu 3 cấp ví dụ: @mui/material/Button/Button.js
                },
            ],

            // --- Các rule để clean code hơn ---
            'no-console': 'off', // Có thể giữ console.log để debug dev, tắt nếu build production
            'no-lonely-if': 'warn', // Cảnh báo if không cần thiết (có thể viết gọn hơn)
            'no-unused-vars': 'warn', // Cảnh báo biến khai báo mà không dùng
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
            'comma-dangle': 'warn', // Dấu phẩy cuối object, array (bắt buộc hoặc cảnh báo)
            'comma-spacing': 'warn', // Khoảng cách sau dấu phẩy
            'arrow-spacing': 'warn', // Khoảng trắng giữa `=>`
        },
    },
];
```

---

## 🧠 Gợi ý cấu trúc thư mục

```sh
project-root/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── main.jsx
├── .eslintrc.js
├── vite.config.js
└── package.json
```

---

## 📚 Tài liệu tham khảo

* [Vite](https://vitejs.dev/)
* [React](https://react.dev/)
* [Dnd-kit](https://docs.dndkit.com/)
* [Material UI](https://mui.com/)
* [Emotion](https://emotion.sh/)
* [Lodash](https://lodash.com/)
* [ESLint](https://eslint.org/)

