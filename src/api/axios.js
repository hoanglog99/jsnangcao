import axios from 'axios';

// Khởi tạo cấu hình axios cho toàn bộ project
const apiAxios = axios.create({
    baseURL: 'http://localhost:4000'
});

export default apiAxios;