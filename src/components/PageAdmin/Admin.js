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
import { updateDB, loginUser, resetUser, fetchUserActivity, fetchUserTable, deleteUser, logout} from '../../actions/index.js'
import LoginPage from './components/LoginPage.js'
import LeftMenu from './components/LeftMenu.js'
import VMTable from './components/VMTable.js'
import UserTable from './components/UserTable.js'


class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, loaded: false, 
      day: 0, month: 0, year: 0, userTableFetched: false}
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
    this.props.dispatch(updateDB(false))
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
    if(this.props.access_token && this.props.userTable.length === 0 && !this.state.userTableFetched) {
      this.props.dispatch(fetchUserTable())
      this.setState({userTableFetched: true})
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
      <LoginPage/>
      :
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
                  DASHBOARD
                </div>
                <div style = {{float: 'right'}}>
                  <Button onClick = {() => this.props.dispatch(logout())} style = {{border: 'none', padding: '10px 30px', fontWeight: 'bold', color: '#1ba8e0', background: 'rgba(94, 195, 235, 0.2)', borderRadius: 3}}>
                    Logout
                  </Button>
                </div>
              </div>
              <div style = {{display: 'flex', marginTop: 45}}>
                <div style = {{display: 'block', width: '100%', position: 'relative', bottom: 36}}>
                <Tabs>
                  <TabList style = {{textAlign: 'left', border: 'none', border: 'none', fontSize: 16}}>
                    <Tab>Cloud PCs</Tab>
                    <Tab>Users</Tab>
                  </TabList>
                  <TabPanel style = {{paddingTop: 20}}>
                    <VMTable/>
                  </TabPanel>
                  <TabPanel style = {{paddingTop: 20}}>
                    <UserTable/>
                  </TabPanel>
                </Tabs>
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
  return {
    authenticated: state.AccountReducer.authenticated,
    vm_info: state.AccountReducer.vm_info ? state.AccountReducer.vm_info : [],
    vmsUpdated: state.AccountReducer.vmsUpdated,
    activityFetched: state.AccountReducer.activityFetched,
    userActivity: state.AccountReducer.userActivity ? state.AccountReducer.userActivity : [],
    userTable: state.AccountReducer.userTable ? state.AccountReducer.userTable : [],
    usersUpdated: state.AccountReducer.usersUpdated,
    access_token: state.AccountReducer.access_token
  }
}

export default connect(mapStateToProps)(Admin)