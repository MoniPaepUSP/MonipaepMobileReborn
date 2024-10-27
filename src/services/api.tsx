import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  // baseURL: "https://4aec-189-15-227-156.ngrok-free.app",
});
export default api;
