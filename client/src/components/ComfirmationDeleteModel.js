import React from 'react';

function ComfirmationDeleteModel(props) {
  function handleDelete() {
    props.deleteSurvey();
    props.setVisibility('invisible')
  }
  return (
    // Model content
    <div className={`wrapper-model-box ${props.visibility}`}>
      <div className="content">
        <p>Are you sure you want to delete survey? This step CANNOT be undone.</p>
        <button onClick={() => props.setVisibility('invisible')}>Cancel</button>
        <button onClick={() => handleDelete()}>Ok</button>
      </div>
    </div>
  );
}

export default ComfirmationDeleteModel;
