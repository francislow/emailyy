import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../actions/index';
import { useEffect } from 'react';
import moment from 'moment';
import ComfirmationDeleteModel from "./ComfirmationDeleteModel"


function SurveyList({ surveys, fetchSurveys, deleteSurvey }) {
  const [modelVisibility, setModelVisiblility] = useState("invisible");
  const [surveyToDelete, setSurveyToDelete] = useState(null);

  useEffect(fetchSurveys, []);

  function renderSurveys() {
    return surveys
      // sort newest on top
      .slice().sort((a, b) => {
        return new Date(b.dateSent) - new Date(a.dateSent);
      })
      // map each survey to a html element
      .map(survey => {
        return (
          <div className='card darken-1' key={survey._id}>
            <div className='card-content'>
              <span className='card-title'>{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">Sent on: {moment(survey.dateSent).format("DD/M/YYYY h:mm A")}</p>
            </div>
            <div className='card-action'>
              <a>Yes: {survey.yes}</a>
              <a>No: {survey.no}</a>
              <a style={{cursor:"pointer"}} className="right" onClick={() =>  {setSurveyToDelete(survey._id); setModelVisiblility("visible");}}>
                <i className='material-icons'>close</i>
              </a>
            </div>
          </div>
        );
    })
  }

  return (
    <div>
      <ComfirmationDeleteModel 
        setVisibility={setModelVisiblility}
        visibility={modelVisibility}
        deleteSurvey={() => deleteSurvey(surveyToDelete)}
      />
      {renderSurveys()}
    </div>
  );
}

function mapStateToProps(state) {
  return { surveys: state.surveysReducer };
}
export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(SurveyList);

