// Movie.jsx
"use client";

import { useState } from "react";
import { Heart, Star, X, MessageCircle, Globe } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

export default function Movie({ image, title, year, movie }) {
  const { favorites, queueFavoriteAction } = useFavorites();
  const [showModal, setShowModal] = useState(false);
  const isFavorite = favorites.movies.some((fav) => fav.id === movie.id);

  const handleFavoriteClick = () => {
    queueFavoriteAction(movie, isFavorite ? "remove" : "add");
  };

  return (
    <>
      <div className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg flex items-center p-4 justify-between mb-4 hover:border-[#7B61FF]/50 transition-all">
        <div className="gap-4 flex items-center">
          <img
            src={image || "/images/StarWars.jpg"}
            alt={title}
            className="w-32 h-16 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "/images/StarWars.jpg";
            }}
          />
          <h2 className="text-xl font-medium text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-6 mr-4">
          <Heart
            size={18}
            className={`cursor-pointer ${
              isFavorite ? "text-[#7B61FF] fill-[#7B61FF]" : "text-white"
            }`}
            onClick={handleFavoriteClick}
          />
          <p className="text-md text-white/50">{year}</p>
          <button
            className="bg-[#3E065F] cursor-pointer text-white uppercase text-sm font-medium px-4 py-[6px] rounded-lg hover:bg-[#fff] hover:text-black transition-colors"
            onClick={() => setShowModal(true)}
          >
            More
          </button>
        </div>
      </div>

      {/* Modal (unchanged) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 custom-scrollbar">
          <div className="bg-black border border-[#7B61FF]/30 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="relative">
              <div className="w-full h-96 relative">
                <img
                  src={
                    movie?.backdrop_path
                      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                      : `https://image.tmdb.org/t/p/original/ELsTifJ2lu4vsMhoHeZ5EnncHw.jpg`
                  }
                  alt={movie?.title || "Mars Attacks!"}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                <button
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2"
                  onClick={() => setShowModal(false)}
                >
                  <X size={20} className="text-white cursor-pointer" />
                </button>
              </div>
              <div className="absolute bottom-4 left-0 p-6">
                <h1 className="text-3xl font-bold text-white mb-1">
                  {movie?.title || "Mars Attacks!"}
                </h1>
                <p className="text-white/80 text-sm">
                  {movie?.release_date?.substring(0, 4) || "1996"}
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-6 mb-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-[#7B61FF]" />
                  <span>{movie?.vote_average?.toFixed(1) || "6.4"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-[#7B61FF]" />
                  <span>{movie?.vote_count || "5553"} votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-[#7B61FF]" />
                  <span>{movie?.original_language?.toUpperCase() || "EN"}</span>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-[#7B61FF] font-medium mb-2">Overview</h3>
                <p className="text-white/80 leading-relaxed">
                  {movie?.overview ||
                    "A fleet of Martian spacecraft surrounds the world's major cities and all of humanity waits to see if the extraterrestrial visitors have, as they claim, \"come in peace.\" U.S. President James Dale receives assurance from science professor Donald Kessler that the Martians' mission is a friendly one. But when a peaceful exchange ends in the total annihilation of the U.S. Congress, military men call for a full-scale nuclear retaliation."}
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-[#7B61FF] font-medium mb-2">Popularity</h3>
                <div className="bg-white/10 h-2 rounded-full w-full">
                  <div
                    className="bg-[#7B61FF] h-2 rounded-full"
                    style={{
                      width: `${Math.min(movie?.popularity || 12.5406, 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-white/60">Score</span>
                  <span className="text-xs text-white/60">
                    {movie?.popularity?.toFixed(1) || "12.5"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
