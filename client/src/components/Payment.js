import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

function Payment(props) {
  return (
    <StripeCheckout
      name="Emailyy"
      description="10 dollars for 10 email credits"
      amount={1000}
      token={token => props.handleToken(token)} // Callback function after receiving token from stripe
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    >
      <button style={{margin: '0 20px', fontSize: "8px", lineHeight: "5px"}} className="btn red darken-1" ><b>Add Credits</b></button>
    </StripeCheckout>
  );
}

export default connect(null, actions)(Payment);
