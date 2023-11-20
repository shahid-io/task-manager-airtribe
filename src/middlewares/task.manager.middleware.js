function validateTask(req, res, next) {
    const { title, description, priority } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
        return res.status(400).json({ message: "Description is required" });
    }
    if (!priority) {
        return res.status(400).json({ message: "Priority is required" });
    }

    next();
}

module.exports = { validateTask }