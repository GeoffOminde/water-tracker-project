import axios from "axios";

// Replace IP if using physical device or emulator
const api = axios.create({
  baseURL: "http://10.0.2.2:8000", // Android emulator
  timeout: 5000,
});

export default api;
