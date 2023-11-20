const tasks = require('../utils/task.manager');
const { writeTasksToFile } = require('../helper/fs.operation');
/** get all tasks */
function getTasks(req, res) {
    try {
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
        const task = tasks.find(task => task.id === parseInt(id));
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(201).json({ status: "success", data: task });
    } catch (error) {
        throw error;
    }
}

function createTask(req, res) {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }
        const task = {
            id: tasks.length + 1,
            title,
            description,
            status: false
        }
        tasks.push(task);
        writeTasksToFile(tasks);
        return res.status(201).json({ status: "success", data: task });
    } catch (error) {
        throw error;
    }
}


module.exports = { getTasks, getTaskById, createTask }