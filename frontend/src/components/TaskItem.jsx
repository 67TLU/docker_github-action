function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className="task-item">
            <div>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task)}
                />

                <span className={task.completed ? "completed" : ""}>
                    {task.title}
                </span>
            </div>

            <button
                className="delete-btn"
                onClick={() => onDelete(task.id)}
            >
                Xóa
            </button>
        </div>
    );
}

export default TaskItem;