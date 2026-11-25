const taskService = require("../services/task.service");

// GET /api/tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();

        res.json({
            success: true,
            data: tasks
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// GET /api/tasks/:id
const getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// POST /api/tasks
const createTask = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const task = await taskService.createTask({
            title: title.trim()
        });

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// PUT /api/tasks/:id
const updateTask = async (req, res) => {
    try {
        const { title, completed } = req.body;

        if (
            (title !== undefined &&
                (typeof title !== "string" || !title.trim())) ||
            (completed !== undefined &&
                typeof completed !== "boolean")
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid task data"
            });
        }

        const task = await taskService.updateTask(
            req.params.id,
            {
                title: title === undefined ? undefined : title.trim(),
                completed
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    try {
        const deleted = await taskService.deleteTask(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};