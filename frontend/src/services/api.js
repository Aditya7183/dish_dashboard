import axios from "axios";

const API = "http://localhost:5000/api";

export const getDishes = () => axios.get(`${API}/dishes`).then(res => res.data);

export const toggleDishPublish = (id) =>
  axios.patch(`${API}/dishes/${id}/toggle`).then(res => res.data);

export const createDish = (data) =>
  axios.post(`${API}/dishes`, data).then(res => res.data);

export const getImages = () =>
  axios.get(`${API}/images`).then(res => res.data);
