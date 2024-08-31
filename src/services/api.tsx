import axios from "axios";
// import { APP_URL } from "@env";

const api = axios.create({
  baseURL: "http://monipaep.icmc.usp.br:443",
  // baseURL: "https://4aec-189-15-227-156.ngrok-free.app",
});
export default api;
