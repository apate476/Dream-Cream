import Login from "./components/Login";
import AllIceCream from "./components/AllIcecream";
import SingleIceCream from "./components/SingleIcecream";
import NavBar from "./components/NavBar";
import AddUser from "./components/Register";
import CompanyDescription from "./components/AboutUs";
import Cart from "./components/Cart";
import NewFlavorForm from "./components/NewFlavor";
import Account from "./components/Account";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  function signin() {
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
  }

  return (
    <>
      <header>
        <NavBar loggedIn={loggedIn} logout={logout} />
      </header>

      <main>
        <aside></aside>
        <Routes>
          <Route path="/" element={<AllIceCream />} />
          <Route path="/icecream/:id" element={<SingleIceCream />} />
          <Route
            path="/api/users/login"
            element={<Login setToken={setToken} signin={signin} />}
          />
          <Route
            path="/api/users/register"
            element={<AddUser setToken={setToken} signin={signin} />}
          />
          <Route
            path="/api/users/account"
            element={<Account token={token} />}
          />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/about-us" element={<CompanyDescription />} />
          <Route path="/api/users/admin" element={<NewFlavorForm />} />
        </Routes>
        <aside></aside>
      </main>

      <footer>
        Dream Cream LLC
        <br></br>
        Contact us at 1-555-6969
        <br></br>
        Address: UAC Mars Base 6666 Hellas Planitia, Impact Basin, Mars, Milky
        Way Galaxy
      </footer>
    </>
  );
}

export default App;
