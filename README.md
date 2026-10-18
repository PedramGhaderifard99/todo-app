# Todo App — React + TypeScript

A small task management app built while learning TypeScript on top of React.
The goal of this project was to practice typed props, typed state, and
component composition in a real (if small) app.

## Features

- Add, complete, and delete tasks
- Live counter of remaining tasks
- Filter by all / active / completed
- Three languages: Persian (RTL), English, and German (LTR)
- Remembers the chosen language between visits
- Fully typed with TypeScript (no `any` types used)

## Languages

The UI is translated through a small hand-written i18n layer — no i18n library,
so the whole mechanism stays readable:

- `src/i18n/translations.ts` — one dictionary per language, all sharing the
  `Dictionary` interface, plus the `languages` list and each language's text
  direction
- `src/i18n/LanguageContext.ts` — the React context and the `useI18n()` hook
- `src/i18n/LanguageProvider.tsx` — holds the current language, sets
  `<html lang>` / `<html dir>` and the tab title, and persists the choice in
  `localStorage`

On first visit the app uses the saved language, then the browser language, and
finally falls back to Persian. Adding a fourth language means extending
`languages` and `translations`; TypeScript reports any missing key or field.

## Tech stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) as the build tool

## Project structure

```
src/
  types.ts                  # shared Todo and FilterType definitions
  App.tsx                   # top-level state and logic
  AddTodo.tsx               # form for creating a new todo
  TodoList.tsx              # renders the list of todos
  TodoItem.tsx              # a single todo row
  LanguageSwitcher.tsx      # fa / en / de buttons
  i18n/
    translations.ts         # the dictionaries
    LanguageContext.ts      # context + useI18n hook
    LanguageProvider.tsx    # language state and <html> attributes
```

## Running locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints in the terminal.

## Build

```bash
npm run build
```

Lint with `npm run lint`.

## What I practiced here

- Defining a shared `interface` (`Todo`) and reusing it across components
- Typing component props with dedicated `Props` interfaces
- Typing `useState` explicitly (`useState<Todo[]>`)
- Updating state immutably (`map`/`filter` instead of mutating arrays directly)
- Sharing state across components with a context and a typed custom hook
- Keeping translations in one typed place instead of scattering strings in JSX
