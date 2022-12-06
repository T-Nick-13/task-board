import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function ProjectItem(props) {

  return (
    <tr className="table__row">
      <td>{props.title}</td>
      <td><span className="table__status">{props.status}</span></td>
      <td>{dayjs(props.term).format('DD.MM.YY')}</td>
      <td>
        <div className="table__progress">
          <div className="table__progress_filled" /* style={{width: i[1]/maxValue * 100 + '%'}} */style={{width: 8/10 * 100 + '%'}}></div>
          <span>70%</span>
        </div>
      </td>
    </tr>
  );
}

export default ProjectItem;
