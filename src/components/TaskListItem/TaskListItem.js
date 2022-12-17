import React from 'react';
import dayjs from 'dayjs';

import completeLogo from '../../images/free-icon-tick-3106690.png';
import editLogo from '../../images/free-icon-edit-157325.png';
import deletetLogo from '../../images/free-icon-delete-4974628.png';

function TaskListItem(props) {

  const [taskData, setTaskData] = React.useState({
    term: props.task.term,
    status: props.task.status
  })

  /**Обработка клика по задаче для ее открытия. Исключается клик по кнопке-выполнения*/
  function openTask(e) {
    if (!e.target.classList.contains('task-list__complete-logo')) {
      props.onTaskClick(props.task);
    }
  }

  /**Обработка изменений в форме редактирования задачи*/
  function handleChange(e) {
    const {name, value} = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    });
    props.editTaskField({ [name]: value }, props.task);
  }

  /**Обработка клика по кнопке удаления для открытия попап подтверждения удаления*/
  function openPopupDel() {
    props.onDeleteClick(props.task);
  }

  /**Обработка клика по кнопке выполнения задачи*/
  function completeTask() {
    props.onCompleteClick(props.task);
  }

  /**Обновление значений срока и статуса задачи при изменении списка задач*/
  React.useEffect(() => {
    setTaskData({
      term: props.task.term,
      status: props.task.status
    })
  }, [props.taskList])

  const statusClass = (taskData.status === 'В работе') ? 'task-list__status task-list__status_pending ' :
    (taskData.status === 'Выполнено') ? 'task-list__status task-list__status_complete' : 'task-list__status';

  const completeClass = (props.task.status === 'Выполнено') ? 'task-list__complete-logo task-list__complete-logo_active' :
    'task-list__complete-logo';

    const titleClass = (props.task.status === 'Выполнено') ? 'task-list__title task-list__title_complete' :
    'task-list__title';

  return (
    <div className="task-list__item" onClick={openTask}  title="открыть задачу">
      <div className="task-list__container">

        {/* <button className="task-list__btn" title="выполнить" onClick={completeTask}>
          <img src={completeLogo} alt="complete" className={completeClass}></img>
        </button> */}

        <h3 className={titleClass}>{props.task.title}</h3>
      </div>

      {/* <div className="task-list__tools">
        <img src={editLogo} alt="edit" title="редактировать" onClick={openTask}></img>
        <img src={deletetLogo} alt="delete" title="удалить" onClick={openPopupDel}></img>
      </div> */}

      {/* <input type="date" className="task__term task-list__term" id="term" name="term"
        value={dayjs(taskData.term).format('YYYY-MM-DD')} onChange={handleChange}/> */}

      <div className="task__term popup__term">{dayjs(props.task.term).format('DD.MM.YY')}</div>

      {/* <select className={`${statusClass} task-list__status-list`} name="status" value={taskData.status} onChange={handleChange}>
        <option value="Ожидание">Ожидание</option>
        <option value="В работе">В работе</option>
        <option value="Выполнено">Выполнено</option>
      </select> */}
    </div>
  );
}

export default TaskListItem;
