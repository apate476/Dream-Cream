import { useState } from "react";
import Login from "./components/Login";
import AllIceCream from "./components/AllIcecream";
import SingleIceCream from "./components/SingleIcecream";
import NavBar from "./components/NavBar";
import AddUser from "./components/Register";
import CompanyDescription from "./components/AboutUs";
import Checkout from "./components/Checkout";
import SearchBar from "./components/SearchBar";

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
          <Route path="/icecream/:id" element={<SingleIceCream />} />
          <Route path="/api/users/login" element={<Login />} />
          <Route path="/api/users/register" element={<AddUser />} />
          <Route path="/api/orders_products" element={<Checkout />} />
          <Route path="/about-us" element={<CompanyDescription />} />
          <Route path="/SearchBar" element={<SearchBar />} />
        </Routes>
      </main>

      <footer></footer>
    </>
  );
}

export default App;
