import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
export default function Icons() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);
    setCurrentPage(1); // Reset to first page on new search

    try {
      const res = await fetch(
        `/api/searchHeroes?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();

      if (data?.results) {
        setResults(data.results);
        setTotalPages(Math.ceil(data.results.length / itemsPerPage));
      } else {
        setResults([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search heroes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const loadDefaultHeroes = async () => {
      // List of popular superheroes for randomization
      const superheroNames = [
        "Superman",
        "Spider-Man",
        "Wonder Woman",
        "Iron Man",
        "Captain America",
        "Thor",
        "Hulk",
        "Black Panther",
        "Flash",
        "Green Lantern",
      ];

      // Select a random superhero name
      const randomHero =
        superheroNames[Math.floor(Math.random() * superheroNames.length)];

      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/searchHeroes?query=${encodeURIComponent(randomHero)}`
        );
        const data = await res.json();

        if (data?.results) {
          setResults(data.results);
          setTotalPages(Math.ceil(data.results.length / itemsPerPage));
        }
      } catch (err) {
        console.error("Error loading default heroes:", err);
        setError("Failed to load default heroes.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDefaultHeroes();
  }, []);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="my-18">
      <div className="flex items-center justify-center mb-8">
        <div className="flex h-[50px] items-center w-full max-w-md px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md shadow-md">
          <Search size={18} className="text-white/70 mr-4" />
          <input
            type="text"
            placeholder="Search for your favourite SuperIcon"
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
        <h1 className="font-cinzel text-3xl font-bold mb-3">Icons</h1>
        <hr />

        {isLoading ? (
          <div className="flex justify-center my-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-red-400 p-4 rounded-md bg-red-900/20 border border-red-800">
            {error}
          </div>
        ) : (
          <>
            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-8 mx-[5rem] justify-items-center">
              {currentItems.length > 0 ? (
                currentItems.map((hero) => (
                  <CharacterCard
                    key={hero.id}
                    name={hero.name}
                    fullName={hero.biography["full-name"] || "N/A"}
                    publisher={hero.biography.publisher || "Unknown"}
                    alignment={hero.biography.alignment || "Neutral"}
                    stats={hero.powerstats}
                    image={hero.image.url || "/images/icon_placeholder.jpg"}
                    hero={hero}
                  />
                ))
              ) : (
                <p className="text-white col-span-2 text-center">
                  No characters found. Try a different search.
                </p>
              )}
            </div>

            {/* Pagination */}
            {results.length > 0 && (
              <div className="flex justify-center items-center mt-8 mb-12 space-x-4">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 cursor-pointer bg-white/5 hover:bg-white/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} className="mr-1" />
                  Prev
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-md ${
                          currentPage === page
                            ? "bg-[#7B61FF] text-white"
                            : "bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex cursor-pointer items-center px-3 py-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
