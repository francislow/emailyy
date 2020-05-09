import React from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from "./formFields"

// Shows user a form for userinput
function SurveyForm(props) {
  function renderAllFields() {
    return formFields.map(({ label, name }) => {
      return (
        <Field
          label={label}
          type='text'
          name={name}
          component={SurveyField}
        />
      );
    });
  }

  return (
    <form onSubmit={props.handleSubmit(() => props.setShowReview(true))}>
      <div style={{marginTop: "35px"}}>
        {renderAllFields()}
      </div>
      <Link to='/surveys' className='red lighten-4 btn black-text'>
        Cancel
        <i className='material-icons right'>close</i>
      </Link>
      <button className='red lighten-2 btn right white-text' type='submit'>
        Next
        <i className='material-icons right'>arrow_forward</i>
      </button>
    </form>
  );
}

function validateForm(values) {
  // If key in errors object matches the state name,
  // redux form will automatically associate error message with respective field that holds the state name
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  if (!values.title) {
    errors.title = 'You must provide a title';
  }
  if (!values.subject) {
    errors.subject = 'You must provide a subject';
  }
  if (!values.body) {
    errors.body = 'You must provide a body';
  }
  if (!values.recipients) {
    errors.recipients = 'You must provide at least 1 email';
  }

  // Errors is empty means redux-form is all good
  return errors;
}

export default reduxForm({
  form: 'surveyForm',
  validate: validateForm,
  destroyOnUnmount: false
})(SurveyForm);
