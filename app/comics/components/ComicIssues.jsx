"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import ComicCard from "./ComicCard";

export default function ComicIssues() {
  const [comics, setComics] = useState([
    {
      id: "16",
      title: "Silver Surfer",
      issueNumber: "16",
      coverImage: "/path-to-cover-image.jpg", // You'll replace with actual API image path
      issueDate: "1970-01-05",
      volume: "Volume 1",
      summary:
        "Mephisto has yet another plan to obtain the Silver Surfer's soul. He disguises himself and walks among the humans. He now comes up with another plot. He transports the Surfer to him. This time he claims to be a friend to the Surfer. He allows the Surfer to pass through the barrier and return home to Zenn-La. But when the Surfer arrives, Shalla Bal is missing, taken by Mephisto himself....",
      isFavorite: false,
    },
    // More comics would be added here from the API
  ]);

  // Handler for toggling favorites
  const handleToggleFavorite = (id) => {
    setComics(
      comics.map((comic) =>
        comic.id === id ? { ...comic, isFavorite: !comic.isFavorite } : comic
      )
    );
  };

  // Handler for viewing details (would navigate to detail page)
  const handleViewDetails = (id) => {
    console.log(`View details for comic ${id}`);
    // In a real app, you'd use Next.js router to navigate:
    // router.push(`/comics/${id}`);
  };
  return (
    <div className="my-18">
      <div className="flex items-center justify-center mb-8">
        <div className="flex h-[50px] items-center w-full max-w-md px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md shadow-md">
          <Search size={18} className="text-white/70 mr-4" />
          <input
            type="text"
            placeholder="Search for a comic"
            className="bg-transparent text-white placeholder-white/70 focus:outline-none w-full"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            // onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            // onClick={handleSearch}
            className="ml-2 px-3 py-1 bg-[#7B61FF] cursor-pointer text-white rounded-full text-sm hover:bg-[#a889ff] transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className="font-cinzel text-4xl font-bold mb-3">Comic Issues</h1>
        <hr />
        {comics.map((comic) => (
          <ComicCard
            key={comic.id}
            {...comic}
            onToggleFavorite={() => handleToggleFavorite(comic.id)}
            onViewDetails={() => handleViewDetails(comic.id)}
          />
        ))}
      </div>
    </div>
  );
}
