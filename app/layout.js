import { ClerkProvider } from "@clerk/nextjs";
import { codystar, spectral, outfit, cinzel, bungee, garamond } from "./fonts";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";

export const metadata = {
  title: "Nexus Legion",
  description: "One Legion to rule them all",
  icons: {
    icon: "/Nexus-Legion.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${codystar.variable} ${spectral.variable} ${outfit.variable} ${cinzel.variable} ${bungee.variable} ${garamond.variable} min-h-screen text-foreground bg-gradient-to-b from-[#171715] from-[40%] to-[#3E065F] to-[100%]`}
      >
        <ClerkProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
