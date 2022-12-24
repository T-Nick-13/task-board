import React from 'react';

function Comment(props) {


  return (
    <div className="comment">

      <div className="comment__data">
        <div className="comment__avatar">
          <span>U1</span>
        </div>
        <div className="comment__data-container">
          <p className="comment__user-name">User 1</p>
          <p className="comment__date comment__secondary-data">24.12.22</p>
        </div>
      </div>

      <p className="comment__text">That iis comment body. Let's see what we have</p>
      <button className="comment__reply comment__secondary-data" type="button">Ответить</button>
    </div>

  );
}

export default Comment;
