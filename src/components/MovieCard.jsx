import React from "react";
import { Link } from "react-router-dom";
import { Star, Bookmark, BookmarkCheck } from "lucide-react";

export default function MovieCard({ movie, isWatchlisted, onWatchlistToggle }) {
  const { id, title, rating, releaseYear, genres, poster } = movie;

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onWatchlistToggle(movie);
  };

  return (
    <Link to={`/movie/${id}`} className="movie-card glass-panel fade-in">
      <div className="card-poster-container">
        <img src={poster} alt={title} className="card-poster" loading="lazy" />
        <div className="card-overlay">
          <button 
            className={`card-watchlist-btn ${isWatchlisted ? "active" : ""}`}
            onClick={handleWatchlistClick}
            title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            {isWatchlisted ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
          
          <div className="card-quick-info">
            <div className="card-rating">
              <Star size={16} fill="var(--rating-gold)" stroke="var(--rating-gold)" />
              <span>{rating ? rating.toFixed(1) : "N/A"}</span>
            </div>
            <span className="card-year">{releaseYear || "N/A"}</span>
          </div>
        </div>
      </div>
      
      <div className="card-details">
        <h4 className="card-title" title={title}>{title}</h4>
        <div className="card-genres">
          {genres?.slice(0, 2).map((g, index) => (
            <span key={index} className="genre-badge">{g}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
