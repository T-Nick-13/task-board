import React from 'react';
import SubTask from '../SubTask/SubTask';

function SubTaskList(props) {


  return (
    <ul className="subtask-list">
      {/* {props.taskList.map((i) => {
        return (
          <SubTask
            onTaskClick={props.openTask}
            title={i.title}
            key={i._id}
            task={i}
            term={i.term}
            status={i.status}
            onDeleteClick={props.openPopupDel}
            onCompleteClick={props.completeTask}
            editTaskField={props.editTaskField}
            taskList={props.taskList}
          />


        )
      })} */}
      <SubTask
        task={props.task}
      />
      <SubTask
        task={props.task}
      />
    </ul>
  );
}

export default SubTaskList;
