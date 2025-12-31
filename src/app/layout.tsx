// import "@/styles/globals.css";
// import Navbar from "@/components/layout/Navbar";

import AnimationHello from "@/component/animation/animation";
import Navbar from "@/component/layout/navbar";
import css from "@/global/global.module.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={css.body}>
        <div className={css.main}>
          {children}
        </div>
      </body>
    </html>
  );
}
