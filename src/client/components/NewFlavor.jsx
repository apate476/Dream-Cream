import { useState } from "react";
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";

export default function NewFlavorForm() {
  const navigate = useNavigate();

  const [flavor, setFlavor] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [nutrition, setNutrition] = useState("");

  const addFlavor = async (payload) => {
    try {
      const response = await axios.post("/api/ice_cream", payload);

      const result = response.data;
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      flavor,
      brand,
      size,
      imageUrl,
      price,
      nutrition,
    };

    setFlavor("");
    setBrand("");
    setSize("");
    setImageUrl("");
    setPrice("");
    setNutrition("");

    console.log(payload);

    try {
      const addIceCream = await addFlavor(payload);
    } catch (error) {
      throw error;
    }
    // navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Flavor!</h1>
      <label>
        Flavor:
        <input
          name="flavor"
          value={flavor}
          onChange={(event) => setFlavor(event.target.value)}
        />
      </label>
      <label>
        Brand:
        <input
          name="brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />
      </label>
      <label>
        Size:
        <input
          name="size"
          value={size}
          onChange={(event) => setSize(event.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </label>
      <label>
        Image Url:
        <input
          name="imageUrl"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
        />
      </label>
      <label>
        Nutrition Facts Image:
        <input
          name="nutrition"
          value={nutrition}
          onChange={(event) => setNutrition(event.target.value)}
        />
      </label>
      <button type="submit">Add to List</button>
    </form>
  );
}
