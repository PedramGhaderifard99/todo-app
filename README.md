# Todo App — React + TypeScript

A small task management app built while learning TypeScript on top of React.
The goal of this project was to practice typed props, typed state, and
component composition in a real (if small) app.

## Features

- Add, complete, and delete tasks
- Live counter of remaining tasks
- Fully typed with TypeScript (no `any` types used)

## Tech stack

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) as the build tool

## Project structure

```
src/
  types.ts       # shared Todo type definition
  App.tsx        # top-level state and logic
  AddTodo.tsx    # form for creating a new todo
  TodoList.tsx   # renders the list of todos
  TodoItem.tsx   # a single todo row
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

## What I practiced here

- Defining a shared `interface` (`Todo`) and reusing it across components
- Typing component props with dedicated `Props` interfaces
- Typing `useState` explicitly (`useState<Todo[]>`)
- Updating state immutably (`map`/`filter` instead of mutating arrays directly)
