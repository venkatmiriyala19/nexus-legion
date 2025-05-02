import Image from "next/image";

export default function Hero() {
  return (
    <>
      <div
        className="bg-cover bg-center w-full h-[30rem] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/Waves2.png')" }}
      >
        <Image
          src="/images/AOU.png"
          alt="Banner"
          width={600}
          height={600}
          className="mt-[-5rem]"
        />
      </div>
      <h1 className="font-spectral text-[28px] text-center font-medium bg-gradient-to-b mt-[-5rem] from-white to-[#3E065F] bg-clip-text text-transparent">
        Dive into the world of heroes and villains—explore their powers,
        origins, and legendary battles. Search for your favorites and uncover
        their stories!
      </h1>
    </>
  );
}
