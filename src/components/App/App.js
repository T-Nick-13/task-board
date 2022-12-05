import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Api from '../../utils/Api';
import { MAIN_API } from '../../utils/config';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Task from '../Task/Task';
import PopupDel from '../PopupDel/PopupDel';
import ProjectList from '../ProjectList/ProjectList';

function App() {

  const [activeTask, setActiveTask] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  const [task, setTask] = React.useState();
  const [activePopupDel, setActivePopupDel] = React.useState(false);

  const api = new Api ({
    baseUrl: MAIN_API
  })

  /**Получение списка задач с сервера */
  function getData() {
    Promise.all([
      api.getTasks()
    ])
    .then(([tasks]) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      setTaskList(JSON.parse(localStorage.getItem('tasks')));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    getData();
  }, [])

  /**Закрытие модальных окон */
  function closePopup() {
    setActiveTask(false);
    setActivePopupDel(false);
  }

  /**
   * Открытие задачи по клику
   * @param {object} task - открываемая задача
  */
  function openTask(task) {
    setActiveTask(true);
    setTask(task);
  }

  /**
   * Создание/обновление задачи
   * @param {object} task - открытвая задача. Если параметр заполнен, задача обновляется. Если нет - создается ноавя
  */
  function createTask(taskData, fileData, fileLatName, task) {

    const data = new FormData();
    data.append('title', taskData.title);
    data.append('description', taskData.description);
    if (fileData) {
      data.append('fileData', fileData, fileLatName);
    }
    data.append('term', taskData.term);
    data.append('status', taskData.status);
    if (task) {
      data.append('id', task._id);
      data.append('file', task.file);
      data.append('fileName', task.fileName);
    }

    if (task) {
      api.editTask(data)
        .then(() => {
          getData();
          closePopup();
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      api.createTask(data)
        .then(() => {
          getData();
          closePopup();
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  /**Удаление задачи*/
  function deleteTask(task) {

    api.deleteTask(task._id)
      .then(() => {
        getData();
        closePopup();
      })
      .catch((err) => {
        console.log(err);
      })

  }

  /**Открытие попап - подтверждение удаления задачи*/
  function openPopupDel(task) {
    setActivePopupDel(true);
    setTask(task);
  }

  /**Закрытие модальных окон по кнопке Escape и клику по оверлей*/
  React.useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closePopup();
      }
    }
    function handleOverlayClose (e) {
      if (e.target.classList.contains('popup_active')) {
        closePopup();
      }
    }
    document.addEventListener('keyup', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
  }, [])

  /**Выполнение задачи по клику на кнопку*/
  function completeTask(task) {
    const type = task.status === 'Выполнено' ? 'В работе' : 'Выполнено';
    api.editField({ status: type, term: task.term }, task._id)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /**Редактирование задачи без ее открытия (через кнопке в общем списке задач)*/
  function editTaskField(taskData, task) {
    const status = taskData.status === undefined ? task.status : taskData.status;
    const term = taskData.term === undefined ? task.term : taskData.term;
    let newObj = {};
    newObj = {
      status,
      term
    };

    api.editField(newObj, task._id)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header
          onBtnClick={openTask}
        />

        <Routes>

          <Route 
            path="/"
            element={
              <ProjectList />
            }
          />

        </Routes>
        {/* <TaskList
          openTask={openTask}
          taskList={taskList}
          openPopupDel={openPopupDel}
          completeTask={completeTask}
          editTaskField={editTaskField}
        />
        <Task
          activeTask={activeTask}
          onPopupClose={closePopup}
          onSubmit={createTask}
          task={task}
        /> */}
        <PopupDel
          activePopupDel={activePopupDel}
          onSubmit={deleteTask}
          onPopupClose={closePopup}
          task={task}
        />
      </div>
    </div>
  );
}

export default App;
