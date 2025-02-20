import {
  Movie,
  MovieCredits,
  MovieVideosResponse,
  MCUMoviesByYear,
} from "../types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
  },
};

// MCU movies by year with their TMDB IDs
const MCU_MOVIES: MCUMoviesByYear = {
  // ... existing MCU_MOVIES object ...
};

export const getMarvelPhaseOneMovies = async (
  year: number
): Promise<Movie[]> => {
  try {
    const yearMovies = MCU_MOVIES[year] || [];

    const moviePromises = yearMovies.map(async (movie) => {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${movie.id}`,
        options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        id: data.id,
        title: data.title,
        poster_path: `${TMDB_IMAGE_BASE_URL}${data.poster_path}`,
        release_date: data.release_date,
        overview: data.overview,
        runtime: data.runtime,
        vote_average: data.vote_average,
        backdrop_path: data.backdrop_path,
      } as Movie;
    });

    const movies = await Promise.all(moviePromises);
    console.log(`Fetched ${movies.length} movies for ${year}:`, movies);
    return movies;
  } catch (error) {
    console.error("Error fetching Marvel movies:", error);
    return [];
  }
};

export const getMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieCredits = async (
  movieId: number
): Promise<MovieCredits> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const getMovieVideos = async (
  movieId: number
): Promise<MovieVideosResponse> => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    throw error;
  }
};
