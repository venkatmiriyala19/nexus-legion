"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const [favorites, setFavorites] = useState({ movies: [], quotes: [] });

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          synchronizeFavorites(data);
        } else {
          console.error("Failed to fetch favorites", response.status);
        }
      } catch (err) {
        console.error("Error fetching favorites", err);
      }
    };

    fetchFavorites();
  }, [isLoaded, isSignedIn]);

  const synchronizeFavorites = (fetchedFavorites) => {
    const queuedActions = JSON.parse(
      localStorage.getItem("favoriteActions") || "[]"
    );

    // Synchronize movies
    const movieMap = new Map();
    fetchedFavorites.movies.forEach((movie) => {
      movieMap.set(movie.id, true);
    });

    // Synchronize quotes
    const quoteMap = new Map();
    fetchedFavorites.quotes.forEach((quote) => {
      // Use a unique identifier for quotes (e.g., quote text + movie + character)
      const quoteKey = `${quote.quote}|${quote.movie}|${quote.character}`;
      quoteMap.set(quoteKey, true);
    });

    // Apply queued actions
    queuedActions.forEach((action) => {
      if (action.section === "movies") {
        if (action.action === "add") {
          movieMap.set(action.item.id, true);
        } else if (action.action === "remove") {
          movieMap.delete(action.item.id);
        }
      } else if (action.section === "quotes") {
        const quoteKey = `${action.item.quote}|${action.item.movie}|${action.item.character}`;
        if (action.action === "add") {
          quoteMap.set(quoteKey, true);
        } else if (action.action === "remove") {
          quoteMap.delete(quoteKey);
        }
      }
    });

    // Convert maps back to arrays
    const updatedMovies = [];
    movieMap.forEach((_, movieId) => {
      const movie =
        fetchedFavorites.movies.find((m) => m.id === movieId) ||
        queuedActions.find(
          (action) =>
            action.section === "movies" &&
            action.item.id === movieId &&
            action.action === "add"
        )?.item;
      if (movie) updatedMovies.push(movie);
    });

    const updatedQuotes = [];
    quoteMap.forEach((_, quoteKey) => {
      const [quoteText, movie, character] = quoteKey.split("|");
      const quote =
        fetchedFavorites.quotes.find(
          (q) =>
            q.quote === quoteText &&
            q.movie === movie &&
            q.character === character
        ) ||
        queuedActions.find(
          (action) =>
            action.section === "quotes" &&
            action.item.quote === quoteText &&
            action.item.movie === movie &&
            action.item.character === character &&
            action.action === "add"
        )?.item;
      if (quote) updatedQuotes.push(quote);
    });

    setFavorites({ movies: updatedMovies, quotes: updatedQuotes });
  };

  const queueFavoriteAction = (item, section, action) => {
    const queuedActions = JSON.parse(
      localStorage.getItem("favoriteActions") || "[]"
    );
    const newAction = { section, item, action };
    queuedActions.push(newAction);
    localStorage.setItem("favoriteActions", JSON.stringify(queuedActions));

    // Optimistic update
    if (section === "movies") {
      if (action === "add") {
        setFavorites((prev) => ({
          ...prev,
          movies: [...prev.movies, item],
        }));
      } else {
        setFavorites((prev) => ({
          ...prev,
          movies: prev.movies.filter((fav) => fav.id !== item.id),
        }));
      }
    } else if (section === "quotes") {
      const quoteKey = `${item.quote}|${item.movie}|${item.character}`;
      if (action === "add") {
        setFavorites((prev) => ({
          ...prev,
          quotes: [...prev.quotes, item],
        }));
      } else {
        setFavorites((prev) => ({
          ...prev,
          quotes: prev.quotes.filter(
            (q) => `${q.quote}|${q.movie}|${q.character}` !== quoteKey
          ),
        }));
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, queueFavoriteAction }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
