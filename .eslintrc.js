// module.exports = {
//     "env": {
//         "browser": true,
//         "commonjs": true,
//         "es6": true,
//         "node": true
//     },
//     "extends": "standard",
//     "globals": {
//         "Atomics": "readonly",
//         "SharedArrayBuffer": "readonly"
//     },
//     "parserOptions": {
//         "ecmaVersion": 2018
//     },
//     "rules": {
//     }
// };

module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es6: true,
        mocha: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: ['react'],
    settings: {
        react: {
            version: 'latest',
        },
    },
    rules: {
        // General
        'array-callback-return': ['warn'],
        'eqeqeq': ['off', 'always', { null: 'ignore' }],
        'new-parens': ['warn'],
        'no-array-constructor': ['warn'],
        'no-caller': ['warn'],
        'no-cond-assign': ['warn', 'always'],
        'no-console': ['warn', { allow: ['warn', 'error', 'reportException'] }],
        'no-eval': ['warn'],
        'no-extend-native': ['warn'],
        'no-extra-bind': ['warn'],
        'no-implied-eval': ['warn'],
        'no-iterator': ['warn'],
        'no-lone-blocks': ['warn'],
        'no-loop-func': ['warn'],
        'no-multi-str': ['warn'],
        'no-native-reassign': ['warn'],
        'no-new-wrappers': ['warn'],
        'no-script-url': ['warn'],
        'no-self-compare': ['warn'],
        'no-shadow-restricted-names': ['warn'],
        'no-template-curly-in-string': ['warn'],
        'no-throw-literal': ['warn'],
        'no-unused-vars': ['warn', { 'args': 'none', ignoreRestSiblings: true }],
        'no-use-before-define': ['warn'],
        'no-useless-computed-key': ['warn'],
        'no-useless-concat': ['warn'],
        'no-useless-constructor': ['warn'],
        'no-useless-rename': ['warn'],
        'no-whitespace-before-property': ['warn'],
        'no-unreachable': ['warn'],
        'no-constant-condition': ['warn'],

        // React
        'react/prop-types': ['off'],
        'react/no-unescaped-entities': ['off'],
        'react/style-prop-object': ['warn'],
    },
};