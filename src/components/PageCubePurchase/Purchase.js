import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import '../../static/App.css';
import WhiteCube from '../../assets/whitecube.svg'
import BaseSpec from '../../assets/basespec.svg'
import EnhancedSpec from '../../assets/enhancedspec.svg'
import PowerSpec from '../../assets/powerspec.svg'
import SpecBox from './containers/specBox.js'
import { FaArrowRight } from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { addBaseCube, addEnhancedCube, addPowerCube, createCart, deleteBaseCube, deleteEnhancedCube, deletePowerCube } from '../../actions/index.js';


class Purchase extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, continue: false }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  baseCube() {
    this.props.dispatch(addBaseCube())
    this.setState({ continue: true })
  }

  enhancedCube() {
    this.props.dispatch(addEnhancedCube())
    this.setState({ continue: true })
  }

  powerCube() {
    this.props.dispatch(addPowerCube())
    this.setState({ continue: true })
  }

  deleteBase() {
    this.props.dispatch(deleteBaseCube())
    if(this.props.enhanced === 0 && this.props.power === 0) {
      this.setState({ continue: false })
    }
  }

  deleteEnhanced() {
    this.props.dispatch(deleteEnhancedCube())
    if(this.props.base === 0 && this.props.power === 0) {
      this.setState({ continue: false })
    }
  }

  deletePower() {
    this.props.dispatch(deletePowerCube())
    if(this.props.enhanced === 0 && this.props.base === 0) {
      this.setState({ continue: false })
    }
  }


  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    createCart()
    if(this.props.enhanced > 0 || this.props.base > 0 || this.props.power > 0) {
      this.setState({ continue: true })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    const baseBox = {padding: 25, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 15} 
    const baseFont = {color: '#111111'}
    const baseSubFont = {color: '#666666', fontWeight: 'normal', fontSize: 15}
    const enhancedBox = {backgroundColor: '#124270', padding: '20px 20px 5px 20px'}
    const enhancedFont = {color: 'white'}
    const baseButton = {border: 'solid 2px #111111', backgroundColor: 'rgba(0,0,0,0.0)', color: '#111111', padding: '10px 15px', position: 'relative', bottom: 20}
    const enhancedButton = {border: 'solid 2px white', backgroundColor: 'rgba(0,0,0,0.0)', color: 'white', padding: '10px 15px', position: 'relative', bottom: 20}
    const powerBox = {backgroundColor: '#14a0b5', padding: '20px 20px 5px 20px'} 
    const linkStyle = {color: '#666666'}
    return (
      <div>
        <Header linkStyle = {linkStyle}/>
        <div style = {{paddingTop: 120}}>
          <Container style = {{maxWidth: 1100}}>
            <Row>
              <Col sm = {12} md = {5} style = {{textAlign: 'center'}}>
                <img src = {WhiteCube} style = {{width: '90%', maxWidth: 450, maxHeight: 450}}/>
              </Col>
              <Col sm = {12} md = {7} style = {{padding: 30}}>
                <div style = {{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
                  Pre-order a Cube by selecting the configuration you want.
                </div>
                <div style = {{marginTop: 20}}>
                  <div style = {{borderRadius: 20, backgroundColor: '#94a8ed', border: 'none', color: 'white', padding: '6px 20px', display: 'inline-block'}}>
                    Which configuration should I get?
                  </div>
                  <div style = {{opacity: 1, marginTop: 20, color: '#555555', lineHeight: 1.6}}>
                      The Base Cube can handle daily productivity tasks and Web browsing. The Enhanced Cube is ideal for 
                      creative media work, coding, or light gaming. 
                      Choose the Power Cube if you need a powerful workstation for tasks like 3D animation or 
                      processing large datasets.
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <Container style = {{maxWidth: 1000, marginTop: 50}}>
            <Row>
            <Col sm = {12} md = {8}>
              <div>
                  <div style = {{marginBottom: 30}} onClick={() => this.baseCube()} >
                    <SpecBox
                    name = "Base Cube"
                    boxStyle = {baseBox}
                    mainFont = {baseFont}
                    subFont = {baseSubFont}
                    graphic = {BaseSpec}
                    price = {<div>$75 + $20/<span style = {{fontSize: 11}}>mo</span></div>}/>
                  </div>
                  <div style = {{marginBottom: 30}} onClick={() => this.enhancedCube()}>
                    <SpecBox 
                    name = "Enhanced Cube"
                    boxStyle = {baseBox}
                    mainFont = {baseFont}
                    subFont = {baseSubFont}
                    graphic = {EnhancedSpec}
                    price = {<div>$75 + $30/<span style = {{fontSize: 11}}>mo</span></div>}/>
                  </div>
                  <div style = {{marginBottom: 30}} onClick={() => this.powerCube()} >
                    <SpecBox 
                    name = "Power Cube"
                    boxStyle = {baseBox}
                    mainFont = {baseFont}
                    subFont = {baseSubFont}
                    graphic = {PowerSpec}
                    price = {<div>$75 + $45/<span style = {{fontSize: 11}}>mo</span></div>}/>
                  </div>
              </div>
            </Col>
            <Col sm = {12} md = {4}>
              <div style = {{backgroundColor: '#f6f6f6', height: 400, padding: 30, borderRadius: 10, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                <div style = {{fontWeight: 'bold', fontSize: 20}}>Cart Summary</div>
                <div style = {{marginTop: 30, color: "#555555"}}>
                {this.props.base > 0 &&
                    <div>{this.props.base}x Base Cube<FaTrashAlt className = "trash-icon" onClick={() => this.deleteBase()}/></div>
                }
                {this.props.enhanced > 0 &&
                    <div style = {{marginTop: 5}}>{this.props.enhanced}x Enhanced Cube<FaTrashAlt className = "trash-icon" onClick={() => this.deleteEnhanced()}/></div>
                }
                {this.props.power > 0 &&
                    <div style = {{marginTop: 5}}>{this.props.power}x Power Cube<FaTrashAlt className = "trash-icon" onClick={() => this.deletePower()}/></div>
                }
                </div>
                <div style = {{position: 'absolute', top: 300}}>
                  <div style = {{marginBottom: 15, fontSize: 15, color: '#777777'}}>Due Today: $0.00</div>
                {
                this.state.continue
                ?
                <Link to = "/checkout" style = {{color: 'white', textDecoration: 'none'}}>
                  <Button disabled = {!this.state.continue} style = {{backgroundColor: '#94a8ed', borderRadius: 10, border: 'none', paddingLeft: 40, paddingRight: 40, fontWeight: 'bold'}}>
                    Continue
                  </Button>
                </Link>
                :
                  <Button disabled = {!this.state.continue} style = {{backgroundColor: '#94a8ed', borderRadius: 10, border: 'none', paddingLeft: 40, paddingRight: 40, fontWeight: 'bold'}}>
                    Continue
                  </Button>
                }
                </div>
              </div>
            </Col>
            </Row>
          </Container>
          <div style = {{width: '100%', backgroundColor: '#f6f6f6', padding: '50px 0px', marginTop: 50}}>
            <Container style = {{maxWidth: 1000, margin: 'auto'}}>
              <Row>
                <Col md = {6}>
                  <div style = {{fontWeight: 'bold', fontSize: 22, marginBottom: 25, marginTop: '3%'}}>What's in the Box?</div>
                  <div style = {{fontColor: "#555555"}}>1x Cube</div>
                  <div style = {{fontColor: "#555555"}}>1x micro HDMI to HDMI cable</div>
                  <div style = {{fontColor: "#555555"}}>1x USB-C power supply/cable</div>
                </Col>
                <Col md = {6}>
                  <div style = {{fontWeight: 'bold', fontSize: 22, marginBottom: 25, marginTop: '3%'}}>Connectivity</div>
                  <div style = {{fontColor: "#555555"}}>Gigabyte ethernet</div>
                  <div style = {{fontColor: "#555555"}}>2.4 GHz and 5.0 GHz IEEE 802.11ac wireless</div>
                  <div style = {{fontColor: "#555555"}}>Bluetooth 5.0</div>
                  <div style = {{fontColor: "#555555"}}>3.5mm audio jack</div>
                  <div style = {{fontColor: "#555555"}}>2x USB 3.0</div>
                  <div style = {{fontColor: "#555555"}}>2x USB 2.0</div>
                  <div style = {{fontColor: "#555555"}}>2x micro HDMI</div>
                  <div style = {{fontColor: "#555555"}}>1x USB-C power port</div>
                </Col>
              </Row>
            </Container>
          </div>
          <div style = {{maxWidth: 1000, backgroundColor: 'white', margin: 'auto', padding: '30px 0px 30px 0px'}}>
            <div style = {{textAlign: 'right', width: '100%'}}>
              Due Today: $0.00
              {
              !this.state.continue 
              ?
              <Button disabled = {!this.state.continue} style = {{backgroundColor: '#94a8ed', borderRadius: 10, border: 'none', paddingLeft: 40, paddingRight: 40, fontWeight: 'bold', marginLeft: 30, marginRight: 20}}>
                Continue
              </Button>
              :
              <Link disabled = {!this.state.continue} style = {{color: 'white', textDecoration: 'none'}} to = "/checkout">
              <Button disabled = {!this.state.continue} style = {{backgroundColor: '#94a8ed', borderRadius: 10, border: 'none', paddingLeft: 40, paddingRight: 40, fontWeight: 'bold', marginLeft: 30, marginRight: 20}}>
                Continue
              </Button>
              </Link>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { base: state.CartReducer.base,
  enhanced: state.CartReducer.enhanced,
  power: state.CartReducer.power }
}

export default connect(mapStateToProps)(Purchase)