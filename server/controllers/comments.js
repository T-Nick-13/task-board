const Comment = require('../models/comment');

const getComment = (req, res, next) => {
  Comment.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(next);
}

const createComment = (req, res) => {

  const { id, text, userName, date, parentId, level, taskId } = req.body;

  Comment.create({ id, text, userName, date, parentId, level, taskId })
    .then((card) => res.send(card))
    .catch((err) => {
      throw err;
  })
}

module.exports = {
  getComment, createComment
};
