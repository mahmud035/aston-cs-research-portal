# Changelog

All notable changes to this project will be documented in this file.

## [v1.0.0] — 2025-12-10

**(Initial public release of backend core)**

### ✅ Added

- Full backend API for the “Aston CS Research Portal”:

  - `GET /departments` — list all CS-related departments
  - `GET /departments/:slug` — fetch a department by slug, along with its faculty list
  - `GET /faculties/:id` — fetch faculty profile including research interests, affiliated departments, articles & conference papers
  - `GET /publications` — list all publications (articles + conference papers)
  - `GET /publications/:id` — fetch single publication detail by ID
  - `GET /search?q=…` — search across publications (title/keywords) and faculties (name/research interest), with partial match & case-insensitive matching

- Modular project architecture adhering to clean folder & code-separation conventions:

  - Each module with `*.interface.ts`, `*.model.ts`, `*.service.ts`, `*.controller.ts`, `*.route.ts`, `*.validation.ts`
  - Shared utilities:
    - `catchAsync` — safe async controller wrapper
    - `sendResponse` — unified API response format
    - `validateRequest` + Zod schemas — request validation

- Data import pipeline: Excel dataset → MongoDB, with normalization (CS-only departments, unique slugs, keyword extraction)

- Documentation:
  - `README.md` with project overview, tech stack, setup instructions, API summary
  - Postman API documentation (shared collection link)

### ✅ Other Improvements

- Consistent response schema across all endpoints (`statusCode`, `success`, `message?,` `data`)
- Lean and clean JSON output for easier frontend consumption
- Basic error handling for “not found” and invalid parameters via validation middleware

---

## ⚠ Known Limitations / To-Do (Future Improvement Areas)

- No pagination, filtering, or sorting support on listing endpoints (`/publications`, `/search`) — returns full result sets
- Search is based on regex / simple matching — might not scale well if dataset grows larger
- Read-only API: no create/update/delete endpoints, no authentication or authorization
- No caching, rate-limiting, or performance optimizations — may become relevant with higher usage or larger dataset
- No automated tests or CI/CD — currently manual testing only
- No structured logging, monitoring, or security hardening for production release

---

## 🚀 Planned Next Releases (v1.x → v2.0 roadmap)

- **v1.1.0** — Add pagination, filtering, and sorting to list and search endpoints
- **v1.2.0** — Introduce caching (HTTP / server-side), implement full-text or enhanced search (relevance ranking, fuzzy search)
- **v1.3.0** — Add read/write support (admin CRUD for departments, faculties, publications) + authentication/authorization (RBAC)
- **v1.4.0** — Add logging, monitoring, rate-limiting, and security hardening (headers, input sanitization)
- **v1.5.0** — Write automated unit & integration tests; add CI/CD pipeline; enforce tests on commit/push
- **v1.6.0** — Publish formal API specification (OpenAPI / Swagger); versioning support `/api/v2/` when needed

---

## 📄 Notes

- This changelog follows [“Keep a Changelog”](https://keepachangelog.com/en/1.0.0/) principles: meaningful version tags, clear “Added / Changed / Deprecated / Removed / Fixed / Security” categories — though at the moment we only use “Added / Known Limitations / Planned”.
- After each release, update this file to reflect new changes, fixes, or improvements.

[v1.0.0]: https://github.com/yourusername/aston-cs-research-portal/releases/tag/v1.0.0
