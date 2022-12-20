import React from 'react';
import SubTask from '../SubTask/SubTask';
import { v4 as uuidv4 } from 'uuid';

function SubTaskList(props) {


  return (
    <ul className="subtask-list">
      {props.subTasks.map((i) => {
        return (
          <SubTask
            key={uuidv4()}
          />
        )
      })}
    </ul>
  );
}

export default SubTaskList;
