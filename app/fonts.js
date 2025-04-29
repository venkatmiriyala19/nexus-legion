import {
  Codystar,
  Spectral_SC,
  Outfit,
  Cinzel_Decorative,
  Bungee_Hairline,
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
