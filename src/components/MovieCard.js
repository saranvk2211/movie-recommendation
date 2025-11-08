import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, isFavorite, isInWatchlist, onToggleFavorite, onToggleWatchlist }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(movie.id);
  };

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWatchlist(movie.id);
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <div className="movie-image-container">
          <img src={movie.image} alt={movie.title} className="movie-image" />
          <div className="movie-actions">
            <button 
              className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
            <button 
              className={`action-btn watchlist-btn ${isInWatchlist ? 'active' : ''}`}
              onClick={handleWatchlistClick}
              title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              {isInWatchlist ? '✅' : '➕'}
            </button>
          </div>
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-meta">
            <span className="movie-year">{movie.year}</span>
            <span className="movie-rating">⭐ {movie.rating}</span>
          </div>
          <p className="movie-genre">{movie.genre}</p>
          <div className="movie-status">
            {isFavorite && <span className="status-badge favorite">Favorite</span>}
            {isInWatchlist && <span className="status-badge watchlist">Watchlist</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;