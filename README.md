Here’s a basic `README.md` template for your demo app. It includes instructions on how to set up, run, test, lint, and format the app, along with an overview of the project and the GitHub Actions CI pipeline.

---

# Demo Fastify App

This project is a demo Fastify web API for managing ice creams, implemented with TypeScript, SQLite, and using `pnpm` as the package manager. The project includes CRUD endpoints for managing ice creams and comes with a CI pipeline that runs automated tests, linting, and formatting checks using GitHub Actions.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [Technologies Used](#technologies-used)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v16+ (v18 recommended)
- [pnpm](https://pnpm.io/) (if not installed globally, install using `corepack enable pnpm`)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install the dependencies:
   ```bash
   pnpm install
   ```

## Running the Application

To start the Fastify server, run:

```bash
pnpm dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

The app exposes the following CRUD endpoints to manage ice creams:

| HTTP Method | Endpoint                | Description              |
|-------------|-------------------------|--------------------------|
| `POST`      | `/icecreams`             | Create a new ice cream    |
| `GET`       | `/icecreams`             | Get all ice creams        |
| `PUT`       | `/icecreams/:id`         | Update an ice cream       |
| `DELETE`    | `/icecreams/:id`         | Delete an ice cream       |

### Example Request (Create Ice Cream)

```bash
curl -X POST http://localhost:3000/icecreams \
-H "Content-Type: application/json" \
-d '{"name": "Chocolate Darko", "flavor": "Chocolate", "price": 200}'
```

### Example Response

```json
{
  "id": 1,
  "name": "Chocolate Darko",
  "flavor": "Chocolate",
  "price": 200
}
```

## Testing

The project uses [Jest](https://jestjs.io/) for testing. You can run the test suite with:

```bash
pnpm test
```

This will run all the unit tests defined for the CRUD operations.

## Linting and Formatting

The project uses [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for code formatting.

### To check for linting errors:

```bash
pnpm lint
```

### To check for formatting issues:

```bash
pnpm format --check
```

### To automatically fix linting and formatting issues:

```bash
pnpm lint --fix
pnpm format
```

## Technologies Used

- **Fastify**: A fast and low-overhead web framework for Node.js.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **pnpm**: A fast and efficient package manager.
- **SQLite**: Lightweight, serverless database engine.
- **Jest**: Testing framework for unit tests.
- **ESLint**: Linting tool for identifying and fixing code issues.
- **Prettier**: Code formatter for maintaining a consistent style.
