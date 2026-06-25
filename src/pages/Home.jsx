import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Play, Plus, Check, Film, Loader2 } from "lucide-react";
import { mockMovies } from "../services/movieData";
import { getPopularMovies, getTopRatedMovies } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard";

export default function Home({ watchlist, onWatchlistToggle, tmdbKey, useTmdb }) {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [sciFiMovies, setSciFiMovies] = useState([]);
  const [animeMovies, setAnimeMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        if (useTmdb && tmdbKey) {
          const popular = await getPopularMovies(tmdbKey);
          const topRated = await getTopRatedMovies(tmdbKey);
          
          setTrendingMovies(popular.slice(0, 8));
          setFeaturedMovie(popular[0] || null);
          
          // Filters for categories from dynamic data
          const scifi = popular.filter(m => m.genres.includes("Sci-Fi") || m.genres.includes("Adventure"));
          setSciFiMovies(scifi.length > 0 ? scifi : topRated.slice(0, 4));
          
          const anime = popular.filter(m => m.genres.includes("Animation") || m.genres.includes("Fantasy"));
          setAnimeMovies(anime.length > 0 ? anime : topRated.slice(4, 8));
        } else {
          // Local mock mode
          setTrendingMovies(mockMovies.slice(0, 8));
          setFeaturedMovie(mockMovies[0]);
          
          const scifi = mockMovies.filter(m => m.genres.includes("Sci-Fi"));
          setSciFiMovies(scifi);
          
          const anime = mockMovies.filter(m => m.genres.includes("Anime") || m.genres.includes("Fantasy"));
          setAnimeMovies(anime);
        }
      } catch (err) {
        console.error("Error loading home page movies:", err);
        setError("Failed to fetch movies from TMDB. Please check your API key in settings or disable live DB.");
        
        // Fallback to mock data in case of error
        setTrendingMovies(mockMovies.slice(0, 8));
        setFeaturedMovie(mockMovies[0]);
        setSciFiMovies(mockMovies.filter(m => m.genres.includes("Sci-Fi")));
        setAnimeMovies(mockMovies.filter(m => m.genres.includes("Anime")));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [useTmdb, tmdbKey]);

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 className="spinner" size={48} />
        <p>Populating latest movies...</p>
      </div>
    );
  }

  const isWatchlisted = featuredMovie && watchlist.some(m => m.id === featuredMovie.id);

  return (
    <div className="home-page fade-in">
      {error && (
        <div className="error-alert">
          <span>{error}</span>
          <button className="btn btn-secondary btn-sm" onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {/* Hero Showcase */}
      {featuredMovie && (
        <div className="hero-banner">
          <div className="hero-backdrop-container">
            <div className="hero-overlay-left"></div>
            <div className="hero-overlay-bottom"></div>
            <img src={featuredMovie.backdrop} alt={featuredMovie.title} className="hero-backdrop" />
          </div>
          
          <div className="hero-content">
            <span className="featured-badge">FEATURED FILM</span>
            <h1 className="hero-title">{featuredMovie.title}</h1>
            {featuredMovie.tagline && <p className="hero-tagline">"{featuredMovie.tagline}"</p>}
            <p className="hero-overview">{featuredMovie.overview?.slice(0, 200)}...</p>
            
            <div className="hero-meta">
              <div className="hero-rating">
                <Star size={18} fill="var(--rating-gold)" stroke="var(--rating-gold)" />
                <span>{featuredMovie.rating.toFixed(1)} / 10</span>
              </div>
              <span className="hero-meta-divider">|</span>
              <span>{featuredMovie.releaseYear}</span>
              <span className="hero-meta-divider">|</span>
              <span>{featuredMovie.runtime}</span>
            </div>
            
            <div className="hero-actions">
              <Link to={`/movie/${featuredMovie.id}`} className="btn btn-primary">
                <Play size={18} fill="#fff" />
                <span>View Details</span>
              </Link>
              <button 
                className={`btn ${isWatchlisted ? "btn-secondary" : "btn-secondary"}`}
                onClick={() => onWatchlistToggle(featuredMovie)}
              >
                {isWatchlisted ? <Check size={18} /> : <Plus size={18} />}
                <span>{isWatchlisted ? "Watchlisted" : "Add Watchlist"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Rows */}
      <section className="row-section">
        <h2 className="section-title">Trending <span className="gradient-text">Now</span></h2>
        <div className="movies-grid">
          {trendingMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              isWatchlisted={watchlist.some(m => m.id === movie.id)} 
              onWatchlistToggle={onWatchlistToggle}
            />
          ))}
        </div>
      </section>

      <section className="row-section">
        <h2 className="section-title">Sci-Fi & Space <span className="gradient-text">Adventures</span></h2>
        <div className="movies-grid">
          {sciFiMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              isWatchlisted={watchlist.some(m => m.id === movie.id)} 
              onWatchlistToggle={onWatchlistToggle}
            />
          ))}
        </div>
      </section>

      <section className="row-section">
        <h2 className="section-title">Anime & Fantasy <span className="gradient-text">Mysteries</span></h2>
        <div className="movies-grid">
          {animeMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              isWatchlisted={watchlist.some(m => m.id === movie.id)} 
              onWatchlistToggle={onWatchlistToggle}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
