import { useState, useEffect } from "react";
import axios from "axios";
import "./allIceCream.css";
import { Link } from "react-router-dom";
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

  console.log(IceCream);

  const filteredIceCream = IceCream.filter(
    (ic) =>
      ic.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ic.flavor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="IceCream-container">
      <input
        type="text"
        placeholder="Search by brand or flavor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredIceCream.map((ic) => {
        return (
          <article key={ic.id}>
            <img src={ic.imageUrl} alt="" />
            <h3>{ic.flavor}</h3>
            <h4>{ic.brand}</h4>
            <Link to={`/icecream/${ic.id}`}>View Details</Link>
          </article>
        );
      })}
    </div>
  );
}

export default AllIceCream;
