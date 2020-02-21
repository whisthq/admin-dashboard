import React, { Component } from 'react'
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container'
import { bindActionCreators } from 'redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { FaArrowRight } from 'react-icons/fa';
import { sendFormData } from '../../../actions/index.js';

class SignupBox extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, email: '', name: '', cubeType: '1', signedup: false, disabled: true}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changeCubeType = this.changeCubeType.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(name, email, cubeType) {
    if(this.state.email.includes("@") && this.state.name) {
      this.setState({
        disabled: false
      }); 
    } else {
      this.setState({
        disabled: true
      });  
    }
    this.props.dispatch(sendFormData(name, email, cubeType))
    this.setState({
      signedup: true
    })
  }

  changeEmail(evt) {
    this.setState({email: evt.target.value}, function () {
      if(this.state.email.includes("@") && this.state.name) {
        this.setState({
          disabled: false
        }); 
      } else {
        this.setState({
          disabled: true
        });  
      }
    });
  }

  changeName(evt) {
    this.setState({name: evt.target.value}, function () {
      if(this.state.email.includes("@") && this.state.name) {
        this.setState({
          disabled: false
        }); 
      } else {
        this.setState({
          disabled: true
        });  
      }
    });
  }

  changeCubeType(evt) {
    this.setState({
      cubeType: evt.target.value
    });
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

  render() {
    if (this.state.signedup) {
      if (this.state.width < 700) {
        return(<div style = {{color: '#3dcf29', padding: 10}}>Thank you for signing up!<br/>You'll hear from us soon.</div>) 
      }
      return(<div style = {{color: '#3dcf29', padding: 10}}>Thank you for signing up! You'll hear from us soon.</div>) 
    }
    return (
      <Form style = {{maxWidth: 750, margin: 'auto', marginTop: 75, paddingBottom: 75}}>
        <Row>
          <Col xs = {12} sm = {4}>
            <Form.Control placeholder="Full Name" style = {{marginBottom: 10}} value = {this.state.name} onChange = {this.changeName}/>
          </Col>
          <Col xs = {12} sm = {4}>
            <Form.Control placeholder="Email Address" style = {{marginBottom: 10}} value = {this.state.email} onChange = {this.changeEmail}/>
          </Col>
{/*          <Col xs = {12} sm = {4}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Control as="select" value = {this.state.cubeType} onChange = {this.changeCubeType}>
                <option value = "1">Base Cube ($20/month)</option>
                <option value = "2">Enhanced Cube ($30/month)</option>
                <option value = "3">Power Cube ($40/month)</option>
              </Form.Control>
            </Form.Group>
          </Col>*/}
          <Col xs = {12} sm = {4}>
            <Button disabled = {this.state.disabled} onClick={() => this.handleClick(this.state.name, this.state.email, 1)} className = "submitButton" style = {{width: '100%', backgroundColor: '#4B89E5', border: 'none'}}>Submit</Button>
          </Col>
        </Row>
      </Form>

    )
  }
}


export default connect()(SignupBox)