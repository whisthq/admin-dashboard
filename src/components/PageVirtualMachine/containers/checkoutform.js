import React, {Component} from 'react';
import {CardElement, injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';
import Button from 'react-bootstrap/Button'
import { changeStage, chargeStripe } from '../../../actions/index.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeStage = (stage) => {
    this.props.dispatch(changeStage(1))
  }

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };

  async handleSubmit(evt) {
    evt.preventDefault();
    let {token} = await this.props.stripe.createToken();
    this.props.dispatch(chargeStripe(token.id,  2500))
  };

  render() {
    const style = {
      base: {
        color: "#333333",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#888888"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <label style = {{width: '100%', maxWidth: 600}}>
          <CardElement className="MyCardElement" style={style} />
        </label>
        <div style = {{maxWidth: 600}}>
          <Button onClick = {() => this.changeStage(1)} style = {{width: '38%', maxWidth: 600, backgroundColor: '#94a8ed', border: 0, marginTop: 20, fontWeight: 'bold', fontSize: 14, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)'}}>GO BACK</Button>
          <Button onClick = {this.handleSubmit} style = {{width: '58%', maxWidth: 600, background: "linear-gradient(258.54deg, #2BF7DE 0%, #62CEE6 52.08%, #94A8ED 100%)", border: 0, marginTop: 20, float: 'right', fontWeight: 'bold', fontSize: 14, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)'}}>
            PAY
          </Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { 
    stage: state.AccountReducer.stage}
}


export default connect(mapStateToProps)(injectStripe(CheckoutForm));