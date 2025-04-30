import Header from "./landing/Header";
import Hero from "./landing/Hero";
import Image from "next/image";
import Waves from "./landing/Waves";
import Carousel from "./landing/Carousel";
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <hr className="mx-16 h-[0.1px] mt-2 mb-8 bg-gray-300 border-0" />
      <div className="flex items-center justify-center">
        <Image
          src="/images/Landing_Brands.png"
          alt="Banner"
          width={1000}
          height={500}
        />
      </div>
      <Waves />
      <Carousel />
    </>
  );
}
