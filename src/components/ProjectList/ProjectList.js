import React from 'react';

import ProjectItem from '../ProjectItem/ProjectItem';

function ProjectList(props) {

  function openPopup() {
    props.openProject();
  }

  return (
    <main className="table-section">
      <button className="table-section__btn btn-cross" type="button" onClick={openPopup}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" x2="100" y1="0" y2="100" />
          <line x1="0" x2="100" y1="100" y2="0" />
        </svg>
        <span>Добавить новый проект</span>
      </button>
      <table className="table">
        <thead>
          <tr className="table__head-row">
            <th>Название</th>
            <th>Статус</th>
            <th>Срок</th>
            <th>Прогресс</th>
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
                projectId={i.projectId}
                project={i}
                onProjectClick={props.onProjectClick}
                tasks={props.tasks}
              />
            )
          })}
        </tbody>
      </table>
    </main>

  );
}

export default ProjectList;
