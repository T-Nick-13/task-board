import React from 'react';

import ProjectItem from '../ProjectItem/ProjectItem';

function ProjectList(props) {

  return (
    <table className="table">
      <thead>
        <tr className="table__head-row">
          <th>Project</th>
          <th>Status</th>
          <th>Finish date</th>
          <th>Tasks</th>
        </tr>
      </thead>
      <tbody>
        {props.projects.map((i) => {
          return (
            <ProjectItem
              key={i._id}
              title={i.title}
              term={i.term}
              status={i.status}
              number={i.number}
            />
          )
        })}
      </tbody>
    </table>
  );
}

export default ProjectList;
