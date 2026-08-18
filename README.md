# Todo App (TypeScript + React)

A todo application built to practice **OOP fundamentals** in a frontend context.

## Setup and run

```bash
npm install
npm run dev
```

Open the URL from the terminal (usually `http://localhost:5173`).

### Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start dev server             |
| `npm run build`   | Typecheck + production build |
| `npm run preview` | Preview production build     |
| `npm run lint`    | Run Oxlint                   |

## Functional features

- Create todos (`standard`, `work`, or `learning`) with title, description, and priority
- List todos with kind, status, priority, and kind-specific fields (assignee/project or topic)
- Update status: `todo`, `in_progress`, `done`, `blocked`
- Set priority: `low`, `medium`, `high`
- Filter by status and priority
- Persist in `localStorage`; first visit seeds from `public/todos.json`

## OOP Requirements

This project maps OOP ideas onto TypeScript modules and types (no class hierarchy).

- **Encapsulation** — hide internals behind a small public API. The service owns `nextId` and default `status` / `completed`. Repositories own the `localStorage` key, JSON parsing, and `fetch('/todos.json')`. UI calls `getTodos` / `createTodo` / `filterTodosBy` and does not talk to storage directly.
- **Inheritance** — specialized todos reuse a shared base. `StandardTodo`, `WorkTodo`, and `LearningTodo` are `BaseTodo` plus a `kind` and extra fields (`assignee` / `project`, `topic`).
- **Polymorphism** — callers treat every item as `Todo`. Kind-specific fields are only read after narrowing on `kind`. Both repositories expose `fetchTodos()`; `getTodos` reads `localStorage` first and falls back to the JSON file.

## Architectural choice

Folders follow **business domains**, not file types. Code that changes together stays in one feature, so a domain can grow or be tested without pulling in the rest of the app.

A feature is a business entity. Today that is `todo`. Everything else is reusable or shell:

| Folder   | Role                                                      |
| -------- | --------------------------------------------------------- |
| `todo`   | Domain: types, UI, service, storage                       |
| `shared` | Reusable UI with no todo knowledge (`Button`, `Modal`)    |
| `core`   | App shell on every page (`Header`, `Footer`)              |

## Project Structure

```
src/
  App.tsx
  features/
    core/           Header, Footer
    shared/         Button, Modal
    todo/
      components/   list, item, filters, create form
      types/        Todo, status, priority, create input
      services/     create, filter, load
      repositories/ localStorage, JSON file
      const/        status and priority lists
public/
  todos.json        seed data for first load
```

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
