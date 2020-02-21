import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Server1 from '../../assets/server1.svg'
import Server2 from '../../assets/server2.svg'
import Server3 from '../../assets/server3.svg'
import { connect } from 'react-redux';
import '../../static/App.css';
import { FaArrowRight } from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { userLogin, userSignup, changeStage, logout } from '../../actions/index.js';
import "react-tabs/style/react-tabs.css";
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './containers/checkoutform.js';
import { FaExclamationTriangle } from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'
import { withRouter } from "react-router";  
import { HashLink } from 'react-router-hash-link'

class VM extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, 
      emailLogin: '', passwordLogin: '', emailSignup: '', passwordSignup: '', passwordConfirmSignup: '', 
      baseColor: '#F8F8F8', enhancedColor: 'white', powerColor: '#F8F8F8',
      baseSize: 1, enhancedSize: 1.03, powerSize: 1, selected: 'Enhanced Instance',
      tooShort: false, matches: true, validEmail: false}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.changeEmailLogin = this.changeEmailLogin.bind(this)
    this.changePasswordLogin = this.changePasswordLogin.bind(this)
    this.changeEmailSignup = this.changeEmailSignup.bind(this)
    this.changePasswordSignup = this.changePasswordSignup.bind(this)
    this.changePasswordConfirmSignup = this.changePasswordConfirmSignup.bind(this) 
    this.changeToBase = this.changeToBase.bind(this)
    this.changeToEnhanced = this.changeToEnhanced.bind(this)
    this.changeToPower = this.changeToPower.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.changeStage = this.changeStage.bind(this)
  }


  handleLogin(evt) {
    this.props.dispatch(userLogin(this.state.emailLogin, this.state.passwordLogin, true))
  }

  handleSignup(evt) {
    this.props.dispatch(userSignup(this.state.emailSignup, this.state.passwordSignup, true))
  }

  changeEmailLogin(evt) {
    this.setState({
      emailLogin: evt.target.value
    });
  }

  changePasswordLogin(evt) {
    this.setState({
      passwordLogin: evt.target.value
    });
  }

  changeEmailSignup(evt) {
    this.setState({emailSignup: evt.target.value}, function () {
      if(this.state.emailSignup.includes('@')) {
        this.setState({ validEmail: true})
      } else {
        this.setState({ validEmail: false})
      }
    });
  }

  changePasswordSignup(evt) {
    this.setState({passwordSignup: evt.target.value}, function () {
      if(this.state.passwordSignup.length < 7 && this.state.passwordSignup.length > 0) {
        this.setState({ tooShort: true})
      } else {
        this.setState({ tooShort: false})
      }
    });
  }

  changePasswordConfirmSignup(evt) {
    this.setState({passwordConfirmSignup: evt.target.value}, function () {
      if(this.state.passwordSignup === this.state.passwordConfirmSignup) {
        this.setState({ matches: true})
      } else {
        this.setState({ matches: false})
      }
    });
  }

  changeToBase(evt) {
    this.setState({
      baseColor: 'white',
      enhancedColor: '#F8F8F8',
      powerColor: '#F8F8F8',
      baseSize: 1.03,
      enhancedSize: 1,
      powerSize: 1,
      selected: 'Base Instance'
    });
  }

  changeToEnhanced(evt) {
    this.setState({
      baseColor: '#F8F8F8',
      enhancedColor: 'white',
      powerColor: '#F8F8F8',
      baseSize: 1,
      enhancedSize: 1.03,
      powerSize: 1,
      selected: 'Enhanced Instance'
    });
  }

  changeToPower(evt) {
    this.setState({
      baseColor: '#F8F8F8',
      enhancedColor: '#F8F8F8',
      powerColor: "white",
      baseSize: 1,
      enhancedSize: 1,
      powerSize: 1.03,
      selected: 'Power Instance'
    });
  }

  changeStage(stage) {
    this.props.dispatch(changeStage(2))
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
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    return (
      <div id = "top">
        <Header  color = "#333333" button = "#94a8ed"/>
        <div style = {{minHeight: '100vh', backgroundColor: "white", paddingTop: 100}}>
          <Container>
            <Row>
              <Col xs = {4} style = {{lineHeight: 3, fontWeight: 'bold', borderRight: 'solid 1px #C9C9C9', minHeight: '100vh'}}>
              {
                this.props.loggedIn
                ?
                (
                this.props.stage === 1
                ?
                <div>
                  <div style = {{color: "#94a8ed", fontWeight: 'bold', fontSize: 110, lineHeight: 1.7}}>
                    02
                    <span style = {{color: "#555555", fontSize: 30}}>/ 03</span>
                  </div>
                  <div style = {{color: "#E8E8E8"}}>LOG IN / SIGN UP</div>
                  <div style = {{color: '#333333'}}>CHOOSE A COMPUTER</div>
                  <div style = {{color: "#E8E8E8"}}>FINISH AND PAY</div>
                </div> 
                :
                <div>
                  <div style = {{color: "#94a8ed", fontWeight: 'bold', fontSize: 110, lineHeight: 1.7}}>
                    03
                    <span style = {{color: "#555555", fontSize: 30}}>/ 03</span>
                  </div>
                  <div style = {{color: "#E8E8E8"}}>LOG IN / SIGN UP</div>
                  <div style = {{color: "#E8E8E8"}}>CHOOSE A COMPUTER</div>
                  <div style = {{color: "#333333"}}>FINISH AND PAY</div>
                </div>                    
                )
                :
                (
                <div>
                  <div style = {{color: "#94a8ed", fontWeight: 'bold', fontSize: 110, lineHeight: 1.7}}>
                    01
                    <span style = {{color: "#555555", fontSize: 30}}>/ 03</span>
                  </div>
                  <div style = {{color: "#333333"}}>LOG IN / SIGN UP</div>
                  <div style = {{color: "#E8E8E8"}}>CHOOSE A COMPUTER</div>
                  <div style = {{color: "#E8E8E8"}}>FINISH AND PAY</div>
                </div>
                )
              }
              </Col>
              {
              this.props.loggedIn
              ?
              (
              this.props.stage === 1
              ?
              <Col xs = {8} style = {{paddingLeft: 80, paddingBottom: 80, paddingTop: 20}}>
                <div style = {{fontWeight: 'bold', fontSize: 45, color: '#333333', marginBottom: 30}}>
                  Let's Create Your Cloud Computer.
                </div>
                <div style = {{color: "#555555", marginBottom: 50, fontSize: 16}}>
                  Achieve workstation-grade performance from any device — even your laptop — for a fraction of 
                  the cost.
                </div>
                <Row>
                    <Col md = {4} style = {{padding: 10}} onClick = {this.changeToBase}>
                      <div style = {{padding: 0, borderRadius: 6, backgroundColor: `${ this.state.baseColor }`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', transform: `scale(${ this.state.baseSize })`}}>
                        <div style = {{backgroundColor: "#1F2635", width: '100%', borderRadius: '6px 6px 0px 0px', padding: '8px 25px', fontWeight: 'bold', color: 'white'}}>
                          Base
                        </div>
                        <div style = {{padding: 25}}>
                          <div style = {{fontWeight: 'bold', fontSize: 14, color: "#585858"}}>
                            <span style = {{color: "#111111", fontWeight: 'bold', fontSize: 32}}>$15</span> / mo
                          </div>
                          <table style = {{width: '100%', marginTop: 10, fontSize: 12}}>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 10}}><span style = {{color: "#222222", fontWeight: "bold"}}>1</span> NVIDIA P2000 GPU</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>2</span> 3.2 GHz CPU Cores</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>8 GB</span> RAM</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>256 GB</span> SSD</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </Col>
                    <Col md = {4} style = {{padding: 10}} onClick = {this.changeToEnhanced}>
                      <div style = {{padding: 0, borderRadius: 6, backgroundColor: `${ this.state.enhancedColor }`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', transform: `scale(${ this.state.enhancedSize })`}}>
                        <div style = {{backgroundColor: "#1F2635", width: '100%', borderRadius: '6px 6px 0px 0px', padding: '8px 25px', fontWeight: 'bold', color: 'white'}}>
                          Enhanced
                        </div>
                        <div style = {{padding: 25}}>
                          <div style = {{fontWeight: 'bold', fontSize: 14, color: "#585858"}}>
                            <span style = {{color: "#111111", fontWeight: 'bold', fontSize: 32}}>$25</span> / mo
                          </div>
                          <table style = {{width: '100%', marginTop: 10, fontSize: 12}}>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 10}}><span style = {{color: "#222222", fontWeight: "bold"}}>1</span> NVIDIA P4000 GPU</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>4</span> 3.2 GHz CPU Cores</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>12 GB</span> RAM</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>512 GB</span> SSD</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </Col>
                    <Col md = {4} style = {{padding: 10}} onClick = {this.changeToPower}>
                      <div style = {{padding: 0, borderRadius: 6, backgroundColor: `${ this.state.powerColor }`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', transform: `scale(${ this.state.powerSize })`}}>
                        <div style = {{backgroundColor: "#1F2635", width: '100%', borderRadius: '6px 6px 0px 0px', padding: '8px 25px', fontWeight: 'bold', color: 'white'}}>
                          Power
                        </div>
                        <div style = {{padding: 25}}>
                          <div style = {{fontWeight: 'bold', fontSize: 14, color: "#585858"}}>
                            <span style = {{color: "#111111", fontWeight: 'bold', fontSize: 32}}>$35</span> / mo
                          </div>
                          <table style = {{width: '100%', marginTop: 10, fontSize: 12}}>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 10}}><span style = {{color: "#222222", fontWeight: "bold"}}>1</span> NVIDIA P5000 GPU</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>4</span> 3.2 GHz CPU Cores</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>16 GB</span> RAM</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>1 TB</span> SSD</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </Col>
                </Row>
                <div style = {{width: '100%', height: 80}}>
                  <div style = {{width: 370, marginTop: 50, float: 'right'}}>
                    {
                    this.state.selected === "Base Instance"
                    ?
                    <table style = {{width: "100%", fontSize: 15}}>
                      <tr style = {{textAlign: 'right', paddingTop: 10}}>
                        <td style = {{color: '#555555', textAlign: 'left'}}>Selected Instance</td>
                        <td style = {{color: '#333333'}}><strong>1x</strong> Base Instance</td>
                      </tr>
                      <tr style = {{textAlign: 'right', paddingTop: 10, height: 30}}>
                        <td style = {{color: '#555555', textAlign: 'left'}}>Monthly Charge</td>
                        <td style = {{color: '#333333'}}>$15 / mo</td>
                      </tr>
                      <tr style = {{textAlign: 'right', height: 50}}>
                        <td style = {{color: '#333333', fontWeight: 'bold', textAlign: 'left'}}>Due Today</td>
                        <td style = {{color: '#333333'}}>$15.00</td>
                      </tr>
                    </table>   
                    :
                    (
                    this.state.selected === "Enhanced Instance"
                    ?
                    <table style = {{width: "100%", fontSize: 15}}>
                      <tr style = {{textAlign: 'right', paddingTop: 10}}>
                        <td style = {{color: '#555555', textAlign: 'left'}}>Selected Instance</td>
                        <td style = {{color: '#333333'}}><strong>1x</strong> Enhanced Instance</td>
                      </tr>
                      <tr style = {{textAlign: 'right', paddingTop: 10, height: 30}}>
                        <td style = {{color: '#555555', textAlign: 'left'}}>Monthly Charge</td>
                        <td style = {{color: '#333333'}}>$25 / mo</td>
                      </tr>
                      <tr style = {{textAlign: 'right', height: 50}}>
                        <td style = {{color: '#333333', fontWeight: 'bold', textAlign: 'left'}}>Due Today</td>
                        <td style = {{color: '#333333'}}>$25.00</td>
                      </tr>
                    </table>   
                    :
                    <table style = {{width: "100%", fontSize: 15}}>
                      <tr style = {{textAlign: 'right', paddingTop: 10}}>
                        <td style = {{color: '#555555', textAlign: 'left'}}>Selected Instance</td>
                        <td style = {{color: '#333333'}}><strong>1x</strong> Power Instance</td>
                      </tr>
                      <tr style = {{textAlign: 'right', paddingTop: 10, height: 30}}>
                        <td style = {{color: '#555555', textAlign: 'left'}}>Monthly Charge</td>
                        <td style = {{color: '#333333'}}>$35 / mo</td>
                      </tr>
                      <tr style = {{textAlign: 'right', height: 50}}>
                        <td style = {{color: '#333333', fontWeight: 'bold', textAlign: 'left'}}>Due Today</td>
                        <td style = {{color: '#333333'}}>$35.00</td>
                      </tr>
                    </table>   
                    )
                    } 
                    <div style = {{textAlign: 'right'}}>
                      <Button onClick = {() => this.props.dispatch(logout())} style = {{paddingLeft: 50, paddingRight: 50, maxWidth: 600, backgroundColor: '#94a8ed', border: 0, marginTop: 20, marginRight: 20,fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)'}}>Log Out</Button>
                      <Button onClick = {() => this.changeStage(2)} style = {{paddingLeft: 50, paddingRight: 50, maxWidth: 600, background: "linear-gradient(258.54deg, #2BF7DE 0%, #62CEE6 52.08%, #94A8ED 100%)", border: 0, marginTop: 20, fontWeight: 'bold', fontSize: 16, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)'}}>
                        Next Step
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              :
              <Col xs = {8} style = {{paddingLeft: 80}}>
                <div style = {{fontWeight: 'bold', fontSize: 45, color: '#333333', marginBottom: 30}}>
                  One Last Step.
                </div>
                <div style = {{color: "#555555", marginBottom: 50, fontSize: 17}}>
                  You can cancel your plan at any time. If you do, we will mail a hard drive containing
                  a copy of your entire virtual disk to an address of your choice.
                </div>
                <StripeProvider apiKey="pk_test_7y07LrJWC5LzNu17sybyn9ce004CLPaOXb">
                  <div className="example">
                    <Elements>
                      <CheckoutForm />
                    </Elements>
                  </div>
                </StripeProvider>
              </Col>
              )
              :
              (
              <Col xs = {8} style = {{paddingLeft: 150}}>
                <div style = {{backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 2, padding: 40, maxWidth: 425, marginBottom: 80}}>
                  <Tabs>
                    <TabList style = {{textAlign: 'center', border: 'none', color: '#444444', border: 'none', fontWeight: 'bold', fontSize: 16}}>
                      <Tab>LOG IN</Tab>
                      <Tab>SIGN UP</Tab>
                    </TabList>
                    <TabPanel style = {{padding: '15px 30px'}}>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          type = "email"
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Email Address"
                          onChange = {this.changeEmailLogin}
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
                          style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
                        />
                      </InputGroup>
                      <Button  onClick = {this.handleLogin} style = {{marginTop: 50, color: 'white', width: '100%', border: 'none', background: 'linear-gradient(258.54deg, #2BF7DE 0%, #94A8ED 100%)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'}}>LOG IN</Button>
                      <div style = {{color: '#94a8ed', textAlign: 'center', marginTop: 50, color: '#888'}}>Forgot Password?</div>
                    </TabPanel>
                    <TabPanel style = {{padding: '15px 30px'}}>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          type = "email"
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Email Address"
                          onChange = {this.changeEmailSignup}
                          style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
                        />
                        {
                        !this.state.validEmail && this.state.emailSignup.length > 0
                        ?
                        <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                          <FaExclamationTriangle style = {{marginRight: 5, position: 'relative', bottom: 2}}/>Invalid Email
                        </div>
                        :
                        (
                        this.state.emailSignup.length > 0
                        ?
                        <div style = {{color: 'green', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                          <FaCheckCircle style = {{marginRight: 5, position: 'relative', bottom: 2, color: '#62CEE6'}}/>
                        </div>
                        :
                        <div></div>
                        )
                        }
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 20}}>
                        <FormControl
                          aria-label="Default"
                          type = "password"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Password"
                          onChange = {this.changePasswordSignup}
                          style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
                        />
                        {
                        this.state.tooShort
                        ?
                        <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                          <FaExclamationTriangle style = {{marginRight: 5, position: 'relative', bottom: 2}}/>Too Short
                        </div>
                        :
                        (
                        this.state.passwordSignup.length > 0
                        ?
                        <div style = {{color: 'green', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                          <FaCheckCircle style = {{marginRight: 5, position: 'relative', bottom: 2, color: '#62CEE6'}}/>
                        </div>
                        :
                        <div></div>
                        )
                        }
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 20}}>
                        <FormControl
                          aria-label="Default"
                          type = "password"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Confirm Password"
                          onChange = {this.changePasswordConfirmSignup}
                          style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
                        />
                        {
                        !this.state.matches && this.state.passwordConfirmSignup.length > 0
                        ?
                        <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                          <FaExclamationTriangle style = {{marginRight: 5, position: 'relative', bottom: 2}}/>Doesn't Match
                        </div>
                        :
                        (
                        this.state.passwordConfirmSignup.length > 0
                        ?
                        <div style = {{color: 'green', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                          <FaCheckCircle style = {{marginRight: 5, position: 'relative', bottom: 2, color: '#62CEE6'}}/>
                        </div>
                        :
                        <div></div>
                        )
                        }
                      </InputGroup>
                      <Button disabled = "true" onClick = {this.handleSignup} style = {{marginTop: 40, color: 'white', width: '100%', backgroundColor: '#94a8ed', border: 'none', background: 'linear-gradient(258.54deg, #2BF7DE 0%, #94A8ED 100%)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'}}>SIGN UP</Button>
                      <div style = {{fontSize: 16, color: "#333333", marginTop: 25}}>
                        Currently, signups are open only to our 100 private beta users. If you'd like to join our private beta, apply <HashLink to = "/#beta" style = {{color: '#94a8ed', fontWeight: 'bold'}}>here</HashLink> and we'll be in touch.
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </Col>
              )
            }
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { 
    loggedIn: state.AccountReducer.loggedIn,
    stage: state.AccountReducer.stage}
}

export default withRouter(connect(mapStateToProps)(VM))