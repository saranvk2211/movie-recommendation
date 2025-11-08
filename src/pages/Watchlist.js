import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import '../styles/Watchlist.css';

const Watchlist = ({ movies, favorites, onToggleFavorite, onToggleWatchlist }) => {
  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <h1>My Watchlist</h1>
        <p>Movies you want to watch later</p>
      </div>

      {movies.length > 0 ? (
        <div className="watchlist-grid">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              isInWatchlist={true}
              onToggleFavorite={onToggleFavorite}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      ) : (
        <div className="empty-watchlist">
          <div className="empty-state">
            <h2>Your watchlist is empty</h2>
            <p>Start adding movies you want to watch later!</p>
            <Link to="/" className="browse-button">
              Browse Movies
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;