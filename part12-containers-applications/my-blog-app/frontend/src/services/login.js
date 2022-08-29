import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log("axios.post to '/api/login' returns", response.data);
  return response.data;
};

const loginService = { login };

export default loginService;
