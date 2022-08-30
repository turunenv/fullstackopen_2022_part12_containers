import axios from "../util/apiClient";


let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get("/api/blogs");
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post("/api/blogs", newBlog, config);
  return response.data;
};

const update = async (id, updatedBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`/api/blogs/${id}`, updatedBlog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios.delete(`/api/blogs/${id}`, config);
};

const getComments = async (id) => {
  const response = await axios.get(`/api/blogs/${id}/comments`);
  return response.data;
}

const addComment = async (id, comment) => {
  const commentObj = {
    comment,
    blog: id,
  };
  const response = await axios.post(`/api/blogs/${id}/comments`, commentObj);
  return response.data;
}

const blogService = {
  getAll,
  create,
  update,
  deleteBlog,
  setToken,
  getComments,
  addComment,
};

export default blogService;
