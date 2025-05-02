import React from "react";
import { Heart, Info, ChevronRight, Calendar } from "lucide-react";

const ComicCard = ({
  id,
  title,
  issueNumber,
  coverImage,
  issueDate,
  volume,
  summary,
  isFavorite = false,
  onToggleFavorite,
  onViewDetails,
}) => {
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

  // Extract year from date for display
  const getYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div className="flex rounded-xl overflow-hidden bg-transparent border-1 border-white text-white w-full max-w-5xl relative mx-auto my-8">
      {/* Left side - Cover Image */}
      <div className="w-1/3 min-w-64 relative p-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-30"></div>
        <img
          src={"/images/StarWars.jpg"}
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
          <h2 className="text-xl  font-bold bg-gradient-to-r  from-white to-[#3E065F] bg-clip-text text-transparent">
            The {title} #{issueNumber}
          </h2>
          <span className="bg-white text-black text-[8px] px-2 py-1 rounded-xl">
            VOLUME
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mb-6">
          <span className="  font-bold bg-gradient-to-r  from-white to-[#3E065F] bg-clip-text text-transparent">
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
            <p className="text-gray-300 line-clamp-4">{summary}</p>
          </div>

          {/* Buttons */}
          <div className="">
            <button
              onClick={onViewDetails}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute cursor-pointer top-6 right-6"
        >
          <Heart
            size={24}
            className={isFavorite ? "fill-white text-white" : "text-gray-400"}
          />
        </button>
      </div>
    </div>
  );
};

export default ComicCard;
