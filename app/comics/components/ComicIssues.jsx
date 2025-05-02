"use client";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import ComicCard from "./ComicCard";

export default function ComicIssues() {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Fetch comics from ComicVine API
  const fetchComics = async (search = "", pageNumber = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const corsProxy = "/api/proxy";
      const apiKey = process.env.NEXT_PUBLIC_COMICVINE_API_KEY;

      if (!apiKey) {
        throw new Error("ComicVine API key is not configured");
      }

      let url = `${corsProxy}?url=${encodeURIComponent(
        `https://comicvine.gamespot.com/api/issues/?api_key=${apiKey}&format=json&limit=5&offset=${
          (pageNumber - 1) * 5
        }`
      )}`;

      if (search) {
        url += `&filter=${encodeURIComponent(`name:${search}`)}`;
      }

      console.log("Fetching from:", url.replace(apiKey, "API_KEY_HIDDEN"));

      const response = await fetch(url);
      const contentType = response.headers.get("content-type") || "";

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Force JSON parsing even if content type isn't correct
      const data = await response.json();

      // Check if the API returned an error message
      if (data.error && data.error !== "OK") {
        throw new Error(`API Error: ${data.error}`);
      }

      // Check if we have results
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Invalid response format: Missing results array");
      }

      const formattedComics = data.results.map((issue) => ({
        id: issue.id.toString(),
        title: issue.volume?.name || "Unknown Title",
        issueNumber: issue.issue_number || "N/A",
        coverImage: issue.image?.medium_url || "/placeholder-comic.jpg",
        issueDate: issue.date_added || "Unknown Date",
        volume: `Volume ${issue.volume?.start_year || "?"}`,
        summary: issue.description || "No description available",
        isFavorite: false,
        siteDetailUrl:
          issue.site_detail_url || "https://comicvine.gamespot.com/",
      }));

      setComics(formattedComics);
    } catch (err) {
      console.error("Error fetching comics:", err);
      setError(err.message || "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Load comics on initial render
  useEffect(() => {
    fetchComics();
  }, []);

  // Handler for searching
  const handleSearch = () => {
    setPage(1);
    fetchComics(searchTerm, 1);
  };

  // Handler for toggling favorites
  const handleToggleFavorite = (id) => {
    setComics(
      comics.map((comic) =>
        comic.id === id ? { ...comic, isFavorite: !comic.isFavorite } : comic
      )
    );
  };

  // Handler for viewing details
  const handleViewDetails = (id) => {
    console.log(`View details for comic ${id}`);
    // In a real app, you'd use Next.js router to navigate:
    // router.push(`/comics/${id}`);
  };

  // Handler for pagination
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchComics(searchTerm, nextPage);
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-center mb-8">
        <div className="flex h-12 items-center w-full max-w-md px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md shadow-md">
          <Search size={18} className="text-white/70 mr-4" />
          <input
            type="text"
            placeholder="Search for a comic"
            className="bg-transparent text-white placeholder-white/70 focus:outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="ml-2 px-3 py-1 bg-[#7B61FF] cursor-pointer text-white rounded-full text-sm hover:bg-[#a889ff] transition-colors"
          >
            Search
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className="font-cinzel text-4xl font-bold mb-3">Comic Issues</h1>
        <hr className="mb-6" />

        {isLoading ? (
          <div className="flex justify-center my-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4 px-4 bg-red-100/10 rounded-lg">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
            <button
              onClick={() => fetchComics(searchTerm, page)}
              className="mt-4 px-4 py-2 bg-[#7B61FF] text-white rounded-lg hover:bg-[#a889ff] transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : comics.length === 0 ? (
          <div className="text-center py-8">
            No comics found. Try a different search term.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-0">
              {comics.map((comic) => (
                <ComicCard
                  key={comic.id}
                  {...comic}
                  onToggleFavorite={() => handleToggleFavorite(comic.id)}
                  onViewDetails={() => handleViewDetails(comic.id)}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-[#7B61FF] text-white rounded-lg hover:bg-[#a889ff] transition-colors"
              >
                Load More
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
