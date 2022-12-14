import React from 'react';
import Comment from '../Сomment/Сomment';

function CommentList(props) {

  const taskId = props.task ? props.task._id : '';

  return (
    <div className="comment-list">
      {props.commentList.filter(i => i.level === 0 && i.taskId === taskId).map((i) => {
        return (
          <Comment
            comment={i}
            key={i.id}
            createComment={props.createComment}
            commentList={props.commentList}
            task={props.task}
          />
        )
      })}

    </div>

  );
}

export default CommentList;
