import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Filter, SlidersHorizontal, Trash2 } from "lucide-react";
import { mockMovies, getAllGenres } from "../services/movieData";
import { searchTmdbMovies } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard";

export default function Search({ watchlist, onWatchlistToggle, tmdbKey, useTmdb }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const filterType = searchParams.get("filter") || ""; // 'watchlist' or ''
  
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  
  // Active Filters
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("rating-desc");
  const [loading, setLoading] = useState(false);

  // Load all available genres
  useEffect(() => {
    // Collect genres based on mode
    if (useTmdb) {
      setGenres(["Action", "Adventure", "Animation", "Comedy", "Crime", "Drama", "Fantasy", "Mystery", "Romance", "Sci-Fi", "Thriller"]);
    } else {
      setGenres(getAllGenres());
    }
  }, [useTmdb]);

  // Fetch or filter movies based on search query and settings
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      try {
        if (filterType === "watchlist") {
          setMovies(watchlist);
        } else if (useTmdb && tmdbKey && query) {
          const results = await searchTmdbMovies(query, tmdbKey);
          setMovies(results);
        } else if (useTmdb && tmdbKey) {
          // If no query but use TMDB, default to mock movies as featured starting point
          setMovies(mockMovies);
        } else {
          // Local search mode
          const q = query.toLowerCase();
          const results = mockMovies.filter(m => 
            m.title.toLowerCase().includes(q) || 
            m.genres.some(g => g.toLowerCase().includes(q)) ||
            m.director.toLowerCase().includes(q)
          );
          setMovies(results);
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
        // Fallback to mock search in case of error
        const q = query.toLowerCase();
        setMovies(mockMovies.filter(m => m.title.toLowerCase().includes(q)));
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, [query, filterType, watchlist, useTmdb, tmdbKey]);

  // Apply genre, rating, and sorting filters on the loaded movies list
  useEffect(() => {
    let result = [...movies];

    if (selectedGenre) {
      result = result.filter(m => m.genres.includes(selectedGenre));
    }

    if (minRating > 0) {
      result = result.filter(m => m.rating >= minRating);
    }

    // Sorting
    if (sortBy === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "rating-asc") {
      result.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "year-desc") {
      result.sort((a, b) => (b.releaseYear || 0) - (a.releaseYear || 0));
    } else if (sortBy === "year-asc") {
      result.sort((a, b) => (a.releaseYear || 0) - (b.releaseYear || 0));
    } else if (sortBy === "title-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredMovies(result);
  }, [movies, selectedGenre, minRating, sortBy]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSelectedGenre("");
    setMinRating(0);
    setSortBy("rating-desc");
  };

  return (
    <div className="search-page fade-in">
      <div className="page-header">
        <h1 className="page-title">
          {filterType === "watchlist" ? (
            <span>Your <span className="gradient-text">Watchlist</span></span>
          ) : (
            <span>Explore <span className="gradient-text">Movies</span></span>
          )}
        </h1>
      </div>

      <div className="search-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar glass-panel">
          <div className="sidebar-header">
            <h3><SlidersHorizontal size={18} /> Filters</h3>
            {(selectedGenre || minRating > 0 || sortBy !== "rating-desc") && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="rating-desc">Rating: High to Low</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="year-asc">Year: Oldest First</option>
              <option value="title-asc">Title: A to Z</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Genre</label>
            <div className="genre-filter-list">
              <button 
                className={`genre-filter-btn ${selectedGenre === "" ? "active" : ""}`}
                onClick={() => setSelectedGenre("")}
              >
                All Genres
              </button>
              {genres.map(g => (
                <button 
                  key={g}
                  className={`genre-filter-btn ${selectedGenre === g ? "active" : ""}`}
                  onClick={() => setSelectedGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="rating-label-row">
              <label>Minimum Rating</label>
              <span className="rating-val">{minRating > 0 ? `${minRating.toFixed(1)}+` : "Any"}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="9.5" 
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="rating-range-slider"
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="search-results-area">
          {filterType !== "watchlist" && (
            <div className="search-bar-container glass-panel">
              <SearchIcon size={20} className="search-input-icon" />
              <input 
                type="text" 
                placeholder="Search by title, genre, director..." 
                value={query}
                onChange={handleSearchChange}
                className="search-main-input"
              />
            </div>
          )}

          <div className="results-status">
            <span>
              Found {filteredMovies.length} movie{filteredMovies.length !== 1 && "s"}
              {query && ` for "${query}"`}
              {filterType === "watchlist" && " in watchlist"}
            </span>
          </div>

          {loading ? (
            <div className="results-loading">
              <div className="spinner-border"></div>
              <p>Searching movie database...</p>
            </div>
          ) : filteredMovies.length > 0 ? (
            <div className="search-movies-grid">
              {filteredMovies.map(movie => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  isWatchlisted={watchlist.some(m => m.id === movie.id)} 
                  onWatchlistToggle={onWatchlistToggle}
                />
              ))}
            </div>
          ) : (
            <div className="empty-results glass-panel scale-in">
              <Trash2 size={48} className="empty-icon" />
              <h4>No movies found</h4>
              <p>Try modifying your search query or relaxing your filter parameters.</p>
              {filterType === "watchlist" && (
                <button className="btn btn-primary" style={{ marginTop: "1rem" }} onClick={() => setSearchParams({})}>
                  Explore Movies
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
