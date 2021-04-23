import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://devchallenges-thullo-api.herokuapp.com/api/v1"
      : "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const token = localStorage.getItem("thullo-user-token");

if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
