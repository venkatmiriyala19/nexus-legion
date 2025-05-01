import { Zap, Skull, Book, Film, Quote, User } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap size={18} color="black" />,
      title: "SUPERHEROES",
      description: "Meet the mightiest champions of justice.",
    },
    {
      icon: <Skull size={18} color="black" />,
      title: "VILLAINS",
      description: "Explore the dark and complex figures.",
    },
    {
      icon: <Book size={18} color="black" />,
      title: "COMICS",
      description: "Dive into iconic stories that shaped legends.",
    },
    {
      icon: <Film size={18} color="black" />,
      title: "MOVIES",
      description: "Relive epic cinematic moments and battles.",
    },
    {
      icon: <Quote size={18} color="black" />,
      title: "QUOTES",
      description: "Legendary words that inspire and intimidate.",
    },
    {
      icon: <User size={18} color="black" />,
      title: "PROFILE",
      description: "Get in-depth insights into your fav characters.",
    },
  ];

  return (
    <div className=" text-gray-300 p-8 my-8">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {features.slice(0, 3).map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-4 border-l border-gray-400"
            >
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-white p-2 mr-3">
                  {feature.icon}
                </div>
                <h3 className="font-codystar tracking-widest text-3xl">
                  {feature.title}
                </h3>
              </div>
              <p className="font-outfit text-2xl bg-gradient-to-b from-white to-[#983bce] bg-clip-text text-transparent">
                <span className=" font-medium">
                  {feature.description.split(" ").slice(0, 2).join(" ")}
                </span>{" "}
                {feature.description.split(" ").slice(2).join(" ")}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-400 my-6"></div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.slice(3).map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-4 border-l border-gray-400"
            >
              <div className="flex items-center mb-4">
                <div className="rounded-full bg-white p-2 mr-3">
                  {feature.icon}
                </div>
                <h3 className="font-codystar tracking-widest text-3xl">
                  {feature.title}
                </h3>
              </div>
              <p className="font-outfit text-2xl bg-gradient-to-b from-white to-[#983bce] bg-clip-text text-transparent">
                <span className=" font-medium">
                  {feature.description.split(" ").slice(0, 2).join(" ")}
                </span>{" "}
                {feature.description.split(" ").slice(2).join(" ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
