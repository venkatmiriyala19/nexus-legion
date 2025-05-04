// FavoritesContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const [favorites, setFavorites] = useState([]); // Store favorite movies

  // Fetch favorites from backend
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
          // Assuming data is an array of favorite movies
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

  // Synchronize fetched favorites with localStorage queue
  const synchronizeFavorites = (fetchedFavorites) => {
    const queuedActions = JSON.parse(
      localStorage.getItem("favoriteActions") || "[]"
    );

    // Create a map of movie IDs to their favorite status
    const favoriteMap = new Map();
    fetchedFavorites.forEach((movie) => {
      favoriteMap.set(movie.id, true);
    });

    // Apply queued actions to override fetched favorites
    queuedActions.forEach((action) => {
      if (action.section === "movies") {
        if (action.action === "add") {
          favoriteMap.set(action.item.id, true);
        } else if (action.action === "remove") {
          favoriteMap.delete(action.item.id);
        }
      }
    });

    // Convert map back to array of favorite movies
    const updatedFavorites = [];
    favoriteMap.forEach((_, movieId) => {
      // Find the movie object from fetchedFavorites or queuedActions
      const movie =
        fetchedFavorites.find((m) => m.id === movieId) ||
        queuedActions.find(
          (action) => action.item.id === movieId && action.action === "add"
        )?.item;
      if (movie) updatedFavorites.push(movie);
    });

    setFavorites(updatedFavorites);
  };

  // Add or remove favorite (used by Movie component)
  const queueFavoriteAction = (movie, action) => {
    const queuedActions = JSON.parse(
      localStorage.getItem("favoriteActions") || "[]"
    );
    const newAction = {
      section: "movies",
      item: movie,
      action,
    };
    queuedActions.push(newAction);
    localStorage.setItem("favoriteActions", JSON.stringify(queuedActions));

    // Update local favorites state optimistically
    if (action === "add") {
      setFavorites((prev) => [...prev, movie]);
    } else {
      setFavorites((prev) => prev.filter((fav) => fav.id !== movie.id));
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
