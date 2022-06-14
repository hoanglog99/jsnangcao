import api from "./axios";

const prefix = '/category';

export const getCategories = () => api.get(prefix);
export const getCategory = (id) => api.get(`${prefix}/${id}`);
export const createCategory = (data) => api.post(prefix, data);
export const updateCategory = (id, data) => api.put(`${prefix}/${id}`, data);
export const deleteCategory = (id) => api.delete(`${prefix}/${id}`);