import React from 'react';
import MovieCard from '../components/MovieCard';
import '../styles/Home.css';

const Home = ({ movies, favorites, watchlist, onToggleFavorite, onToggleWatchlist, recommendedMovies }) => {
  const genres = [...new Set(movies.map(movie => movie.genre))];

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Discover Your Next Favorite Movie</h1>
        <p>Personalized recommendations based on your taste</p>
      </div>

      {/* Recommendations Section */}
      {recommendedMovies.length > 0 && (
        <section className="genre-section">
          <h2 className="genre-title">Recommended For You</h2>
          <div className="movies-grid">
            {recommendedMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                isInWatchlist={watchlist.includes(movie.id)}
                onToggleFavorite={onToggleFavorite}
                onToggleWatchlist={onToggleWatchlist}
              />
            ))}
          </div>
        </section>
      )}

      {/* Genre Sections */}
      {genres.map(genre => (
        <section key={genre} className="genre-section">
          <h2 className="genre-title">{genre}</h2>
          <div className="movies-grid">
            {movies
              .filter(movie => movie.genre === genre)
              .map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={favorites.includes(movie.id)}
                  isInWatchlist={watchlist.includes(movie.id)}
                  onToggleFavorite={onToggleFavorite}
                  onToggleWatchlist={onToggleWatchlist}
                />
              ))
            }
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;