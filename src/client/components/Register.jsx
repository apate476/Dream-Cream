import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function AddUser({ setToken }) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const register = async (payload) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        payload
      );
      const result = response.data;
      return result;
    } catch (err) {
      throw err;
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      firstName,
      lastName,
      email,
      password,
      address,
      city,
      state,
      zip,
    };

    console.log(payload);

    try {
      const registration = await register(payload);

      setToken(registration.token);
    } catch (err) {
      throw err;
    }
  }

  return (
    <>
      <h2>Register Here!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          City:
          <input value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          State:
          <input value={state} onChange={(e) => setState(e.target.value)} />
        </label>
        <label>
          ZIP Code:
          <input value={zip} onChange={(e) => setZip(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
