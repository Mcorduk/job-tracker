module.exports = {
  env: {
    node: true, // Set node environment for server-side code
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ["**/*.js"], // Apply these settings to all JavaScript files
      excludedFiles: "public/*", // Exclude public folder from linting
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // Add or override rules as needed for your Express.js project
    "no-console": "off", // Allowing console.log in server-side code
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "no-unused-vars": ["error", { argsIgnorePattern: "^next$|^req$" }],
    "func-names": "off", // Non arrow functions in Schema virtuals error
    "no-underscore-dangle": ["error", { allow: ["_id"] }], // _id error in Schemas
  },
  plugins: ["import"],
  settings: {
    "import/resolver": {
      node: {},
    },
  },
};
