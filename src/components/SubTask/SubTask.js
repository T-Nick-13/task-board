import React from 'react';
import dayjs from 'dayjs';

import completeLogo from '../../images/icons8-галочка-50.png';

function SubTask(props) {

  /* const [taskData, setTaskData] = React.useState({
    term: props.task.term,
    status: props.task.status
  }) */

  /**Обработка клика по задаче для ее открытия. Исключается клик по кнопке-выполнения*/
  /* function openTask(e) {
    if (!e.target.classList.contains('task-list__complete-logo')) {
      props.onTaskClick(props.task);
    }
  } */

  /**Обработка изменений в форме редактирования задачи*/
  /* function handleChange(e) {
    const {name, value} = e.target;
    setTaskData({
      ...taskData,
      [name]: value
    });
    props.editTaskField({ [name]: value }, props.task);
  } */

  /**Обработка клика по кнопке удаления для открытия попап подтверждения удаления*/
  /* function openPopupDel() {
    props.onDeleteClick(props.task);
  } */

  /**Обработка клика по кнопке выполнения задачи*/
 /*  function completeTask() {
    props.onCompleteClick(props.task);
  }
 */
  /**Обновление значений срока и статуса задачи при изменении списка задач*/
  /* React.useEffect(() => {
    setTaskData({
      term: props.task.term,
      status: props.task.status
    })
  }, [props.taskList]) */


  /* const completeClass = (props.task.status === 'Выполнено') ? 'task-list__complete-logo task-list__complete-logo_active' :
    'task-list__complete-logo';

    const titleClass = (props.task.status === 'Выполнено') ? 'task-list__title task-list__title_complete' :
    'task-list__title' */;

  return (
    <li className="task-list__item subtask" >
      {/* <div className="subtask__container"> */}

        <button className="task-list__btn subtask__btn" title="выполнить" /* onClick={completeTask} */>
          <img src={completeLogo} alt="complete" className="task-list__complete-logo subtask__complete-logo"></img>
        </button>

        {/* <h3 className="task-list__title  subtask__title">task1</h3> */}
        <input id="title" className="popup__input task-list__title  subtask__title" name="title" type="text" /* onChange={handleChange} */
              value="task1" minLength="2" maxLength="100" required/>
      {/* </div> */}

    </li>
  );
}

export default SubTask;
