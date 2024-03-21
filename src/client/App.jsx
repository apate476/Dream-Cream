import Login from "./components/Login";
import AllIceCream from "./components/AllIcecream";
import SingleIceCream from "./components/SingleIcecream";
import NavBar from "./components/NavBar";
import AddUser from "./components/Register";
import CompanyDescription from "./components/AboutUs";
import Cart from "./components/Cart";
import NewFlavorForm from "./components/NewFlavor";

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
  }

  return (
    <>
      <header>
        <NavBar loggedIn={loggedIn} logout={logout} />
      </header>

      <main>
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
            path="/api/account"
            element={<Account token={token} loggedIn={loggedIn} />}
          />
          <Route path="/api/orders/checkout" element={<Cart />} />
          <Route path="/about-us" element={<CompanyDescription />} />
          <Route path="/api/users/admin" element={<NewFlavorForm />} />
        </Routes>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
