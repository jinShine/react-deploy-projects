import axios from "axios";

export const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});
