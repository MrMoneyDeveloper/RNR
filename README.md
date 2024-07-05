
# Breakdown Management System

## Overview

The Breakdown Management System is designed to help manage and track vehicle breakdowns efficiently. This system allows users to view, create, and update breakdown records. It is built using ASP.NET Core for the backend and React.js for the frontend.

## Features

- **View Breakdowns:** Display a list of all breakdowns with details such as reference number, company name, driver name, registration number, and breakdown date.
- **Create Breakdown:** Add a new breakdown to the system by providing necessary information.
- **Update Breakdown:** Select a breakdown from the list and update its details.
- **Pagination:** Efficiently manage and navigate through large lists of breakdowns with pagination.
- **Validation:** Ensure no fields are left blank and reference numbers are unique during creation and updates.
- **Request and Response Logging:** Log all incoming requests and outgoing responses for better debugging and monitoring.

## Technologies Used

- **Backend:** ASP.NET Core, Entity Framework Core
- **Frontend:** React.js, Axios, Bootstrap
- **Database:** SQL Server

## Project Structure

```
.
├── Controllers
│   └── BreakdownsController.cs
├── Data
│   ├── DatabaseInitializer.cs
│   └── RNRContext.cs
├── dbo
│   ├── CreateDatabase.sql
│   ├── CreateTable.sql
│   └── PopulateData.sql
├── Middleware
│   └── RequestResponseLoggingMiddleware.cs
├── Models
│   └── Breakdown.cs
├── Pages
│   ├── _Layout.cshtml
│   ├── _ViewImports.cshtml
│   ├── _ViewStart.cshtml
│   └── Index.cshtml
├── wwwroot
│   ├── css
│   │   ├── BreakdownForm.css
│   │   ├── BreakdownList.css
│   │   ├── CustomNavBar.css
│   │   ├── FeaturesSection.css
│   │   ├── Footer.css
│   │   └── HeroSection.css
│   ├── images
│   │   ├── hero-bg.jpg
│   │   └── RNR_Logo.png
│   └── js
│       ├── NavBar.js
│       ├── validation.js
│       ├── index.js
│       └── components
│           ├── BreakdownForm.js
│           ├── BreakdownList.js
│           ├── FeaturesSection.js
│           ├── Footer.js
│           ├── HeroSection.js
│           └── AnimatedBackground.js
├── Program.cs
├── Startup.cs
└── README.md
```

## Getting Started

### Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js and npm](https://nodejs.org/)

### Setup

1. **Clone the repository.**

2. **Set up the backend:**

   - Update the connection string in `appsettings.json`.
   - Ensure SQL Server is running and accessible.

3. **Initialize the database:**

   The database is initialized automatically using the `DatabaseInitializer` class. It runs the SQL scripts located in the `dbo` directory to create the database, tables, and populate initial data.

### Running the Application

Once both the backend and frontend are set up, apon running the solution it will navigate to `https://localhost:7124` to view the application.

## API Endpoints

- **GET /api/breakdowns:** Fetch a paginated list of breakdowns.
- **GET /api/breakdowns/{id}:** Fetch a single breakdown by ID.
- **GET /api/breakdowns/checkReference/{reference}:** Check if a breakdown reference already exists.
- **POST /api/breakdowns:** Create a new breakdown.
- **PUT /api/breakdowns/{id}:** Update an existing breakdown.

## Frontend Components

### BreakdownForm.js

Handles the form for creating and updating breakdowns. Includes validation to ensure no fields are left blank and that the breakdown reference is unique.

### BreakdownList.js

Displays a paginated list of breakdowns with options to edit each entry. Integrates with the backend API to fetch and display data.

### NavBar.js

Provides navigation across different sections of the application.

### validation.js

Contains functions to validate form data before submission.

## Middleware

### RequestResponseLoggingMiddleware.cs

Logs all incoming HTTP requests and outgoing responses for better debugging and monitoring.

## Data Initialization

### DatabaseInitializer.cs

Automatically initializes the database using SQL scripts located in the `dbo` directory. Ensures the database is created, tables are set up, and initial data is populated.

## Contributing

Please provide feedback if posssible as i want to improve myself and the code i produce



