import { useState } from "react";
import Login from "./components/Login";
import AllIceCream from "./components/AllIcecream";
import SingleIceCream from "./components/SingleIcecream";
import NavBar from "./components/NavBar";
import AddUser from "./components/Register";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<AllIceCream />} />
          <Route path="/api/users/login" element={<Login />} />
          <Route path="/api/users/register" element={<AddUser />} />
        </Routes>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
