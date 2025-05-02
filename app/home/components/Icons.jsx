import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CharacterCard from "./CharacterCard";

export default function Icons() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/searchHeroes?query=${encodeURIComponent(searchTerm)}`
      );
      const data = await res.json();

      if (data?.results) {
        setResults(data.results);
      } else {
        setResults([]);
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
      setIsLoading(true);
      try {
        const res = await fetch("/api/searchHeroes?query=batman");
        const data = await res.json();

        if (data?.results) {
          setResults(data.results);
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

  return (
    <div className="my-18">
      <div className="flex items-center justify-center mb-8">
        <div className="flex h-[50px] items-center w-full max-w-md px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md shadow-md">
          <Search size={18} className="text-white/70 mr-4" />
          <input
            type="text"
            placeholder="Search for your favourite superhero"
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
        <h1 className="font-cinzel text-4xl font-bold mb-3">Icons</h1>
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
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-8 mx-[5rem] justify-items-center">
            {results.length > 0 ? (
              results.map((hero) => (
                <CharacterCard
                  key={hero.id}
                  name={hero.name}
                  fullName={hero.biography["full-name"] || "N/A"}
                  publisher={hero.biography.publisher || "Unknown"}
                  alignment={hero.biography.alignment || "Neutral"}
                  stats={hero.powerstats}
                  image={hero.image.url || "/images/icon_placeholder.jpg"}
                />
              ))
            ) : (
              <p className="text-white">
                No characters found. Try a different search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
