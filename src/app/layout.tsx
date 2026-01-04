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
