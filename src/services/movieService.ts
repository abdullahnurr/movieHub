import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://jsonfakery.com/movies/paginated";

export const getMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const searchMovies = async (query: string) => {
  try {
    const moviePromises = Array.from({ length: 5 }, (_, i) =>
      axios.get(`${API_URL}?page=${i + 1}`)
    );

    const responses = await Promise.all(moviePromises);
    const allMovies: Movie[] = responses.flatMap(
      (response) => response.data.data
    );

    const searchQuery = query.toLowerCase();
    // Sadece film başlığında arama yapalım
    return allMovies.filter((movie) =>
      movie.original_title.toLowerCase().includes(searchQuery)
    );
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};
