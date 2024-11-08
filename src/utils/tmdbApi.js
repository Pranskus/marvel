const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
  },
};

// MCU movies by year with their TMDB IDs
const MCU_MOVIES = {
  2008: [
    { id: 1726, title: "Iron Man" },
    { id: 1724, title: "The Incredible Hulk" },
  ],
  2010: [{ id: 10138, title: "Iron Man 2" }],
  2011: [
    { id: 10195, title: "Thor" },
    { id: 1771, title: "Captain America: The First Avenger" },
  ],
  2012: [{ id: 24428, title: "The Avengers" }],
  2013: [
    { id: 68721, title: "Iron Man 3" },
    { id: 76338, title: "Thor: The Dark World" },
  ],
  2014: [
    { id: 100402, title: "Captain America: The Winter Soldier" },
    { id: 118340, title: "Guardians of the Galaxy" },
  ],
  2015: [
    { id: 99861, title: "Avengers: Age of Ultron" },
    { id: 102899, title: "Ant-Man" },
  ],
  2016: [
    { id: 271110, title: "Captain America: Civil War" },
    { id: 284052, title: "Doctor Strange" },
  ],
  2017: [
    { id: 284053, title: "Thor: Ragnarok" },
    { id: 315635, title: "Spider-Man: Homecoming" },
    { id: 283995, title: "Guardians of the Galaxy Vol. 2" },
  ],
  2018: [
    { id: 284054, title: "Black Panther" },
    { id: 299536, title: "Avengers: Infinity War" },
    { id: 363088, title: "Ant-Man and the Wasp" },
  ],
  2019: [
    { id: 299537, title: "Captain Marvel" },
    { id: 299534, title: "Avengers: Endgame" },
    { id: 429617, title: "Spider-Man: Far From Home" },
  ],
  2021: [
    { id: 497698, title: "Black Widow" },
    { id: 566525, title: "Shang-Chi and the Legend of the Ten Rings" },
    { id: 524434, title: "Eternals" },
    { id: 634649, title: "Spider-Man: No Way Home" },
  ],
  2022: [
    { id: 453395, title: "Doctor Strange in the Multiverse of Madness" },
    { id: 616037, title: "Thor: Love and Thunder" },
    { id: 505642, title: "Black Panther: Wakanda Forever" },
  ],
  2023: [
    { id: 640146, title: "Ant-Man and the Wasp: Quantumania" },
    { id: 447365, title: "Guardians of the Galaxy Vol. 3" },
    { id: 609681, title: "The Marvels" },
  ],
};

export const getMarvelPhaseOneMovies = async (year) => {
  try {
    // Get the MCU movies for the selected year
    const yearMovies = MCU_MOVIES[year] || [];

    // Fetch details for each movie
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
        releaseDate: data.release_date,
        overview: data.overview,
        runtime: data.runtime,
        vote_average: data.vote_average,
      };
    });

    const movies = await Promise.all(moviePromises);
    console.log(`Fetched ${movies.length} movies for ${year}:`, movies);
    return movies;
  } catch (error) {
    console.error("Error fetching Marvel movies:", error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
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

export const getMovieCredits = async (movieId) => {
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

export const getMovieVideos = async (movieId) => {
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
