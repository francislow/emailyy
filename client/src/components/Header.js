import React from 'react';
import { connect } from 'react-redux'; // The connect() function connects a React component to a Redux store. It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store
import { Link } from 'react-router-dom';
import Payment from './Payment'

function Header(props) {
  function renderContent() {
    switch (props.authReducer) {
      // Still deciding
      case null:
        return;
      case false:
      return [
        // <li><Link to="/get_started">Get Started</Link></li>,
        <li><a href='/auth/google' style={{margin: '0 10px', color: "black"}}>LOGIN</a></li>
      ];
      default:
        return [
          <li key="1"><Payment /></li>,
          <li key="2" style={{margin: '0 10px', color: "white"}}><b>Credits: {props.authReducer.credits}</b></li>,
          <li key="3"><a style={{margin: '0 10px'}} href='/api/logout'>Logout</a></li>
        ];
    }
  }
  return (
    <nav>
      <div className='nav-wrapper' style={{backgroundColor: "#F78D8D"}}>
        <Link 
          style={{marginLeft: '30px', fontFamily: "Shadows Into Light"}} 
          to={props.authReducer ? '/surveys' : '/'} 
          className='left brand-logo'
        >
          EMAILY
        </Link>
        <ul className='right'>
          {renderContent()}
        </ul>
      </div>
    </nav>
  );
}

function mapStateToProps(state) {
  return { authReducer: state.authReducer };
}

export default connect(mapStateToProps)(Header);
