"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";

export default function Hello() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      {/* Logout button positioned absolutely */}
      <div className="absolute top-6 right-6">
        <SignOutButton>
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded transition duration-300">
            Logout
          </button>
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
