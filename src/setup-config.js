#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
const settingsVSCode = `{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "astro",
    "typescript",
    "typescriptreact"
  ],
  "prettier.documentSelectors": ["**/*.astro"],
  "[astro]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}`;
const eslintConfig = `/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['plugin:astro/recommended', 'ts-standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // override/add rules settings here, such as:
        'astro/no-set-html-directive': 'error'
      }
    }
  ]
}
`;
const prettierIgnore = 'node_modules/**';
const prettierConfig = `{
  "useTabs": false,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false,
  "printWidth": 100,
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "jsxSingleQuote": true,
  "tabWidth": 2,
  "endOfLine": "lf"
}`;
const prettierConfigCJS = `/** @type {import('prettier').Config} */
module.exports = {
  // i am just using the standard config, change if you need something else
  ...require('prettier-config-standard'),
  pluginSearchDirs: [__dirname],
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
}
`;
const dependencies = [
    '@typescript-eslint/parser@7.13.1',
    'eslint@8.57.0',
    'eslint-config-ts-standard@1.0.5',
    'eslint-plugin-astro@1.2.2',
    'eslint-plugin-jsx-a11y@6.9.0',
    'prettier@3.3.2',
    'prettier-config-standard@7.0.0',
    'prettier-plugin-astro@0.14.0',
    'prettier-plugin-tailwindcss@0.6.5',
    'typescript@5.4.5'
];
const main = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'installDeps',
            message: 'Do you want to install the required dependencies?',
            default: true
        },
        {
            type: 'list',
            name: 'packageManager',
            message: 'Which package manager do you use?',
            choices: ['pnpm', 'yarn', 'npm'],
            when: (answers) => answers.installDeps
        }
    ]);
    if (answers.installDeps) {
        console.log('Installing required dependencies...');
        const packageManager = answers.packageManager;
        const installCommand = packageManager === 'npm'
            ? `npm install --save-dev ${dependencies.join(' ')}`
            : packageManager === 'yarn'
                ? `yarn add --dev ${dependencies.join(' ')}`
                : `pnpm add --save-dev ${dependencies.join(' ')}`;
        execSync(installCommand, { stdio: 'inherit' });
        console.log('Dependencies installed!');
    }
    else {
        console.log('Skipping dependency installation...');
    }
    if (answers.installDeps) {
        const vscodeDir = path.join(process.cwd(), '.vscode');
        if (!fs.existsSync(vscodeDir))
            fs.mkdirSync(vscodeDir);
        fs.writeFileSync(path.join(vscodeDir, 'settings.json'), settingsVSCode);
        fs.writeFileSync(path.join(process.cwd(), '.eslintrc.cjs'), eslintConfig);
        fs.writeFileSync(path.join(process.cwd(), '.prettierignore'), prettierIgnore);
        fs.writeFileSync(path.join(process.cwd(), '.prettierrc'), prettierConfig);
        fs.writeFileSync(path.join(process.cwd(), 'prettier.config.cjs'), prettierConfigCJS);
        console.log('Setup complete! 🚀 Happy coding ✨');
        console.log(`
    Add the following script to your package.json file:
    "lint": "prettier --write  \\"**/*.{js,jsx,ts,tsx,md,mdx,astro}\\" && eslint --fix \\"src/**/*.{js,ts,jsx,tsx,astro}\\""
    `);
    }
};
main();
