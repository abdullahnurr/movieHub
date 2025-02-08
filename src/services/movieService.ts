import axios from "axios";

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
