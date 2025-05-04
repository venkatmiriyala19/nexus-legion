"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const [favorites, setFavorites] = useState({
    movies: [],
    quotes: [],
    icons: [],
    comics: [],
  });

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
      const quoteKey = `${quote.quote}|${quote.movie}|${quote.character}`;
      quoteMap.set(quoteKey, true);
    });

    // Synchronize icons
    const iconMap = new Map();
    fetchedFavorites.icons.forEach((icon) => {
      iconMap.set(icon.id, true);
    });

    // Synchronize comics
    const comicMap = new Map();
    fetchedFavorites.comics.forEach((comic) => {
      comicMap.set(comic.id, true);
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
      } else if (action.section === "icons") {
        if (action.action === "add") {
          iconMap.set(action.item.id, true);
        } else if (action.action === "remove") {
          iconMap.delete(action.item.id);
        }
      } else if (action.section === "comics") {
        if (action.action === "add") {
          comicMap.set(action.item.id, true);
        } else if (action.action === "remove") {
          comicMap.delete(action.item.id);
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

    const updatedIcons = [];
    iconMap.forEach((_, iconId) => {
      const icon =
        fetchedFavorites.icons.find((i) => i.id === iconId) ||
        queuedActions.find(
          (action) =>
            action.section === "icons" &&
            action.item.id === iconId &&
            action.action === "add"
        )?.item;
      if (icon) updatedIcons.push(icon);
    });

    const updatedComics = [];
    comicMap.forEach((_, comicId) => {
      const comic =
        fetchedFavorites.comics.find((c) => c.id === comicId) ||
        queuedActions.find(
          (action) =>
            action.section === "comics" &&
            action.item.id === comicId &&
            action.action === "add"
        )?.item;
      if (comic) updatedComics.push(comic);
    });

    setFavorites({
      movies: updatedMovies,
      quotes: updatedQuotes,
      icons: updatedIcons,
      comics: updatedComics,
    });
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
    } else if (section === "icons") {
      if (action === "add") {
        setFavorites((prev) => ({
          ...prev,
          icons: [...prev.icons, item],
        }));
      } else {
        setFavorites((prev) => ({
          ...prev,
          icons: prev.icons.filter((fav) => fav.id !== item.id),
        }));
      }
    } else if (section === "comics") {
      if (action === "add") {
        setFavorites((prev) => ({
          ...prev,
          comics: [...prev.comics, item],
        }));
      } else {
        setFavorites((prev) => ({
          ...prev,
          comics: prev.comics.filter((fav) => fav.id !== item.id),
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
