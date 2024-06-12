import axios from "axios";
// import { APP_URL } from "@env";

const api = axios.create({
  baseURL: "http://monipaep.icmc.usp.br:443",
});
export default api;
