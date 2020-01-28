import React from 'react';

// Shows user a form for userinput
function SurveyField({ input, label, meta }) {
  console.log(meta);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '2px' }} />
      <div className="red-text" style={{marginBottom: "15px"}}>{meta.touched ? meta.error : null}</div>
    </div>
  );
}

export default SurveyField;
