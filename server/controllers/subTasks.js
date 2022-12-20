const SubTask = require('../models/subTask');

const { Forbidden, NotFound, BadRequest } = require('../errors');

const getSubTasks = (req, res, next) => {
  SubTask.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(next);
}

const createSubTask = (req, res) => {

  const { title, complete, id, taskId } = req.body;


  SubTask.create({ title, complete, id, taskId })
    .then((card) => res.send(card))
    .catch((err) => {
      throw err;
  })
}

const editSubTask = (req, res, next) => {
  const { title, completed } = req.body;
  const { taskId } = req.params;

  SubTask.findByIdAndUpdate(
    taskId,
    { title, completed },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((u) => {
      if (!u) {
        throw new NotFound('Задача не найдена');
      }
      return res.send(u);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Введены некорректные данные');
      }
      throw err;
    })
    .catch(next);
};


module.exports = {
  getSubTasks, createSubTask, editSubTask
};
