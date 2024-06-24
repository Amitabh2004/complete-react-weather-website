import { useState, useEffect } from "react";
import axios from "axios";

async function fetchIPLocation(ip) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching IP location data: ", error);
    return null;
  }
}

const useIPLocation = () => {
  const [ip, setIP] = useState("");
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        console.log(response.data.ip);
        setIP(response.data.ip);
      } catch (error) {
        console.log("Error fetching IP address: ", error);
      }
    };
    fetchIP();
  }, []);

  useEffect(() => {
    if (ip) {
      const fetchLocation = async () => {
        const data = await fetchIPLocation(ip);
        console.log(data);
        setLocationData(data);
      };
      fetchLocation();
    }
  }, [ip]);

  return locationData;
};

export default useIPLocation;
