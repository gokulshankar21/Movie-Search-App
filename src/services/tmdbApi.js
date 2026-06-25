// CinePulse TMDB API Integration Service

const BASE_URL = "https://api.themoviedb.org/3";
const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80";

const mapTmdbMovie = (m) => ({
  id: m.id,
  title: m.title,
  tagline: m.tagline || "",
  overview: m.overview || "",
  rating: parseFloat(m.vote_average?.toFixed(1)) || 0,
  releaseYear: m.release_date ? new Date(m.release_date).getFullYear() : null,
  releaseDate: m.release_date ? new Date(m.release_date).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  }) : "Unknown",
  runtime: m.runtime ? `${m.runtime} min` : "N/A",
  genres: m.genres ? m.genres.map(g => g.name) : (m.genre_ids ? getGenresFromIds(m.genre_ids) : []),
  poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=80",
  backdrop: m.backdrop_path ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
  director: m.credits?.crew?.find(c => c.job === "Director")?.name || "Unknown Director",
  budget: m.budget ? `$${m.budget.toLocaleString()}` : "N/A",
  revenue: m.revenue ? `$${m.revenue.toLocaleString()}` : "N/A",
  cast: m.credits?.cast?.slice(0, 5).map(c => ({
    name: c.name,
    character: c.character,
    image: c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : DEFAULT_AVATAR
  })) || [],
  reviews: [], // Will load custom reviews or mock if not fetched
  trailerUrl: m.videos?.results?.find(v => v.type === "Trailer" && v.site === "YouTube") 
    ? `https://www.youtube.com/embed/${m.videos.results.find(v => v.type === "Trailer" && v.site === "YouTube").key}`
    : null,
  similar: m.similar?.results?.slice(0, 4).map(s => s.id) || []
});

// TMDB Genre IDs mapping
const GENRE_MAP = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

const getGenresFromIds = (ids) => {
  return ids.map(id => GENRE_MAP[id] || "Other").filter(Boolean);
};

export const fetchTmdb = async (endpoint, apiKey, params = {}) => {
  const queryParams = new URLSearchParams({
    api_key: apiKey,
    language: "en-US",
    ...params
  });
  
  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
  if (!response.ok) {
    throw new Error(`TMDB Fetch failed: ${response.statusText}`);
  }
  return response.json();
};

export const getPopularMovies = async (apiKey) => {
  const data = await fetchTmdb("/movie/popular", apiKey);
  return data.results.map(mapTmdbMovie);
};

export const getTopRatedMovies = async (apiKey) => {
  const data = await fetchTmdb("/movie/top_rated", apiKey);
  return data.results.map(mapTmdbMovie);
};

export const getUpcomingMovies = async (apiKey) => {
  const data = await fetchTmdb("/movie/upcoming", apiKey);
  return data.results.map(mapTmdbMovie);
};

export const searchTmdbMovies = async (query, apiKey) => {
  const data = await fetchTmdb("/search/movie", apiKey, { query });
  return data.results.map(mapTmdbMovie);
};

export const getTmdbMovieDetails = async (id, apiKey) => {
  const data = await fetchTmdb(`/movie/${id}`, apiKey, {
    append_to_response: "credits,similar,videos"
  });
  return mapTmdbMovie(data);
};
