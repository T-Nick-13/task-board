import React from 'react';
import Comment from '../Сomment/Сomment';

function ReplyList(props) {

  const repliesClass = props.repliesActive ? ' reply-list_active' : '';

  return (
    <div className={`comment-list reply-list${repliesClass}`}>
      {props.commentList.filter(i => i.level !== 0 && i.parentId === props.comment.id).map((i) => {
        return (
          <Comment
            comment={i}
            key={i.id}
            createComment={props.createComment}
            commentList={props.commentList}
          />
        )
      })}

    </div>

  );
}

export default ReplyList;
