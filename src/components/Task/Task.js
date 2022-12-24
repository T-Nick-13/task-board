import React from 'react';
import taskLogo from '../../images/задача.svg';
import desckLogo from '../../images/описание.svg';
import uploadLogo from '../../images/загрузка.svg';
import subTaskLogo from '../../images/icons8-древовидная-структура-48.png';
import commentLogo from '../../images/icons8-комментарии-48.png';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import SubTask from '../SubTask/SubTask';
import SubTaskForm from '../SubTaskForm/SubTaskForm';
import CommentList from '../CommentList/CommentList';
import { v4 as uuidv4 } from 'uuid';


function Task(props) {

  const [fileName, setFileName] = React.useState('');
  const [fileLatName, setFileLatName] = React.useState('');
  const [fileData, setFileData] = React.useState('');
  //const [taskActive, setTaskActive] = React.useState(true);
  const [newSubTask, setNewSubTask] = React.useState({
    title: '',
    complete: false,
    id: '',
    taskId: ''
  });
  const [formActive, setFormActive] = React.useState(false);
  //const [taskEditActive, setTaskEditActive] = React.useState(false);
  const [taskData, setTaskData] = React.useState({
    title: '',
    description: '',
    term: dayjs(),
    status: props.taskStatus/*  ? props.taskStatus : 'Queue' */,
    fileName: '',
    priority: 'Medium',
    time: 0,
    index: 0
  });

  const [subTasks, setSubTasks] = React.useState([]);
  const [subTask, setSubTask] = React.useState();
  const projectId = useLocation().pathname.slice(1);
  const initSubTasks = props.task ? props.subTasks.filter((i) => i.taskId === props.task._id ) : [];

  /**Сброс заполненных и не сохраненных полей при изменении задачи*/
  React.useEffect(() => {
    clearInputs();
    setSubTasks(initSubTasks);
    //setTaskActive(false)
  }, [props.task]);



  React.useEffect(() => {
    clearInputs();
  }, [props.taskStatus]);

  const activeTask = props.activeTask ? 'popup popup_active' : 'popup';
  const activeForm = props.activeTask ? 'popup__form popup__form_active' : 'popup__form';
  const statusClass = (taskData.status === 'Development') ? 'popup__status popup__status_pending' :
    (taskData.status === 'Done') ? 'popup__status popup__status_complete' : 'popup__status';
  const clasTest = formActive ? 'subtask-form_active' : 'subtask-form';

  /**Проверка загружаемого файла на ограничения по размеру*/
  function checkFileType(file) {
    if (file.size <= 5242880) {
      const name = translit(file.name);
      setFileLatName(name);
      setFileData(file);
      setFileName(file.name);
      } else alert(`Размер файла должен быть до 5мб. Текущий размер ${file.size}`);
  }

  /**Очистка инпутов*/
  function clearInputs() {
    if (props.task) {
      setTaskData({
        title: props.task.title,
        description: props.task.description,
        term: props.task.term,
        status: props.task.status,
        file: props.task.file,
        fileName: props.task.fileName,
        priority: props.task.priority,
        date: props.task.date,
        time: dayjs().diff(props.task.date, 'hour'),
        index: props.task.index
      })
    } else {
      setTaskData({
        title: '',
        description: '',
        term: dayjs(),
        status: props.taskStatus/*  ? props.taskStatus : 'Queue' */,
        priority: 'Medium',
        time: 0,
        index: 0
      })
      setFileData('');
      setFileName('');
    }

  }

  /**Закрытие модального окна с формой задачи и очистка заполненных полей */
  function closePopup() {
    props.onPopupClose();
    clearInputs();
    setNewSubTask({
      title: '',
      complete: false,
      id: ''
    });
  }

  /**Обработка загруженного файла*/
  function handleFileChange(e) {
    checkFileType(e.target.files[0]);
  }

  /**Обработка изменений в форме редактирования задачи*/
  function handleChange(e) {
    const {name, value} = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    });
  }

  /**Сохранений изменений в задаче*/
  function submitSave(e) {
    e.preventDefault();
    props.onSubmit(taskData, fileData, fileLatName, props.task, projectId);
    clearInputs();
    debugger
  }

  /**Перевод названия файла в транслит для корректного сохранения на сервере*/
  function translit(word){
    var answer = '';
    var converter = {
      'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
      'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
      'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
      'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
      'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
      'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
      'э': 'e',    'ю': 'yu',   'я': 'ya',

      'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
      'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
      'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
      'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
      'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
      'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
      'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
    };

    for (var i = 0; i < word.length; ++i ) {
      if (converter[word[i]] == undefined){
        answer += word[i];
      } else {
        answer += converter[word[i]];
      }
    }
    return answer;
  }

  /**Закрытие формы добавления новой позадачи*/
  function openSubTaskForm() {
    setFormActive(true);
  }

  /**Добавление названия новой подзадачи*/
  function setSubTaskName(data) {
    setNewSubTask({
      title: data,
      complete: false,
      id: uuidv4(),
      taskId: props.task._id
    });
  }

  /**Сохранение новой подзадачи*/
  function createSubTask() {
    setSubTasks([
      ...subTasks, newSubTask
    ]);
    props.createSubTask(newSubTask);
    setNewSubTask({
      title: '',
      complete: false,
      id: ''
    });
    closeSubTaskForm();
  }

  /**Закрытие формы изменения подзадачи*/
  function closeSubTaskForm() {
    setFormActive(false);
    setNewSubTask({
      title: '',
      complete: false,
      id: ''
    });
  }

  /**Сохранение изменения подзадачи*/
  function editSubTask(data) {
    props.editSubTask(data);
  }

  /**закрытие формы добавления новой подзадачи при корректировки текущей*/
  function openEditForm() {
    closeSubTaskForm();
  }

  return (
    <div className={activeTask}>
      <form className={activeForm} onSubmit={submitSave}>
        <div className="popup__container">

          <label className="popup__label popup__label-heading">Название задачи
            <img src={taskLogo} className="popup__img" alt="task"></img>
            <input id="title" className="popup__input popup__element" name="title" type="text" onChange={handleChange}
              value={taskData.title} minLength="2" maxLength="100" required/>
          </label>

          <label className="popup__label popup__label_text popup__label-heading">Описание
            <img src={desckLogo} className="popup__img" alt="description"></img>
            <textarea id="description" className="popup__textarea popup__element" name="description" onChange={handleChange}
              value={taskData.description} />
          </label>

          <div className="popup__info-container popup__label-heading">
            <input type="date" className="popup__term" id="term" name="term"
              value={dayjs(taskData.term).format('YYYY-MM-DD')} onChange={handleChange} />

            <select className={statusClass} onChange={handleChange}
              name="status" value={taskData.status}>
              <option value="Queue">Queue</option>
              <option value="Development">Development</option>
              <option value="Done">Done</option>
            </select>

            <select className="popup__status popup__priority" onChange={handleChange}
              name="priority" value={taskData.priority}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <div className="popup__time">в работе <span>{taskData.time}ч</span></div>

          </div>

          <div className="popup__label popup__label-heading">Вложение
            <img src={uploadLogo} className="popup__img" alt="upload"></img>
            <input className="popup__input-upload" id="popup__input" type="file" onChange={handleFileChange}/>
            <label className="popup__label-upload popup__element" htmlFor="popup__input">Выберите файл</label>
            <a className="popup__file-name" href={taskData.file} download>
              {fileName !== '' ? fileName : taskData.fileName}</a>
          </div>

          <div className="popup__label popup__label-heading">Подзадачи
            <img src={subTaskLogo} className="popup__img popup__img_big" alt="subtask"></img>
            <div className="popup__subtask-container popup__element">
              <button className="btn-cross popup__subtask-btn" type="button" onClick={openSubTaskForm}>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" x2="100" y1="0" y2="100" />
                  <line x1="0" x2="100" y1="100" y2="0" />
                </svg>
                <span>Добавить подзадачу</span>
              </button>

              <SubTaskForm
                onChange={setSubTaskName}
                onSaveClick={createSubTask}
                onCloseClick={closeSubTaskForm}
                formActive={formActive}
                newSubTask={newSubTask}
                subTask={subTask}
              />

              <ul className="subtask-list">
                {subTasks.map((i) => {
                  return (
                    <SubTask
                      key={i.id}
                      subTask={i}
                      onSubTaskClick={openEditForm}
                      completeSubTask={editSubTask}
                      formActive={formActive}
                      onSaveClick={editSubTask}

                    />
                  )
                })}
              </ul>
            </div>

          </div>

          <div className="popup__label popup__label-heading">Комментарии
            <img src={commentLogo} className="popup__img " alt="upload"></img>
            <textarea id="description" className="popup__textarea popup__element" name="description" onChange={handleChange}
              placeholder="Оставить комментарий..." />
            <button className="popup__btn-comment" type="button">Отправить</button>
            <CommentList />
          </div>

        </div>

        <button className="popup__close-btn btn-cross" type="button" onClick={closePopup}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" x2="100" y1="0" y2="100" />
            <line x1="0" x2="100" y1="100" y2="0" />
          </svg>
        </button>

        <div className="popup__btn-container popup__label-heading">
          <button className="popup__btn" type="submit">Сохранить</button>
          <button className="popup__btn" type="button" onClick={closePopup}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

export default Task;
