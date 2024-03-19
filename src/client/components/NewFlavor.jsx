import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function NewFlavorForm() {
  const navigate = useNavigate();

  const [flavor, setFlavor] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [nutritionUrl, setNutritionUrl] = useState("");

  const payload = {
    flavor,
    brand,
    size,
    imageUrl,
    price,
    nutritionUrl,
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ice_cream/addflavor",
        payload
      );
    } catch (error) {
      console.error(error);
    }

    navigate("/");
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
          name="nutritionUrl"
          value={nutritionUrl}
          onChange={(event) => setNutritionUrl(event.target.value)}
        />
      </label>
    </form>
  );
}
