import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetails from "./components/MovieDetails";
import { Film } from "lucide-react";

export default function App() {
  // Watchlist state with localStorage persistence
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("cinepulse_watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // TMDB API integration configuration
  const [tmdbKey, setTmdbKey] = useState(() => {
    return localStorage.getItem("cinepulse_tmdb_key") || "";
  });

  const [useTmdb, setUseTmdb] = useState(() => {
    return localStorage.getItem("cinepulse_use_tmdb") === "true";
  });

  // Custom user reviews mapping movie IDs to reviews arrays
  const [reviewsState, setReviewsState] = useState(() => {
    const saved = localStorage.getItem("cinepulse_reviews");
    return saved ? JSON.parse(saved) : {};
  });

  // Sync state modifications to localStorage
  useEffect(() => {
    localStorage.setItem("cinepulse_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("cinepulse_tmdb_key", tmdbKey);
  }, [tmdbKey]);

  useEffect(() => {
    localStorage.setItem("cinepulse_use_tmdb", useTmdb.toString());
  }, [useTmdb]);

  const handleWatchlistToggle = (movie) => {
    setWatchlist((prev) => {
      const isAlreadyIn = prev.some((m) => m.id === movie.id);
      if (isAlreadyIn) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar 
          watchlistCount={watchlist.length} 
          tmdbKey={tmdbKey}
          setTmdbKey={setTmdbKey}
          useTmdb={useTmdb}
          setUseTmdb={setUseTmdb}
        />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  watchlist={watchlist} 
                  onWatchlistToggle={handleWatchlistToggle} 
                  tmdbKey={tmdbKey}
                  useTmdb={useTmdb}
                />
              } 
            />
            <Route 
              path="/search" 
              element={
                <Search 
                  watchlist={watchlist} 
                  onWatchlistToggle={handleWatchlistToggle} 
                  tmdbKey={tmdbKey}
                  useTmdb={useTmdb}
                />
              } 
            />
            <Route 
              path="/movie/:id" 
              element={
                <MovieDetails 
                  watchlist={watchlist} 
                  onWatchlistToggle={handleWatchlistToggle} 
                  tmdbKey={tmdbKey}
                  useTmdb={useTmdb}
                  reviewsState={reviewsState}
                  setReviewsState={setReviewsState}
                />
              } 
            />
          </Routes>
        </main>

        <footer className="glass-footer">
          <div className="footer-content">
            <div className="footer-brand">
              <Film className="footer-logo-icon" />
              <span>Cine<span className="gradient-text">Pulse</span></span>
            </div>
            <p className="footer-tagline">Your ultimate cinematic companion.</p>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} CinePulse. Powered by React, Vite and TMDB.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
