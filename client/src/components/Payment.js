import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

function Payment(props) {
  return (
    <StripeCheckout
      name="Emailyy"
      description="$5 for 5 email credits"
      amount={500}
      token={token => props.handleToken(token)} // Callback function after receiving token from stripe
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
}

export default connect(null, actions)(Payment);
