import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../style.css";

function SingleIceCream({ token, userId }) {
  const params = useParams();
  const icecreamId = params.id;

  const [icecream, setIceCream] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSingleIceCream() {
      try {
        const { data } = await axios.get(`/api/ice_cream/${icecreamId}`);

        // console.log(data);
        setIceCream(data);
      } catch (err) {
        setError("No icecream found with that name, " + icecreamId);
      }
    }

    fetchSingleIceCream();
  }, [icecreamId]);

  console.log("Single IceCream:", icecream);

  const handleAddToCart = async () => {
    try {
      if (!token) {
        alert("Please log in to add items to cart.");
        return;
      }
      await axios.post(
        "/api/cart/add-to-cart",
        { userId: userId, icecreamId: icecreamId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart. Please try again later.");
    }
  };

  if (error) {
    return <>{error}</>;
  }

  return (
    <div className="single-icecream-container">
      <h2>
        {icecream.flavor} - {icecream.size}
      </h2>
      <h3>{icecream.brand}</h3>
      <div className="images-container">
        <img src={icecream.imageurl} />
        <img src={icecream.nutrition} />
      </div>
      <p>Price: $ {icecream.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={() => navigate("/")}>Back to the List</button>
    </div>
  );
}

export default SingleIceCream;
