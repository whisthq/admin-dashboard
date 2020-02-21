import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import '../static/App.css';
import { HashLink } from 'react-router-hash-link';

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0 }
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

  render() {
    return (
      <div style = {{width: '100%', backgroundColor: '#0b172b', padding: 30, paddingTop: 60, fontSize: 15, borderTop: 'solid 1px white'}}>
       <Container>
{/*        <div style = {{color: 'white', width: '100%'}}>
          <div style = {{fontSize: 30, fontWeight: 'bold'}}>
          BEGIN
          </div>
          <div style = {{fontSize: 15, marginTop: 20}}>
          Getting started with Fractal is free!<br/>Unlock your cloud supercomputer below.
          </div>
          <HashLink to = "/vm#top">
            <Button style = {{marginTop: 25, paddingLeft: 40, paddingRight: 40, background: 'rgba(0,0,0,0.0)', border: 'solid 1px #94a8ed', color: '#94a8ed', marginTop: 40}}>Get Started</Button>
          </HashLink>
        </div>*/}
        {
        this.state.width > 700
        ?
        <div style = {{float: 'right'}}>
          <HashLink to = "/vm#top">
            <Button style = {{paddingLeft: 40, paddingRight: 40, background: 'rgba(0,0,0,0.0)', border: 'solid 1px #5ec3eb', color: '#5ec3eb'}}>Get Started</Button>
          </HashLink>
        </div>
        :
        <div style = {{marginBottom: 50}}>
          <HashLink to = "/vm#top">
            <Button style = {{paddingLeft: 40, paddingRight: 40, background: 'rgba(0,0,0,0.0)', border: 'solid 1px #5ec3eb', color: '#5ec3eb'}}>Get Started</Button>
          </HashLink>
        </div>
        }
        <div style = {{width: '100%', minHeight: 100}}>
          <Row style = {{width: 250, color: 'white'}}>
            <Col xs = {6}>
              <div style = {{fontWeight: 'bold', marginBottom: 10}}>MENU</div>
              <div style = {{fontSize: 12}}>
                <Link to = "/" style = {{textDecoration: 'none'}}>
                  <div style = {{color: 'white', textDecoration: 'none', marginBottom: 4}}>
                  Home
                  </div>
                </Link>
                <HashLink to = "/#beta" style = {{textDecoration: 'none'}}>
                  <div style = {{color: 'white', textDecoration: 'none', marginBottom: 4}}>
                  Join Beta
                  </div>
                </HashLink>
                <Link to  = "/auth" style = {{textDecoration: 'none'}}>
                  <div style = {{color: 'white', textDecoration: 'none', marginBottom: 4}}>
                  My Account
                  </div>
                </Link>
              </div>
            </Col>
            <Col xs = {6}>
              <div style = {{fontWeight: 'bold', marginBottom: 10}}>SUPPORT</div>
              <div style = {{fontSize: 12}}>
                <div>
                <a href = "mailto: hello@fractalcomputers.com" style = {{color: 'white', textDecoration: 'none', marginBottom: 4}}>Contact Us</a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div style = {{fontSize: 11, marginTop: 50, width: '100%'}}>
          <p style = {{margin: 0, textAlign: 'left', color: 'white'}}>Copyright &copy; Fractal Computers Inc., All Rights Reserved.</p>
        </div>
      </Container>
    </div>
    )
  }
}

export default Footer