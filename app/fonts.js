import {
  Codystar,
  Spectral_SC,
  Outfit,
  Cinzel_Decorative,
  Bungee_Hairline,
  EB_Garamond,
} from "next/font/google";

export const codystar = Codystar({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-codystar",
});
export const spectral = Spectral_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spectral",
});
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-outfit",
});
export const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
});
export const bungee = Bungee_Hairline({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bungee",
});
export const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify multiple weights if needed
  variable: "--font-ebgaramond",
});
