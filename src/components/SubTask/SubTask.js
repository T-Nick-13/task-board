import React from 'react';
import dayjs from 'dayjs';

import completeLogo from '../../images/icons8-галочка-50.png';

function SubTask(props) {

  const [subTaskData, setSubTaskData] = React.useState({
    title: props.subtask.title,
    complete: props.subtask.complete
  });

  /**Обработка изменений в форме редактирования задачи*/
  function handleChange(e) {
    const title = e.target.name === "title" ? e.target.value : subTaskData.title;
    const complete = e.target.name === "complete" ? e.target.checked : subTaskData.complete;
    setSubTaskData({
      title,
      complete
    });
    /* props.editSubTask({
      title,
      complete
    }); */
  }

  /**Обновление значений срока и статуса задачи при изменении списка задач*/
  /* React.useEffect(() => {
    console.log(subTaskData)
    props.editSubTask(subTaskData);

  }, [subTaskData]) */

  /* function test() {
    console.log(subTaskData)
    props.editSubTask(subTaskData);
  } */

  const titleClass = subTaskData.complete ? ' subtask__title_complete' : '';

  return (
    <li className="task-list__item subtask" >
      <div>
        <input className="subtask__checkbox" type="checkbox" id="complete" name="complete" onChange={handleChange}/>
        <label className="subtask__label" htmlFor="complete"></label>
      </div>


      {/* <input id="title" className={`popup__input task-list__title subtask__title${titleClass}`} name="title"
        type="text" onChange={handleChange} value={subTaskData.title} minLength="2" maxLength="100"
        required placeholder="Название задачи"/> */}
      <h3 className={`popup__input task-list__title subtask__title${titleClass}`}>{subTaskData.title}</h3>
    </li>
  );
}

export default SubTask;
