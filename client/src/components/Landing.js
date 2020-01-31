import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function Landing({ history }) {
  useEffect(() => {
    axios.get('/api/current_user').then(user => {
      if (user.data !== "") {
        history.push('/surveys');
      }
    });
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>EMAILY!</h1>
      Collect feedback from your users with ease
    </div>
  );
}

export default withRouter(Landing);
