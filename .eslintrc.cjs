module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["eslint:recommended"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        //no_unused_vars: ["warning", "always"],
    },
    /*rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        unus
    },*/
};
