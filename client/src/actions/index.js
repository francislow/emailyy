import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// react-thunk allows us to return an async function and store it as a state
export function fetchUser() {
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  };
}

export function handleToken(token) {
  return function(dispatch) {
    axios
      .post('/api/stripe', token)
      .then(res => dispatch({ type: FETCH_USER, payload: res.data })); // every time u dispatch, u save to state in redux too
  };
}

export function submitSurvey(values, history) {
  return function(dispatch) {
    axios
      .post('/api/surveys', values)
      .then(res => {
        history.push('/surveys');
        dispatch({ type: FETCH_USER, payload: res.data });
      });
  };
}

export function fetchSurveys() {
  return function(dispatch) {
    axios
      .get('/api/surveys')
      .then(res => {  
        dispatch({ type: FETCH_SURVEYS, payload: res.data });
      });
  };
}
