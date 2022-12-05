import React from 'react';

function PopupDel(props) {

  const activePopup = props.activePopupDel ? 'popup popup_active' : 'popup';
  const activeForm = props.activePopupDel ? 'popup__del-form popup__del-form_active' : 'popup__del-form';

  /**Обработка клика по кнопке "отмена" для закрытия попап подтверждения удаления*/
  function closePopup() {
    props.onPopupClose();
  }

  /**Обработка клика по кнопке для подтверждения удаления задачи*/
  function submitDeleting(e) {
    e.preventDefault();
    props.onSubmit(props.task);
  }

  return (
    <div className={activePopup}>
      <form className={activeForm} noValidate onSubmit={submitDeleting}>
        <button className="popup__del-btn" type="submit">Удалить задачу</button>
        <button className="popup__del-btn popup__del-btn_cancel" type="button" onClick={closePopup}>Отмена</button>
      </form>
    </div>
  );
}

export default PopupDel;
