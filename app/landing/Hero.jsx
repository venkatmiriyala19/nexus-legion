"use client";
import BlurText from "@/components/ui/BlurText/BlurText";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const handleAuthRedirect = () => {
    router.push("/authentication");
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-cover bg-center max-w-5xl"
        style={{ backgroundImage: "url('/images/Hero_Landing.png')" }}
      >
        <div className="flex flex-col items-center justify-center text-white text-center px-4 py-20 max-w-6xl mx-auto">
          <BlurText
            text="One Legion. Many Worlds. Your Heroes."
            className="font-cinzel text-4xl my-5 font-black mb-6"
            delay={150}
            animateBy="words"
            direction="top"
          />
          <div className="font-spectral text-lg md:text-xl leading-relaxed max-w-4xl mt-1">
            Whether you stand with the mighty or root for the underdogs, every
            hero's journey starts here.{" "}
            <span
              className="px-2 py-1 cursor-pointer font-bold bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
              onClick={handleAuthRedirect}
            >
              Join the Nexus
            </span>{" "}
            and explore the heroes who inspire generations.
          </div>
        </div>
      </div>
    </div>
  );
}
