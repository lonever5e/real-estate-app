import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-estate-app-api-gamma.vercel.app/",
  withCredentials: true,
});

export default apiRequest;
