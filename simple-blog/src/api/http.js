const token = "token";
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: { Authoriation: "Bearer" + token },
});
