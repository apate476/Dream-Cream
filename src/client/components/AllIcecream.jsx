import { useState, useEffect } from "react";
import axios from "axios";
import "./allIceCream.css";
import { Link } from "react-router-dom";
// import { addToCart } from "../../server/db/cart";
// import { useNavigate } from "react-router-dom";

function AllIceCream() {
  const [IceCream, setIceCream] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // const navigate = useNavigate();

  useEffect(() => {
    async function fetchIceCream() {
      const { data } = await axios.get("/api/ice_cream");

      setIceCream(data);
    }

    fetchIceCream();
  }, []);

  // console.log(IceCream);

  const filteredIceCream = IceCream.filter(
    (ic) =>
      ic.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ic.flavor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = async (iceCreamId) => {
    try {
      // await addToCart(userId, iceCreamId);
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart. Please try again later.");
    }
  };

  return (
    <div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by brand or flavor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h1></h1>
      <div className="IceCream-container">
        {filteredIceCream.map((ic) => {
          return (
            <article key={ic.id}>
              <img src={ic.imageurl} alt="" />
              <h3>{ic.flavor}</h3>
              <h4>{ic.brand}</h4>
              <button onClick={() => handleAddToCart(ic.id)}>
                Add to Cart
              </button>
              <Link to={`/icecream/${ic.id}`} className="Link">
                View Details
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default AllIceCream;
