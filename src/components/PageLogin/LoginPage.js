import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Popup from "reactjs-popup";
import '../../static/App.css';

import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { loginUser } from '../../actions/index.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'


class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {emailLogin: '', passwordLogin: '', loggingIn: false, failed_login_attempt: false}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  changeEmailLogin = (evt) => {
    this.setState({
      emailLogin: evt.target.value
    });
  }

  loginKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.setState({loggingIn: true, failed_login_attempt: false})
      this.props.dispatch(loginUser(this.state.emailLogin, this.state.passwordLogin));
    }
  }

  handleLogin = () => {
    this.setState({loggingIn: true, failed_login_attempt: false})
    this.props.dispatch(loginUser(this.state.emailLogin, this.state.passwordLogin));
  }

  changePasswordLogin = (evt) => {
    if(evt.key === 'Enter') {
      this.props.dispatch(loginUser(this.state.emailLogin, this.state.passwordLogin));
    } else {
      this.setState({
        passwordLogin: evt.target.value
      });
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.login_attempts != this.props.login_attempts && !this.state.failed_login_attempt) {
      this.setState({failed_login_attempt: true, loggingIn: false})
    }
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    return (
      <div style = {{height: '100vh'}}>
        <div style = {{width: 300, margin: 'auto', marginTop: 150}}>
          <div style = {{textAlign: 'center', fontWeight: 'bold', fontSize: 30, marginBottom: 30}}>
            Fractal Admin
          </div>
          {
          this.state.failed_login_attempt
          ?
          <div style = {{textAlign: 'center', fontSize: 14, color: "#f9000b", background: "#fdf0f1", width: '100%', padding: 10, borderRadius: 5, fontWeight: 'bold', marginBottom: 20}}>
            Invalid credentials
          </div>
          :
          <div></div>
          }
          <InputGroup className="mb-3">
            <FormControl
              type = "email"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder = "Username"
              onChange = {this.changeEmailLogin}
              onKeyPress = {this.loginKeyPress}
              style = {{borderRadius: 5, maxWidth: 600, backgroundColor: "#F4F4F4", border: "none", padding: "30px 20px"}}
            /><br/>
          </InputGroup>

          <InputGroup className="mb-3" style = {{marginTop: 20}}>
            <FormControl
              aria-label="Default"
              type = "password"
              aria-describedby="inputGroup-sizing-default"
              placeholder = "Password"
              onChange = {this.changePasswordLogin}
              onKeyPress = {this.loginKeyPress}
              style = {{borderRadius: 5, maxWidth: 600, backgroundColor: "#F4F4F4", border: "none", padding: "30px 20px"}}
            />
          </InputGroup>
          {
          !this.state.loggingIn
          ?
          <Button  onClick = {this.handleLogin} style = {{marginTop: 10, fontWeight: 'bold', color: 'white', width: '100%', border: 'none', background: 'black', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', padding: '15px'}}>
              LOG IN
          </Button>
          :
          <Button  disabled = "true" style = {{marginTop: 10, fontWeight: 'bold', color: 'white', width: '100%', border: 'none', background: 'black', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', padding: '15px', textAlign: 'center'}}>
              <FontAwesomeIcon icon = {faCircleNotch} spin style = {{color: 'white', fontSize: 13}}/>
          </Button>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login_attempts: state.AccountReducer.login_attempts
  }
}

export default connect(mapStateToProps)(LoginPage)
