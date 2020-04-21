import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck, faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'

import '../../../static/App.css';


class VMTable extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
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
    var header = []
    if(this.props.vm_info.length > 0) {
      Object.keys(this.props.vm_info[0]).forEach(function(key) {
          header.push(key)
      });
    }
    header.reverse()

    return (
      <div>
      {
      this.props.vmsUpdated 
      ?
      <div style = {{maxHeight: 500, overflowY: 'scroll', width: '100%', boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", display: 'block'}}>
      <table style = {{backgroundColor: "#FFFFFF", width: '100%'}}>
        <tr style = {{color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left'}}>
          {header.map((value, index) => {
            return(
              <th style = {{padding: 20}}>{value}</th>
            )
          })}
        </tr>
        {this.props.vm_info.map((value, index) => {
          var defaultUsername = value.username
          return (
            <tr style = {{borderTop: "solid 0.5px #EBEBEB", color: "#333333", fontSize: 12}}>
              {header.map((value1, index1) => {
                return(
                  <td style = {{paddingLeft: 20, paddingTop: 10, paddingBottom: 10}}>
                    {
                    value[value1] == null
                    ?
                    <div></div>
                    :
                    <div>
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
      <div style = {{boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)", width: '100%', height: 500}}>
      <table style = {{backgroundColor: "#FFFFFF", width: '100%'}}>
        <tr style = {{color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left'}}>
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
    vm_info: state.AccountReducer.vm_info ? state.AccountReducer.vm_info.reverse() : [],
    vmsUpdated: state.AccountReducer.vmsUpdated,
  }
}

export default connect(mapStateToProps)(VMTable)