import axios from 'axios';

// Khởi tạo cấu hình axios cho toàn bộ project
const apiAxios = axios.create({
    baseURL: 'https://6291d1e49d159855f0809b0f.mockapi.io/'
});

export default apiAxios;