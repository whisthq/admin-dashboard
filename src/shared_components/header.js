import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Logo from '../assets/big-logo.png'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import '../static/App.css';
import { HashLink } from 'react-router-hash-link';

class Header extends Component {
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
      <div style = {{width: '100%', position: 'absolute', padding: 10, marginTop: 20, overflowX: 'hidden'}}>  
        {
        this.state.width > 700 
        ?
        <div className = "fractal-container">
        <div style = {{display: 'flex', width: '100%'}}>
          <div style = {{width: '40%', textAlign: 'left'}}>
            <Link to = '/' style = {{textDecoration: 'none', color: `${ this.props.color }`, fontWeight: 'bold', fontSize: 24}}>
              <img src = {Logo} style = {{height: 24, position: 'relative', bottom: 2, right: 10}}/>
              Fractal
            </Link> 
          </div>
          <div style = {{width: '60%', textAlign: 'right'}}>
              <HashLink className = 'headerlink' to = '/#beta' style={{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12}}>
                <span style = {this.props.linkStyle}>Join Beta</span>
              </HashLink>
              <a href = "mailto: hello@fractalcomputers.com" style = {{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12, marginLeft: 20}}>
                <span style = {this.props.linkStyle}>Contact Us</span>
              </a>
              <Link to = "/auth">
                <Button style = {{marginLeft: 35, color: `${ this.props.button }`, border: 'solid 1px #5ec3eb', borderColor: `${ this.props.button }`, fontWeight: 'bold', paddingLeft: 20, paddingRight: 20,background: "rgba(0, 0,0,0.0)"}}>My Account</Button>
              </Link>
          </div>
        </div>
        </div>
        :
        <div style = {{paddingLeft: 10, paddingRight: 10, minHeight: 30}}>
          <div style = {{color: 'white', fontWeight: 'bold', float: 'left'}}>
            <Link to = '/' style = {{color: '#c7c7c7', fontSize: 20}}>
              Fractal
            </Link>
          </div> 
          <div style = {{float: 'right'}}>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" style = {{backgroundColor: 'rgba(0,0,0,0.0)', border: 'none', padding: 0}}>
                <span style = {{color: "#333333"}}><FaBars/></span>
              </Dropdown.Toggle>

              <Dropdown.Menu style = {{backgroundColor: 'white'}}>
                <Dropdown.Item href="#/action-3">
                  <HashLink className = 'headerlink' to = '/#beta' style = {{color: '#333333'}}>
                    Join Beta
                  </HashLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a href = "mailto: hello@fractalcomputers.com" style = {{color: '#333333'}}>
                    Contact Us
                  </a>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link className = 'headerlink' to = '/auth' style = {{color: '#333333'}}>
                    My Account
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
          </div>
        </div>
        }    
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />    
      </div>
    )
  }
}

export default Header