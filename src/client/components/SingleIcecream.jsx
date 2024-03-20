import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function SingleIceCream() {
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

  if (error) {
    return <>{error}</>;
  }

  return (
    <div className="single-icecream-container">
      <h1>{icecream.flavor}</h1>
      <h2>{icecream.brand}</h2>
      <h3>{icecream.size}</h3>
      <img src={icecream.imageUrl} />
      <img src={icecream.nutrition} alt="" />
      <p>${icecream.price}</p>
      <button onClick={() => navigate("/")}>View All</button>
    </div>
  );
}

export default SingleIceCream;
