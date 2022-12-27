import React from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

function CommentForm(props) {

  const [text, setText] = React.useState('');

  function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSave() {
    const newComment = {
      id: uuidv4(),
      text,
      userName: 'User ' + randomInteger(1,99),
      date: dayjs(),
      parentId: '',
      level: 0,
      taskId: props.task._id
    };
    const replyComment = {
      id: uuidv4(),
      text,
      userName: 'User ' + randomInteger(1,99),
      date: dayjs(),
      parentId: props.comment ? props.comment.id : '',
      level: props.comment ? props.comment.level + 1 : '',
      taskId: props.task._id
    }
    if (text.length > 0) {
      props.createComment(props.comment ? replyComment : newComment);
      setText('');
      if (props.reply) {
        props.closeForm();
      }
    }
  }

  function handleClose() {
    props.closeForm();
  }

  const saveBtnActive = text.length > 0 ? ' comment-form__btn_active' : '';
  const cancelBtnActive = props.reply ? ' comment-form__btn-cancel_active' : '';
  const placeholderClass = props.reply ? 'Написать ответ...' : 'Оставить комментарий...';

  return (
    <div className="comment-form popup__element">
      <textarea className="comment-form__text popup__textarea" name="comment-form"
        onChange={handleChange} placeholder={placeholderClass} value={text}/>
      <div className="comment-form__btn-container">
        <button className={`comment-form__btn${saveBtnActive}`} type="button" onClick={handleSave}>Отправить</button>
        <button className={`comment-form__btn comment-form__btn-cancel${cancelBtnActive}`}
          type="button" onClick={handleClose}>Отмена</button>
      </div>

    </div>

  );
}

export default CommentForm;
