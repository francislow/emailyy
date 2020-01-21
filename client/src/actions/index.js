import axios from 'axios';
import { FETCH_USER } from './types';

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
      .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
  };
}