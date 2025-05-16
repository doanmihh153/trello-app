// Base-Eslint --> Cấu hình cơ bản của EsLint === FILE CŨ 
module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    // Rules React JS
    'react-refresh/only-export-components': 'warn', // 
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', // Báo nếu dùng useEffect nếu trống 
    'react/prop-types': 0,  
    'react/display-name': 0,    // 

    // Rules MUI - masterial UI 
    "no-restricted-imports" : [
        "error", {
          "patterns" : ["@mui/*/*/*"],
        }
    ],

    // 0 == false || 1 == true
    'no-console': 0,    // Xoá Toàn bộ console.log<> khi đưa lên product
    'no-lonely-if': 1,  // Tránh code thừa - Clean code
    'no-unused-vars': 1,    // Khai báo biến khi ko sử dụng 
    'no-trailing-spaces': 1,    // Thừa nhiều dấu space
    'no-multi-spaces': 1,   // Thừa nhiều khoảng trống
    'no-multiple-empty-lines': 1,   // Thừa quá nhiều dòng
    'space-before-blocks': ['error', 'always'], // Cảnh báo { "fod": 123 } khoảng trắng đầu cuối
    'object-curly-spacing': [1, 'always'],  // Làm đẹp code :)
    'indent': ['warn', 4],  // Tab --> Có thể dùng 4 dấu cách || 2 dấu cách <dự án thực tế dùng>
    'semi': ['error', 'always'],   // Dấu " ; " || có thể dùng "error" : "allway" <bắt buộc> -- "never"
    'quotes': ['error', 'single'],  // Là dấu "  " || ' '
    'array-bracket-spacing': 1,     // cảnh bảo Array
    'linebreak-style': 0,   // xuống dòng
    'no-unexpected-multiline': 'warn',  // Không dư dòng thừa -- Không dùng dấu ;
    'keyword-spacing': 1,   // nói chung là để clean code :)
    'comma-dangle': 1,  // Dư thừa dấu phẩy ở cuối
    'comma-spacing': 1, // nó liên quan đến dấu "," thôi 
    'arrow-spacing': 1  // mũi tên ở Arrow function!
  }
}