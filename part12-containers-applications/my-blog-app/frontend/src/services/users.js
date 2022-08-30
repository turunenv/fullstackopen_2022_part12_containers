import axios from "../util/apiClient";

const getUsers = async() => {
  const response = await axios.get('/api/users');
  return response.data;
}

const getUserById = async(id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
}

const userService = {
  getUsers,
  getUserById,
}

export default userService;