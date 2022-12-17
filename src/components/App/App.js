import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Api from '../../utils/Api';
import { MAIN_API } from '../../utils/config';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Task from '../Task/Task';
import PopupDel from '../PopupDel/PopupDel';
import ProjectList from '../ProjectList/ProjectList';
import Project from '../Project/Project';
import TaskBoard from '../TaskList/TaskBoard';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

function App() {

  const [activeTask, setActiveTask] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  const [projectList, setProjectList] = React.useState([]);
  const [project, setProject] = React.useState();
  const [task, setTask] = React.useState();
  const [taskStatus, setTaskStatus] = React.useState();
  const [activePopupDel, setActivePopupDel] = React.useState(false);

  const api = new Api ({
    baseUrl: MAIN_API
  })

  /**Получение списка задач с сервера */
  function getData() {
    Promise.all([
      api.getTasks(),
      api.getProjects()
    ])
    .then(([tasks, projects]) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      setTaskList(JSON.parse(localStorage.getItem('tasks')));
      localStorage.setItem('projects', JSON.stringify(projects));
      setProjectList(JSON.parse(localStorage.getItem('projects')));
      localStorage.setItem('newTasks', JSON.stringify(tasks));
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
    setActiveProject(false);
    setTask();
    setTaskStatus();
  }

  /**Открытие задачи по клику*/
  function openTask(task) {
    setActiveTask(true);
    setTask(task);
  }

  /**Открытие новой задачи по клику*/
  function openNewTask(data) {
    setActiveTask(true);
    setTaskStatus(data);
  }

  /**Открытие попап для создания нового проекта*/
  function openProject() {
    setActiveProject(true);

  }

  /**Открытие списка задач по проекту*/
  function openTaskBoard(project) {
    setProject(project);
  }

  /**Создание/обновление задачи*/
  function createTask(taskData, fileData, fileLatName, task, projectId) {

    const data = new FormData();

    data.append('title', taskData.title);
    data.append('description', taskData.description);
    if (fileData) {
      data.append('fileData', fileData, fileLatName);
    }
    data.append('term', dayjs(taskData.term).startOf('day'));
    data.append('status', taskData.status);
    data.append('projectId', projectId);
    data.append('priority', taskData.priority);
    data.append('index', taskData.index);

    if (task) {
      data.append('id', task._id);
      data.append('file', task.file);
      data.append('fileName', task.fileName);
    }
    if (!task) {
      data.append('date', dayjs());
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
  /* function editTaskField(taskData, task) {
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
  } */

  function editTaskOnBoard(data) {
    api.editTaskOnBoard(data)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err)
      })
    }


  function createProject(taskData, fileData, fileLatName, task) {
    const projectId = 'pr-' + (projectList.length + 1);
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

    data.append('projectId', uuidv4());

    if (task) {
      /* api.editTask(data)
        .then(() => {
          getData();
          closePopup();
        })
        .catch((err) => {
          console.log(err)
        }) */
    } else {
      api.createProject(data)
        .then(() => {
          getData();
          closePopup();
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }

  return (
    <div className="page">
      <div className="page__container">
        <Header
          openNewTask={openNewTask}
          openProject={openProject}
        />

        <Routes>

          <Route
            path="/"
            element={
              <ProjectList
                projects={projectList}
                onProjectClick={openTaskBoard}
              />
            }
          />

          <Route
            path="/:id"
            element={
              <TaskBoard
                taskList={taskList}
                editTaskOnBoard={editTaskOnBoard}
                openTask={openTask}
                openNewTask={openNewTask}
              />
            }
          />

        </Routes>
        {/* <TaskList
          openTask={openTask}
          taskList={taskList}
          openPopupDel={openPopupDel}
          completeTask={completeTask}
          editTaskField={editTaskField}
        /> */}
        <Task
          activeTask={activeTask}
          onPopupClose={closePopup}
          onSubmit={createTask}
          task={task}
          taskStatus={taskStatus}
        />
        <PopupDel
          activePopupDel={activePopupDel}
          onSubmit={deleteTask}
          onPopupClose={closePopup}
          task={task}
        />

        <Project
          activeProject={activeProject}
          onPopupClose={closePopup}
          onSubmit={createProject}
          task={task}

        />
      </div>
    </div>
  );
}

export default App;
