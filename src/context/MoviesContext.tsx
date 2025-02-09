import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Movie } from "../types/movie";

type MoviesContextType = {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  favoriteMovies: Movie[];
  addToFavorites: (movie: Movie) => Promise<void>;
  removeFromFavorites: (movieId: string) => Promise<void>;
  isFavorite: (movieId: string) => boolean;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);
const FAVORITES_STORAGE_KEY = "@movie_favorites";

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavoriteMovies(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const addToFavorites = async (movie: Movie) => {
    try {
      const newFavorites = [...favoriteMovies, movie];
      setFavoriteMovies(newFavorites);
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async (movieId: string) => {
    try {
      const newFavorites = favoriteMovies.filter((m) => m.id !== movieId);
      setFavoriteMovies(newFavorites);
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const isFavorite = (movieId: string) => {
    return favoriteMovies.some((m) => m.id === movieId);
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
        favoriteMovies,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
};
