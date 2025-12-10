# Aston CS Research Portal — Backend

## 🚀 What is this project

This project provides the backend API for a focused “mini research portal” dedicated to the Computer Science department of a university (inspired by Aston University). It allows:

- Browsing all departments in the CS-related set
- Viewing each department’s faculty members
- Fetching detailed faculty profiles — including their research interests, affiliated departments, published articles and conference papers
- Browsing / listing all publications (articles & conference papers)
- Searching across publications and faculty using free-text / keyword / partial / case-insensitive search

The goal: a clean, maintainable, easy-to-use backend to support a frontend portal (e.g. React + Tailwind) — useful for a university research listing site, or a departmental website.

---

## 🛠 Technology Stack & Key Libraries

- **Node.js** + **Express** — server and routing
- **TypeScript** — type safety and better DX
- **MongoDB** + **Mongoose** — data persistence and schema modeling
- **Zod** — runtime validation of request parameters / query / body

Utilities & middleware:

- `catchAsync` — uniform error-safe async controller wrapper
- `sendResponse` — unified response format (status code, success, message, data)
- `validateRequest` — integrates Zod validation with Express routes

Project follows a **modular architecture** with clear separation:

- `*.model.ts` + `*.interface.ts` — data models
- `*.service.ts` — data access and business logic
- `*.controller.ts` — request handling, calling service, preparing response
- `*.route.ts` — routing & validation
- `*.validation.ts` — Zod schemas for request validation

---

## 📁 Project Architecture (Folder Structure)

```

/src
/app
/modules
/department
department.model.ts
department.interface.ts
department.service.ts
department.controller.ts
department.route.ts
department.validation.ts
/faculty
faculty.model.ts
faculty.interface.ts
faculty.service.ts
faculty.controller.ts
faculty.route.ts
faculty.validation.ts
/publication
publication.model.ts
publication.interface.ts
publication.service.ts
publication.controller.ts
publication.route.ts
publication.validation.ts
/search
search.service.ts
search.controller.ts
search.route.ts
search.validation.ts
/middlewares
validateRequest.ts
shared
catchAsync.ts
sendResponse.ts
app.ts
server.ts
config/index.ts
/scripts
importFromExcel.ts ← script to import dataset from Excel

```

---

## ⚙️ Setup & Running the Project (locally)

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or remote)
- `.env` file with at least:
  ```text
  NODE_ENV=development
  PORT=5000
  DATABASE_URL=<your-mongo-connection-string>
  ```

### Install dependencies

```bash
npm install
```

### Import dataset (once)

If you haven’t yet imported the client-supplied Excel dataset:

```bash
npm run import:excel
```

This will parse the Excel, normalize department affiliations, and populate the MongoDB with departments, faculties, and publications.

### Run in development

```bash
npm run dev
```

This watches `src/`, rebuilds on changes, and restarts the server automatically.

### Build & run (production build)

```bash
npm run build
npm start
```

---

## 🔗 API Endpoints (summary)

All endpoints are prefixed with `/api/v1`.

| Method | Path                                     | Purpose                                                                                                                     |
| ------ | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/departments`                           | List all CS-related departments                                                                                             |
| GET    | `/departments/:slug`                     | Get a department by slug + its faculty list                                                                                 |
| GET    | `/faculties/:id`                         | Get a faculty's full profile (departments, publications)                                                                    |
| GET    | `/publications`                          | Get all publications                                                                                                        |
| GET    | `/publications/:id`                      | Get a single publication by id                                                                                              |
| GET    | `/search?q=<query>&limit=<n>&offset=<m>` | Search publications (by title/keywords) and faculties (by name/researchInterest); supports partial & case-insensitive match |

See detailed request/response shapes, example responses, and parameter descriptions in the Postman collection.

---

## 📬 Postman API Documentation (Ready-to-use)

You can explore and test all endpoints using the following Postman collection:

[🔗 Aston CS Research Portal — API Collection & Docs](https://un-core-83592.postman.co/workspace/My-Workspace~978ad5b1-3bf3-4cc6-8eed-660089906b37/collection/27487917-3d9f8b66-5913-46ed-a736-2740b41b2152?action=share&creator=27487917)

---

## 🌱 Next Steps (Phase 2 & Beyond — Improvements Plan)

- Adding pagination, filtering, sorting to list endpoints (`/publications`, `/search`)
- Caching, ETag / HTTP caching for mostly-static data
- Auth / Role-based access control (if adding admin/edit features)
- Better error handling, logging, monitoring & rate-limiting (for production readiness)
- More robust search (full-text index, fallback, fuzzy search) if dataset grows large
- Automated tests + CI/CD integration
- API versioning, documentation (OpenAPI / Swagger)

---

## 💬 Feedback & Contribution

If you find bugs, want to extend features, or propose changes — feel free to submit a pull request or open an issue. I wanted this backend to stay clean, modular, and easy to extend.

Thank you for using / building this portal.
