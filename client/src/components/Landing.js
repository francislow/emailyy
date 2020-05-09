import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import picture from "../images/3646374.jpg"

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
      <h1 style={{fontFamily: "Shadows Into Light"}}>EMAILY!</h1>
      <p>Collecting feedback from your users has never been easier</p>
      <img src={picture} width="390px"/><br/>
      <a href="http://www.freepik.com" style={{fontSize:"10px"}}>Designed by stories / Freepik</a>
      
    </div>
  );
}

export default withRouter(Landing);
