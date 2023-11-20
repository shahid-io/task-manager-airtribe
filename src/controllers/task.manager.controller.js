
const { writeTasksToFile, readTasksFromFile } = require('../helper/fs.helper');

/** get all tasks */
function getTasks(req, res) {
    try {
        const tasks = readTasksFromFile();
        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found" });
        }
        return res.status(201).json({ status: "success", data: tasks });
    } catch (error) {
        throw error;
    }
}

/** get task by id */
function getTaskById(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        const tasks = readTasksFromFile();

        const task = tasks.find(task => task.id === parseInt(id));
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(201).json({ status: "success", "message": "Task Fetched Successfully", data: task });
    } catch (error) {
        throw error;
    }
}

/** post task */
function createTask(req, res) {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }
        const tasks = readTasksFromFile();
        const task = {
            id: tasks.length + 1,
            title,
            description,
            status: false
        }
        tasks.push(task);
        writeTasksToFile(tasks);
        return res.status(201).json({ status: "success", "message": "Task Created Successfully", data: task });
    } catch (error) {
        throw error;
    }
}

/** update task */
function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        const tasks = readTasksFromFile();
        const task = tasks.find(task => task.id === parseInt(id));

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        writeTasksToFile(tasks);

        return res.status(201).json({ status: "success", message: "Task Updated Successfully", data: task });
    } catch (error) {
        throw error;
    }
}

/** delete task */
function deleteTask(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Id is required" });
        }
        const tasks = readTasksFromFile();
        const task = tasks.find(task => task.id === parseInt(id));
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const filteredTasks = tasks.filter(task => task.id !== parseInt(id));
        writeTasksToFile(filteredTasks);
        return res.status(201).json({ status: "success", message: "Task Deleted Successfully", data: task });
    } catch (error) {
        throw error;
    }
}
module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask }