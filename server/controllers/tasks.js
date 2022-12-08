const fs = require('fs');
const Task = require('../models/task');

const { Forbidden, NotFound, BadRequest } = require('../errors');

const getTasks = (req, res, next) => {
  Task.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(next);
}

const createTask = (req, res) => {
  const file = (req.files.length > 0) ? 'https://api.todo.netitov.ru/' + 'files/' + req.files[0].filename : '';
  const fileName = (req.files.length > 0) ? req.files[0].originalname : '';
  const filePath = (req.files.length > 0) ? 'public/files/' + req.files[0].filename: '';
  const { title, description, term, status, projectId  } = req.body;

  Task.create({ title, description, file, term, status, fileName, filePath, projectId})
    .then((card) => res.send(card))
    .catch((err) => {
      throw err;
  })
}

const deleteTask = (req, res, next) => {
  const { taskId } = req.params;

  Task.findById(taskId)
    .orFail(new NotFound('Задача не найдена'))
    .then((task) => {
      task.remove()
        .then((task) => {
          if (task.filePath) {
          fs.unlink(task.filePath, function(err){
            if (err) {
              console.log(err);
            } else {
              console.log("Файл удалён");
            }
          })
        }
        })
        .then((task) => res.send({ task }))
        .catch(next);
    })
    .catch((err) => {
      throw err;
    })
    .catch(next);
}

const editTask = (req, res, next) => {
  const { title, description, term, status, id } = req.body;
  const file = (req.files.length > 0) ? 'https://api.todo.netitov.ru/' + 'files/' + req.files[0].filename : req.body.file;
  const fileName = (req.files.length > 0) ? req.files[0].originalname : req.body.fileName;
  const filePath = (req.files.length > 0) ? 'public/files' + req.files[0].filename: '';

  Task.findByIdAndUpdate(
    id,
    { title, description, file, term, status, fileName, filePath },
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

const editField = (req, res, next) => {
  const { term, status } = req.body;
  const { taskId } = req.params;

  Task.findByIdAndUpdate(
    taskId,
    { term, status },
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
  createTask, getTasks, deleteTask, editTask, editField
};
