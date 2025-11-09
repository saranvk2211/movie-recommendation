import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log('Search:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          MovieRec
        </Link>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/recommendations" className="nav-link">Recommendations</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;