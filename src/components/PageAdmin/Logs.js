import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import "react-tabs/style/react-tabs.css";
import { Redirect } from "react-router-dom"

import '../../static/App.css';
import {fetchUserActivity, deleteUser, logout, fetchLogs, logsFound, deleteLogs} from '../../actions/index.js'
import LeftMenu from './components/LeftMenu.js'

class Logs extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, loaded: false, 
      day: 0, month: 0, year: 0, logsFetched: false, username: '', processing: false, last_index: 10}
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
    this.props.dispatch(logsFound(false))
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
    console.log(this.props)
    if(this.props.access_token && this.props.logs.length === 0 && !this.state.logsFetched) {
      this.setState({logsFetched: true})
    }
    if(!prevProps.logs_fetched && this.props.logs_fetched && this.state.processing) {
      this.setState({processing: false})
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
    this.props.dispatch(fetchLogs(this.state.username, true, false))
    this.setState({processing: true, last_index: 20})
  }

  searchUserKey = (evt) => {
    if(evt.key === 'Enter' && !this.state.processing) {
      this.searchUser()
    }
  }

  searchAllUsers = () => {
    this.props.dispatch(fetchLogs(this.state.username, true, true))
    this.setState({processing: true})
  }

  deleteLogs = (connection_id) => {
    this.props.dispatch(deleteLogs(connection_id))


    // then reload the page
    // this.props.dispatch(fetchLogs(this.state.username, true, false))


  }


  flatMap = (array, fn) => {
    var result = [];
    for (var i = 0; i < array.length; i++) {
      var mapping = fn(array[i]);
      result = result.concat(mapping);
    }
    return result;
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
        {
        this.props.authenticated
        ?
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
                <input type = "text" placeholder = "Username" onChange = {this.updateUser} onKeyPress = {this.searchUserKey} style = {{padding: '10px 15px', backgroundColor: '#EFEFEF', borderRadius: 3, marginRight: 10, border: 'none', height: 45, width: 300}}/>
                {
                !this.state.processing 
                ?
                <Button onClick = {() => this.searchUser()} style = {{padding: '10px 30px', fontWeight: 'bold', backgroundColor: '#111111', borderRadius: 3, marginRight: 10, border: 'none', height: 45, position: 'relative', bottom: 2, width: 120}}>Search</Button>
                :
                <Button disabled = {true} style = {{width: 120, padding: '10px 30px', fontWeight: 'bold', backgroundColor: '#111111', borderRadius: 3, marginRight: 10, border: 'none', height: 45, position: 'relative', bottom: 2}}>
                  <FontAwesomeIcon icon = {faCircleNotch} spin />
                </Button>
                }
                {
                !this.state.processing 
                ?
                <Button onClick = {() => this.searchAllUsers()} style = {{color: '#111111', padding: '10px 30px', fontWeight: 'bold', backgroundColor: '#c4fffe', borderRadius: 3, marginRight: 10, border: 'none', height: 45, position: 'relative', bottom: 2, width: 180}}>Search All Users</Button>
                :
                <Button disabled = {true} style = {{width: 120, padding: '10px 30px', fontWeight: 'bold', backgroundColor: '#c4fffe', borderRadius: 3, marginRight: 10, border: 'none', height: 45, position: 'relative', bottom: 2}}>
                  <FontAwesomeIcon icon = {faCircleNotch} spin />
                </Button>
                }
              </div>
              <div>
              {
              this.props.logs_fetched && this.props.logs.length === 0 && this.props.logs_not_found
              ?
              <div style = {{marginTop: 10, fontSize: 14, background: 'rgba(94, 195, 235, 0.1)', color: '#1ba8e0', width: 430, fontWeight: 'bold', padding: 15, borderRadius: 3}}>
                No logs found! Search for a valid user.
              </div>
              :
              <div style = {{maxHeight: 600, overflowY: 'scroll', marginTop: 25}}>
<<<<<<< HEAD
                <table style = {{width: 900}}>
=======
                <table style = {{width: 1000}}>
>>>>>>> c43557653c38cdd1821388e7dd3b6462cc6cd899
                  {this.props.logs.slice(0, Math.min(this.props.logs.length, this.state.last_index)).map((value, index) => {
                    return (
                      <tr style = {{fontSize: 15, height: 50, padding: 10, paddingBottom: 20, key: "logs"}}>
                        <td style = {{width: 125}}><a target = "_blank" rel="noopener noreferrer" href = {value["server_logs"]} style = {{background: 'rgba(94, 195, 235, 0.1)', padding: '10px 12px', borderRadius: 2, fontWeight: 'bold'}}><span style = {{color: '#1ba8e0'}}>Server Logs</span></a></td>
                        <td style = {{width: 125}}><a target = "_blank" rel="noopener noreferrer" href = {value["client_logs"]} style = {{background: 'rgba(2, 207, 57, 0.1)', padding: '10px 12px', borderRadius: 2, fontWeight: 'bold'}}><span style = {{color: '#02cf39'}}>Client Logs</span></a></td>
                        <td style = {{textAlign: 'center', maxWidth: 100}}>{value["last_updated"]}</td>
                        <td>Connection {value["connection_id"]}</td>
                        <td style = {{maxWidth: 100}}>Version {value["version"]}</td>
                        {
<<<<<<< HEAD
                         value["username"]
                         ?
                         <td style = {{maxWidth: 100}}>{value["username"]}</td>
                         :
                         <td style = {{color: "#888888"}}>No username</td>
=======
                        value["username"]
                        ?
                        <td style = {{width: 100}}>{value["username"]}</td>
                        :
                        <td style = {{color: "#888888"}}>No username</td>
>>>>>>> c43557653c38cdd1821388e7dd3b6462cc6cd899
                        }
                        <Button onClick = {() => this.deleteLogs(value["connection_id"])} style = {{marginLeft: 120, background: 'rgba(232, 78, 78, 0.1)', bottom: 0, padding: '4px 8px', borderRadius: 2, border: 'none', fontWeight: 'bold', color: '#e30b0b'}}>X</Button>               
                      </tr>
                    )
                  })}
                </table>
                {
                this.props.logs && Math.min(20, this.state.last_index) < this.props.logs.length
                ?
                <div style = {{marginTop: 20, color: '#5ec3eb'}} className = "pointerOnHover" onClick = {() => this.setState({last_index: this.state.last_index + 20})}>
                  Load More Logs
                </div>
                :
                <div></div>
                }
              </div>
              }
              </div>
            </div>
        </div>
        :
        <Redirect to = "/"/>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    logs: state.AccountReducer.logs ? state.AccountReducer.logs : [],
    access_token: state.AccountReducer.access_token,
    logs_fetched: state.AccountReducer.logs_fetched ? state.AccountReducer.logs_fetched : false,
    logs_not_found: state.AccountReducer.logs_not_found ? state.AccountReducer.logs_not_found : false,
    authenticated: state.AccountReducer.authenticated
  }
}

export default connect(mapStateToProps)(Logs)
