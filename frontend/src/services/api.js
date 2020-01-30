import axios from "axios";

const api = axios.create({
  baseURL: "https://apitaskjr.herokuapp.com"
});

export default api;