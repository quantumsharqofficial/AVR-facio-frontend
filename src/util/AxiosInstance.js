import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3005",
  // baseURL: "https://avr.quantumfacio.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
