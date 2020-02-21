import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import '../../static/App.css';

import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { updateDB, loginUser } from '../../actions/index.js'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, loaded: false, emailLogin: '', passwordLogin: '' }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.refreshDB()
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
      this.props.dispatch(loginUser(this.state.emailLogin, this.state.passwordLogin));
    }
  }

  handleLogin = () => {
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

  refreshDB = () => {
    this.props.dispatch(updateDB())
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    return (
    <div>
    {
    !this.props.authenticated
    ?
    <div style = {{height: '100vh'}}>
      <div style = {{width: 350, margin: 'auto', marginTop: 150}}>
      <InputGroup className="mb-3" style = {{marginTop: 30}}>
        <FormControl
          type = "email"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder = "Email Address"
          onChange = {this.changeEmailLogin}
          onKeyPress = {this.loginKeyPress}
          style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
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
          style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
        />
      </InputGroup>

      <Button  onClick = {this.handleLogin} style = {{marginTop: 50, color: 'white', width: '100%', border: 'none', background: 'linear-gradient(258.54deg, #2BF7DE 0%, #94A8ED 100%)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'}}>LOG IN</Button>
      </div>
    </div>
    :
      <div style = {{padding: 50, backgroundColor: "#0b172b"}}>
        <div style = {{fontSize: 35, color: 'white', fontWeight: 'bold'}}>
          Dashboard
        </div>
        <Row>
          <Col md = {8}>
            <table style = {{backgroundColor: "#2b2c4d", width: "100%", borderRadius: 5, marginTop: 30, minHeight: 400}}>
              <tr style = {{color: 'white', fontSize: 18}}>
                <td style = {{padding: '20px 20px'}}>
                  Fractal Cloud PCs
                </td>
                <td></td>
                <td style = {{textAlign: 'right', margin: 0, padding: '0 !important'}}>
                  <Button onClick = {this.refreshDB} style = {{height: '65px', borderRadius: '0px 5px 0px 0px', backgroundColor: '#5ec3eb', border: 'none', padding: '20px 30px', fontWeight: 'bold'}}>Refresh</Button>
                </td>
              </tr>
              <tr style = {{color: 'white', padding: 20, backgroundColor: "#1e1f36", fontSize: 14}}>
                <th style = {{padding: '10px 20px'}}>Username</th>
                <th>IP Address</th>
                <th>VM Name</th>
              </tr>
              {this.props.vm_info.map((value, index) => {
                return (
                  <tr style = {{borderTop: "solid 0.5px #363861", color: "#DFDFDF", fontSize: 14}}>
                    <td style = {{padding: '10px 20px'}}>{value.username}</td>
                    <td>{value.ip}</td>
                    <td>{value.vm_name}</td>
                  </tr>
                )
              })}
            </table>
          </Col>
        </Row>
      </div>
    }
    </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    authenticated: state.AccountReducer.authenticated,
    vm_info: state.AccountReducer.vm_info
  }
}

export default connect(mapStateToProps)(Admin)