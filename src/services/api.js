import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: "https://the-fitness-room.herokuapp.com",
});

export default api;
