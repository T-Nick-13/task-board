const projectRouter = require('express').Router();
const { createProject, getProjects, deleteProject, editProject, editField } = require('../controllers/projects');
const upload = require('../middlewares/upload');

projectRouter.post('/', upload, createProject);
projectRouter.get('/', getProjects);
projectRouter.delete('/:taskId', deleteProject);
projectRouter.post('/_method=PUT', upload, editProject);
projectRouter.post('/:taskId', editField);

module.exports = projectRouter;
