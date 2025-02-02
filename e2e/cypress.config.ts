import { defineConfig } from "cypress";
import webpack from "@cypress/webpack-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import path from "path";
import dotenv from "dotenv";
import { PrismaClient } from "../core/prisma/prisma";
import users from "./cypress/fixtures/users.json";
import indicators from "./cypress/fixtures/indicators.json";
import values from "./cypress/fixtures/values.json";
import countries from "./cypress/fixtures/countries.json";
import bookmarks from "./cypress/fixtures/bookmarks.json";
import fs from "fs";
import countryTranslations from "./cypress/fixtures/countryTranslations.json";
import indicatorTranslations from "./cypress/fixtures/indicatorTranslations.json";

const envs = dotenv.config().parsed!;

const dbUrl = envs["TEST_DATABASE_URL"];

if (!dbUrl) throw new Error("No test db url");

const prisma = new PrismaClient({
  datasourceUrl: dbUrl,
});

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);

  on("task", {
    populateTestDatabase: async () => {
      await Promise.all([
        prisma.user.createMany({ data: users as any }),
        prisma.indicator.createMany({ data: indicators as any }),
        prisma.country.createMany({ data: countries as any }),
      ]);

      await Promise.all([
        prisma.value.createMany({ data: values as any }),
        prisma.bookmark.createMany({ data: bookmarks as any }),
        prisma.countryTranslation.createMany({
          data: countryTranslations as any,
        }),
        prisma.indicatorTranslation.createMany({
          data: indicatorTranslations as any,
        }),
      ]);

      return 0;
    },
    clearTestDatabase: async () => {
      await Promise.all([
        prisma.value.deleteMany(),
        prisma.bookmark.deleteMany(),
        prisma.indicatorTranslation.deleteMany(),
        prisma.countryTranslation.deleteMany(),
      ]);

      await Promise.all([
        prisma.user.deleteMany(),
        prisma.country.deleteMany(),
        prisma.indicator.deleteMany(),
      ]);

      return 0;
    },
    clearDownloads: async () => {
      if (!fs.existsSync(path.join(__dirname, "cypress", "downloads"))) {
        return 0;
      }

      return new Promise((resolve, reject) => {
        fs.rmdir(
          path.join(__dirname, "cypress", "downloads"),
          { maxRetries: 10, recursive: true },
          (err) => {
            if (err) return reject(err);

            resolve(null);
          }
        );
      });
    },
  });

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
          alias: {
            "@cypress": path.join(__dirname, "cypress"),
          },
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: "ts-loader",
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  return config;
}

export default defineConfig({
  env: {
    ...envs,
    omitFiltered: true,
    filterSpecs: true,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "**/*.feature",
    setupNodeEvents,
    supportFile: "./cypress/support/index.ts",
    supportFolder: "./cypress/support",
    experimentalRunAllSpecs: true,
  },
});
