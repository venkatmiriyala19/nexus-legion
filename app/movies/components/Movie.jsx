import { Heart } from "lucide-react";
export default function Movie({ image, title, year }) {
  return (
    <div className="max-w-6xl mx-auto border-white border-1 rounded-md flex items-center p-4 justify-between">
      <div className="gap-4 flex items-center">
        <img
          src={image || "/images/StarWars.jpg"}
          alt={title}
          className="w-32 h-full object-cover rounded-lg"
        />

        <h2 className="text-xl font-regular bg-gradient-to-r from-white to-[#3E065F] bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-6 mr-4">
        <Heart size={18} className="cursor-pointer text-white" />
        <p className="text-md text-white/50">{year}</p>
        <button className="bg-white text-black uppercase tezt-lg px-4 py-[6px] rounded-lg">
          More
        </button>
      </div>
    </div>
  );
}
