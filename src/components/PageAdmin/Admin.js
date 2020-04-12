import React, { Component } from 'react'
import { Row, Col, Table, Container, FormControl, InputGroup, Button } from 'react-bootstrap'
import Popup from "reactjs-popup";
import '../../static/App.css';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { updateDB, loginUser, resetUser, fetchUserActivity, fetchUserTable, deleteUser, fetchCustomerTable, fetchDiskTable } from '../../actions/index.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'

import Logo from '../../assets/logo.svg'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0, height: 0, modalShow: false, showPopup: false, loaded: false, emailLogin: '',
      passwordLogin: '', day: 0, month: 0, year: 0, isEditing: -1, editedUsername: ''
    }
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
    this.props.dispatch(fetchUserActivity(false))
    this.props.dispatch(fetchUserTable())
    this.props.dispatch(fetchCustomerTable())
    this.props.dispatch(fetchDiskTable())
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  monthConvert = (month) => {
    var months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    var selectedMonthName = months[month];
    return selectedMonthName;
  }

  changeEmailLogin = (evt) => {
    this.setState({
      emailLogin: evt.target.value
    });
  }

  loginKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.dispatch(loginUser(this.state.emailLogin, this.state.passwordLogin));
    }
  }

  handleLogin = () => {
    this.props.dispatch(loginUser(this.state.emailLogin, this.state.passwordLogin));
  }

  changePasswordLogin = (evt) => {
    if (evt.key === 'Enter') {
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
    this.setState({ isEditing: index })
  }

  doneEditing = (index) => {
    if (this.state.editedUsername != '') {
      this.setState({ isEditing: -1 }, function () {
        this.props.dispatch(resetUser(this.props.vm_info[index].vm_name, this.state.editedUsername))
      })
    }
  }

  deleteUser = (user) => {
    this.props.dispatch(deleteUser(user))
  }

  formatTime = (log) => {
    var logArr = log.split(',')
    var time = logArr[1]
    time = time.substring(0, time.length - 3);
    var timeArr = time.split(':')
    var hour = parseInt(timeArr[0]) - 12
    logArr[0] = logArr[0].substring(0, logArr[0].length - 5)
    logArr[0] = logArr[0].replace('-', '/')
    if (hour < 0) {
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
            <div className="vh-100">
              <div style={{ width: 350, margin: 'auto', marginTop: 150 }}>
                <InputGroup className="mb-3" style={{ marginTop: 30 }}>
                  <FormControl
                    type="email"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Email Address"
                    onChange={this.changeEmailLogin}
                    onKeyPress={this.loginKeyPress}
                    style={{ borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8" }}
                  /><br />
                </InputGroup>

                <InputGroup className="mb-3" style={{ marginTop: 20 }}>
                  <FormControl
                    aria-label="Default"
                    type="password"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Password"
                    onChange={this.changePasswordLogin}
                    onKeyPress={this.loginKeyPress}
                    style={{ borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8" }}
                  />
                </InputGroup>

                <Button onClick={this.handleLogin} style={{ marginTop: 50, color: 'white', width: '100%', border: 'none', background: 'linear-gradient(258.54deg, #2BF7DE 0%, #94A8ED 100%)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}>LOG IN</Button>
              </div>
            </div>
            :
            <div style={{ backgroundColor: "#FFFFFF" }}>
              <Row>
                <Col md="2" className="min-vh-100 pt-5 pl-4" style={{ background: "#EBEBEB" }}>
                  <Container>
                    <img src={Logo} style={{ width: 40, height: 40 }} />
                    <div style={{ marginTop: 25, fontSize: 18 }}>
                      <div style={{ marginBottom: 15 }}>
                        <strong>Dashboard</strong>
                      </div>
                      <div style={{ marginBottom: 15 }}>
                        <a target="_blank" href="https://drive.google.com/open?id=1kbpGbVeYd5LVJgzGN0dKro-ryizQr2kg">
                          Google Drive
                      </a>
                      </div>
                      <div style={{ marginBottom: 15 }}>
                        <a target="_blank" href="https://trello.com/b/C00Hu4a0/fractal-engineering">
                          Trello
                      </a>
                      </div>
                      <div style={{ marginBottom: 15 }}>
                        <a target="_blank" href="https://fractalcomputers.slack.com">
                          Slack
                      </a>
                      </div>
                    </div>
                  </Container>
                </Col>
                <Col md="10" className="p-5">
                  {this.state.month} {this.state.day}, {this.state.year}
                  <h1 className="mt-1 mb-5 font-weight-bold">DASHBOARD</h1>

                  <Row className="mt-5">
                    <Col md="9">

                      {/*VMs table*/}
                      <h5 className="mb-2">Cloud PCs</h5>
                      {
                        this.props.updated
                          ?
                          <div style={{ maxHeight: 500, overflowY: 'scroll', width: '100%', boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", display: 'block' }}>
                            <table style={{ backgroundColor: "#FFFFFF", width: '100%' }}>
                              <tr style={{ color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left' }}>
                                <th style={{ padding: '20px 20px' }}>Username</th>
                                <th>IP Address</th>
                                <th>VM Name</th>
                                <th>Location</th>
                                <th></th>
                              </tr>
                              {this.props.vm_info.map((value, index) => {
                                var defaultUsername = value.username
                                return (
                                  <tr style={{ borderTop: "solid 0.5px #EBEBEB", color: "#333333", fontSize: 12 }}>
                                    {
                                      this.state.isEditing === index
                                        ?
                                        <td style={{ width: '19%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>
                                          <input defaultValue={defaultUsername} type="text" placeholder={value.username} style={{ width: 100 }} onChange={this.updateVMUsername} />
                                        </td>
                                        :
                                        <td style={{ width: '19%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>{value.username}</td>
                                    }
                                    <td style={{ width: '19%', paddingTop: 10, paddingBottom: 10 }}>{value.ip}</td>
                                    <td style={{ width: '19%' }}>{value.vm_name}</td>
                                    <td style={{ width: '19%' }}>{value.location}</td>
                                    {
                                      this.state.isEditing === index
                                        ?
                                        <td style={{ width: '5%' }}><FontAwesomeIcon icon={faCheck} style={{ color: "#5EC4EB", width: 12 }} className="edit-table" onClick={() => this.doneEditing(index)} /></td>
                                        :
                                        <td style={{ width: '5%' }}><FontAwesomeIcon icon={faEdit} style={{ color: "#5EC4EB", width: 12 }} className="edit-table" onClick={() => this.isEditing(index)} /></td>
                                    }
                                  </tr>
                                )
                              })}
                            </table>
                          </div>
                          :
                          <div style={{ boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", width: '100%', height: 500 }}>
                            <table style={{ backgroundColor: "#FFFFFF", width: '100%' }}>
                              <tr style={{ color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left' }}>
                                <th style={{ padding: '20px 20px' }}>Username</th>
                                <th>IP Address</th>
                                <th>VM Name</th>
                                <th>Location</th>
                                <th></th>
                              </tr>
                            </table>
                            <div style={{ width: '100%', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCircleNotch} spin style={{ color: "#1e1f36", margin: 'auto', marginTop: 220 }} />
                            </div>
                          </div>
                      }

                      {/*Disks table*/}
                      <h5 className="mb-2 mt-5">Disks</h5>
                      {
                        this.props.disksFetched
                          ?
                          <div style={{ maxHeight: 500, overflowY: 'scroll', width: '100%', boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)" }}>
                            <table style={{ backgroundColor: "#FFFFFF", width: '100%' }}>
                              <tr style={{ color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left' }}>
                                <th style={{ padding: '20px 20px' }}>Disk Name</th>
                                <th>Username</th>
                                <th>Vm Name</th>
                                <th>Location</th>
                                <th></th>
                              </tr>
                              {this.props.disk_info.map((value, index) => (
                                <tr style={{ borderTop: "solid 0.5px #EBEBEB", color: "#333333", fontSize: 12 }} key={index}>
                                  <td style={{ width: '35%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>{value.disk_name}</td>
                                  <td style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>{value.username}</td>
                                  <td style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>{value.vm_name}</td>
                                  <td style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>{value.location}</td>
                                  <td style={{ width: '10%', textAlign: 'right', paddingRight: 25 }}>
                                  </td>
                                </tr>
                              ))}
                            </table>
                          </div>
                          :
                          <div style={{ boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", width: '100%', height: 500, marginTop: 35 }}>
                            <table style={{ backgroundColor: "#FFFFFF", width: '100%' }}>
                              <tr style={{ color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left' }}>
                                <th style={{ padding: '20px 20px' }}>Disk Name</th>
                                <th>Username</th>
                                <th>Vm Name</th>
                                <th>Location</th>
                                <th></th>
                              </tr>
                            </table>
                            <div style={{ width: '100%', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCircleNotch} spin style={{ color: "#1e1f36", margin: 'auto', marginTop: 220 }} />
                            </div>
                          </div>
                      }

                      {/*Users table*/}
                      <h5 className="mb-2 mt-5">Users</h5>
                      {
                        this.props.usersUpdated
                          ?
                          <div style={{ maxHeight: 500, overflowY: 'scroll', width: '100%', boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)" }}>
                            <table style={{ backgroundColor: "#FFFFFF", width: '100%' }}>
                              <tr style={{ color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left' }}>
                                <th style={{ padding: '20px 20px' }}>Username</th>
                                <th>Promo Code</th>
                                <th>Unclaimed Credits</th>
                                <th>Email Verified</th>
                                <th></th>
                              </tr>
                              {this.props.userTable.map((value, index) => (
                                <tr style={{ borderTop: "solid 0.5px #EBEBEB", color: "#333333", fontSize: 12 }} key={index}>
                                  <td style={{ width: '35%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>{value.username}</td>
                                  <td style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>{value.code}</td>
                                  <td style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>{value.creditsOutstanding}</td>
                                  {
                                    value.verified
                                      ?
                                      <td style={{ width: '15%', paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
                                        <div style={{ width: 6, height: 6, borderRadius: 3, background: '#36cf78' }}></div>
                                      </td>
                                      :
                                      <td style={{ width: '15%', paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
                                        <div style={{ width: 6, height: 6, borderRadius: 3, background: '#ad2c28' }}></div>
                                      </td>
                                  }
                                  <td style={{ width: '10%', textAlign: 'right', paddingRight: 25 }}>
                                    <Popup trigger={
                                      <FontAwesomeIcon className="pointerOnHover" icon={faTimes} style={{ color: "#b01717", width: 12 }} />
                                    } modal contentStyle={{ width: 400, borderRadius: 5, backgroundColor: "white", border: "none", height: 210, padding: 30, textAlign: 'center' }}>
                                      <div style={{ fontWeight: 'bold', fontSize: 20, color: "#333333" }}><strong>Are You Sure?</strong></div>
                                      <div style={{ fontSize: 12, color: "#555555", marginTop: 15 }}>You are about to permanently delete <strong>{value.username}</strong></div>
                                      <button onClick={() => this.deleteUser(value.username)} style={{ fontWeight: 'bold', marginTop: 30, outline: 'none', width: '100%', fontSize: 12, borderRadius: 5, display: 'inline', padding: '10px 10px', border: 'solid 1px #e34d4d', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)' }}>
                                        DELETE USER
                                        </button>
                                    </Popup>
                                  </td>
                                </tr>
                              ))}
                            </table>
                          </div>
                          :
                          <div style={{ boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", width: '100%', height: 500, marginTop: 35 }}>
                            <table style={{ backgroundColor: "#FFFFFF", width: '100%' }}>
                              <tr style={{ color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left' }}>
                                <th style={{ padding: '20px 20px' }}>Username</th>
                                <th>Promo Code</th>
                                <th>Unclaimed Credits</th>
                                <th>Email Verified</th>
                                <th></th>
                              </tr>
                            </table>
                            <div style={{ width: '100%', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCircleNotch} spin style={{ color: "#1e1f36", margin: 'auto', marginTop: 220 }} />
                            </div>
                          </div>
                      }

                      {/*Customers table*/}
                      <h5 className="mb-2 mt-5">Customers</h5>
                      {
                        this.props.customersUpdated
                          ?
                          <div style={{ maxHeight: 500, overflowY: 'scroll', width: '100%', boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)" }}>
                            <table style={{ backgroundColor: "#FFFFFF", width: '100%' }}>
                              <tr style={{ color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left' }}>
                                <th style={{ padding: '20px 20px' }}>Email</th>
                                <th>Id</th>
                                <th>Subscription</th>
                                <th>Location</th>
                                <th></th>
                              </tr>
                              {this.props.customerTable.map((value, index) => (
                                <tr style={{ borderTop: "solid 0.5px #EBEBEB", color: "#333333", fontSize: 12 }} key={index}>
                                  <td style={{ width: '35%', paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>{value.email}</td>
                                  <td style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>{value.id}</td>
                                  <td style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>{value.subscription}</td>
                                  <td style={{ width: '25%', paddingTop: 10, paddingBottom: 10 }}>{value.location}</td>
                                  <td style={{ width: '10%', textAlign: 'right', paddingRight: 25 }}>
                                  </td>
                                </tr>
                              ))}
                            </table>
                          </div>
                          :
                          <div style={{ boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", width: '100%', height: 500, marginTop: 35 }}>
                            <table style={{ backgroundColor: "#FFFFFF", width: '100%' }}>
                              <tr style={{ color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left' }}>
                                <th style={{ padding: '20px 20px' }}>Email</th>
                                <th>Id</th>
                                <th>Subscription</th>
                                <th>Location</th>
                                <th></th>
                              </tr>
                            </table>
                            <div style={{ width: '100%', textAlign: 'center' }}>
                              <FontAwesomeIcon icon={faCircleNotch} spin style={{ color: "#1e1f36", margin: 'auto', marginTop: 220 }} />
                            </div>
                          </div>
                      }
                    </Col>

                    <Col md="3" className="pr-4">
                      <div>
                        <div className="float-right">
                          <h5>Recent Activity</h5>
                        </div>
                        <div style={{ boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", width: '100%', marginTop: 13, padding: 25, overflowY: 'scroll', height: 500 }}>
                          {
                            this.props.activityFetched
                              ?
                              <div style={{ maxHeight: 500 }}>
                                {this.props.userActivity.map((value, index) => {
                                  if (index < 50) {
                                    var gradients = ['linear-gradient(135deg, #41E0C4 0%, #8574E9 100%)']
                                    return (
                                      <div style={{ paddingBottom: 30, display: 'flex' }}>
                                        {
                                          value.action === 'logon'
                                            ?
                                            <div style={{ position: 'relative', height: 40, width: 40, borderRadius: 20, color: 'white', fontWeight: 'bold', background: `${gradients[0]}`, border: 'solid 2px #0acc4b' }}>
                                              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 18 }}>{value.username.charAt(0)}</div>
                                            </div>
                                            :
                                            <div style={{ position: 'relative', height: 40, width: 40, borderRadius: 20, color: 'white', fontWeight: 'bold', background: `${gradients[0]}`, border: 'solid 2px #b325cc' }}>
                                              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 18 }}>{value.username.charAt(0)}</div>
                                            </div>
                                        }
                                        <div style={{ marginLeft: 20 }}>
                                          <div style={{ fontSize: 13 }}>
                                            <div>
                                              {this.formatTime(value.timestamp)}
                                            </div>
                                            <div style={{ fontSize: 11, color: '#888888' }}>
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
                              <div style={{ height: 480, width: '100%', textAlign: 'center' }}>
                                <FontAwesomeIcon icon={faCircleNotch} spin style={{ color: "#1e1f36", margin: 'auto', marginTop: 240 }} />
                              </div>
                          }
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
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
    disk_info: state.AccountReducer.disk_info ? state.AccountReducer.disk_info : [],
    disksFetched: state.AccountReducer.disksFetched,
    activityFetched: state.AccountReducer.activityFetched,
    userActivity: state.AccountReducer.userActivity ? state.AccountReducer.userActivity : [],
    userTable: state.AccountReducer.userTable ? state.AccountReducer.userTable : [],
    usersUpdated: state.AccountReducer.usersUpdated,
    customerTable: state.AccountReducer.customerTable ? state.AccountReducer.customerTable : [],
    customersUpdated: state.AccountReducer.customersUpdated
  }
}

export default connect(mapStateToProps)(Admin)