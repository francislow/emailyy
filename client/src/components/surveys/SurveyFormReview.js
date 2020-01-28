import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

// Shows user a form for userinput
function SurveyFormReview({ setShowReview, formValues, submitSurvey, history }) {
  function onCancel() {
    setShowReview(false);
  }

  function onSend() {
    submitSurvey(formValues, history);
  }

  function renderReviewComponents() {
    return formFields.map(({ label, name }) => {
      return (
        <div>
          <label>{label}</label>
          <p>{formValues[name]}</p>
        </div>
      );
    });
  }

  return (
    <div>
      <h2>Please confirm your entries:</h2>
      {renderReviewComponents()}
      <button
        onClick={onCancel}
        className='yellow darken-3 btn-flat white-text'>
        Back
      </button>
      <button onClick={onSend} className='green btn-flat right white-text'>
        Submit<i className='material-icons right'>email</i>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
