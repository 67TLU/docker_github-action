const pool = require("../config/database");

// Lấy tất cả Task
const getAllTasks = async () => {
    const [rows] = await pool.execute(
        "SELECT * FROM tasks ORDER BY id DESC"
    );

    return rows;
};

// Lấy Task theo ID
const getTaskById = async (id) => {
    const [rows] = await pool.execute(
        "SELECT * FROM tasks WHERE id = ?",
        [id]
    );

    return rows[0] || null;
};

// Tạo Task
const createTask = async (data) => {
    const [result] = await pool.execute(
        "INSERT INTO tasks (title) VALUES (?)",
        [data.title]
    );

    return getTaskById(result.insertId);
};

// Cập nhật Task
const updateTask = async (id, data) => {
    const fields = [];
    const values = [];

    if (data.title !== undefined) {
        fields.push("title = ?");
        values.push(data.title);
    }

    if (data.completed !== undefined) {
        fields.push("completed = ?");
        values.push(data.completed);
    }

    if (fields.length === 0) {
        return getTaskById(id);
    }

    values.push(id);

    const [result] = await pool.execute(
        `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`,
        values
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return getTaskById(id);
};

// Xóa Task
const deleteTask = async (id) => {
    const [result] = await pool.execute(
        "DELETE FROM tasks WHERE id = ?",
        [id]
    );

    return result.affectedRows > 0;
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};