const warn = process.env.NODE_ENV === "development" ? "warn" : "error";

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true, // <- 追加
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:react-hooks/recommended",
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "comma-dangle": ["error", "always-multiline"],
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "linebreak-style": ["error", "unix"],
        "no-console": warn,
        "no-multi-spaces": "error",
        "no-unused-vars": "off",
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
            },
        ],
        "react/prop-types": "off",
        semi: ["error", "always"],
        "sort-keys": warn,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
