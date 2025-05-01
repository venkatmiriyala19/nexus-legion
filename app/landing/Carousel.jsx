"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/images/Avengers.jpg",
      alt: "Marvel Heroes Slide 1",
    },
    {
      id: 2,
      image: "/images/Batman.jpg",
      alt: "Marvel Heroes Slide 2",
    },
    {
      id: 3,
      image: "/images/DC.jpg",
      alt: "Marvel Heroes Slide 3",
    },
    {
      id: 4,
      image: "/images/HarryPotter.jpg",
      alt: "Marvel Heroes Slide 4",
    },
    {
      id: 5,
      image: "/images/StarWars.jpg",
      alt: "Marvel Heroes Slide 5",
    },
  ];

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-4 space-y-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="font-cinzel text-4xl font-bold text-center text-white"
      >
        Myth. Power. Legacy.{" "}
        <span className="text-[#7B61FF]">Uncover the Icons.</span>
      </motion.h1>

      <div className="relative w-full overflow-hidden rounded-3xl">
        {/* Main carousel image */}
        <div className="relative aspect-[16/8] bg-gradient-to-r from-purple-900 to-black">
          <div
            className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full ">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={goToPrevSlide}
            className="p-1 rounded-full bg-black/20 text-white hover:bg-black/40 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextSlide}
            className="p-1 rounded-full bg-black/20 text-white hover:bg-black/40 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full focus:outline-none ${
                  index === activeSlide ? "bg-indigo-500" : "bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
