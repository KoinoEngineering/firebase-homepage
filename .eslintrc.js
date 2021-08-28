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
    settings: {
        react: {
            version: "detect",
        },
    },
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
        "react/prop-types": "off",
        "no-unused-vars": "off",
        "no-console": warn,
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "linebreak-style": ["error", "unix"],
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true,
            },
        ],
        semi: ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "no-multi-spaces": "error",
    },
};
