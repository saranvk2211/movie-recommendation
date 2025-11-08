import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserAccount.css';

const UserAccount = ({ user, favorites, watchlist, reviews, movies }) => {
  if (!user) {
    return (
      <div className="not-logged-in">
        <h2>Please log in to view your account</h2>
        <Link to="/login" className="auth-redirect">Login</Link>
      </div>
    );
  }

  const userReviews = reviews.filter(review => review.userId === user.id);
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.id));
  const watchlistMovies = movies.filter(movie => watchlist.includes(movie.id));

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="user-account">
      <div className="account-header">
        <h1>Welcome back, {user.name}!</h1>
        <p>Manage your movie preferences and activity</p>
      </div>

      <div className="account-stats">
        <div className="stat-card">
          <h3>{favorites.length}</h3>
          <p>Favorites</p>
        </div>
        <div className="stat-card">
          <h3>{watchlist.length}</h3>
          <p>Watchlist</p>
        </div>
        <div className="stat-card">
          <h3>{userReviews.length}</h3>
          <p>Reviews</p>
        </div>
      </div>

      <div className="account-info">
        <div className="info-card">
          <h3>Personal Information</h3>
          <div className="info-item">
            <label>Name:</label>
            <span>{user.name}</span>
          </div>
          <div className="info-item">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
        </div>

        <div className="info-card">
          <h3>Favorite Movies</h3>
          <div className="movies-list">
            {favoriteMovies.length > 0 ? (
              favoriteMovies.map(movie => (
                <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-item">
                  <img src={movie.image} alt={movie.title} />
                  <span>{movie.title}</span>
                </Link>
              ))
            ) : (
              <p className="no-items">No favorite movies yet.</p>
            )}
          </div>
        </div>

        <div className="info-card">
          <h3>Watchlist</h3>
          <div className="movies-list">
            {watchlistMovies.length > 0 ? (
              watchlistMovies.map(movie => (
                <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-item">
                  <img src={movie.image} alt={movie.title} />
                  <span>{movie.title}</span>
                </Link>
              ))
            ) : (
              <p className="no-items">Your watchlist is empty.</p>
            )}
          </div>
        </div>

        <div className="info-card">
          <h3>My Reviews</h3>
          <div className="reviews-list">
            {userReviews.length > 0 ? (
              userReviews.map(review => {
                const movie = movies.find(m => m.id === review.movieId);
                return (
                  <div key={review.id} className="user-review">
                    <div className="review-movie">
                      <Link to={`/movie/${movie?.id}`} className="movie-link">
                        <strong>{movie?.title}</strong>
                      </Link>
                      <div className="review-stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <span className="review-date">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="no-items">You haven't written any reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;