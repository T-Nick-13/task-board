import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function ProjectItem(props) {

  function openTaskBoard() {
    props.onProjectClick(props.project);
  }

  const taskSum = props.tasks ? props.tasks.filter(i => i.projectId === props.projectId).length : 0;
  const doneTasks = props.tasks ? props.tasks.filter(i => i.projectId === props.projectId && i.status === 'Done').length : 0;
  const donePart = isNaN(doneTasks/taskSum) ? 0 + '%' : Math.round(doneTasks/taskSum * 100) + '%';

  return (
    <tr className="table__row">
      <td><Link to={`/${props.projectId}`} onClick={openTaskBoard} className="table__link">{props.title}</Link></td>
      <td><span className="table__status">{props.status}</span></td>
      <td>{dayjs(props.term).format('DD.MM.YY')}</td>
      <td>
        <div className="table__progress">
          <div className="table__progress_filled" style={{width: donePart}}></div>
          <span>{donePart}</span>
        </div>
      </td>
    </tr>
  );
}

export default ProjectItem;
