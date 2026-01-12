# CRM Project

## Table of Contents
1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Database Connection](#database-connection)
7. [Usage](#usage)
8. [Running Tests](#running-tests)
9. [Deployment](#deployment)

## Project Overview
A CRM (Customer Relationship Management) system built with Next.js for managing companies, promotions, categories, and countries.

## Requirements
- **Operating System:** macOS, Linux, or Windows
- **Node.js:** 18.x or higher
- **npm** or **yarn**
- **Database:** PostgreSQL (Neon Database)

## Technology Stack
- **Frontend:** Next.js 16, React 18
- **Database:** PostgreSQL (Neon)
- **ORM/Database Client:** @neondatabase/serverless
- **State Management:** @tanstack/react-query
- **Forms:** Formik
- **Styling:** Tailwind CSS
- **UI Components:** @headlessui/react

## Installation
1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd crm
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

## Configuration
1. Copy the example environment file:
    ```sh
    cp env.example .env
    ```

2. Update the `.env` file with your configuration:
    ```env
    DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
    ```

## Database Connection
The application connects to an existing PostgreSQL database (Neon). Make sure your database is set up and accessible.

The application expects the following tables:
- `categories` - Company categories
- `countries` - Countries
- `companies` - Company information
- `promotions` - Promotions for companies
- `summary_stats` - Summary statistics
- `summary_sales` - Sales summary data

## Usage
1. Start the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

2. Access the application:
    - Open [http://localhost:3000](http://localhost:3000) in your browser

## Running Tests
```sh
npm run lint
# or
yarn lint
```

## Deployment
1. Ensure all environment variables are set in your deployment platform
2. Ensure your database is set up and accessible
3. Build the application:
    ```sh
    npm run build
    ```
4. Start the production server:
    ```sh
    npm start
    ```
