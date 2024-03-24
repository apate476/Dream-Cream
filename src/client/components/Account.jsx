import { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";

function Account({ token }) {
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    async function getAccountInfo() {
      try {
        if (!token) {
          return;
        }
        const { data } = await axios.get("http://localhost:3000/api/users/me", {
          headers: {
            Authorization: `Bearer ` + token,
          },
        });

        const user = data;
        console.log(user);
        setAccountInfo(user);
      } catch (error) {
        console.error(error);
      }
    }

    getAccountInfo();
  }, [token]);

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      {accountInfo ? (
        <div>
          <p>First Name: {accountInfo.firstname}</p>
          <p>Last Name: {accountInfo.lastname}</p>
          <p>Email: {accountInfo.email}</p>
          <p>
            Address: {accountInfo.address}, {accountInfo.city},{" "}
            {accountInfo.state} {accountInfo.zip}
          </p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}
export default Account;
