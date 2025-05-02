import { Search } from "lucide-react";
import Movie from "./components/Movie";

export default function Movies() {
  return (
    <div className="my-8">
      <div className="mb-8 flex justify-center">
        <div className="flex h-12 items-center w-full max-w-md px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md shadow-md">
          <Search size={18} className="text-white/70 mr-4" />

          <input
            type="text"
            placeholder="Search publishers..."
            className="bg-transparent text-white placeholder-white/70 focus:outline-none w-full"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            // onKeyPress={handleKeyPress}
          />

          <button
            // onClick={handleSearch}
            className="ml-2 px-3 py-1 bg-[#7B61FF] cursor-pointer text-white rounded-full text-sm hover:bg-[#a889ff] transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <Movie
        image={"/images/StarWars.jpg"}
        title="Star Wars:A New Hope"
        year="1977"
      />
    </div>
  );
}
