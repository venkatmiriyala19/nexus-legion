"use client";

import React, { useState } from "react";
import { Heart, ChevronRight } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

const ComicCard = ({
  id,
  title,
  issueNumber,
  coverImage,
  issueDate,
  volume,
  summary,
  siteDetailUrl,
}) => {
  const { favorites, queueFavoriteAction } = useFavorites();
  const isFavorite = favorites.comics.some((comic) => comic.id === id);
  const [isAnimating, setIsAnimating] = useState(false);

  // Format the date properly
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");
  };

  // Comic object to store in favorites
  const comicData = {
    id,
    title,
    issueNumber,
    coverImage,
    issueDate,
    volume,
    summary,
    siteDetailUrl,
  };

  // Handle favorite button click
  const handleFavoriteClick = () => {
    queueFavoriteAction(comicData, "comics", isFavorite ? "remove" : "add");
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="flex rounded-xl overflow-hidden bg-transparent border-1 border-white text-white w-full max-w-5xl relative mx-auto my-4">
      {/* Left side - Cover Image */}
      <div className="w-1/3 max-w-64 relative p-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-30"></div>
        <img
          src={coverImage || "/images/StarWars.jpg"}
          alt={`${title} #${issueNumber} Cover`}
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>

      {/* Right side - Comic Info */}
      <div className="w-2/3 p-6 flex flex-col">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 font-spectral underline">
          {title}
        </h1>

        {/* Subtitle with issue */}
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-[#3E065F] bg-clip-text text-transparent">
            {title} #{issueNumber}
          </h2>
          <span className="bg-white text-black text-[8px] px-2 py-1 rounded-xl">
            VOLUME
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-bold bg-gradient-to-r from-white to-[#3E065F] bg-clip-text text-transparent">
            {formatDate(issueDate)}
          </span>
          <span className="bg-white text-[8px] px-2 py-1 rounded-xl text-black ml-2">
            ISSUE DATE
          </span>
        </div>

        {/* Summary Section */}
        <div className="flex items-center gap-2">
          <div className="mb-6">
            <div className="bg-white text-black text-md px-2 py-1 rounded-2xl inline-block mb-2">
              SUMMARY
            </div>
            <div
              className="text-gray-300 line-clamp-4 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
          </div>
        </div>

        {/* Top-right Buttons */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <button
            onClick={handleFavoriteClick}
            className="cursor-pointer"
            aria-label="Toggle Favorite"
          >
            <Heart
              size={24}
              className={`cursor-pointer  transition-all duration-300 ease-in-out
                  ${isFavorite ? "text-[#7B61FF] fill-[#7B61FF]" : "text-white"}
                  ${isAnimating ? "scale-125" : "scale-100"}
                  hover:scale-110
                `}
            />
          </button>
          <button
            onClick={() => window.open(siteDetailUrl, "_blank")}
            className="cursor-pointer text-gray-300 hover:text-white"
            aria-label="View Details"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComicCard;
