import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Film, Search, Bookmark, Settings, X, Key, Info } from "lucide-react";

export default function Navbar({ watchlistCount, tmdbKey, setTmdbKey, useTmdb, setUseTmdb }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [inputKey, setInputKey] = useState(tmdbKey || "");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const saveSettings = (e) => {
    e.preventDefault();
    setTmdbKey(inputKey.trim());
    if (inputKey.trim()) {
      setUseTmdb(true);
    } else {
      setUseTmdb(false);
    }
    setShowSettings(false);
  };

  return (
    <nav className="glass-navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Film className="logo-icon" />
          <span>Cine<span className="gradient-text">Pulse</span></span>
        </Link>

        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link 
            to="/search" 
            className={`nav-link ${location.pathname === "/search" ? "active" : ""}`}
          >
            Explore
          </Link>
        </div>

        <form onSubmit={handleSearchSubmit} className="nav-search-form">
          <input
            type="text"
            placeholder="Quick search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="nav-search-input"
          />
          <button type="submit" className="nav-search-btn" aria-label="Search">
            <Search size={18} />
          </button>
        </form>

        <div className="nav-actions">
          <Link to="/search?filter=watchlist" className="watchlist-btn btn btn-secondary" title="View Watchlist">
            <Bookmark size={18} />
            <span className="watchlist-label">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="watchlist-badge scale-in">{watchlistCount}</span>
            )}
          </Link>

          <button 
            className={`settings-btn btn btn-secondary btn-icon-only ${useTmdb ? "active-api" : ""}`}
            onClick={() => setShowSettings(!showSettings)}
            title="Configure TMDB API"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Settings Modal overlay */}
      {showSettings && (
        <div className="modal-backdrop" onClick={() => setShowSettings(false)}>
          <div className="modal-content glass-panel scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>API Settings</h3>
              <button className="close-btn" onClick={() => setShowSettings(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={saveSettings} className="settings-form">
              <p className="settings-desc">
                By default, CinePulse runs on a local high-quality mock database.
                Enter a TMDB API key to search and view the entire live movie database.
              </p>
              
              <div className="form-group">
                <label htmlFor="tmdb-key-input">
                  <Key size={16} /> TMDB Read Access Token (v4) or API Key (v3)
                </label>
                <input
                  id="tmdb-key-input"
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Enter TMDB API Key..."
                  className="form-input"
                />
              </div>

              <div className="api-toggle-group">
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={useTmdb && !!tmdbKey}
                    disabled={!tmdbKey && !inputKey}
                    onChange={(e) => setUseTmdb(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
                <span className="toggle-label">
                  Use Live TMDB Database {useTmdb && tmdbKey ? "(Active)" : "(Inactive)"}
                </span>
              </div>

              {tmdbKey && (
                <div className="info-box">
                  <Info size={16} />
                  <span>API Key loaded successfully! Clear input and save to return to local mock mode.</span>
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowSettings(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
