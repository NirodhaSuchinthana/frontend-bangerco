import http from "../http-common";

const getAll = () => {
  return http.get("/bookings");
};

const get = (id) => {
  return http.get(`/bookings/${id}`);
};

const create = (data) => {
  return http.post("/bookings", data);
};

const update = (id, data) => {
  return http.put(`/bookings/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/bookings/${id}`);
};

const removeAll = () => {
  return http.delete(`/bookings`);
};

const findByDescription = (text) => {
  return http.get(`/bookings?description=${text}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByDescription,
};
