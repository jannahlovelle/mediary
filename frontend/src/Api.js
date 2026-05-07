import axios from "axios";

const API_URL = "http://localhost:8080/api/ideas";

export const getIdeas = () => axios.get(API_URL);
export const createIdea = (idea) => axios.post(API_URL, idea);
export const deleteIdea = (id) => axios.delete(`${API_URL}/${id}`);
