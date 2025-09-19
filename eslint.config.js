import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            /*
          "no-unused-vars": [
                          "error",
                          { "varsIgnorePattern": "^_" }
                          ]
          */
            'no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            'react-refresh/only-export-components': 'warn',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // 1) react first
                        ['^react$'],

                        // 2) external packages (node builtins and npm packages)
                        ['^@?\\w'],

                        // 3) absolute imports from src/ — matches `import foo from "src/..."`.
                        //    If you don't use absolute `src/` imports, remove or adjust this.
                        ['^src(/.*|$)'],

                        // 4) parent imports
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

                        // 5) sibling and index imports
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

                        // 6) CSS Modules LAST: any import whose specifier ends with `.module.css`
                        //    also tolerates an optional query string like `styles.module.css?inline`
                        ['^.*\\.module\\.css(?:\\?.*)?$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',
        },
    },
]);
