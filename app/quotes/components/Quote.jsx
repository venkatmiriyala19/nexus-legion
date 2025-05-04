import { Heart } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { useFavorites } from "@/context/FavoritesContext";

export default function Quote({ quote, author, movie, heart = false }) {
  const { favorites, queueFavoriteAction } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if the quote is favorited
  const isFavorited = favorites.quotes.some(
    (q) => q.quote === quote && q.movie === movie && q.character === author
  );

  const handleFavorite = () => {
    const action = isFavorited ? "remove" : "add";
    const item = { quote, movie, character: author };
    queueFavoriteAction(item, "quotes", action);

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
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
                className={`cursor-pointer absolute -right-10 ml-2 mt-2 transition-all duration-300 ease-in-out
                  ${
                    isFavorited ? "text-[#7B61FF] fill-[#7B61FF]" : "text-white"
                  }
                  ${isAnimating ? "scale-125" : "scale-100"}
                  hover:scale-110
                `}
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
