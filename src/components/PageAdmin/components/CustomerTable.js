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
import { fetchCustomers } from '../../../actions/index.js'

import '../../../static/App.css';


class CustomerTable extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, customers_fetched: false}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate(prevProps) {
    if(this.props.access_token && this.props.customers.length === 0 && !this.state.customers_fetched) {
      this.props.dispatch(fetchCustomers())
      this.setState({customers_fetched: true})
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    var header = []
    if(this.props.customers.length > 0) {
      Object.keys(this.props.customers[0]).forEach(function(key) {
          header.push(key)
      });
    }

    header.reverse()

    return (
      <div>
      {
      this.props.customers.length > 0
      ?
      <div style = {{maxHeight: 500, overflowY: 'scroll', width: '100%', boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)"}}>
      <table style = {{backgroundColor: "#FFFFFF", width: '100%'}}>
        <tr style = {{color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left'}}>
          {header.map((value, index) => {
            return(
              <th style = {{padding: 20}}>{value}</th>
            )
          })}
        </tr>
        {this.props.customers.map((value, index) => {
          console.log(value)
          return (
            <tr style = {{borderTop: "solid 0.5px #EBEBEB", color: "#333333", fontSize: 12}}>
              {header.map((value1, index1) => {
                return(
                  <td style = {{paddingLeft: 20, paddingTop: 10, paddingBottom: 10, minWidth: 100}}>
                    {
                    value[value1] == null
                    ?
                    <div></div>
                    :
                    <div style = {{maxWidth: 150, overflowX: 'scroll'}}>
                      {value[value1].toString()}
                    </div>
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
  console.log(state)
  return {
    customers: state.AccountReducer.customers ? state.AccountReducer.customers.reverse() : [],
    access_token: state.AccountReducer.access_token
  }
}

export default connect(mapStateToProps)(CustomerTable)