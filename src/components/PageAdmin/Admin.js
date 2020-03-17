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
import { updateDB, loginUser, resetUser, fetchUserActivity } from '../../actions/index.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import Logo from '../../assets/logo.svg'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, loaded: false, emailLogin: '', passwordLogin: '', day: 0, month: 0, year: 0, isEditing: -1, editedUsername: '', editedPassword: '' }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    var today = new Date();
    this.setState({
      day: today.getDate(),
      month: this.monthConvert(today.getMonth()),
      year: today.getFullYear()
    })
    this.refreshDB()
    this.props.dispatch(fetchUserActivity())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  monthConvert = (month) => {
    var months = [ "January", "February", "March", "April", "May", "June", 
               "July", "August", "September", "October", "November", "December" ];
    var selectedMonthName = months[month];
    return selectedMonthName;
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
    this.props.dispatch(updateDB(false))
  }

  isEditing = (index) => {
    this.setState({isEditing: index})
  }

  doneEditing = (index) => {
    if(this.state.editedUsername != '' && this.state.editedPassword != '') {
      this.setState({isEditing: -1}, function() {
        this.props.dispatch(resetUser(this.props.vm_info[index].vm_name, this.state.editedUsername, this.state.editedPassword))
      })
    }
  }

  formatTime = (log) => {
    var logArr = log.split(',')
    var time = logArr[1]
    time =  time.substring(0, time.length - 3);
    var timeArr = time.split(':')
    var hour = parseInt(timeArr[0]) - 12
    logArr[0] = logArr[0].substring(0, logArr[0].length - 5)
    logArr[0] = logArr[0].replace('-', '/')
    if(hour < 0) {
      return Math.abs(hour).toString() + ':' + timeArr[1] + ' AM (' + logArr[0] + ')'
    } else {
      return Math.abs(hour).toString() + ':' + timeArr[1] + ' PM (' + logArr[0] + ')'
    }
  }

  updateVMUsername = (evt) => {
    this.setState({
      editedUsername: evt.target.value
    })
  }

  updateVMPassword = (evt) => {
    this.setState({
      editedPassword: evt.target.value
    })
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
      <div style = {{backgroundColor: "#FFFFFF"}}>
        <div style = {{display: 'flex', width: '100%'}}>
          <div style = {{width: '15%', minHeight: '100vh', maxWidth: 300, background: "#EBEBEB", paddingTop: 50, paddingLeft: 45}}>
            <img src = {Logo} style = {{width: 40, height: 40}}/>
            <div style = {{marginTop: 25, fontSize: 18}}>
              <div style = {{marginBottom: 15}}>
                <strong>Dashboard</strong>
              </div>
              <div style = {{marginBottom: 15}}>
                <a target="_blank" href = "https://drive.google.com/open?id=1kbpGbVeYd5LVJgzGN0dKro-ryizQr2kg">
                  Google Drive
                </a>
              </div>
              <div style = {{marginBottom: 15}}>
                <a target="_blank" href = "https://trello.com/b/C00Hu4a0/fractal-engineering">
                  Trello
                </a>
              </div>
              <div style = {{marginBottom: 15}}>
                <a target="_blank" href = "https://fractalcomputers.slack.com">
                  Slack 
                </a>
              </div>
            </div>
          </div>
          <div style = {{width: '85%', padding: 50}}>
            <div>
            {this.state.month} {this.state.day}, {this.state.year}
            </div>
            <div style = {{marginTop: 5, fontSize: 45, fontWeight: 'bold'}}>
              DASHBOARD
            </div>
            <div style = {{display: 'flex', marginTop: 45}}>
            {
            this.props.updated 
            ?
            <div style = {{maxHeight: 500, overflowY: 'scroll', width: '75%', boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)"}}>
            <table style = {{backgroundColor: "#FFFFFF", width: '100%'}}>
              <tr style = {{color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left'}}>
                <th style = {{padding: '20px 20px'}}>Username</th>
                <th>Password</th>
                <th>IP Address</th>
                <th>VM Name</th>
                <th>Location</th>
                <th></th>
              </tr>
              {this.props.vm_info.map((value, index) => {
                return (
                  <tr style = {{borderTop: "solid 0.5px #EBEBEB", color: "#333333", fontSize: 12}}>
                    {
                      this.state.isEditing === index
                      ?
                      <td style = {{width: '19%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10}}>
                        <input type = "text" placeholder = {value.username} style = {{width: 100}} onChange = {this.updateVMUsername}/>
                      </td>
                      :
                      <td style = {{width: '19%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10}}>{value.username}</td>
                    }
                    {
                      this.state.isEditing === index
                      ?
                      <td style = {{width: '19%', paddingTop: 10, paddingBottom: 10}}>
                        <input type = "text" placeholder = {value.password} style = {{width: 100}} onChange = {this.updateVMPassword}/>
                      </td>
                      :
                      <td style = {{width: '19%'}}>{value.password}</td>
                    }
                    <td style = {{width: '19%', paddingTop: 10, paddingBottom: 10}}>{value.ip}</td>
                    <td style = {{width: '19%'}}>{value.vm_name}</td>
                    <td style = {{width: '19%'}}>{value.location}</td>
                    {
                      this.state.isEditing === index
                      ?
                      <td style = {{width: '5%'}}><FontAwesomeIcon icon={faCheck} style = {{color: "#5EC4EB", width: 12}} className = "edit-table" onClick = {() => this.doneEditing(index)}/></td>
                      :
                      <td style = {{width: '5%'}}><FontAwesomeIcon icon={faEdit} style = {{color: "#5EC4EB", width: 12}} className = "edit-table" onClick = {() => this.isEditing(index)}/></td>
                    }
                  </tr>
                )
              })}
            </table>
            </div>
            :
            <div style = {{boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", width: '72%', height: 500}}>
            <table style = {{backgroundColor: "#FFFFFF", width: '100%'}}>
              <tr style = {{color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left'}}>
                <th style = {{padding: '20px 20px'}}>Username</th>
                <th>Password</th>
                <th>IP Address</th>
                <th>VM Name</th>
                <th>Location</th>
                <th></th>
              </tr>
            </table>
            <div style = {{width: '100%', textAlign: 'center'}}>
                <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#1e1f36", margin: 'auto', marginTop: 220}}/>
            </div>
            </div>
            }
            <div style = {{width: '28%', position: 'relative', bottom: 40, paddingLeft: 25}}>
              <div>
                <div style = {{textAlign: 'right', fontSize: 18}}>
                  Recent Activity
                </div>
                <div style = {{boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", width: '100%', marginTop: 13, padding: 25,  overflowY: 'scroll', height: 500}}>
                  {
                    this.props.activityFetched
                    ?
                    <div style = {{maxHeight: 500}}>
                    {this.props.userActivity.map((value, index) => {
                      if(index < 50) {
                        var gradients = ['linear-gradient(135deg, #41E0C4 0%, #8574E9 100%)']
                        return (
                          <div style = {{paddingBottom: 30, display: 'flex'}}>
                            {
                            value.action === 'logon'
                            ?
                            <div style = {{position: 'relative', height: 40, width: 40, borderRadius: 20, color: 'white', fontWeight: 'bold', background: `${ gradients[0] }`, border: 'solid 2px #0acc4b'}}>
                              <div style = {{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 18}}>{value.username.charAt(0)}</div>
                            </div>
                            :
                            <div style = {{position: 'relative', height: 40, width: 40, borderRadius: 20, color: 'white', fontWeight: 'bold', background: `${ gradients[0] }`, border: 'solid 2px #b325cc'}}>
                              <div style = {{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 18}}>{value.username.charAt(0)}</div>
                            </div>
                            }
                            <div style = {{marginLeft: 20}}>
                              <div style = {{fontSize: 13}}>
                                <div>
                                  {this.formatTime(value.timestamp)}
                                </div>
                                <div style = {{fontSize: 11, color: '#888888'}}>
                                  {
                                    value.action === 'logon'
                                    ?
                                    <div>{value.username} logged on</div>
                                    :
                                    <div>{value.username} logged off</div>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    })}
                    </div>
                    :
                    <div style = {{height: 480, width: '100%', textAlign: 'center'}}>
                        <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#1e1f36", margin: 'auto', marginTop: 240}}/>
                    </div>
                  }
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    }
    </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.AccountReducer)
  return {
    authenticated: state.AccountReducer.authenticated,
    vm_info: state.AccountReducer.vm_info ? state.AccountReducer.vm_info : [],
    updated: state.AccountReducer.updated,
    activityFetched: state.AccountReducer.activityFetched,
    userActivity: state.AccountReducer.userActivity ? state.AccountReducer.userActivity : []
  }
}

export default connect(mapStateToProps)(Admin)