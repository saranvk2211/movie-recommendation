import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './pages/MovieDetail';
import UserAccount from './pages/UserAccount';
import SearchResults from './pages/SearchResults';
import Watchlist from './pages/Watchlist';
import { authAPI, userDataAPI, reviewsAPI, setToken, removeToken, getToken } from './services/api';
import './styles/App.css';

function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Movies array with all 24 movies
  const [movies] = useState([
    // Sci-Fi Movies (4 movies)
    {
      id: 1,
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      year: 2010,
      director: "Christopher Nolan",
      duration: "148 min",
      description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      image: "https://images.unsplash.com/photo-1489599809505-7c8e1c75fd6c?w=300&h=450&fit=crop",
      cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Joseph Gordon-Levitt"],
      trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
      id: 2,
      title: "The Matrix",
      genre: "Sci-Fi",
      rating: 8.7,
      year: 1999,
      director: "The Wachowskis",
      duration: "136 min",
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
      cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"],
      trailer: "https://www.youtube.com/embed/vKQi3bBA1y8"
    },
    {
      id: 3,
      title: "Interstellar",
      genre: "Sci-Fi",
      rating: 8.6,
      year: 2014,
      director: "Christopher Nolan",
      duration: "169 min",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
      cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
      trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
    },
    {
      id: 4,
      title: "Blade Runner 2049",
      genre: "Sci-Fi",
      rating: 8.0,
      year: 2017,
      director: "Denis Villeneuve",
      duration: "164 min",
      description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
      cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas", "Jared Leto"],
      trailer: "https://www.youtube.com/embed/gCcx85zbxz4"
    },

    // Drama Movies (4 movies)
    {
      id: 5,
      title: "The Shawshank Redemption",
      genre: "Drama",
      rating: 9.3,
      year: 1994,
      director: "Frank Darabont",
      duration: "142 min",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
      cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "James Whitmore"],
      trailer: "https://www.youtube.com/embed/6hB3S9bIaco"
    },
    {
      id: 6,
      title: "The Godfather",
      genre: "Drama",
      rating: 9.2,
      year: 1972,
      director: "Francis Ford Coppola",
      duration: "175 min",
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop",
      cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
      trailer: "https://www.youtube.com/embed/UaVTIH8mujA"
    },
    {
      id: 7,
      title: "Forrest Gump",
      genre: "Drama",
      rating: 8.8,
      year: 1994,
      director: "Robert Zemeckis",
      duration: "142 min",
      description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
      image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop",
      cast: ["Tom Hanks", "Robin Wright", "Gary Sinise", "Sally Field"],
      trailer: "https://www.youtube.com/embed/bLvqoHBptjg"
    },
    {
      id: 8,
      title: "The Pursuit of Happyness",
      genre: "Drama",
      rating: 8.0,
      year: 2006,
      director: "Gabriele Muccino",
      duration: "117 min",
      description: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
      image: "https://images.unsplash.com/photo-1489599809505-7c8e1c75fd6c?w=300&h=450&fit=crop",
      cast: ["Will Smith", "Jaden Smith", "Thandie Newton", "Brian Howe"],
      trailer: "https://www.youtube.com/embed/DMOBlEcRuw8"
    },

    // Action Movies (4 movies)
    {
      id: 9,
      title: "The Dark Knight",
      genre: "Action",
      rating: 9.0,
      year: 2008,
      director: "Christopher Nolan",
      duration: "152 min",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
      image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
      cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Maggie Gyllenhaal"],
      trailer: "https://www.youtube.com/embed/EXeTwQWrcwY"
    },
    {
      id: 10,
      title: "John Wick",
      genre: "Action",
      rating: 7.4,
      year: 2014,
      director: "Chad Stahelski",
      duration: "101 min",
      description: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and took everything from him.",
      image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop",
      cast: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen", "Willem Dafoe"],
      trailer: "https://www.youtube.com/embed/C0BMx-qxsP4"
    },
    {
      id: 11,
      title: "Mad Max: Fury Road",
      genre: "Action",
      rating: 8.1,
      year: 2015,
      director: "George Miller",
      duration: "120 min",
      description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners.",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
      cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
      trailer: "https://www.youtube.com/embed/hEJnMQG9ev8"
    },
    {
      id: 12,
      title: "Die Hard",
      genre: "Action",
      rating: 8.2,
      year: 1988,
      director: "John McTiernan",
      duration: "132 min",
      description: "A New York City police officer tries to save his wife and several others taken hostage by terrorists during a Christmas party.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
      cast: ["Bruce Willis", "Alan Rickman", "Bonnie Bedelia", "Reginald VelJohnson"],
      trailer: "https://www.youtube.com/embed/2TQ-pOvI6Xo"
    },

    // Horror Movies (4 movies)
    {
      id: 13,
      title: "The Conjuring",
      genre: "Horror",
      rating: 7.5,
      year: 2013,
      director: "James Wan",
      duration: "112 min",
      description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
      image: "https://images.unsplash.com/photo-1509248961151-e30a8c7b786a?w=300&h=450&fit=crop",
      cast: ["Patrick Wilson", "Vera Farmiga", "Ron Livingston", "Lili Taylor"],
      trailer: "https://www.youtube.com/embed/k10ETZ41q5o"
    },
    {
      id: 14,
      title: "Get Out",
      genre: "Horror",
      rating: 7.7,
      year: 2017,
      director: "Jordan Peele",
      duration: "104 min",
      description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
      cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford", "Catherine Keener"],
      trailer: "https://www.youtube.com/embed/DzfpyUB60YY"
    },
    {
      id: 15,
      title: "A Quiet Place",
      genre: "Horror",
      rating: 7.5,
      year: 2018,
      director: "John Krasinski",
      duration: "90 min",
      description: "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
      image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop",
      cast: ["Emily Blunt", "John Krasinski", "Millicent Simmonds", "Noah Jupe"],
      trailer: "https://www.youtube.com/embed/WR7cc5t7tv8"
    },
    {
      id: 16,
      title: "The Shining",
      genre: "Horror",
      rating: 8.4,
      year: 1980,
      director: "Stanley Kubrick",
      duration: "146 min",
      description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
      cast: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd", "Scatman Crothers"],
      trailer: "https://www.youtube.com/embed/S014oGZiSdI"
    },

    // Comedy Movies (4 movies)
    {
      id: 17,
      title: "Superbad",
      genre: "Comedy",
      rating: 7.6,
      year: 2007,
      director: "Greg Mottola",
      duration: "113 min",
      description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
      image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop",
      cast: ["Jonah Hill", "Michael Cera", "Christopher Mintz-Plasse", "Emma Stone"],
      trailer: "https://www.youtube.com/embed/4eaZ_48ZYog"
    },
    {
      id: 18,
      title: "Bridesmaids",
      genre: "Comedy",
      rating: 6.8,
      year: 2011,
      director: "Paul Feig",
      duration: "125 min",
      description: "Competition between the maid of honor and a bridesmaid, over who is the bride's best friend, threatens to upend the life of an out-of-work pastry chef.",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
      cast: ["Kristen Wiig", "Maya Rudolph", "Rose Byrne", "Melissa McCarthy"],
      trailer: "https://www.youtube.com/embed/FNppLrmdyug"
    },
    {
      id: 19,
      title: "The Hangover",
      genre: "Comedy",
      rating: 7.7,
      year: 2009,
      director: "Todd Phillips",
      duration: "100 min",
      description: "Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night and the bachelor missing.",
      image: "https://images.unsplash.com/photo-1489599809505-7c8e1c75fd6c?w=300&h=450&fit=crop",
      cast: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis", "Justin Bartha"],
      trailer: "https://www.youtube.com/embed/tcdUhdOlz9M"
    },
    {
      id: 20,
      title: "Step Brothers",
      genre: "Comedy",
      rating: 6.9,
      year: 2008,
      director: "Adam McKay",
      duration: "98 min",
      description: "Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.",
      image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop",
      cast: ["Will Ferrell", "John C. Reilly", "Mary Steenburgen", "Richard Jenkins"],
      trailer: "https://www.youtube.com/embed/CewglxElBK0"
    },

    // Romance Movies (4 movies)
    {
      id: 21,
      title: "The Notebook",
      genre: "Romance",
      rating: 7.8,
      year: 2004,
      director: "Nick Cassavetes",
      duration: "123 min",
      description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop",
      cast: ["Ryan Gosling", "Rachel McAdams", "James Garner", "Gena Rowlands"],
      trailer: "https://www.youtube.com/embed/BjJcYdEOI0k"
    },
    {
      id: 22,
      title: "La La Land",
      genre: "Romance",
      rating: 8.0,
      year: 2016,
      director: "Damien Chazelle",
      duration: "128 min",
      description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
      cast: ["Ryan Gosling", "Emma Stone", "John Legend", "Rosemarie DeWitt"],
      trailer: "https://www.youtube.com/embed/0pdqf4P9MB8"
    },
    {
      id: 23,
      title: "Pride & Prejudice",
      genre: "Romance",
      rating: 7.8,
      year: 2005,
      director: "Joe Wright",
      duration: "129 min",
      description: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy in this adaptation of Jane Austen's classic novel.",
      image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop",
      cast: ["Keira Knightley", "Matthew Macfadyen", "Brenda Blethyn", "Donald Sutherland"],
      trailer: "https://www.youtube.com/embed/1dYv5u6v55Y"
    },
    {
      id: 24,
      title: "Crazy Rich Asians",
      genre: "Romance",
      rating: 6.9,
      year: 2018,
      director: "Jon M. Chu",
      duration: "120 min",
      description: "This contemporary romantic comedy shows what happens when New Yorker Rachel Chu travels to meet her boyfriend's family in Singapore.",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=450&fit=crop",
      cast: ["Constance Wu", "Henry Golding", "Michelle Yeoh", "Gemma Chan"],
      trailer: "https://www.youtube.com/embed/ZQ-YX-5bAs0"
    }
  ]);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await authAPI.getUser();
          setUser(response.user);
          
          // Load user data
          const userDataResponse = await userDataAPI.getUserData();
          setFavorites(userDataResponse.favorites || []);
          setWatchlist(userDataResponse.watchlist || []);
        } catch (error) {
          console.error('Auth check failed:', error);
          removeToken();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const loginUser = async (userData) => {
    try {
      const response = await authAPI.login(userData);
      setToken(response.token);
      setUser(response.user);
      
      // Load user data after login
      const userDataResponse = await userDataAPI.getUserData();
      setFavorites(userDataResponse.favorites || []);
      setWatchlist(userDataResponse.watchlist || []);
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      setToken(response.token);
      setUser(response.user);
      setFavorites([]);
      setWatchlist([]);
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logoutUser = () => {
    removeToken();
    setUser(null);
    setFavorites([]);
    setWatchlist([]);
    setReviews([]);
  };

  const toggleFavorite = async (movieId) => {
    if (!user) {
      alert('Please login to add favorites');
      return;
    }
    
    try {
      const response = await userDataAPI.updateFavorites(movieId);
      setFavorites(response.favorites);
    } catch (error) {
      console.error('Failed to update favorites:', error);
      alert('Failed to update favorites');
    }
  };

  const toggleWatchlist = async (movieId) => {
    if (!user) {
      alert('Please login to manage watchlist');
      return;
    }
    
    try {
      const response = await userDataAPI.updateWatchlist(movieId);
      setWatchlist(response.watchlist);
    } catch (error) {
      console.error('Failed to update watchlist:', error);
      alert('Failed to update watchlist');
    }
  };

  const addReview = async (movieId, rating, comment) => {
    if (!user) {
      alert('Please login to add reviews');
      return;
    }

    try {
      const reviewData = { movieId, rating, comment };
      await reviewsAPI.addReview(reviewData);
      
      // Reload reviews for this movie
      const movieReviews = await reviewsAPI.getMovieReviews(movieId);
      setReviews(prev => {
        const otherReviews = prev.filter(r => r.movieId !== movieId);
        return [...otherReviews, ...movieReviews];
      });
    } catch (error) {
      console.error('Failed to add review:', error);
      alert('Failed to add review');
    }
  };

  // Load reviews for a movie
  const loadMovieReviews = async (movieId) => {
    try {
      const movieReviews = await reviewsAPI.getMovieReviews(movieId);
      setReviews(prev => {
        const otherReviews = prev.filter(r => r.movieId !== movieId);
        return [...otherReviews, ...movieReviews];
      });
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  // Load user reviews for account page
  const loadUserReviews = async () => {
    if (!user) return;
    
    try {
      const userReviews = await reviewsAPI.getUserReviews();
      setReviews(userReviews);
    } catch (error) {
      console.error('Failed to load user reviews:', error);
    }
  };

  // Get recommended movies based on user's favorites
  const getRecommendedMovies = () => {
    if (favorites.length === 0) return movies.slice(0, 4);

    const favoriteGenres = movies
      .filter(movie => favorites.includes(movie.id))
      .map(movie => movie.genre);

    const genreCount = {};
    favoriteGenres.forEach(genre => {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });

    const topGenre = Object.keys(genreCount).reduce((a, b) => 
      genreCount[a] > genreCount[b] ? a : b
    );

    return movies
      .filter(movie => 
        movie.genre === topGenre && !favorites.includes(movie.id)
      )
      .slice(0, 4);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={logoutUser} />
        <Routes>
          <Route path="/" element={
            <Home 
              movies={movies} 
              favorites={favorites}
              watchlist={watchlist}
              onToggleFavorite={toggleFavorite}
              onToggleWatchlist={toggleWatchlist}
              recommendedMovies={getRecommendedMovies()}
            />
          } />
          <Route path="/login" element={<Login onLogin={loginUser} />} />
          <Route path="/register" element={<Register onRegister={registerUser} />} />
          <Route path="/movie/:id" element={
            <MovieDetail 
              movies={movies} 
              favorites={favorites}
              watchlist={watchlist}
              reviews={reviews}
              onToggleFavorite={toggleFavorite}
              onToggleWatchlist={toggleWatchlist}
              onAddReview={addReview}
              onLoadReviews={loadMovieReviews}
              user={user}
            />
          } />
          <Route path="/account" element={
            <UserAccount 
              user={user} 
              favorites={favorites}
              watchlist={watchlist}
              reviews={reviews}
              movies={movies}
              onLoadReviews={loadUserReviews}
            />
          } />
          <Route path="/search" element={
            <SearchResults 
              movies={movies}
              favorites={favorites}
              watchlist={watchlist}
              onToggleFavorite={toggleFavorite}
              onToggleWatchlist={toggleWatchlist}
            />
          } />
          <Route path="/watchlist" element={
            <Watchlist 
              movies={movies.filter(movie => watchlist.includes(movie.id))}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onToggleWatchlist={toggleWatchlist}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;