import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? "http://localhost:5001" : "http://localhost:5001";
  // process.env.NODE_ENV === "production" ? "http://13.40.224.232:5000" : "http://13.40.224.232:5000";

export default axios.create({
  baseURL,
});
