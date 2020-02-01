import React from 'react';

function ProjectModelBox(props) {
  return (
    // Model content
    <div className={`wrapper-model-box ${props.visibility}`}>
      <div className="content">
        <p>Please check that you have enough credits.</p>
        <button onClick={() => props.setVisibility('invisible')}>Ok</button>
      </div>
    </div>
  );
}

export default ProjectModelBox;
