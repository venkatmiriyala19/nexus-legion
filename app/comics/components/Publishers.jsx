"use client";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import PublisherCard from "./PublisherCard";

export default function Publishers() {
  const [publishers, setPublishers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Fetch publishers from ComicVine API
  const fetchPublishers = async (search = "", pageNumber = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const corsProxy = "/api/proxy";
      const apiKey = process.env.NEXT_PUBLIC_COMICVINE_API_KEY;

      if (!apiKey) {
        throw new Error("ComicVine API key is not configured");
      }

      let url = `${corsProxy}?url=${encodeURIComponent(
        `https://comicvine.gamespot.com/api/publishers/?api_key=${apiKey}&format=json&limit=3&offset=${
          (pageNumber - 1) * 9
        }`
      )}`;

      if (search) {
        url += `&filter=${encodeURIComponent(`name:${search}`)}`;
      }

      console.log("Fetching from:", url.replace(apiKey, "API_KEY_HIDDEN"));

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Force JSON parsing
      const data = await response.json();

      // Check if the API returned an error message
      if (data.error && data.error !== "OK") {
        throw new Error(`API Error: ${data.error}`);
      }

      // Check if we have results
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Invalid response format: Missing results array");
      }

      const formattedPublishers = data.results.map((publisher) => ({
        id: publisher.id.toString(),
        name: publisher.name || "Unknown Publisher",
        logoImage: publisher.image?.medium_url || "/placeholder-publisher.jpg",
        description: publisher.description || "No description available",
        yearFounded: publisher.start_year || "Unknown",
        countryOfOrigin: publisher.country || "Unknown",
        websiteUrl:
          publisher.site_detail_url || "https://comicvine.gamespot.com/",
      }));

      setPublishers(formattedPublishers);
    } catch (err) {
      console.error("Error fetching publishers:", err);
      setError(err.message || "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Load publishers on initial render
  useEffect(() => {
    fetchPublishers();
  }, []);

  // Handler for searching
  const handleSearch = () => {
    setPage(1);
    fetchPublishers(searchTerm, 1);
  };

  // Handler for pagination
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPublishers(searchTerm, nextPage);
  };

  // Handler for key press (Enter key to search)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="font-cinzel text-4xl font-bold mb-3">Publishers</h1>
      <hr className="mb-6" />

      {/* Search bar */}
      <div className="mb-8 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search publishers..."
            className="w-full px-4 py-2 border rounded-lg pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Publishers grid */}
      {!isLoading && publishers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishers.map((publisher) => (
            <PublisherCard key={publisher.id} publisher={publisher} />
          ))}
        </div>
      )}

      {/* No results */}
      {!isLoading && publishers.length === 0 && !error && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No publishers found</p>
        </div>
      )}

      {/* Load more button */}
      {!isLoading && publishers.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
