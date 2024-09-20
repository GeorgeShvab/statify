# Statify

Statify is a web application designed for viewing and analyzing statistics. Link for deployment: https://statify.world

Here’s a revised version with your requested section added:

## Project Overview

The website is built with **Next.js** and uses **SSR** and **SSG**. I’m using **Prisma** as the ORM, **PostgreSQL** for the database, and **Neon** for deployment.

For authentication, I’ve set up **NextAuth**.

I started with **TailwindCSS** for styling but am now switching to **SCSS** with a custom system. This transition is still in progress and will take more time.

For forms, I use **react-hook-form** with **Yup** for validation. I handle requests using **Axios** and custom hooks.

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

## Recent Work

After a break, I started working on the project again over the last two weeks. I’m focusing on building an admin panel to make managing the project data easier.

So far, I’ve created parts of the design system, including components like Select and Dropdown, and set up SCSS and Jest. I also implemented NextAuth for authorization, where only admins can log in.

I’ve built the Login, Indicators, Values, and Countries pages. Right now, only the Indicators page works (viewing, editing, and creating indicators), while the other pages still have mock data and need more development.

Admin panel indicators page:
![image](https://github.com/user-attachments/assets/045c6260-32c6-4fa1-9894-f4f2c57393da)

Indicator edit form:
![image](https://github.com/user-attachments/assets/e08364f2-c41c-40ee-b6b5-2c4c5ceb4968)

Signin page:
![image](https://github.com/user-attachments/assets/76be1c6a-c4de-4cfc-b1b6-cb2765341efc)


