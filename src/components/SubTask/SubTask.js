import React from 'react';
import dayjs from 'dayjs';
import SubTaskForm from '../SubTaskForm/SubTaskForm';

import completeLogo from '../../images/icons8-галочка-50.png';

function SubTask(props) {

  const [checked, setChecked] = React.useState(false);
  const [subTaskFormActive, setSubTaskFormActive] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');

  /**Установка/снятия пометки о выполнении задачи*/
  function handleComplete() {
    setChecked(checked ? false : true);
    props.subTask.complete = checked ? false : true;
    props.completeSubTask(props.subTask);
  }

  /**Обработка изменения названия подзадачи*/
  function handleChange(data) {
    setNewTitle(data);
  }

  /**Обработка клика по кнопке сохранить подзадачу*/
  function saveSubTask() {
    props.subTask.title = newTitle;
    props.onSaveClick(props.subTask);
    closeForm();
  }

  /**Обработка клика по позадаче для изменения названия*/
  function openEditForm() {
    setSubTaskFormActive(true);
    props.onSubTaskClick();
  }

  /**Закрытие формы редактирования названия подзадачи*/
  function closeForm() {
    setSubTaskFormActive(false);
  }

  /**Закрытие формы редактирования подзадачи при создании новой подзадачи*/
  React.useEffect(() => {
    if(props.formActive) {
      setSubTaskFormActive(false);
    }
  }, [props.formActive])

  const titleClass = props.subTask.complete || checked ? ' subtask__title_complete' : '';
  const titleFormClass = subTaskFormActive ? ' subtask__title_inactive' : '';
  const completeClass = props.subTask.complete || checked ? ' subtask__img_active' : '';

  return (
    <li className="task-list__item subtask" >
      <button className="task-list__btn subtask__btn" title="выполнить" onClick={handleComplete} type="button">
        <img src={completeLogo} alt="complete" className={`subtask__img${completeClass}`}></img>
      </button>
      <h3 className={`popup__input task-list__title subtask__title${titleClass}${titleFormClass}`}
        onClick={openEditForm} title="изменить">{props.subTask.title}</h3>
      <SubTaskForm
        onSaveClick={saveSubTask}
        onCloseClick={closeForm}
        subTaskFormActive={subTaskFormActive}
        subTask={props.subTask.title}
        onChange={handleChange}
      />
    </li>
  );
}

export default SubTask;
