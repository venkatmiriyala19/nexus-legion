import { Heart } from "lucide-react";
import React, { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
export default function Quote({ quote, author, movie, heart = false }) {
  const [favorited, setFavorited] = useState(false);

  const handleFavorite = async () => {
    const updated = !favorited;
    setFavorited(updated); // optimistic UI update

    const action = updated ? "add" : "remove";
    const item = { quote, movie, character: author };

    try {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "quotes", item, action }),
      });
    } catch (err) {
      console.error("Failed to update favorite", err);
      setFavorited(!updated); // rollback if failed
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-20 px-4">
      <div className="text-center relative">
        <FaQuoteLeft className="font-serif text-3xl text-white absolute -left-1 -top-6" />

        {/* Quote text */}
        <div className="flex justify-center">
          <div className="flex items-start">
            <h1 className="font-spectral text-4xl text-center uppercase bg-gradient-to-r from-white to-purple-900 bg-clip-text text-transparent mb-4 leading-normal">
              {quote}
            </h1>
            {heart && (
              <Heart
                size={30}
                className={`cursor-pointer absolute -right-10 ml-2 mt-2 ${
                  favorited ? "text-[#7B61FF] fill-[#7B61FF]" : "text-white"
                }`}
                onClick={handleFavorite}
              />
            )}
          </div>
        </div>

        {/* Author and Movie */}
        <div className="flex flex-col items-center">
          <p className="text-white/60 italic font-ebgaramond mx-auto text-xl mb-1">
            -{author}
          </p>
          <p className="text-xs uppercase text-white/50 font-spectral">
            {movie || ""}
          </p>
        </div>
      </div>
    </div>
  );
}
