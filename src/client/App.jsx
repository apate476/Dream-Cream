import Login from "./components/Login";
import AllIceCream from "./components/AllIcecream";
import SingleIceCream from "./components/SingleIcecream";
import NavBar from "./components/NavBar";
import AddUser from "./components/Register";
import CompanyDescription from "./components/AboutUs";
import Cart from "./components/Cart";
import NewFlavorForm from "./components/NewFlavor";
import Checkout from "./components/Checkout";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>
        <aside></aside>
        <Routes>
          <Route path="/" element={<AllIceCream />} />
          <Route path="/icecream/:id" element={<SingleIceCream />} />
          <Route path="/api/users/login" element={<Login />} />
          <Route path="/api/users/register" element={<AddUser />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
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
        Address: UAC Mars Base 6666 Hellas Planitia, Impact Basin, Mars, Milky Way Galaxy

      </footer>
    </>
  );
}

export default App;
