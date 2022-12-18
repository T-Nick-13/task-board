import React from 'react';
import TaskListItem from '../TaskListItem/TaskListItem';

function TaskList(props) {


  return (
    <ul className="task-list">
      {props.taskList.map((i) => {
        return (
          <TaskListItem
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
      })}
    </ul>
  );
}

export default TaskList;
