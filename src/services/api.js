const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return apiCall('/register', {
      method: 'POST',
      body: userData,
    });
  },

  login: async (credentials) => {
    return apiCall('/login', {
      method: 'POST',
      body: credentials,
    });
  },

  getUser: async () => {
    return apiCall('/user');
  },
};

// User Data API
export const userDataAPI = {
  updateFavorites: async (movieId) => {
    return apiCall('/favorites', {
      method: 'PUT',
      body: { movieId },
    });
  },

  updateWatchlist: async (movieId) => {
    return apiCall('/watchlist', {
      method: 'PUT',
      body: { movieId },
    });
  },

  getUserData: async () => {
    return apiCall('/user-data');
  },
};

// Reviews API
export const reviewsAPI = {
  addReview: async (reviewData) => {
    return apiCall('/reviews', {
      method: 'POST',
      body: reviewData,
    });
  },

  getMovieReviews: async (movieId) => {
    return apiCall(`/reviews/${movieId}`);
  },

  getUserReviews: async () => {
    return apiCall('/user-reviews');
  },
};

// Store token
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};