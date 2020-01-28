import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../actions/index';
import { useEffect } from 'react';

function SurveyList({ surveys, fetchSurveys }) {
  useEffect(fetchSurveys, []);

  function renderSurveys() {
    return surveys.reverse().map(survey => {
      return (
        <div className='card darken-1' key={survey.id}>
          <div className='card-content'>
            <span className='card-title'>{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
          </div>
          <div className='card-action'>
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  return <div>{renderSurveys()}</div>;
}

function mapStateToProps(state) {
  return { surveys: state.surveysReducer };
}
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
