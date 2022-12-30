import React from 'react';

function SubTaskForm(props) {

  const [title, setTitle] = React.useState('');

  /**Обработка изменения поле название задачи*/
  function setSubTaskName(e) {
    props.onChange(e.target.value);
    setTitle(e.target.value);
  }

  /**Обработка клика по кнопке сохранение подзадачи*/
  function saveSubTask() {
    props.onSaveClick();
  }

  /**Обработка клика по кнопке закрытие формы подазадчи*/
  function closeForm() {
    props.onCloseClick();
    setTitle('');
  }

  const formClass = props.formActive || props.subTaskFormActive ? ' subtask-form_active' : '';

  /**Подстановка названия подзадачи при редактировании текущей позадачи*/
  React.useEffect(() => {
    setTitle(props.subTaskFormActive ? props.subTask : '');
  }, [props.subTaskFormActive])


  return (
    <div className={`subtask-form${formClass}`}>
      <input className="subtask-input" type="text" onChange={setSubTaskName} value={title} minLength="2"></input>
      <div>
        <button className="popup__btn subtask-btn" type="button" onClick={saveSubTask}>Сохранить</button>
        <button className="popup__btn subtask-btn" type="button" onClick={closeForm}>Отмена</button>
      </div>
    </div>

  );
}

export default SubTaskForm;
