"use client";
import { useState, useEffect } from "react";
import SplitText from "@/components/ui/SplitText/SplitText";
import Quote from "./components/Quote";
import { motion } from "framer-motion";

export default function Page() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("/assets/quotes.json");
      const data = await response.json();
      const randomQuote =
        data.quotes[Math.floor(Math.random() * data.quotes.length)];

      setTimeout(() => {
        setQuote(randomQuote);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setLoading(false);
    }
  };

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Quote
          quote="You Either Die a Hero or Live Long Enough to See Yourself Become the Villain"
          movie="The Dark Knight (2008)"
          author="Harvey Dent"
        />
      </motion.div>

      {/* Random Quotes Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-cinzel text-3xl font-bold mb-3">Random Quotes</h1>
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
