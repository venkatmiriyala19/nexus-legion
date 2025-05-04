import {
  Brain,
  Heart,
  Shield,
  Zap,
  Sword,
  BicepsFlexed,
  Gauge,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import CharacterModal from "./CharacterModal";
import { useFavorites } from "@/context/FavoritesContext";

export default function CharacterCard({
  name,
  fullName,
  publisher,
  alignment,
  image,
  stats,
  hero,
}) {
  const { favorites, queueFavoriteAction } = useFavorites();
  const isFavorite = favorites.icons.some((icon) => icon.id === hero.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Set default stat values if stats are not provided
  const powerstats = stats || {
    intelligence: "N/A",
    strength: "N/A",
    speed: "N/A",
    durability: "N/A",
    power: "N/A",
    combat: "N/A",
  };
  const characterData = {
    name,
    fullName,
    publisher,
    alignment,
    image,
    stats: powerstats,
    biography: hero?.biography,
    appearance: hero?.appearance,
    work: hero?.work,
    connections: hero?.connections,
  };

  const handleFavoriteClick = () => {
    queueFavoriteAction(hero, "icons", isFavorite ? "remove" : "add");
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <>
      <div className="w-full max-w-md rounded-xl overflow-hidden bg-transparent text-white border border-white">
        <div className="px-8 py-6">
          {/* Image section */}
          <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-gray-800">
            <img
              src={image || "/images/StarWars.jpg"}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/StarWars.jpg";
              }}
            />
          </div>

          {/* Character name */}
          <div className="text-center mb-1">
            <h1 className="text-2xl font-bold font-[Cinzel] tracking-wider text-white">
              {name}
            </h1>
          </div>
          <hr className="border-t-1 border-[#ffffff]/40 w-[90%] mx-auto mb-3 " />

          {/* Stats row */}
          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-1">
              <Brain className="w-5 h-5 text-white" />
              <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
                {powerstats.intelligence}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BicepsFlexed className="w-5 h-5 text-white" />
              <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
                {powerstats.strength}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="w-5 h-5 text-white" />
              <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
                {powerstats.speed}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
                {powerstats.durability}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-5 h-5 text-white" />
              <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
                {powerstats.power}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Sword className="w-5 h-5 text-white" />
              <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
                {powerstats.combat}
              </span>
            </div>
          </div>

          {/* Character details */}
          <div className="space-y-0 mb-4">
            <div className="flex">
              <span className="text-lg mr-1 font-medium text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                Full Name:
              </span>
              <span className="text-white font-medium text-lg">{fullName}</span>
            </div>
            <div className="flex">
              <span className="text-lg mr-1 font-medium text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                Publisher:
              </span>
              <span className="text-white font-medium text-lg">
                {publisher}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex">
                <span className="text-lg mr-1 font-medium text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                  Alignment:
                </span>
                <span className="text-white font-medium text-lg">
                  {alignment?.charAt(0).toUpperCase() + alignment?.slice(1)}
                </span>
              </div>
              <div className="flex gap-3">
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
                  className="text-white cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CharacterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        character={characterData}
      />
    </>
  );
}
