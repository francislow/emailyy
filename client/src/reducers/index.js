import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({ authReducer, form: reduxForm, surveysReducer }); // reduxForm needs to be assigned to 'form' as form stores all the state.
