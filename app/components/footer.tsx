import type { Metadata } from "next";
import "./global.css";
import Nav from "./nav";


export const metadata: Metadata = {
  title: "Recipe Box",
};

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <footer> Nicolette's Awesome Recipes </footer>
      </body>
    </html>
  );
}