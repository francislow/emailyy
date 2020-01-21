import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import 'materialize-css/dist/css/materialize.min.css';

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
console.log('ENVIRONMENT IS', process.env.NODE_ENV);

serviceWorker.unregister();
