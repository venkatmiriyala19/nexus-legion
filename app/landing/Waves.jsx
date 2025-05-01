"use client";

import { motion } from "framer-motion";

export default function Waves() {
  return (
    <div className="flex items-center justify-center mt-8 mb-8">
      <div
        className="bg-cover bg-center max-w-6xl p-18 mt-[-3rem]"
        style={{ backgroundImage: "url('/images/Waves1.png')" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-spectral text-[28px] text-center font-medium bg-gradient-to-b from-[#3E065F] to-white bg-clip-text text-transparent"
        >
          Enter Nexus Legion, where legends clash and destinies change. Explore
          powerful heroes, feared villains, and untold multiverse stories.
          Unravel their origins, powers, and stats <br /> —all in one place.
        </motion.h1>
      </div>
    </div>
  );
}
