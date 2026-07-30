# Todo App (TypeScript + React OOP)

A todo application built to practice **OOP fundamentals** in a frontend codebase: encapsulation in domain models, inheritance for specialized todos, and polymorphism via interchangeable storage repositories.

## Setup and run

```bash
npm install
npm run dev
```

Open the URL from the terminal (usually `http://localhost:5173`).

### Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run Oxlint               |

## Functional features

- Create todos (standard, work, or learning)
- List todos with status and priority
- Update status: `todo`, `in_progress`, `done`, `blocked`
- Set priority: `low`, `medium`, `high`
- Filter by status and priority
- Persist and restore via **localStorage** (default), or use **in-memory** seed data

Use the **Storage** dropdown in the UI to switch between `LocalStorageRepository` and `InMemoryRepository` (polymorphism demo).

## Architecture

The codebase follows a layered structure:

```text
src/
  domain/           # Entities, validation, factories (OOP core)
  application/      # Use cases (TodoService)
  infrastructure/   # TodoRepository implementations, seed data
  ui/               # React components (presentation only)
```

### Domain (encapsulation + inheritance)

- **`Todo`** — base entity with private fields (`#title`, `#status`, …), getters, and controlled mutators (`updateStatus`, `setPriority`) plus validation.
- **`WorkTodo`** extends `Todo` — adds `assignee` and `project`.
- **`LearningTodo`** extends `Todo` — adds `topic` and optional `resourceUrl`.
- **`TodoFactory`** — rebuilds the correct subclass from persisted snapshots.

Validation lives in `domain/validation.ts` (non-empty title, allowed status/priority, URL rules for learning resources). Blocked items cannot jump directly to `done` (must go through `in_progress` first).

### Application

- **`TodoService`** — orchestrates create, list/filter, update status, set priority, remove, and persist. React components call the service; they do not mutate domain objects directly.

### Infrastructure (polymorphism)

- **`TodoRepository`** — shared contract (`loadAll`, `saveAll`).
- **`LocalStorageRepository`** — persists JSON in `localStorage` under `todo-app-data`.
- **`InMemoryRepository`** — holds data in memory (initialized from seed JSON for demos/tests).

Both implement the same interface, so `TodoService` depends on the abstraction, not a concrete store.

### UI

React function components under `ui/` hold local UI state (filters, modal, storage mode). Todo data flows as **`TodoSnapshot`** plain objects for rendering after the service returns from domain operations.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS

No external state-management libraries (assignment constraint).

## Data seed

Initial sample data is in `src/todos.json`. On first run with localStorage, if no saved data exists, the app seeds from this file via `ensureSeeded`.

To reset local persistence during development, clear the `todo-app-data` key in browser DevTools → Application → Local Storage.
