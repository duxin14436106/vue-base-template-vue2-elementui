const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
    root: true,
    /* 指定如何解析语法。*/
    parser: 'vue-eslint-parser',
    /* 优先级低于parse的语法解析配置 */
    parserOptions: {
        parser: '@typescript-eslint/parser',
        //模块化方案
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        es2021: true,
        node: true,
        // 解决 defineProps and defineEmits generate no-undef warnings
        'vue/setup-compiler-macros': true,
    },
    // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-globals
    globals: {},
    extends: [
        'plugin:vue/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // typescript-eslint推荐规则,
        'prettier',
        'plugin:prettier/recommended',
    ],
    // https://cn.eslint.org/docs/rules/
    rules: {
        // 禁止使用 var
        'no-var': 'error',
        'no-empty': 'off',
        semi: 'off',
        'valid-typeof': ['error', { requireStringLiterals: true }],
        'no-constant-condition': ['error', { checkLoops: false }],
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/no-explicit-any': 'off', // 可以使用 any 类型
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        // 解决使用 require() Require statement not part of import statement. 的问题
        '@typescript-eslint/no-var-requires': 0,
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-types.md
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    // add a custom message to help explain why not to use it
                    Foo: "Don't use Foo because it is unsafe",

                    // add a custom message, AND tell the plugin how to fix it
                    String: {
                        message: 'Use string instead',
                        fixWith: 'string',
                    },

                    '{}': {
                        message: 'Use object instead',
                        fixWith: 'object',
                    },
                },
            },
        ],
        // 禁止出现未使用的变量
        '@typescript-eslint/no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
        ],
        'vue/html-indent': 'off',
        // 关闭此规则 使用 prettier 的格式化规则，
        'vue/max-attributes-per-line': ['off'],
        // 优先使用驼峰，element 组件除外
        'vue/component-name-in-template-casing': [
            'error',
            'PascalCase',
            {
                ignores: ['/^el-/', '/^router-/'],
                registeredComponentsOnly: false,
            },
        ],
        // 忽略index命名
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index', 'Sidebar', 'Index', 'keep-alive'],
            },
        ],
        'vue/require-explicit-emits': ['off'],
        'vue/no-deprecated-slot-attribute': ['off'],
        'vue/order-in-components': ['off'],
        // 在vue2中禁止装换
        'vue/no-deprecated-v-bind-sync': ['off'],
        // 强制使用驼峰
        camelcase: ['error', { properties: 'always', allow: ['sign_timestamp'] }],
        // 优先使用 const
        'prefer-const': [
            'error',
            {
                destructuring: 'any',
                ignoreReadBeforeAssign: false,
            },
        ],
    },
})
