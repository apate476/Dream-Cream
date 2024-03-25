import { useState, useEffect } from "react";
import axios from "axios";
import "./allIceCream.css";
import { Link } from "react-router-dom";

function AllIceCream({ userId, token }) {
  const [IceCream, setIceCream] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchIceCream = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/ice_cream");
        setIceCream(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching ice cream:", error);
        setIsLoading(false);
      }
    };

    fetchIceCream();
  }, [userId, token]);

  // console.log(IceCream);

  const filteredIceCream = IceCream.filter(
    (ic) =>
      ic.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ic.flavor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = async (icecreamId) => {
    try {
      await axios.post(
        `/api/cart/add-to-cart`,
        { icecreamId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
      <div className="IceCream-container">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredIceCream.map((ic) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default AllIceCream;
