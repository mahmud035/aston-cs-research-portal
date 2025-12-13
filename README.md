# Aston CS Research Portal

A full-stack, department-specific research discovery platform for the
**Aston University Computer Science Department**.

The Aston CS Research Portal enables users to explore research groups, academic staff, and scholarly publications through a clean, intuitive, and academically styled web interface — inspired by Aston University’s central research website, but focused exclusively on Computer Science.

---

## 📌 Project Overview

The **Aston CS Research Portal** is a mini research portal designed to replicate the core experience of a university research listing system, while remaining focused, maintainable, and easy to extend.

The project consists of:

- A **React + TypeScript frontend** for exploration and discovery
- A **Node.js + Express backend API** for structured research data access

The system emphasizes:

- Academic clarity
- Professional UI/UX
- Clean architecture
- Real-world development practices

---

## 🎯 What Does This Project Do?

The portal helps students, researchers, and visitors to:

- Explore Computer Science research groups and centres
- Discover academic staff and their research interests
- Browse journal articles and conference papers
- Perform intelligent keyword-based searches across staff and publications
- Navigate external scholarly resources via Google Scholar

⚠️ **Note:**
The portal does **not** host full publication texts. It focuses on **discovery and navigation**, redirecting users to trusted external academic sources (e.g. Google Scholar).

---

## ⚙️ How the System Works (End-to-End)

### 1️⃣ Data Source & Backend API

- Research data is sourced from a structured dataset originally extracted from Aston University’s research listings.
- The backend API exposes RESTful endpoints to retrieve:

  - Departments
  - Faculty profiles
  - Publications (articles & conference papers)
  - Unified search results

### 2️⃣ Client–Server Interaction

- The frontend consumes the backend via REST APIs.
- All server state is managed using **TanStack Query**:

  - Caching
  - Background refetching
  - Loading and error states

- Requests are debounced where appropriate (e.g. search).

### 3️⃣ User Navigation Flow

1. Users land on the homepage and browse research groups
2. Selecting a department shows affiliated academic staff
3. Selecting a faculty member opens a detailed profile
4. Publications link externally to Google Scholar
5. Search allows discovery across both staff and publications

### 4️⃣ Search Workflow

- Users search by:

  - Keywords
  - Research topics
  - Staff names

- Search operates across:

  - Publication titles & keywords
  - Faculty names & research interests

- Results include:

  - Highlighted matched terms
  - Clear result counts
  - Clickable internal and external links

### 5️⃣ UX & Reliability Enhancements

- Skeleton loaders across all data-fetching views
- Clear academic-tone empty states
- Explicit microcopy for external links
- Graceful error handling and fallback pages

---

## ✨ Core Features

### 🏠 Homepage

- Overview of CS research groups and centres
- Department grid with intuitive navigation
- Embedded intelligent search section

### 🧱 Department Pages

- Faculty members associated with each department
- Clear academic hierarchy
- Direct navigation to faculty profiles

### 👤 Faculty Profiles

- Academic position and affiliations
- Research interests
- Journal articles and conference papers
- Cross-links to departments

### 🔍 Intelligent Search

- Keyword-based search across staff and publications
- Debounced input for performance
- Highlighted matched terms
- Result counts and clear feedback
- “Clear search” control

### 📄 Publications

- Categorized by type (journal / conference)
- External links to Google Scholar
- Explicit microcopy explaining external navigation

### 🎨 UI / UX

- University-style minimal elegance
- Aston-inspired color palette
- Accessible typography and spacing
- Skeleton loaders for perceived performance
- Calm, professional academic tone

---

## 🧩 Project Architecture

### Overall Architecture

The project follows a **clean, modular, full-stack architecture** with clear separation of concerns.

---

### Frontend Architecture (Feature-Based)

```text
frontend/
src/
├── api/                  # Axios instance & API helpers
├── components/
│   ├── layout/           # Navbar, Footer, RootLayout
│   └── ui/               # Reusable UI components (Skeleton, etc.)
├── features/
│   ├── departments/      # Department domain logic
│   ├── faculties/        # Faculty domain logic
│   ├── publications/     # Publication rendering
│   └── search/           # Search logic and UI
├── hooks/                # Custom hooks (debounce, etc.)
├── pages/                # Route-level pages
├── routes/               # Router configuration
├── utils/                # Utility helpers (highlighting, etc.)
├── providers/            # Query client provider
└── main.tsx              # Application entry point
```

**Frontend Design Principles**

- Feature-driven structure
- TanStack Query for server state
- Typed API contracts
- Pages orchestrate, features execute
- Stateless UI components

---

### Backend Architecture (Modular & Scalable)

```text
backend/
src/
├── app/
│   ├── modules/
│   │   ├── department/
│   │   ├── faculty/
│   │   ├── publication/
│   │   └── search/
│   ├── middlewares/
│   │   └── validateRequest.ts
│   ├── shared/
│   │   ├── catchAsync.ts
│   │   └── sendResponse.ts
│   ├── app.ts
│   └── server.ts
├── config/
│   └── index.ts
└── scripts/
    └── importFromExcel.ts
```

**Backend Design Principles**

- Clear separation: routes → controllers → services → models
- Zod-based request validation
- Consistent API response format
- Type-safe MongoDB schemas
- Easy extensibility

---

## 🚀 Tech Stack

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS v4
- TanStack Query
- Axios
- React Router v6

### Backend

- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- Zod (request validation)

---

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (v18+)
- MongoDB instance
- npm or pnpm

---

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd aston-cs-research-portal
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=<your-mongo-connection-string>
```

Import dataset (once):

```bash
npm run import:excel
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Run frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔗 API Endpoints (Summary)

All endpoints are prefixed with `/api/v1`.

| Method | Endpoint                    | Description                    |
| ------ | --------------------------- | ------------------------------ |
| GET    | `/departments`              | List CS-related departments    |
| GET    | `/departments/:slug`        | Department details + faculty   |
| GET    | `/faculties/:id`            | Faculty profile & publications |
| GET    | `/publications`             | List all publications          |
| GET    | `/publications/:id`         | Single publication             |
| GET    | `/search?q=&limit=&offset=` | Search faculty & publications  |

---

## 📬 API Documentation (Postman)

[🔗 Aston CS Research Portal — API Collection & Docs](https://un-core-83592.postman.co/workspace/My-Workspace~978ad5b1-3bf3-4cc6-8eed-660089906b37/collection/27487917-3d9f8b66-5913-46ed-a736-2740b41b2152)

---

## 🌱 Future Enhancements

- Pagination, filtering, sorting
- Full-text or fuzzy search
- Caching & HTTP optimization
- Authentication & admin tools
- Automated testing & CI/CD
- OpenAPI / Swagger documentation

---

## 📄 License & Attribution

This is an **academic project** developed for educational purposes.

All institutional names and references belong to **Aston University**.
No official affiliation is implied.

---

## ✅ Final Remarks

The **Aston CS Research Portal** demonstrates:

- Clean full-stack architecture
- Real-world UX and academic design sensibility
- Professional frontend and backend practices
- Thoughtful handling of data, navigation, and user intent

It is designed not just to function — but to **feel trustworthy, polished, and complete**.
