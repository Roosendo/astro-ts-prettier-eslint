# Astro TypeScript Prettier ESLint Setup

[![npm version](https://badge.fury.io/js/astro-ts-prettier-eslint.svg)](https://badge.fury.io/js/astro-ts-prettier-eslint)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A configuration package for Astro projects using TypeScript, Prettier, ESLint, and TailwindCSS. This package sets up your project with best practices and required dependencies to ensure your code is clean and consistent.

## Features

- **TypeScript**: Adds TypeScript support for type-safe code.
- **ESLint**: Lints your code for consistency and best practices.
- **Prettier**: Formats your code to make it look clean and readable.
- **TailwindCSS**: Integrates a plugin for better organization of TailwindCSS imports and formatting of classes.

## Installation

To use this package, you need to have Node.js installed. Then, execute the package.

### Global Installation

> npm
```bash
npx astro-ts-prettier-eslint@latest
```

> pnpm
```bash
pnpx astro-ts-prettier-eslint@latest
```

## Aditional Configuration

This package will also automatically create the following configuration files and folders if they do not already exist in your project:

- A **.vscode** folder (if it does not exist) with a **settings.json** file.
- An ESLint configuration file **.eslintrc.cjs**.
- A **.prettierignore** file to specify files to be ignored by Prettier.
- A Prettier configuration file **.prettierrc**.
- A Prettier configuration file **prettier.config.cjs**.

> [!IMPORTANT]
> Please note that you will need to have your own **tsconfig.json** for TypeScript and **tailwind.config.js** for TailwindCSS already set up in your project.

With these configurations, your project will be ready to develop with a well-structured and organized environment.
