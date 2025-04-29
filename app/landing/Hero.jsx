"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-cover bg-center max-w-5xl"
        style={{ backgroundImage: "url('/images/Hero_Landing.png')" }}
      >
        <div className="flex flex-col items-center justify-center text-white text-center px-4 py-20 max-w-6xl mx-auto">
          <h1 className="font-cinzel text-4xl my-5 font-black mb-6">
            One Legion. Many Worlds. Your Heroes.
          </h1>
          <div className="font-spectral text-lg md:text-xl leading-relaxed max-w-4xl mt-1">
            Whether you stand with the mighty or root for the underdogs, every
            hero's journey starts here.{" "}
            <motion.span
              className="px-2 py-1 cursor-pointer font-bold relative overflow-hidden"
              initial={{
                color: "white",
              }}
              animate={{
                color: "black",
              }}
              transition={{
                delay: 0.8,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white rounded-md"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              />
              <span className="relative z-10">Join the Nexus</span>
            </motion.span>{" "}
            and explore the heroes who inspire generations.
          </div>
        </div>
      </div>
    </div>
  );
}
