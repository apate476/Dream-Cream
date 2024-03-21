import { useEffect, useState } from "react";
import axios from "axios";

function Account({ token }) {
  const [accountInfo, setSccountInfo] = useState(null);

  useEffect(() => {
    async function getAccountInfo() {
      try {
        if (!token) {
          return;
        }
        const response = await axios.get();
      } catch (error) {}
    }
  });
}
