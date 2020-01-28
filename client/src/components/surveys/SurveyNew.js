import React, { useState } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

// Consist of SurveyForm and SurveyFormReview
function SurveyNew() {
  const [showReview, setShowReview] = useState(false);
  return (
    <div>
      {showReview ? (
        <SurveyFormReview
          showReview={showReview}
          setShowReview={setShowReview}
        />
      ) : (
        <SurveyForm setShowReview={setShowReview} />
      )}
    </div>
  );
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
