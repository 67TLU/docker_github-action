import { useState } from "react";

function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        await onAdd(title.trim());

        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Nhập công việc..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button type="submit">
                Thêm công việc
            </button>
        </form>
    );
}

export default TaskForm;