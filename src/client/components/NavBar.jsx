import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/api/users/login">Login</Link>
      <Link to="">Register</Link>
      <Link to="">About Us</Link>
      <Link to="">Cart</Link>
    </nav>
  );
}
