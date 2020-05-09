import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/types';

// survey reducers stores user
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload; // set state to action.payload;
    case DELETE_SURVEY:
      return state.filter(survey => { 
        return survey._id != action.payload;  // here action.payload is the surveyId that was just deleted
      })
    default:
      return state;
  }
}