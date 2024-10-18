# Statify

Statify is a web application designed for viewing and analyzing statistics. Link for deployment: https://statify-iota.vercel.app

## Current stage

I'm developing an admin dashboard, with most of the planned functionality already implemented. The admin can now add and edit content, such as indicators, values, and countries. Currently, I'm focused on adding virtualization for the values table to improve performance. I may extend this feature to other tables as well.

## Project Overview

The website is built with **Next.js** and uses **SSR** and **SSG**. I’m using **Prisma** as the ORM, **PostgreSQL** for the database, and **Neon** for deployment.

For authentication, I’ve set up **NextAuth**.

I started with **TailwindCSS** for styling but am now switching to **SCSS** with a custom system. This transition is still in progress and will take more time.

For forms, I use **react-hook-form** with **Yup** for validation. I handle requests using **Axios** and custom hooks. Also I use react-virtualized for virtualization.

Testing is done with **Jest**, though there aren’t many tests yet.

In the future, I plan to add localization and maybe virtual scrolling for handling large lists.

## Features

Current features includ ability to view data by indicator for all countries and for particular country, search, create charts, download datasets, and bookmark indicators.

## Project Goal and Key Entities

The main goal of the project is to allow users to search statistics by socio-economic and geographic indicators for different countries, and easily create charts based on the data. I have a background in statistics and related fields, which is why I decided to build this project.

The key entities in the system are:

Indicators: Socio-economic and geographic indicators, like Gross Domestic Product, Birth Rate etc.
Countries: The geographical entities (countries, regions, etc) which are linked to values.
Values: Data points representing the state of indicator for country in particular year.

There are currently over a million data points in the system, providing a rich set of statistics to work with.

## Folder Structure

Since the project has been around for over a year, the folder structure has changed over time. I might adjust it again later:

- `src/api/`: Functions for API calls, mainly mutations.
- `src/app/`: Next.js app router.
- `src/constants/`: Global constants.
- `src/components/`: Reusable components that aren’t part of the design system (e.g., inputs, buttons).
- `src/containers/`: Larger, non-reusable components.
- `src/layout/`: Layout components (e.g., header).
- `src/ui/`: Design system components.
- `src/hooks/`: Global hooks.
- `src/providers/`: React context files.
- `src/services/`: Backend service files.
- `src/types/`: Global types.
- `src/utils/`: Utility functions used occasionally.
- `/prisma/`: Database-related files.

There are few others common files.
