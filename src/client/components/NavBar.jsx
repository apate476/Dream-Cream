import { Link } from "react-router-dom";
import React from 'react';


export default function NavBar() {


  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/SearchBar">Search</Link>
      <Link to="api/users/register">Register</Link>
      <Link to="/api/users/login">Login</Link>
      <Link to="/api/orders/checkout">Cart</Link>
      <Link to="/about-us">About Us</Link>
    </nav>
  );
}
