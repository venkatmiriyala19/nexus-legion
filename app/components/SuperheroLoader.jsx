"use client";
import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

export default function SuperheroLoader() {
  const [progress, setProgress] = useState(0);
  const loadingTexts = [
    "Assembling heroes...",
    "Powering up...",
    "Scanning multiverse...",
    "Loading epic content...",
  ];
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Cycle through loading texts
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[var(--color-deepDark)] to-[var(--color-purpleNight)]">
      <div className="relative w-40 h-40 mb-8">
        {/* Pulsing background glow */}
        <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>

        {/* Rotating outer ring */}
        <div className="absolute inset-0 border-4 border-t-purple-500 border-r-indigo-500 border-b-blue-500 border-l-violet-500 rounded-full animate-spin"></div>

        {/* Inner rotating shield with reverse direction */}
        <div className="absolute inset-4 border-4 border-t-indigo-400 border-r-purple-400 border-b-violet-400 border-l-blue-400 rounded-full animate-spin-slow-reverse"></div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-800 p-4 rounded-full shadow-lg shadow-purple-500/50 animate-pulse">
            <Zap size={32} className="text-white animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="text-2xl font-codystar tracking-widest text-purple-200 mb-6 h-8 min-w-48 text-center">
        {loadingTexts[textIndex]}
      </div>

      {/* Progress bar */}
      <div className="w-48 h-2 bg-gray-700/50 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Progress percentage */}
      <div className="text-sm text-purple-300 font-medium">
        {progress}% LOADED
      </div>
    </div>
  );
}
