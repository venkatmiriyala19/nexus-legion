"use client";
import { useState, useEffect } from "react";
import SplitText from "@/components/ui/SplitText/SplitText";
import Quote from "./components/Quote";

export default function Page() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state to control spinner

  // Function to fetch random quote
  const fetchRandomQuote = async () => {
    setLoading(true); // Start loading spinner
    try {
      const response = await fetch("/assets/quotes.json"); // Path to your quotes.json
      const data = await response.json();
      const randomQuote =
        data.quotes[Math.floor(Math.random() * data.quotes.length)];

      // Simulate a delay for UX purposes
      setTimeout(() => {
        setQuote(randomQuote);
        setLoading(false); // Stop loading spinner after the delay
      }, 1000); // 1-second delay (adjust as needed)
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setLoading(false); // Stop loading spinner in case of error
    }
  };

  // Initial random quote fetch when page loads
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-center">
        <SplitText
          text="Timeless Quotes"
          className="font-codystar text-center uppercase text-4xl color-white"
          delay={150}
          animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
        />
      </div>

      {/* Display the first (static) quote */}
      <Quote
        quote="You Either Die a Hero or Live Long Enough to See Yourself Become the Villain"
        movie="The Dark Knight (2008)"
        author="Harvey Dent"
      />

      {/* Random Quotes Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-cinzel text-4xl font-bold mb-3">Random Quotes</h1>
          <button
            className="bg-[#3E065F] cursor-pointer text-white uppercase text-lg font-medium px-4 py-[6px] rounded-lg hover:bg-[#fff] hover:text-black transition-colors"
            onClick={fetchRandomQuote}
          >
            Generate new
          </button>
        </div>
        <hr />
        <p className="text-white/50 text-xl my-6">
          Get a Random Quote every time you click generate new
        </p>

        {/* Display loading spinner if fetching new quote */}
        {loading && (
          <div className="flex justify-center my-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>
        )}

        {/* Display the Random Quote */}
        {quote && !loading && (
          <Quote
            quote={quote.quote}
            movie={quote.movie}
            author={quote.character}
            heart={true}
          />
        )}
      </div>
    </div>
  );
}
