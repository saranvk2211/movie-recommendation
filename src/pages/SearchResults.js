// src/pages/SearchResults.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import '../styles/SearchResults.css';

const SearchResults = ({ movies }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q')?.toLowerCase() || '';

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(query) ||
    movie.genre.toLowerCase().includes(query) ||
    movie.director.toLowerCase().includes(query) ||
    movie.cast.some(actor => actor.toLowerCase().includes(query))
  );

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {filteredMovies.length > 0 ? (
        <div className="results-grid">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No movies found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;