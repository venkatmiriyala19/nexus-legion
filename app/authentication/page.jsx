"use client";

import { useRouter } from "next/navigation";
import SplitText from "@/components/ui/SplitText/SplitText";
import Image from "next/image";
import React from "react";
import { SignInButton } from "@clerk/nextjs";

export default function Page() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <div>
      <div className="my-8">
        <div className="flex items-center justify-center">
          <SplitText
            text="Enter the Legion"
            className="font-codystar text-center uppercase text-4xl color-white"
            delay={150}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
          />
        </div>
        <h1 className="font-bungee text-center uppercase text-3xl color-white mt-3">
          Unite. Explore. Conquer.
        </h1>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex items-center gap-[10rem]">
          <Image
            src="/images/Batman_Cutout.png"
            alt="Banner"
            width={500}
            height={500}
          />

          <div className="flex flex-col justify-center items-center">
            <h1 className="font-cinzel uppercase text-4xl font-black text-white">
              Sign In Below
            </h1>
            <hr className="bg-gray-50 my-6 w-[130%]" />
            <p className="text-center font-semibold text-[#808080]">
              Securely enter with a single login <br />
              —powered by Clerk.
            </p>

            <div className="flex gap-4 mt-5 items-center">
              {["Google", "Apple", "Github", "Facebook"].map(
                (provider, index) => (
                  <React.Fragment key={provider}>
                    {index !== 0 && <div className="w-px h-16 bg-gray-300" />}
                    <SignInButton>
                      <div className="bg-white rounded-full p-[6px] cursor-pointer">
                        <Image
                          src={`/images/${provider}.png`}
                          alt={provider}
                          width={60}
                          height={60}
                        />
                      </div>
                    </SignInButton>
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
