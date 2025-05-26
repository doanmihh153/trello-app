import axios from 'axios';
import { API_BASE_URL } from '~/utils/apiRoot';

// Lý do không có try -- catch là vì chúng đã được xử lý ở nơi BACKEND rồi!
// Đây cũng là giải pháp `Clean Code` -- Một số trường hợp sẽ cần thôi :)
// Quên 🙃 bắt lỗi tập trung như BACKEND luôn -> trong axios có --> Interceptors

export const fetchBoardDetailsAPI = async (boardId) => {
    const requestUrl = await axios.get(`${API_BASE_URL}/boards/${boardId}`);
    // axios sẽ trả về kết quả qua property của nó là Data: 👇🏼
    return requestUrl.data;
};