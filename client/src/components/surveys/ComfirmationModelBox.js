import React from 'react';

function ConfirmationModelBox(props) {
  return (
    // Model content
    <div className={`wrapper-model-box ${props.visibility}`}>
      <div className="content">
        <i className="material-icons wallet_icon">account_balance_wallet</i>
        <p>Please check that you have enough credits.</p>
        <button onClick={() => props.setVisibility('invisible')}>Okay</button>
      </div>
    </div>
  );
}

export default ConfirmationModelBox;
