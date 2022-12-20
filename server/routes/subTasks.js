const subTaskRouter = require('express').Router();
const { getSubTasks, createSubTask, editSubTask } = require('../controllers/subTasks');

subTaskRouter.get('/', getSubTasks);
subTaskRouter.post('/', createSubTask);
//subTaskRouter.delete('/:taskId', editSubTask);
//taskRouter.post('/_method=PUT', editTask);
//taskRouter.post('/:taskId', editField);
subTaskRouter.patch('/', editSubTask);

module.exports = subTaskRouter;
