import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // The connect() function connects a React component to a Redux store. It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store
import * as actions from '../actions/index';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './SurveyNew';

function App(props) {
  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <div className='container'>
      <Router>
        <Header />
        <Route exact path='/' component={Landing} />
        <Route exact path='/surveys' component={Dashboard} />
        <Route exact path='/surveys/new' component={SurveyNew} />
      </Router>
    </div>
  );
}

// Provide functions (ie: fetchUser()) to App as props so it can dispatch actions
export default connect(null, actions)(App);
