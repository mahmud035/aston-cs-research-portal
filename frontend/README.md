# Aston CS Research Portal

A focused, department-specific research discovery platform for the **Aston University Computer Science Department**.
This application enables users to explore research groups, academic staff, and scholarly publications through a clean, intuitive, and academically styled interface.

---

## 📌 Overview

The **Aston CS Research Portal** is a frontend web application designed to replicate and simplify the core functionality of Aston University’s central research website — but **specifically tailored to the Computer Science department**.

The portal allows users to:

- Browse Computer Science–related departments and research groups
- View detailed academic staff profiles
- Explore associated journal articles and conference papers
- Perform intelligent keyword-based searches across staff and publications
- Navigate external scholarly resources via Google Scholar

The project emphasizes **clarity, usability, academic tone, and professional UI/UX**.

---

## 🎯 What Does This Project Do?

This project serves as a **research discovery interface** that helps students, researchers, and visitors:

- Understand the structure of the Computer Science department
- Discover academic staff and their research interests
- Explore published research output
- Search efficiently across publications and faculty
- Access external academic resources seamlessly

It does **not** host full publications. Instead, it provides **structured discovery and navigation**, aligning with real-world academic portals.

---

## ⚙️ How It Works (Comprehensive)

### 1. Data Source

All data (departments, faculty, publications) is retrieved from a **custom backend API** built from structured data extracted from Aston University’s research website.

### 2. Client–Server Interaction

- The frontend communicates with the backend via REST APIs.
- Data fetching and caching are handled using **TanStack Query**.
- Requests are debounced where appropriate (e.g., search).

### 3. Navigation Flow

- Users begin on the homepage, exploring departments.
- Selecting a department reveals affiliated faculty.
- Selecting a faculty member opens a detailed academic profile.
- Publications link externally to **Google Scholar** for full access.

### 4. Search Workflow

- Users enter keywords (e.g., research topics, names).
- The system searches both:

  - Publication titles & keywords
  - Faculty names & research interests

- Results are displayed in real time with:

  - Highlighted matched terms
  - Result counts
  - Clickable internal and external links

### 5. UX Enhancements

- Skeleton loaders provide smooth loading feedback.
- Clear empty and error states guide users.
- Subtle animations and academic styling reinforce trust and quality.

---

## ✨ Core Features

### 🏠 Homepage

- Overview of Computer Science research groups
- Department grid with intuitive navigation
- Embedded intelligent search section

### 🧱 Department Pages

- Department-specific faculty listings
- Clear academic hierarchy
- Direct navigation to faculty profiles

### 👤 Faculty Profiles

- Academic position and affiliation
- Research interests
- Associated journal articles and conference papers
- Cross-links to departments

### 🔍 Intelligent Search

- Keyword-based search across staff and publications
- Debounced input for performance
- Highlighted matched terms
- Result counts and clear feedback
- “Clear search” control for usability

### 📄 Publications

- Categorized by type (journal / conference)
- External links to Google Scholar
- Explicit microcopy explaining external navigation

### 🎨 UI / UX

- University-style minimal elegance
- Aston-inspired color palette
- Accessible typography and spacing
- Skeleton loaders across all data-fetching views
- Graceful error handling

---

## 🧩 Project Architecture

The project follows a **feature-based architecture**, emphasizing separation of concerns and scalability.

```text
src/
├── api/                  # Axios instance & shared API types
├── components/
│   ├── layout/            # Navbar, Footer, RootLayout
│   └── ui/                # Reusable UI components (Skeleton, etc.)
├── features/
│   ├── departments/       # Department domain logic
│   ├── faculties/         # Faculty domain logic
│   ├── publications/      # Publication rendering
│   └── search/            # Search logic and UI
├── hooks/                 # Custom hooks (debounce, etc.)
├── pages/                 # Route-level pages
├── routes/                # Router configuration
├── utils/                 # Utility helpers (highlighting, etc.)
├── providers/             # Query client provider
└── main.tsx               # Application entry point
```

### Key Architectural Decisions

- **Feature-driven structure** (not component soup)
- **TanStack Query** for all server state
- **Typed API contracts** matching backend responses
- **Pages orchestrate, features execute**
- **UI components remain stateless**

---

## 🚀 Tech Stack

### Frontend

- **React** (with TypeScript)
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **TanStack Query** (server state)
- **Axios** (HTTP client)
- **React Router v6**

### Backend (separate project)

- Node.js
- Express
- MongoDB (Mongoose)
- Zod (validation)
- REST API

---

## 🛠️ How to Set Up the Project

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm
- Backend API running locally

---

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd aston-cs-research-portal
cd frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## 🧪 Error Handling & Edge Cases

- Graceful handling of empty data sets
- Clear academic-tone error messages
- Dedicated error page for invalid routes
- External links explicitly labeled
- No silent failures

---

## 📎 Other Important Notes

- The application does **not** host full publications.
- All external academic content is accessed via Google Scholar.
- Designed with **academic credibility and accessibility** in mind.

---

## 📄 License & Attribution

This project is an **academic project** developed for educational purposes.

All institutional names and references belong to **Aston University**.
No official affiliation is implied.

---

## ✅ Final Remarks

The **Aston CS Research Portal** demonstrates:

- Clean frontend architecture
- Real-world UX thinking
- Academic design sensibility
- Professional development practices

It is designed not just to function — but to **feel trustworthy, polished, and complete**.
