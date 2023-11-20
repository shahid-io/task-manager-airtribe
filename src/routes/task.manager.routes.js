const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/task.manager.controller');

router.get('/tasks', tasksController.getTasks);
router.get('/tasks/:id', tasksController.getTaskById);
router.post('/tasks', tasksController.createTask);
// router.put('/tasks/:id', tasksController.updateTask);
// router.delete('/tasks/:id', tasksController.deleteTask);

module.exports = router;