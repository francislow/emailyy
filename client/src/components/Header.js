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
        return <li><a href='/auth/google'>Sign in to google!</a></li>;
      default:
        return [
          <li key="1"><Payment /></li>,
          <li key="2" style={{margin: '0 10px'}}>Credits: {props.authReducer.credits}</li>,
          <li key="3"><a href='/api/logout'>Logout</a></li>
        ];
    }
  }
  return (
    <nav>
      <div className='nav-wrapper'>
        <Link 
          to={props.authReducer ? '/surveys' : '/'} 
          className='left brand-logo'
        >
          Emailyy
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
