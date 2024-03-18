import { useState, useEffect } from "react";
import axios from "axios";
import "./allIceCream.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AllIceCream() {
  const [IceCream, setIceCream] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchIceCream() {
      const { data } = await axios.get("/api/ice_cream");

      setIceCream(data);
    }

    fetchIceCream();
  }, []);

  console.log(IceCream);

  return (
    <div className="IceCream-container">
      {IceCream.map((ic) => {
        return (
          <article key={ic.id}>
            <h2 onClick={() => navigate(`/ice_cream/${ic.id}`)}></h2>
            <img src={ic.imageUrl} alt="" />
            <h3>{ic.flavor}</h3>
            <h4>{ic.brand}</h4>
          </article>
        );
      })}
    </div>
  );
}

export default AllIceCream;
