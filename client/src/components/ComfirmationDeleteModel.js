import React from 'react';

function ComfirmationDeleteModel(props) {
  function handleDelete() {
    props.deleteSurvey();
    props.setVisibility('invisible')
  }
  return (
    // Model content
    <div className={`wrapper-delete-box ${props.visibility}`}>
      <div className="content">
        <i className="material-icons error_icon">error_outline</i>
        <p>Are you sure you want to delete this survey <u>permanently?</u></p>

        <div>
          <button class="cancel_btn" onClick={() => props.setVisibility('invisible')}>Cancel</button>
          <button class="delete_btn" onClick={() => handleDelete()}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ComfirmationDeleteModel;
