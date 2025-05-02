"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Movie from "./components/Movie";

// API key and base URL
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch popular movies on initial load
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  // Fetch popular movies from fantasy/sci-fi genres
  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      // Genre IDs: 14 = Fantasy, 878 = Science Fiction
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=14,878&sort_by=popularity.desc&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press in search box
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="my-8 px-4">
      <div className="mb-8 flex justify-center">
        <div className="flex h-12 items-center w-full max-w-md px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md shadow-md">
          <Search size={18} className="text-white/70 mr-4" />

          <input
            type="text"
            placeholder="Search movies... "
            className="bg-transparent text-white placeholder-white/70 focus:outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          {/* <button
            onClick={handleSearch}
            className="ml-2 px-3 py-1 bg-[#7B61FF] cursor-pointer text-white rounded-full text-sm hover:bg-[#a889ff] transition-colors"
          >
            Search
          </button> */}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          {movies?.map((movie) => (
            <Movie
              key={movie.id}
              image={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${movie.poster_path}`
                  : "/images/StarWars.jpg"
              }
              title={movie.title}
              year={
                movie.release_date ? movie.release_date.substring(0, 4) : "N/A"
              }
              movie={movie}
            />
          ))}
        </div>
      )}
    </div>
  );
}
