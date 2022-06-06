import api from './axios';

const prefix = '/student';

export const getStudents = () => api.get(prefix);

export const getStudent = (id) => api.get(`${prefix}/${id}`);

export const deleteStudent = (id) => api.delete(`${prefix}/${id}`);

export const createStudent = (data) => api.post(prefix, data);