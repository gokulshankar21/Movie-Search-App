import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, Clock, Calendar, Film, Bookmark, BookmarkCheck, ArrowLeft, Send, Sparkles } from "lucide-react";
import { getMovieById, mockMovies } from "../services/movieData";
import { getTmdbMovieDetails } from "../services/tmdbApi";
import MovieCard from "./MovieCard";

export default function MovieDetails({ watchlist, onWatchlistToggle, tmdbKey, useTmdb, reviewsState, setReviewsState }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review Form state
  const [author, setAuthor] = useState("");
  const [userRating, setUserRating] = useState(10);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadMovieDetails() {
      setLoading(true);
      setError(null);
      try {
        if (useTmdb && tmdbKey) {
          const fetched = await getTmdbMovieDetails(id, tmdbKey);
          setMovie(fetched);
        } else {
          // Local database
          const localMovie = getMovieById(id);
          if (localMovie) {
            setMovie(localMovie);
          } else {
            setError("Movie not found in the local database.");
          }
        }
      } catch (err) {
        console.error("Error loading movie details:", err);
        setError("Failed to fetch movie details. Please check your network or return to local mode.");
        
        // Fallback to local
        const localMovie = getMovieById(id);
        if (localMovie) setMovie(localMovie);
      } finally {
        setLoading(false);
      }
    }
    loadMovieDetails();
  }, [id, useTmdb, tmdbKey]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border"></div>
        <p>Loading cinematic details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="error-container glass-panel fade-in">
        <h2>Oops! Something went wrong</h2>
        <p>{error || "We couldn't retrieve details for this film."}</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    );
  }

  // Watchlist check
  const isWatchlisted = watchlist.some(m => m.id === movie.id);

  // Combine default reviews and custom local reviews for this movie ID
  const localMovieReviews = reviewsState[movie.id] || [];
  const allReviews = [...(movie.reviews || []), ...localMovieReviews];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const newReview = {
      id: Date.now(),
      author: author.trim(),
      rating: parseInt(userRating),
      content: content.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric"
      })
    };

    const updatedReviews = {
      ...reviewsState,
      [movie.id]: [newReview, ...localMovieReviews]
    };

    setReviewsState(updatedReviews);
    localStorage.setItem("cinepulse_reviews", JSON.stringify(updatedReviews));

    // Clear form
    setAuthor("");
    setContent("");
    setUserRating(10);
  };

  // Get similar movies details
  // In dynamic mode similar will be a list of movie IDs from API.
  // We'll map them from our local database or fetch if necessary.
  const similarMovies = mockMovies.filter(m => 
    movie.similar?.includes(m.id) && m.id !== movie.id
  );

  return (
    <div className="movie-details-page fade-in">
      <button className="back-btn btn btn-secondary" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      {/* Backdrop Section */}
      <div className="details-hero">
        <div className="hero-backdrop-container">
          <div className="hero-overlay-bottom"></div>
          <img src={movie.backdrop} alt={movie.title} className="hero-backdrop" />
        </div>
        
        <div className="details-hero-content">
          <div className="details-meta-row">
            <div className="details-rating-badge">
              <Star size={16} fill="var(--rating-gold)" stroke="var(--rating-gold)" />
              <span>{movie.rating ? movie.rating.toFixed(1) : "N/A"}</span>
            </div>
            <span className="bullet">•</span>
            <span>{movie.releaseYear}</span>
            <span className="bullet">•</span>
            <span>{movie.runtime}</span>
          </div>
          <h1 className="details-title">{movie.title}</h1>
          {movie.tagline && <p className="details-tagline">"{movie.tagline}"</p>}
        </div>
      </div>

      {/* Grid Layout Info */}
      <div className="details-main-grid">
        <div className="details-info-column">
          <div className="details-poster-wrap glass-panel">
            <img src={movie.poster} alt={movie.title} className="details-poster" />
          </div>
          
          <button 
            className={`btn btn-primary watchlist-action-btn ${isWatchlisted ? "watchlist-active" : ""}`}
            onClick={() => onWatchlistToggle(movie)}
          >
            {isWatchlisted ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            <span>{isWatchlisted ? "In Watchlist" : "Add to Watchlist"}</span>
          </button>

          <div className="details-facts glass-panel">
            <div className="fact-item">
              <span className="fact-label">Director</span>
              <span className="fact-value">{movie.director || "N/A"}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Released</span>
              <span className="fact-value">{movie.releaseDate}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Budget</span>
              <span className="fact-value">{movie.budget || "N/A"}</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Revenue</span>
              <span className="fact-value">{movie.revenue || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="details-content-column">
          {/* Overview */}
          <section className="details-section">
            <h3 className="section-subtitle">Synopsis</h3>
            <p className="overview-text">{movie.overview}</p>
            <div className="details-genres">
              {movie.genres?.map(g => (
                <span key={g} className="genre-badge">{g}</span>
              ))}
            </div>
          </section>

          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <section className="details-section">
              <h3 className="section-subtitle">Principal Cast</h3>
              <div className="cast-row">
                {movie.cast.map((actor, idx) => (
                  <div key={idx} className="cast-card glass-panel">
                    <img src={actor.image} alt={actor.name} className="cast-img" />
                    <div className="cast-info">
                      <span className="cast-name">{actor.name}</span>
                      <span className="cast-character">{actor.character}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Trailer */}
          {movie.trailerUrl && (
            <section className="details-section">
              <h3 className="section-subtitle">Trailer</h3>
              <div className="trailer-container glass-panel">
                <iframe 
                  src={movie.trailerUrl} 
                  title={`${movie.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="trailer-iframe"
                ></iframe>
              </div>
            </section>
          )}

          {/* Reviews Section */}
          <section className="details-section reviews-section">
            <h3 className="section-subtitle">Audience Reviews</h3>
            
            <div className="reviews-layout">
              {/* Write Review Form */}
              <div className="write-review glass-panel">
                <h4><Sparkles size={16} className="gradient-text" /> Write a Review</h4>
                <form onSubmit={handleReviewSubmit} className="review-form">
                  <div className="form-group-row">
                    <div className="form-group">
                      <label>Nickname</label>
                      <input 
                        type="text" 
                        placeholder="e.g. JohnDoe"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Rating</label>
                      <select 
                        value={userRating}
                        onChange={(e) => setUserRating(parseInt(e.target.value))}
                        className="form-input"
                      >
                        {[10,9,8,7,6,5,4,3,2,1].map(num => (
                          <option key={num} value={num}>{num} ★</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Your thoughts</label>
                    <textarea 
                      placeholder="Write your review here..."
                      rows="4"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      className="form-input"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-review-btn">
                    <Send size={16} /> Submit Review
                  </button>
                </form>
              </div>

              {/* Review Lists */}
              <div className="reviews-list">
                {allReviews.length > 0 ? (
                  allReviews.map((rev) => (
                    <div key={rev.id} className="review-card glass-panel fade-in">
                      <div className="review-header">
                        <div className="review-author-info">
                          <span className="review-author">{rev.author}</span>
                          <span className="review-date">{rev.date}</span>
                        </div>
                        <div className="review-score">
                          <Star size={14} fill="var(--rating-gold)" stroke="var(--rating-gold)" />
                          <span>{rev.rating} / 10</span>
                        </div>
                      </div>
                      <p className="review-content">{rev.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews-box glass-panel">
                    <p>No reviews yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <section className="details-section similar-section">
              <h3 className="section-subtitle">You May Also Like</h3>
              <div className="similar-grid">
                {similarMovies.map(similarMovie => (
                  <MovieCard 
                    key={similarMovie.id} 
                    movie={similarMovie} 
                    isWatchlisted={watchlist.some(m => m.id === similarMovie.id)} 
                    onWatchlistToggle={onWatchlistToggle}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
