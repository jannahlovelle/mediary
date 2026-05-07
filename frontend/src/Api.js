import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const getIdeas = () => axios.get(API_URL);
export const createIdea = (idea) => axios.post(API_URL, idea);
export const deleteIdea = (id) => axios.delete(`${API_URL}/${id}`);

// This runs BEFORE every request is sent
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
