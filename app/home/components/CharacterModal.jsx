import { X } from "lucide-react";

export default function CharacterModal({ isOpen, onClose, character }) {
  if (!isOpen) return null;

  // Extract all character data from props
  const {
    name,
    fullName,
    publisher,
    alignment,
    image,
    stats,
    biography,
    appearance,
    work,
    connections,
  } = character;

  // Set default values for stats if not provided
  const powerstats = stats || {
    intelligence: "N/A",
    strength: "N/A",
    speed: "N/A",
    durability: "N/A",
    power: "N/A",
    combat: "N/A",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#3E065F]/80 border border-[#6f84f8]/30 text-white custom-scrollbar">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 p-1 rounded-full bg-[#3E065F] hover:bg-gray-700"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          {/* Header with image and name */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3 h-64 rounded-lg overflow-hidden bg-[#3E065F]">
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

            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold font-[Cinzel] tracking-wider mb-2">
                {name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex">
                  <span className="font-medium text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                    Full Name:
                  </span>
                  <span className="ml-2">{fullName}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                    Publisher:
                  </span>
                  <span className="ml-2">{publisher}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                    Alignment:
                  </span>
                  <span className="ml-2">
                    {alignment?.charAt(0).toUpperCase() + alignment?.slice(1) ||
                      "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
              Power Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#3E065F] p-3 rounded-lg">
                <div className="text-center text-sm text-gray-400">
                  Intelligence
                </div>
                <div className="text-center text-2xl font-bold">
                  {powerstats.intelligence}
                </div>
              </div>
              <div className="bg-[#3E065F] p-3 rounded-lg">
                <div className="text-center text-sm text-gray-400">
                  Strength
                </div>
                <div className="text-center text-2xl font-bold">
                  {powerstats.strength}
                </div>
              </div>
              <div className="bg-[#3E065F] p-3 rounded-lg">
                <div className="text-center text-sm text-gray-400">Speed</div>
                <div className="text-center text-2xl font-bold">
                  {powerstats.speed}
                </div>
              </div>
              <div className="bg-[#3E065F] p-3 rounded-lg">
                <div className="text-center text-sm text-gray-400">
                  Durability
                </div>
                <div className="text-center text-2xl font-bold">
                  {powerstats.durability}
                </div>
              </div>
              <div className="bg-[#3E065F] p-3 rounded-lg">
                <div className="text-center text-sm text-gray-400">Power</div>
                <div className="text-center text-2xl font-bold">
                  {powerstats.power}
                </div>
              </div>
              <div className="bg-[#3E065F] p-3 rounded-lg">
                <div className="text-center text-sm text-gray-400">Combat</div>
                <div className="text-center text-2xl font-bold">
                  {powerstats.combat}
                </div>
              </div>
            </div>
          </div>

          {/* Biography Section - conditionally render if data exists */}
          {biography && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                Biography
              </h2>
              <div className="bg-[#3E065F] p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {biography.alterEgos && (
                    <div>
                      <span className="text-sm text-gray-400">Alter Egos:</span>
                      <div>{biography.alterEgos}</div>
                    </div>
                  )}
                  {biography.placeOfBirth && (
                    <div>
                      <span className="text-sm text-gray-400">
                        Birth Place:
                      </span>
                      <div>{biography.placeOfBirth}</div>
                    </div>
                  )}
                  {biography.firstAppearance && (
                    <div>
                      <span className="text-sm text-gray-400">
                        First Appearance:
                      </span>
                      <div>{biography.firstAppearance}</div>
                    </div>
                  )}
                  {biography.aliases && biography.aliases.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-400">Aliases:</span>
                      <div>{biography.aliases.join(", ")}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Section - conditionally render if data exists */}
          {appearance && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                Appearance
              </h2>
              <div className="bg-[#3E065F] p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {appearance.gender && (
                    <div>
                      <span className="text-sm text-gray-400">Gender:</span>
                      <div>{appearance.gender}</div>
                    </div>
                  )}
                  {appearance.race && (
                    <div>
                      <span className="text-sm text-gray-400">Race:</span>
                      <div>{appearance.race}</div>
                    </div>
                  )}
                  {appearance.height && appearance.height.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-400">Height:</span>
                      <div>{appearance.height.join(" / ")}</div>
                    </div>
                  )}
                  {appearance.weight && appearance.weight.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-400">Weight:</span>
                      <div>{appearance.weight.join(" / ")}</div>
                    </div>
                  )}
                  {appearance.eyeColor && (
                    <div>
                      <span className="text-sm text-gray-400">Eye Color:</span>
                      <div>{appearance.eyeColor}</div>
                    </div>
                  )}
                  {appearance.hairColor && (
                    <div>
                      <span className="text-sm text-gray-400">Hair Color:</span>
                      <div>{appearance.hairColor}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Work Section - conditionally render if data exists */}
          {work && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-3 text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                Work
              </h2>
              <div className="bg-[#3E065F] p-4 rounded-lg">
                {work.occupation && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-400">Occupation:</span>
                    <div>{work.occupation}</div>
                  </div>
                )}
                {work.base && (
                  <div>
                    <span className="text-sm text-gray-400">Base:</span>
                    <div>{work.base}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Connections Section - conditionally render if data exists */}
          {connections && (
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-3 text-transparent bg-gradient-to-r from-white to-[#7B61FF] bg-clip-text">
                Connections
              </h2>
              <div className="bg-[#3E065F] p-4 rounded-lg">
                {connections.groupAffiliation && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-400">
                      Group Affiliation:
                    </span>
                    <div>{connections.groupAffiliation}</div>
                  </div>
                )}
                {connections.relatives && (
                  <div>
                    <span className="text-sm text-gray-400">Relatives:</span>
                    <div>{connections.relatives}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
