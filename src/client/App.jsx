import Login from "./components/Login";
import AllIceCream from "./components/AllIcecream";
import SingleIceCream from "./components/SingleIcecream";
import NavBar from "./components/NavBar";
import AddUser from "./components/Register";
import CompanyDescription from "./components/AboutUs";
import Cart from "./components/Cart";
import NewFlavorForm from "./components/NewFlavor";
import Account from "./components/Account";
import Cookies from "universal-cookie";
import UpdateForm from "./components/UpdateForm";

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const cookies = new Cookies();
  useEffect(() => {
    const login_token = cookies.get("login_token");
    if (login_token) {
      setToken(login_token);
    }
  }, []);

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
        <div></div>
        <h1>Dream Cream</h1>
        <NavBar loggedIn={loggedIn} logout={logout} />
      </header>

      <main>
        <aside></aside>
        <Routes>
          <Route path="/" element={<AllIceCream token={token} />} />
          <Route
            path="/icecream/:id"
            element={<SingleIceCream token={token} />}
          />
          <Route
            path="/api/users/login"
            element={
              <Login
                cookies={cookies}
                token={token}
                setToken={setToken}
                signin={signin}
              />
            }
          />
          <Route
            path="/api/users/register"
            element={
              <AddUser
                cookies={cookies}
                token={token}
                setToken={setToken}
                signin={signin}
              />
            }
          />
          <Route
            path="/api/users/account"
            element={<Account token={token} />}
          />
          <Route
            path="/api/users/update-profile"
            element={<UpdateForm token={token} />}
          />
          <Route path="/Cart" element={<Cart token={token} />} />
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
