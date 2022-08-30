import axios from "../util/apiClient";

const login = async (credentials) => {
  const response = await axios.post("api/login", credentials);
  console.log("axios.post to '/api/login' returns", response.data);
  return response.data;
};

const loginService = { login };

export default loginService;
