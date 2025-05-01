"use client";
import { useRouter } from "next/navigation";
import Dock from "@/components/ui/Dock/Dock";
import { Zap, Book, Film, Quote, UserRound } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const items = [
    {
      icon: <Zap size={18} />,
      label: "Home",
      onClick: () => router.push("/home"),
    },
    {
      icon: <Book size={18} />,
      label: "Archive",
      onClick: () => router.push("/comics"),
    },
    {
      icon: <Film size={18} />,
      label: "Movies",
      onClick: () => router.push("/movies"),
    },
    {
      icon: <Quote size={18} />,
      label: "Quotes",
      onClick: () => router.push("/quotes"),
    },
    {
      icon: <UserRound size={18} />,
      label: "Profile",
      onClick: () => router.push("/profile"),
    },
  ];

  return (
    <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70} />
  );
}
