"use client";
import { useRouter, usePathname } from "next/navigation";
import Dock from "@/components/ui/Dock/Dock";
import { Zap, Book, Film, Quote, UserRound } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Define items with path property for active state checking
  const items = [
    {
      icon: <Zap size={18} />,
      label: "Home",
      path: "/home",
      onClick: () => router.push("/home"),
    },
    {
      icon: <Book size={18} />,
      label: "Comics",
      path: "/comics",
      onClick: () => router.push("/comics"),
    },
    {
      icon: <Film size={18} />,
      label: "Movies",
      path: "/movies",
      onClick: () => router.push("/movies"),
    },
    {
      icon: <Quote size={18} />,
      label: "Quotes",
      path: "/quotes",
      onClick: () => router.push("/quotes"),
    },
    {
      icon: <UserRound size={18} />,
      label: "Profile",
      path: "/profile",
      onClick: () => router.push("/profile"),
    },
  ];

  return (
    <Dock
      items={items}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
      currentPath={pathname}
    />
  );
}
