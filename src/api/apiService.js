import { http } from "./http";

export const getAllTrucks = () => {
  return http.get("/trucks");
};

export const getTruckById = id => {
  return http.get(`/trucks/${id}`);
};

export const addTruck = data => {
  return http.post("/trucks", data);
};

export const updateTruckStatus = (id, data) => {
  return http.put(`/trucks/${id}`, data);
};

export const removeTruck = id => {
  return http.delete(`/trucks/${id}`);
};
