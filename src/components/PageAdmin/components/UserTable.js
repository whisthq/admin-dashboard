import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Popup from "reactjs-popup";
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { deleteUser } from '../../../actions/index.js'

import '../../../static/App.css';


class UserTable extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false}
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

  deleteUser = (user) => {
    this.props.dispatch(deleteUser(user))
  }


  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    var header = []
    if(this.props.userTable.length > 0) {
      Object.keys(this.props.userTable[0]).forEach(function(key) {
          header.push(key)
      });
    }
    return (
      <div>
      {
      this.props.usersUpdated
      ?
      <div style = {{maxHeight: 500, overflowY: 'scroll', width: '100%', boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)"}}>
      <table style = {{backgroundColor: "#FFFFFF", width: '100%'}}>
        <tr style = {{color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left'}}>
          <th></th>
          {header.map((value, index) => {
            return(
              <th style = {{padding: 20}}>{value}</th>
            )
          })}
        </tr>
        {this.props.userTable.map((value, index) => {
          var defaultUsername = value.username
          return (
            <tr style = {{borderTop: "solid 0.5px #EBEBEB", color: "#333333", fontSize: 12}}>
              <td style = {{width: '10%', textAlign: 'right', paddingLeft: 20}}>
                <Popup trigger = {
                <FontAwesomeIcon className = "pointerOnHover" icon={faTimes} style = {{color: "#b01717", width: 12}}/>
                } modal contentStyle = {{width: 400, borderRadius: 5, backgroundColor: "white", border: "none", height: 210, padding: 30, textAlign: 'center'}}>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333"}}><strong>Are You Sure?</strong></div>
                  <div style = {{fontSize: 12, color: "#555555", marginTop: 15}}>You are about to permanently delete <strong>{value.username}</strong></div>
                  <button onClick = {() => this.deleteUser(value.username)} style = {{fontWeight: 'bold', marginTop: 30, outline: 'none', width: '100%', fontSize: 12, borderRadius: 5, display: 'inline', padding: '10px 10px', border: 'solid 1px #e34d4d', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)'}}>
                    DELETE USER
                  </button>
                </Popup>
              </td>
              {header.map((value1, index1) => {
                return(
                  <td style = {{paddingLeft: 20, paddingTop: 10, paddingBottom: 10, minWidth: 100}}>
                    {
                    value[value1] == null
                    ?
                    <div></div>
                    :
                    (
                    value1 == 'password'
                    ?
                    <div style = {{maxWidth: 150, overflowX: 'scroll'}}>
                      {value[value1].toString()}
                    </div>
                    :
                    <div>
                      {value[value1].toString()}
                    </div>
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
      :
      <div style = {{boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", width: '100%', height: 500, marginTop: 35}}>
      <table style = {{backgroundColor: "#FFFFFF", width: '100%'}}>
        <tr style = {{color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left'}}>
          <th></th>
          {header.map((value, index) => {
            return(
              <th style = {{padding: 20}}>{value}</th>
            )
          })}
        </tr>
      </table>
      <div style = {{width: '100%', textAlign: 'center'}}>
          <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#1e1f36", margin: 'auto', marginTop: 220}}/>
      </div>
      </div>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userTable: state.AccountReducer.userTable ? state.AccountReducer.userTable : [],
    usersUpdated: state.AccountReducer.usersUpdated
  }
}

export default connect(mapStateToProps)(UserTable)