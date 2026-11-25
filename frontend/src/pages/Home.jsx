import { useEffect, useState } from "react";

import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../services/task.api";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Lấy dữ liệu ban đầu
    const fetchTasks = async () => {
        try {
            setError("");

            const data = await getTasks();

            setTasks(data);
        } catch (err) {
            setError("Không thể tải danh sách công việc");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Thêm task
    const handleAdd = async (title) => {
        try {
            const newTask = await createTask(title);

            setTasks(prev => [...prev, newTask]);
        } catch (err) {
            alert("Không thể thêm công việc");
        }
    };

    // Cập nhật trạng thái
    const handleToggle = async (task) => {
        try {
            const updated = await updateTask(task.id, {
                completed: !task.completed
            });

            setTasks(prev =>
                prev.map(item =>
                    item.id === task.id ? updated : item
                )
            );
        } catch (err) {
            alert("Không thể cập nhật công việc");
        }
    };

    // Xóa task
    const handleDelete = async (id) => {
        try {
            await deleteTask(id);

            setTasks(prev =>
                prev.filter(task => task.id !== id)
            );
        } catch (err) {
            alert("Không thể xóa công việc");
        }
    };

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    return (
        <main className="container">
            <h1>Task Manager</h1>

            <p>Quản lý công việc của bạn</p>

            <TaskForm onAdd={handleAdd} />

            {error && <p className="error">{error}</p>}

            <div className="task-list">
                {tasks.length === 0 ? (
                    <p>Chưa có công việc nào.</p>
                ) : (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>
        </main>
    );
}

export default Home;