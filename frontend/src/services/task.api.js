import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL
});

// Lấy danh sách
export const getTasks = async () => {
    const res = await api.get("/tasks");
    return res.data.data;
};

// Tạo task
export const createTask = async (title) => {
    const res = await api.post("/tasks", { title });
    return res.data.data;
};

// Cập nhật task
export const updateTask = async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data.data;
};

// Xóa task
export const deleteTask = async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
};