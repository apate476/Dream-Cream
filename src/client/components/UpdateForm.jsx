import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateForm({ token }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [initialInfo, setInitialInfo] = useState({});

  useEffect(() => {
    async function fetchInitialInfo() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInitialInfo(data);
        setFormData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchInitialInfo();
  }, [token]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedData = {};
    for (const key in formData) {
      if (formData[key] !== initialInfo[key]) {
        updatedData[key] = formData[key];
      }
    }

    if (Object.keys(updatedData).length === 0) {
      console.log("No changes detected.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/me",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      navigate("/api/users/account");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="update-form-container">
      <h2>Update Your Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </label>
        <label>
          ZIP Code:
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Update Information</button>
      </form>
    </div>
  );
}

export default UpdateForm;
