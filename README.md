# Statify

Statify is a web application designed for viewing and analyzing statistics. Link for deployment: https://statify-iota.vercel.app.

## About the project

I began developing this project in September 2023 with the goal of consolidating statistical and economic data from various countries into a single website. Given my academic background in economics, this project was both engaging and personally relevant.

The first step was acquiring data, and my initial source was the IMF (International Monetary Fund). I considered using their API but quickly realized it was not very customizable and required making large requests, which was inefficient. To address this, I decided to build my own database. Initially, I used MongoDB, but I soon switched to PostgreSQL during the early stages of development.

I wrote a script to populate the database with IMF data, after which I developed the UI and created four pages. This became the first, albeit rough, version of the application. After posting about it on LinkedIn, it gained some attention and was even featured in an article by dev.ua. However, the article contained numerous errors, suggesting the authors didn’t explore beyond the app’s landing page.

As I improved the app, fixing key issues and making it more usable, I encountered a significant problem: the data from the IMF. While extensive, much of it comprised complex macroeconomic indicators, many of which were unfamiliar even to me. This prompted me to search for a new data source, eventually leading me to the World Bank (WB).

The WB offered a wealth of both economic and statistical data, making it a better fit for the project. I wrote a new script to populate the database with WB data. Since there was overlap between IMF and WB indicators, I initially hid duplicate IMF indicators and eventually removed IMF data entirely. The WB data proved to be more comprehensive and sufficient.

To maintain quality, I selectively add new indicators that I consider important, rather than including everything available. When adding an indicator, I first test it in a local database, enrich it with custom properties, and then push it to the production database.

For a few months, I paused active development. However, in September 2024, I resumed work on the application, adding an admin panel, fixing numerous bugs, and completing significant improvements.

This app also serves as a sandbox for me to experiment with new features and learn new technologies. While I take it seriously, I also use it as an opportunity to implement and practice skills that are important for my growth as a developer.

## Key entities

The project revolves around three main entities: Indicator, Country, and Value.

- Indicator: Represents a measurable statistic or metric (e.g., GDP, population growth).
- Country: Denotes a geographical or political entity, which can be a state, continent, union of countries, or any region of the world.
- Value: Refers to the actual numerical data of an Indicator for a specific Country in a given year.

## Project Structure

### `.github`

Contains GitHub-specific files and workflows.

- `workflows/`: Contains GitHub Actions workflow files.
  - `node.js.yml`: Workflow configuration for Node.js.

### `.husky`

Contains Husky hooks for Git hooks.

- `_`: Contains internal Husky files.
  - `.gitignore`: Git ignore file for Husky.
  - `applypatch-msg`, `commit-msg`, `post-applypatch`, `post-checkout`, etc.: Various Git hook scripts.
  - `husky.sh`: Husky shell script.

### Core

Core configuration and environment files.

- `.env.dev`, `.env.prod`, `.env.test`: Environment configuration files for different environments.
- `.eslintrc.json`: ESLint configuration file.
- `.next/`: Next.js build output directory.
- `.prettierrc`: Prettier configuration file.
- `.swc/`: SWC (Speedy Web Compiler) configuration directory.
- `jest.config.ts`: Jest configuration file.
- `load-env.js`: Script to load environment variables.
- `next-env.d.ts`: TypeScript definitions for Next.js.
- `next.config.js`: Next.js configuration file.
- `package.json`: Core package configuration file.

### `prisma/`

Contains database-related files.

### `public/`

Public assets directory.

### `src/`

Source code directory.

- `api/`: Functions for API calls, mainly mutations.
- `app/`: Next.js app router.
- `constants/`: Global constants.
- `components/`: Reusable components that aren’t part of the design system.
- `containers/`: Larger, non-reusable components.
- `layout/`: Layout components (e.g., header).
- `ui/`: Design system components.
- `hooks/`: Global hooks.
- `providers/`: React context files.
- `services/`: Backend service files.
- `types/`: Global types.
- `utils/`: Utility functions used occasionally.

### TypeScript Configuration

- `tsconfig.jest.json`: TypeScript configuration for Jest.
- `tsconfig.json`: TypeScript configuration file.

### Scripts

- `verify-env.js`: Script to verify environment variables.

### `e2e/`

End-to-end testing configuration and files.

- `.env`: Environment configuration file for end-to-end tests.
- `cypress/`: Cypress testing framework directory.
  - `cypress.config.ts`: Cypress configuration file.
- `package.json`: End-to-end testing package configuration file.
- `tsconfig.json`: TypeScript configuration file for end-to-end tests.

### Root

- `package.json`: Root package configuration file.
- `README.md`: Project documentation file.

## Unit testing

The primary type of testing in the application is unit testing, implemented using Jest in combination with the React Testing Library. Ideally, every TypeScript file containing logic should have a corresponding test file. However, this is not yet the case. Currently, the application's test coverage stands at approximately 20%.

## End to End testing

The second type of testing I introduced alongside the admin dashboard is end-to-end (E2E) testing. Since E2E tests were new to me, I added them as part of this project for practice. I use Cucumber paired with Cypress for E2E testing, and all tests are organized within a designated e2e folder.

Currently, the entire application is covered with E2E tests. These tests run in a separate environment with a specific database connection and tailored application configuration. For example, SSG (Static Site Generation) is disabled in the E2E environment.

When E2E tests start, the database is populated with data from the e2e/fixtures folder and is reset after each scenario to ensure test isolation. For authorization, tokens are dynamically generated and set as cookies, eliminating the need to log in manually for scenarios that require authentication.

## Deployment

For deployment, I use Vercel. The application supports internationalization based on domain prefixes, so there are two separate builds: one for the UK and another for UA. Production deployment is automatically triggered whenever the production branch is updated.

## SSR SSG CSR

My application utilizes a mix of SSG (Static Site Generation), SSR (Server-Side Rendering), and CSR (Client-Side Rendering) to optimize performance and user experience:

- SSG: Used for fully static pages like the landing page and terms of service.
- SSR: Applied to dynamic pages, such as the indicator page, ensuring fresh data is fetched on each request.
- SSG on Demand: The indicator page combines SSR with on-demand SSG, allowing specific content to be statically generated only when required.
- CSR: Used for interactive elements like charts and other dynamically loaded parts of the application.

## Internationalization

One of the most recent features I added to the application is Internationalization (i18n). The app currently supports two languages: Ukrainian and English. While the entire UI is already translated, I am still working on translating dynamic content such as indicators, countries, and similar data.

For internationalization, I use the Intl library. Since the supported languages must be known at build time for SSG, and I use domain-based internationalization, I don't rely on React-specific i18n libraries or features.

All translations are organized in the core/messages directory. Additionally, there’s a dedicated file for initializing the Intl instance, which exports a reusable translate function for managing translations throughout the application.

## Design system, styling

For practice, I decided to implement a custom design system in this application. The design system is built using SCSS and follows the atomic design methodology, which organizes components into atoms, molecules, and organisms.

- Atoms and some molecules are located in the ui folder.
- Organisms with some moleculas are placed in the components folder.
- The core/styles directory contains reusable styles, design system variables, and other foundational elements.
- Styling is primarily handled with SCSS. Typically, each TypeScript file in the ui folder has a corresponding SCSS file for its styles.

Previously, I used TailwindCSS for styling. However, I found it challenging to maintain over time, especially as the project grew. Switching to a custom design system gave me greater control and flexibility, and it allowed me to structure styles in a way that aligns with the project’s needs while also

## Database

I use PostgreSQL for my database—locally during development and Neon for production.

Initially, I started with MongoDB, but I switched to PostgreSQL to improve my SQL skills and because I found it a better fit for the project. It’s funny, though—when I first began, I used serverless MongoDB, and I accidentally ended up with a bill for 500 UAH.

## Git workflow

Since I am working alone on this project, I’ve developed a workflow that works best for me.

For each task or issue, I create a separate branch, following a simple naming convention:

Branch Naming Format:
<prefix>/<issue-number>/<branch-name>

Prefix examples:

- infrastructure
- feature
- bugfix
- refactoring
- tests
- documentation

Each pull request (PR) is linked to a specific issue. Since I work solo on this project, I usually keep the issues and PRs more straightforward and less detailed. This workflow helps me stay organized while managing everything independently.
