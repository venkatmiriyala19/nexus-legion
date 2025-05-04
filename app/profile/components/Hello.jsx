"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { Zap } from "lucide-react";

export default function Hello() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      {/* Logout button positioned absolutely */}
      <div className="absolute top-6 right-6">
        <SignOutButton>
          <SignOutButton>
            <button className="bg-purple-900 cursor-pointer hover:bg-purple-800 text-white font-bold py-2 px-6 rounded transform hover:scale-105 transition duration-300 border-b-4 border-purple-950 hover:border-purple-800 shadow-lg hover:shadow-purple-500/50 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </SignOutButton>
        </SignOutButton>
      </div>

      {/* Centered greeting */}
      <h1 className="font-codystar font-bold text-4xl text-center bg-gradient-to-r from-white to-purple-900 bg-clip-text text-transparent leading-normal ">
        Hello,
        <span className="text-white"> {user?.firstName || "there"}! </span>
      </h1>
    </div>
  );
}
