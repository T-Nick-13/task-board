import React from 'react';

function SubTaskForm(props) {

  function setSubTaskName(e) {
    props.onChange(e.target.value);
  }

  function saveSubTask() {
    props.onSaveClick();
  }

  function closeForm() {
    props.onCloseClick();
  }

  const formClass = props.formActive ? ' subtask-form_active' : '';

  return (
    <div className={`subtask-form${formClass}`}>
      <input className="subtask-input" type="text" onChange={setSubTaskName} value={props.newSubTask.title} minLength="2"></input>
      <div>
        <button className="popup__btn subtask-btn" type="button" onClick={saveSubTask}>Сохранить</button>
        <button className="popup__btn subtask-btn" type="button" onClick={closeForm}>Отмена</button>
      </div>

    </div>

  );
}

export default SubTaskForm;
