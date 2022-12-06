const taskRouter = require('express').Router();
const { createTask, getTasks, deleteTask, editTask, editField } = require('../controllers/tasks');
const upload = require('../middlewares/upload');

taskRouter.post('/', upload, createTask);
taskRouter.get('/', getTasks);
taskRouter.delete('/:taskId', deleteTask);
taskRouter.post('/_method=PUT', upload, editTask);
taskRouter.post('/:taskId', editField);

module.exports = taskRouter;
