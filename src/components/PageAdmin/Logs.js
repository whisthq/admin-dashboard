import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Popup from "reactjs-popup";
import Button from 'react-bootstrap/Button'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'
import "react-tabs/style/react-tabs.css";

import Logo from '../../assets/logo.svg'
import '../../static/App.css';
import { updateDB, loginUser, resetUser, fetchUserActivity, fetchUserTable, deleteUser, logout, fetchLogs} from '../../actions/index.js'
import LoginPage from './components/LoginPage.js'
import LeftMenu from './components/LeftMenu.js'
import CustomerTable from './components/CustomerTable.js'

class Logs extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, loaded: false, 
      day: 0, month: 0, year: 0, logsFetched: false, username: ''}
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
    this.props.dispatch(fetchUserActivity(false))
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

  componentDidUpdate(prevProps) {
    if(this.props.access_token && this.props.logs.length === 0 && !this.state.logsFetched) {
      this.setState({logsFetched: true})
    }
  }

  deleteUser = (user) => {
    this.props.dispatch(deleteUser(user))
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

  updateUser = (evt) => {
    this.setState({
      username: evt.target.value
    })
  }

  searchUser = () => {
    this.props.dispatch(fetchLogs(this.state.username))
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }

    var header = []
    if(this.props.logs.length > 0) {
      Object.keys(this.props.logs[0]).forEach(function(key) {
          header.push(key)
      });
    }

    return (
      <div style = {{backgroundColor: "#FFFFFF"}}>
        <div style = {{display: 'flex', width: '100%'}}>
          <div style = {{width: '20%', minHeight: '100vh', maxWidth: 300, background: "white", paddingTop: 50, paddingLeft: 75}}>
            <LeftMenu/>
          </div>
            <div style = {{width: '80%', padding: 50, paddingRight: 75}}>
              <div>
              {this.state.month} {this.state.day}, {this.state.year}
              </div>
              <div style = {{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                <div style = {{marginTop: 5, fontSize: 45, fontWeight: 'bold', marginBottom: 60, width: 275, color: '#111111'}}>
                  LOGS
                </div>
                <div style = {{float: 'right'}}>
                  <Button onClick = {() => this.props.dispatch(logout())} style = {{border: 'none', padding: '10px 30px', fontWeight: 'bold', color: '#1ba8e0', background: 'rgba(94, 195, 235, 0.2)', borderRadius: 3}}>
                    Logout
                  </Button>
                </div>
              </div>
              <div>
                No logs found! Search for a user's logs here:
                <input type = "text" onChange = {this.updateUser}/>
                <Button onClick = {() => this.searchUser()}>Search</Button>
              </div>
              <div>
              <table>
                <tr style = {{color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left'}}>
                  {header.map((value, index) => {
                    if(value !== 'username') {
                      return(
                        <th style = {{padding: 20}}>{value}</th>
                      )
                    }
                  })}
                </tr>
                {this.props.logs.map((value, index) => {
                  return (
                    <tr style = {{borderTop: "solid 0.5px #EBEBEB", color: "#333333", fontSize: 12}}>
                      {header.map((value1, index1) => {
                        return(
                          <td style = {{paddingLeft: 20, paddingTop: 10, paddingBottom: 10, maxWidth: 200}}>
                            {
                            value[value1] == null
                            ?
                            <div></div>
                            :
                            (
                            value1 === 'username'
                            ?
                            <div></div>
                            :
                            (
                            value1.includes('logs')
                            ?
                            <div style = {{maxHeight: 100, overflowY: 'scroll'}}>
                              {value[value1].toString()}
                            </div>
                            :
                            <div>
                              {value[value1].toString()}
                            </div>
                            )
                            )
                            }
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </table>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    logs: state.AccountReducer.logs ? state.AccountReducer.logs : [],
    access_token: state.AccountReducer.access_token
  }
}

export default connect(mapStateToProps)(Logs)