import React from 'react';

function Header(props) {

  function openNewTask() {
    props.onBtnClick();
  }

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Todo-list</h1>
        <button className="header__btn btn-cross" type="button" onClick={openNewTask}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" x2="100" y1="0" y2="100" />
            <line x1="0" x2="100" y1="100" y2="0" />
          </svg>
          <span>Добавить задачу</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
