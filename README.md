# Task Management Web App

A task management web app built with **Next.js** and **Material UI (MUI)** that allows users to create, update, and organize tasks efficiently.

---

## Project Initialization / Theme Setup

This project uses **Next.js App Router + Material UI + Emotion**.
To ensure proper **server-side rendering (SSR)** and **hydration**, the following `ThemeRegistry` setup is used:

```tsx
"use client";
import * as React from "react";
import css from "@/global/global.module.css";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { CssBaseline } from "@mui/material";

const cache = createCache({
  key: "mui",
  prepend: true,
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={cache}>
      <CssBaseline />
      <html lang="en">
        <body className={css.body}>
          <div className={css.main}>
            {children}
          </div>
        </body>
      </html>
    </CacheProvider>
  );
}
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/monkeyZleg/assessment.git
cd project-name
```

2. Install dependencies:

```bash
npm install
```
or

```bash
npm i
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## Features / Project Overview

* Create, update, and delete tasks
* Responsive UI with **Material UI Grid** and **Dialogs**
* SSR-safe components using **ThemeRegistry**
* Interactive task list management

**Technologies used:**
Next.js, React, Material UI, Yup, TypeScript, Toast

---

## Known Issues and Challenges

* **Hydration mismatch in Next.js + MUI**
  Solved by creating `ThemeRegistry` with `CacheProvider` for Emotion.
* **Dynamic task IDs and state updates**
  Solved using React `useState` with `map` and `filter` for immutable updates.
* **Editing and deleting items from the task array**
  Initially challenging because updating the state immutably while keeping the correct task IDs caused bugs.
---

## Learn More

* [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) – interactive tutorial.
* [Material UI Docs](https://mui.com/material-ui/getting-started/overview/) – UI components and styling.
