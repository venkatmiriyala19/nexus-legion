import { Search } from "lucide-react";
import CharacterCard from "./CharacterCard";
export default function Icons() {
  return (
    <div className="my-18">
      <div className="flex items-center justify-center mb-8">
        <div className="flex h-[50px] items-center w-full max-w-md px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-md shadow-md">
          <Search size={18} className="text-white/70 mr-4" />
          <input
            type="text"
            placeholder="Search for your favourite superhero"
            className="bg-transparent text-white placeholder-white/70 focus:outline-none w-full"
          />
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className="font-cinzel text-4xl font-bold mb-3">Icons</h1>
        <hr />
        <div className="my-6 ml-4">
          <CharacterCard
            name="YODA"
            fullName="Minch Yoda"
            publisher="Disney"
            alignment="Good"
          />
        </div>
      </div>
    </div>
  );
}
