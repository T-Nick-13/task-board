const commentRouter = require('express').Router();
const { getComment, createComment } = require('../controllers/comments');

commentRouter.get('/', getComment);
commentRouter.post('/', createComment);

module.exports = commentRouter;
