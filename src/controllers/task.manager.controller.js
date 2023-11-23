
const { writeTasksToFile, readTasksFromFile } = require('../helper/fs.helper');

/** get all tasks */
function getTasks(req, res) {
    try {
        const { status, sortBy } = req.query;
        console.log(req.query);
        let tasks = readTasksFromFile();

        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found" });
        }

        if (status !== undefined) {
            tasks = tasks.filter(task => task.status === (status.toLowerCase() === 'true'));
        }

        if (sortBy === 'creationDate') {
            tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
            return res.status(404).json({ message: "Task not found---" });
        }
        return res.status(201).json({ status: "success", "message": "Task Fetched Successfully", data: task });
    } catch (error) {
        throw error;
    }
}

/** post task */
function createTask(req, res) {
    try {
        const { title, description, priority } = req.body;

        const tasks = readTasksFromFile();
        const task = {
            id: tasks.length + 1,
            title,
            description,
            priority,
            status: false,
            createdAt: new Date().toISOString(),
            updateAt: new Date().toISOString()
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
        const { title, description, priority, status } = req.body;

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
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.updateAt = new Date().toISOString();

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

/** get task by priority level */
function getTaskByPriority(req, res) {
    try {
        const { level } = req.params;
        if (!level) {
            return res.status(400).json({ message: "Priority level is required" });
        }
        const tasks = readTasksFromFile();
        const filteredTasks = tasks.filter(task => task.priority === level);
        if (!filteredTasks.length) {
            return res.status(404).json({ message: "No tasks found" });
        }
        return res.status(201).json({ status: "success", data: filteredTasks });
    } catch (error) {
        throw error;
    }
}

/** get filtered task */
function getFilteredTask(req, res) {
    try {
        const { status, sortBy } = req.query;

        let tasks = readTasksFromFile();

        if (status !== undefined) {
            tasks = tasks.filter(task => task.status === (status.toLowerCase() === 'true'));
        }

        if (sortBy === 'creationDate') {
            tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        return res.status(200).json({ status: "success", "message": "Task Fetched Successfully", data: tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

/** change task status */
function changeStatus(req, res) {
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
        task.status = !task.status;
        writeTasksToFile(tasks);
        return res.status(201).json({ status: "success", message: "Task Status Updated Successfully", data: task });
    } catch (error) {
        throw error;
    }
}
module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask, getTaskByPriority, getFilteredTask, changeStatus }