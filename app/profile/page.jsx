"use client";

import { useFavorites } from "@/context/FavoritesContext";
import CharacterCard from "../home/components/CharacterCard";
import ComicCard from "../comics/components/ComicCard";
import Movie from "../movies/components/Movie";
import Quote from "../quotes/components/Quote";
import Pagination from "./components/Pagination";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function ProfilePage() {
  const { favorites } = useFavorites();
  const icons = favorites.icons || [];
  const comics = favorites.comics || [];
  const movies = favorites.movies || [];
  const quotes = favorites.quotes || [];

  const itemsPerPage = 6;
  const comicsPerPage = 3;
  const moviesPerPage = 3;

  // ICONS pagination
  const [iconPage, setIconPage] = useState(1);
  const iconTotalPages = Math.ceil(icons.length / itemsPerPage);
  const currentIcons = useMemo(() => {
    const start = (iconPage - 1) * itemsPerPage;
    return icons.slice(start, start + itemsPerPage);
  }, [icons, iconPage]);

  // COMICS pagination
  const [comicPage, setComicPage] = useState(1);
  const comicTotalPages = Math.ceil(comics.length / comicsPerPage);
  const currentComics = useMemo(() => {
    const start = (comicPage - 1) * comicsPerPage;
    return comics.slice(start, start + comicsPerPage);
  }, [comics, comicPage]);

  // MOVIES pagination
  const [moviePage, setMoviePage] = useState(1);
  const movieTotalPages = Math.ceil(movies.length / moviesPerPage);
  const currentMovies = useMemo(() => {
    const start = (moviePage - 1) * moviesPerPage;
    return movies.slice(start, start + moviesPerPage);
  }, [movies, moviePage]);

  // QUOTE carousel
  const [quoteIndex, setQuoteIndex] = useState(0);
  useEffect(() => {
    if (quotes.length === 0) return;
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [quotes]);

  const currentQuote = quotes[quoteIndex];

  return (
    <div className="p-6">
      {/* QUOTE SECTION */}
      {quotes.length > 0 && currentQuote && (
        <div className="mt-12">
          <h1 className="font-cinzel text-4xl font-bold mb-3">
            Favourite Quotes
          </h1>
          <hr className="mb-8" />

          <div className="relative h-[300px] flex items-center justify-center">
            {" "}
            {/* Increase height to suit content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="absolute w-full"
              >
                <Quote
                  quote={currentQuote.quote}
                  movie={currentQuote.movie}
                  author={currentQuote.character}
                  heart={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
      {/* ICONS SECTION */}
      <h1 className="font-cinzel text-4xl font-bold mb-3">Favourite Icons</h1>
      <hr className="mb-8" />
      {icons.length === 0 ? (
        <p className="text-gray-500">No favorite characters added yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentIcons.map((hero) => (
              <CharacterCard
                key={hero.id}
                name={hero.name}
                fullName={hero.biography?.["full-name"] || "N/A"}
                publisher={hero.biography?.publisher || "Unknown"}
                alignment={hero.biography?.alignment || "Neutral"}
                stats={hero.powerstats}
                image={hero.image?.url || "/images/icon_placeholder.jpg"}
                hero={hero}
              />
            ))}
          </div>
          <Pagination
            currentPage={iconPage}
            totalPages={iconTotalPages}
            onPageChange={setIconPage}
          />
        </>
      )}
      {/* MOVIES SECTION */}
      <h1 className="font-cinzel text-4xl font-bold mb-3 mt-12">
        Favourite Movies
      </h1>
      <hr className="mb-8" />
      {movies.length === 0 ? (
        <p className="text-gray-500">No favorite movies added yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {currentMovies.map((movie) => (
              <Movie
                key={movie.id}
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : "/images/StarWars.jpg"
                }
                title={movie.title}
                year={
                  movie.release_date
                    ? movie.release_date.substring(0, 4)
                    : "N/A"
                }
                movie={movie}
              />
            ))}
          </div>
          <Pagination
            currentPage={moviePage}
            totalPages={movieTotalPages}
            onPageChange={setMoviePage}
          />
        </>
      )}
      {/* COMICS SECTION */}
      <h1 className="font-cinzel text-4xl font-bold mb-3 mt-12">
        Favourite Comics
      </h1>
      <hr className="mb-8" />
      {comics.length === 0 ? (
        <p className="text-gray-500">No favorite comics added yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {currentComics.map((comic) => (
              <ComicCard
                key={comic.id}
                {...comic}
                onToggleFavorite={() => handleToggleFavorite(comic.id)}
                onViewDetails={() => handleViewDetails(comic.id)}
              />
            ))}
          </div>
          <Pagination
            currentPage={comicPage}
            totalPages={comicTotalPages}
            onPageChange={setComicPage}
          />
        </>
      )}
    </div>
  );
}
