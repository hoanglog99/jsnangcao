import api from "./axios";

const prefix = '/book';

export const getProducts = (categoryId) => api.get(`${prefix}${(categoryId) ? `?categoryId=${categoryId}` : ``}`);
export const getProduct = (id, categoryId) => api.get(`${prefix}/${id}`);
export const createProduct = (data) => api.post(prefix, data);
export const updateProduct = (id, data) => api.put(`${prefix}/${id}`, data);
export const deleteProduct = (id) => api.delete(`${prefix}/${id}`);