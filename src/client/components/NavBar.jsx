import { Link } from "react-router-dom";
import React, { useState } from 'react';
import SearchBar from './SearchBar'; // Assuming SearchBar is in the same directory

export default function NavBar() {
  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    // For example, redirect to a search results page or filter content on the current page
    console.log(`Search Term: ${searchTerm}`);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/api/users/login">Login</Link>
      <Link to="api/users/register">Register</Link>
      <Link to="/about-us">About Us</Link>
      <Link to="">Cart</Link>
    </nav>
  );
}
