import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/MovieDetail.css';

const MovieDetail = ({ movies, favorites, watchlist, reviews, onToggleFavorite, onToggleWatchlist, onAddReview, user }) => {
  const { id } = useParams();
  const movie = movies.find(m => m.id === parseInt(id));
  const [showTrailer, setShowTrailer] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  if (!movie) {
    return <div className="not-found">Movie not found</div>;
  }

  const movieReviews = reviews.filter(review => review.movieId === movie.id);
  const averageRating = movieReviews.length > 0 
    ? (movieReviews.reduce((sum, review) => sum + review.rating, 0) / movieReviews.length).toFixed(1)
    : null;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewForm.comment.trim()) {
      onAddReview(movie.id, parseInt(reviewForm.rating), reviewForm.comment);
      setReviewForm({ rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  const handleTrailerClick = () => {
    setShowTrailer(true);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="movie-detail">
      <div className="movie-header">
        <div className="poster-section">
          <img src={movie.image} alt={movie.title} className="detail-image" />
          <div className="movie-actions-detail">
            <button 
              className={`action-btn detail-favorite ${favorites.includes(movie.id) ? 'active' : ''}`}
              onClick={() => onToggleFavorite(movie.id)}
            >
              {favorites.includes(movie.id) ? '❤️ Favorite' : '🤍 '}
            </button>
            <button 
              className={`action-btn detail-watchlist ${watchlist.includes(movie.id) ? 'active' : ''}`}
              onClick={() => onToggleWatchlist(movie.id)}
            >
              {watchlist.includes(movie.id) ? '✅ In Watchlist' : '➕ '}
            </button>
            <button className="action-btn trailer-btn" onClick={handleTrailerClick}>
              🎬
            </button>
            {user && (
              <button 
                className="action-btn review-btn"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                ✍️
              </button>
            )}
          </div>
        </div>

        <div className="movie-details">
          <h1>{movie.title}</h1>
          
          <div className="rating-section">
            <div className="official-rating">
              <span className="rating-badge">⭐ {movie.rating}/10</span>
              <span className="rating-source">IMDb</span>
            </div>
            {averageRating && (
              <div className="user-rating">
                <span className="rating-badge user">⭐ {averageRating}/5</span>
                <span className="rating-source">User Rating ({movieReviews.length} reviews)</span>
              </div>
            )}
          </div>

          <div className="movie-meta-detail">
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
            <span className="genre-badge">{movie.genre}</span>
          </div>

          <p className="movie-director">Director: <strong>{movie.director}</strong></p>
          
          <div className="cast-section">
            <h3>Cast</h3>
            <div className="cast-list">
              {movie.cast.map((actor, index) => (
                <span key={index} className="cast-member">{actor}</span>
              ))}
            </div>
          </div>

          <div className="description-section">
            <h3>Synopsis</h3>
            <p className="movie-description">{movie.description}</p>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="trailer-modal">
          <div className="trailer-content">
            <button className="close-btn" onClick={() => setShowTrailer(false)}>×</button>
            <h3>{movie.title} - Trailer</h3>
            <div className="trailer-container">
              <iframe
                width="100%"
                height="400"
                src={movie.trailer}
                title={`${movie.title} trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && user && (
        <div className="review-modal">
          <div className="review-form">
            <button className="close-btn" onClick={() => setShowReviewForm(false)}>×</button>
            <h3>Write a Review for {movie.title}</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="rating-input">
                <label>Your Rating:</label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <label key={star} className="star-label">
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={reviewForm.rating === star}
                        onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                      />
                      <span className={star <= reviewForm.rating ? 'star filled' : 'star'}>
                        {star <= reviewForm.rating ? '★' : '☆'}
                      </span>
                    </label>
                  ))}
                </div>
                <span className="rating-value">{reviewForm.rating}/5</span>
              </div>
              <div className="comment-input">
                <label>Your Review:</label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  placeholder="Share your thoughts about this movie..."
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="submit-review-btn">Submit Review</button>
            </form>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>User Reviews {movieReviews.length > 0 && `(${movieReviews.length})`}</h2>
        
        {!user && (
          <div className="login-prompt">
            <p>Please <Link to="/login">login</Link> to write a review.</p>
          </div>
        )}

        {movieReviews.length === 0 ? (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to review this movie!</p>
          </div>
        ) : (
          <div className="reviews-list">
            {movieReviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <strong>{review.userName}</strong>
                    <div className="review-stars">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="review-date">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to="/" className="back-button">← Back to Home</Link>
    </div>
  );
};

export default MovieDetail;