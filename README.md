# Todo App (TypeScript + React)
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
- Persist via localStorage

## Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
