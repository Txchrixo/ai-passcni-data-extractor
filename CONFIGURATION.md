# Configuration Documentation

## .prettierrc

- **`printWidth`**: Specifies the line length that the printer will wrap on. Default is `80`.
- **`tabWidth`**: Number of spaces per indentation level. Default is `2`.
- **`useTabs`**: Indent lines with tabs instead of spaces. Default is `false`.
- **`semi`**: Print semicolons at the ends of statements. Default is `false`.
- **`singleQuote`**: Use single quotes instead of double quotes. Default is `true`.
- **`jsxSingleQuote`**: Use single quotes instead of double quotes in JSX. Default is `false`.
- **`quoteProps`**: Change when properties in objects are quoted. Options are `"as-needed"`, `"consistent"`, and `"preserve"`. Default is `"as-needed"`.
- **`trailingComma`**: Print trailing commas wherever possible when multi-line. Default is `"all"`.
- **`bracketSpacing`**: Print spaces between brackets in object literals. Default is `true`.
- **`arrowParens`**: Include parentheses around a sole arrow function parameter. Default is `"always"`.

## eslint.config.js

- **`env`**:

  - **`browser`**: Enables browser global variables, allowing code to run in a browser environment.
  - **`node`**: Enables Node.js global variables, making Node.js-specific globals available.
  - **`es2021`**: Enables ECMAScript 2021 features, ensuring compatibility with the latest JavaScript standards.

- **`extends`**:

  - **`eslint:recommended`**: Applies ESLint’s recommended rules, which are a set of core rules that report common problems.
  - **`plugin:@typescript-eslint/recommended`**: Applies recommended TypeScript rules to ensure code quality and consistency.
  - **`prettier`**: Integrates Prettier rules to avoid conflicts between ESLint and Prettier.
  - **`plugin:prettier/recommended`**: Enables Prettier as an ESLint plugin to enforce formatting rules and ensure code is formatted consistently.

- **`parser`**: Specifies the parser to use, here `@typescript-eslint/parser`, which allows ESLint to understand TypeScript syntax.

- **`parserOptions`**:

  - **`ecmaVersion`**: Specifies the ECMAScript version to use, here set to `12` (ES2021), enabling the latest JavaScript features.
  - **`sourceType`**: Allows the use of ECMAScript modules (`import`/`export`), set to `module`.

- **`plugins`**:

  - **`@typescript-eslint`**: Adds support for TypeScript-specific linting rules.
  - **`prettier`**: Adds support for Prettier-specific linting rules.

- **`rules`**:
  - **`prettier/prettier`**: Enforces Prettier formatting as an error, ensuring that all code follows Prettier's style guidelines.
  - **`no-console`**: Disables warnings for `console` statements, which might be useful for debugging.
  - **`no-unused-vars`**: Warns when there are unused variables in the code, helping to keep the code clean.
  - **`@typescript-eslint/explicit-module-boundary-types`**: Turned off in this configuration, meaning explicit return types are not required for functions.
  - **`@typescript-eslint/no-explicit-any`**: Warns when `any` type is used in TypeScript, promoting the use of more specific types.
  - **`semi`**: Enforces the use of semicolons at the end of statements, ensuring consistency in code style.
  - **`quotes`**: Enforces the use of single quotes for strings, promoting a consistent quoting style.

## TypeScript Configuration

- **`target`**: Set the JavaScript language version for emitted JavaScript and include compatible library declarations. Default is `"es2016"`.
- **`module`**: Specify what module code is generated. Default is `"commonjs"`.
- **`rootDir`**: Specify the root folder within your source files. Default is `"./src"`.
- **`moduleResolution`**: Specify how TypeScript looks up a file from a given module specifier. Default is `"node"`.
- **`declaration`**: Generate `.d.ts` files from TypeScript and JavaScript files in your project. Default is `true`.
- **`outDir`**: Specify an output folder for all emitted files. Default is `"./lib"`.
- **`esModuleInterop`**: Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. Default is `true`.
- **`forceConsistentCasingInFileNames`**: Ensure that casing is correct in imports. Default is `true`.
- **`strict`**: Enable all strict type-checking options. Default is `true`.
- **`skipLibCheck`**: Skip type checking all `.d.ts` files. Default is `true`.
- **`include`**: Specify which files or directories to include. Default is `["src/**/*.ts"]`.
- **`exclude`**: Specify which files or directories to exclude. Default is `["node_modules", "**/__tests__/**"]`.
