import Image from "next/image";

export default function Hero() {
  return (
    <>
      <div
        className="bg-cover bg-center w-full h-[35rem] flex items-center justify-center"
        style={{ backgroundImage: "url('/images/Waves3.png')" }}
      >
        <Image
          src="/images/JL.png"
          alt="Banner"
          width={300}
          height={300}
          className="mt-[-5rem]"
        />
      </div>
      <h1 className="font-spectral text-[28px] text-center font-medium bg-gradient-to-b mt-[-3rem] from-white to-[#3E065F] bg-clip-text text-transparent">
        Explore iconic comics—dive into legendary storylines, unforgettable
        characters, and the greatest battles ever told across generations!
      </h1>
    </>
  );
}
