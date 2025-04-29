import { codystar, spectral, outfit, cinzel, bungee } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "Nexus Legion",
  description: "One Legion to rule them all",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${codystar.variable} ${spectral.variable} ${outfit.variable} ${cinzel.variable} ${bungee.variable} min-h-screen text-foreground bg-gradient-to-b from-[#171715] from-[40%] to-[#3E065F] to-[100%]`}
      >
        {children}
      </body>
    </html>
  );
}
