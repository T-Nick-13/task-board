import React from 'react';
import dayjs from 'dayjs';
import CommentForm from '../CommentForm/CommentForm';
import ReplyList from '../CommentList/ReplyList';

function Comment(props) {

  const [replyForm, setReplyForm] = React.useState(false);
  const [repliesActive, serRepliesActive] = React.useState(false);

  function handleReply() {
    setReplyForm(true);
  }

  function closeForm() {
    setReplyForm(false);
  }

  function showReplies() {
    serRepliesActive(!repliesActive);
  }

  const repliesClass = props.commentList.filter(i => i.parentId === props.comment.id).length > 0 ? ' comment__btn-view_active' : '';



  return (
    <div className="comment">

      <div className="comment__data">
        <div className="comment__avatar">
          <span>{`U${props.comment.userName.slice(5)}`}</span>
        </div>
        <div className="comment__data-container">
          <p className="comment__user-name">{props.comment.userName}</p>
          <p className="comment__date comment__secondary-data">{dayjs(props.comment.date).format('DD.MM.YY')}</p>
        </div>
      </div>
      <p className="comment__text">{props.comment.text}</p>
      <button className="comment__btn comment__secondary-data" type="button" onClick={handleReply}>Ответить</button>
      <button className={`comment__btn comment__secondary-data comment__btn-view${repliesClass}`}
        type="button" onClick={showReplies}>Посмотреть ответы</button>
      {replyForm ?
        <CommentForm
          reply={replyForm}
          closeForm={closeForm}
          comment={props.comment}
          createComment={props.createComment}
          task={props.task}
        /> : ''}
        <ReplyList
          comment={props.comment}
          commentList={props.commentList}
          createComment={props.createComment}
          repliesActive={repliesActive}
        />
    </div>

  );
}

export default Comment;
