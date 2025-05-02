import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

export default function Quote() {
  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      <div className="text-center relative">
        <FaQuoteLeft className="font-serif text-3xl text-white absolute -left-1 -top-6" />

        <h1 className="font-spectral text-4xl text-center uppercase bg-gradient-to-r from-white to-purple-900 bg-clip-text text-transparent mb-4 leading-normal relative">
          You Either Die a Hero or Live Long Enough to See Yourself Become the
          Villain
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-white/60 italic font-ebgaramond mx-auto text-xl mb-1">
            -Harvey Dent
          </p>
          <p className="text-xs uppercase text-white/50 font-spectral">
            The Dark Knight (2008)
          </p>
        </div>
      </div>
    </div>
  );
}
