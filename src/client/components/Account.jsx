import { useEffect, useState } from "react";
import axios from "axios";

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
            Authorization: `Bearer ${token}`,
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
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}
export default Account;
