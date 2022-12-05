import React from 'react';
import { Link } from 'react-router-dom';

function ProjectList(props) {

  return (
    <table className="table">
      <thead>
        <tr className="table__head-row">
          <th>Project</th>
          <th>Status</th>
          <th>Start date</th>
          <th>Tasks</th>
        </tr>
      </thead>
      <tbody>
        {/* {props.records.map((rec) => {
          return (
            <Record
              key={rec.id}
              date={rec.date}
              title={rec.title}
              amount={rec.amount}
              distance={rec.distance}
            />
          )
        })} */}
        <tr className="table__row">
          <td>проект 1</td>
          <td>активен</td>
          <td>05.12.22</td>
          <td>5-10</td>
        </tr>
        <tr className="table__row">
          <td>проект 1: этого проекта</td>
          <td>
            <span className="table__status">Acitve</span>
          </td>
          <td>05.12.22</td>
          <td>
            <div className="table__progress">
              <div className="table__progress_filled" /* style={{width: i[1]/maxValue * 100 + '%'}} */
                style={{width: 8/10 * 100 + '%'}}></div>
              <span>70%</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ProjectList;
