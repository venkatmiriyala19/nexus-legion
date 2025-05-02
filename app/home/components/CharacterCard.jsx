import {
  Brain,
  Heart,
  Shield,
  Zap,
  Sword,
  BicepsFlexed,
  Gauge,
} from "lucide-react";
import { useState } from "react";
import { Heart as HeartIcon, HeartFilled, ChevronRight } from "lucide-react";

export default function CharacterCard({
  name,
  fullName,
  publisher,
  alignment,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="w-full max-w-md rounded-xl overflow-hidden bg-transparent text-white border border-white">
      <div className="px-8 py-6">
        {/* Image section with placeholder */}
        <div className="relative h-48 rounded-lg overflow-hidden mb-4 bg-gray-800">
          <img
            src="/images/StarWars.jpg"
            alt={name}
            className="w-full h-full object-cover"
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
              140
            </span>
          </div>
          <div className="flex items-center gap-1">
            <BicepsFlexed className="w-5 h-5 text-white" />
            <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
              86
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-5 h-5 text-white" />
            <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
              57
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-5 h-5 text-white" />
            <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
              140
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-5 h-5 text-white" />
            <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
              86
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Sword className="w-5 h-5 text-white" />
            <span className="text-md bg-gradient-to-b font-medium from-white to-[#7B61FF] bg-clip-text text-transparent">
              140
            </span>
          </div>
        </div>

        {/* Character details */}
        {/* Character details with actions on alignment row */}
        <div className="space-y-0 mb-4">
          <div className="flex">
            <span className="text-lg mr-1 font-medium text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
              Full Name :
            </span>
            <span className="text-white font-medium text-lg">{fullName}</span>
          </div>
          <div className="flex">
            <span className="text-lg mr-1 font-medium text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
              Publisher :
            </span>
            <span className="text-white font-medium text-lg">{publisher}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex">
              <span className="text-lg mr-1 font-medium text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                Alignment :
              </span>
              <span className="text-white font-medium text-lg">
                {alignment}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                className="text-white cursor-pointer"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? (
                  <HeartIcon className="w-6 h-6 text-[#fff] fill-[#fff]" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </button>

              <button className="text-white cursor-pointer">
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
