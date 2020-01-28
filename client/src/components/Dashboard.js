import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './SurveyList';

export default function Dashboard() {
  return (
    <>
      <SurveyList />  
      <div className='fixed-action-btn'>
        <Link to="/surveys/new" className='btn-floating btn-large red'>
          <i className='large material-icons'>add</i>
        </Link>
      </div>
    </>
  );
}
