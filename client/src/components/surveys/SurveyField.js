import React from 'react';

// Shows user a form for userinput
function SurveyField({ input, label, meta }) {
  return (
    <div className="wrapper_form_field" style={{marginBottom: "20px"}}>
      <label htmlFor="icon_prefix">{label == 'Survey Name' ? <h5>{label}</h5> : label}</label>
      <input 
        placeholder={meta.touched ? meta.error : null} 
        id="icon_prefix" 
        type="text" 
        {...input} />
    </div>
  );
}

export default SurveyField;
