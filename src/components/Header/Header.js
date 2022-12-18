import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Header(props) {

  const title = useLocation().pathname === '/' ? 'New project' : 'New task';

  function openPopup() {
    if (title === 'New project') {
      props.openProject();
    } else {
      props.openNewTask();
    }
  }

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title"><Link to="/">Task-board</Link></h1>
        <button className="btn-cross header__btn" type="button" onClick={openPopup}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" x2="100" y1="0" y2="100" />
            <line x1="0" x2="100" y1="100" y2="0" />
          </svg>
          <span>{title}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
