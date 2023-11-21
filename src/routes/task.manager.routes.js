const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/task.manager.controller');
const { validateTask } = require('../middlewares/task.manager.middleware');

router.get('/tasks', tasksController.getTasks);
router.get('/tasks/:id', tasksController.getTaskById);
router.post('/tasks', validateTask, tasksController.createTask);
router.put('/tasks/:id', validateTask, tasksController.updateTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.get('/tasks/priority/:level', tasksController.getTaskByPriority);
router.get('/tasks/filter/status', tasksController.getFilteredTask);
router.patch('/tasks/status/:id', tasksController.changeStatus);


module.exports = router;