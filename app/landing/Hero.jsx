export default function Hero() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-cover bg-center max-w-5xl"
        style={{ backgroundImage: "url('/images/Hero_Landing.png')" }}
      >
        <div className="flex flex-col items-center justify-center text-white text-center px-4 py-20 max-w-6xl mx-auto">
          <h1 className="font-cinzel text-4xl my-5 font-black mb-6">
            One Legion. Many Worlds. Your Heroes.
          </h1>
          <p className="font-spectral text-lg md:text-xl leading-relaxed max-w-4xl mt-1">
            Whether you stand with the mighty or root for the underdogs, every
            hero's journey starts here.{" "}
            <span className="bg-white text-black px-2 py-1 rounded font-bold">
              Join the Nexus
            </span>{" "}
            and explore the heroes who inspire generations.
          </p>
        </div>
      </div>
    </div>
  );
}
