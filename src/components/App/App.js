import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Api from '../../utils/Api';
import { MAIN_API } from '../../utils/config';

import Header from '../Header/Header';
import Task from '../Task/Task';
import PopupDel from '../PopupDel/PopupDel';
import ProjectList from '../ProjectList/ProjectList';
import Project from '../Project/Project';
import TaskBoard from '../TaskBoard/TaskBoard';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

function App() {

  const [activeTask, setActiveTask] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  const [projectList, setProjectList] = React.useState([]);
  const [subTaskList, setSubTaskList] = React.useState([]);
  const [commentList, setCommentList] = React.useState([]);
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
      api.getProjects(),
      api.getSubTasks(),
      api.getComments()
    ])
    .then(([tasks, projects, subtasks, comments]) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      setTaskList(JSON.parse(localStorage.getItem('tasks')));
      localStorage.setItem('projects', JSON.stringify(projects));
      setProjectList(JSON.parse(localStorage.getItem('projects')));
      localStorage.setItem('subtasks', JSON.stringify(subtasks));
      setSubTaskList(JSON.parse(localStorage.getItem('subtasks')));
      localStorage.setItem('newTasks', JSON.stringify(tasks));
      setCommentList(comments);
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
    document.body.classList.remove('body_unscrolled');
  }

  /**Открытие задачи по клику*/
  function openTask(task) {
    setActiveTask(true);
    setTask(task);
    document.body.classList.add('body_unscrolled');
  }

  /**Открытие новой задачи по клику*/
  function openNewTask(data) {
    setActiveTask(true);
    setTaskStatus(data);
    document.body.classList.add('body_unscrolled');
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

  /**Сохранение нового состояние задачи на доске*/
  function editTaskOnBoard(data) {
    api.editTaskOnBoard(data)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err)
      })
    }

  /**Создание нового проекта*/
  function createProject(taskData, fileData, fileLatName, task) {
    //const projectId = 'pr-' + (projectList.length + 1);
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

    api.createProject(data)
      .then(() => {
        getData();
        closePopup();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /**Создание поздадачи*/
  function createSubTask(data) {
    api.createSubTask(data)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /**Изменение поздадачи*/
  function editSubTask(data) {
    api.editSubTask(data)
      .then(() => {
        //getData();
        //closePopup();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /**Добавление комментария к задаче*/
  function createComment(data) {
    api.createComment(data)
      .then((comment) => {
        //getData();
        //console.log(data)
        setCommentList([...commentList, comment]);
      })
      .catch((err) => {
        console.log(err)
      })
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
                tasks={taskList}
                openProject={openProject}
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
        <Task
          activeTask={activeTask}
          onPopupClose={closePopup}
          onSubmit={createTask}
          task={task}
          taskStatus={taskStatus}
          createSubTask={createSubTask}
          subTasks={subTaskList}
          editSubTask={editSubTask}
          createComment={createComment}
          commentList={commentList}
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
