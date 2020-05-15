import React, { Component } from 'react'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import { startVM, deallocateVM, updateDB } from '../../../actions/index.js'

import '../../../static/App.css';


class VMTable extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    this.props.dispatch(updateDB(false))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  startVM = (vm_name) => {
    this.props.dispatch(startVM(vm_name))
  }

  deallocateVM = (vm_name) => {
    this.props.dispatch(deallocateVM(vm_name))
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

    const vmButton = (state, vm_name, lock) => {
      if(this.props.vms_updating.includes(vm_name)) {
        return(
          <td style = {{paddingLeft: 20, paddingRight: 10, fontSize: 11}} className = "pointerOnHover">
            <FontAwesomeIcon icon = {faCircleNotch} spin style = {{color: '#111111'}}/>
          </td>
        )
      } else if((state === 'STOPPED' || state === 'DEALLOCATED') && !lock) {
        return(
          <td onClick = {() => this.startVM(vm_name)} style = {{paddingLeft: 20, paddingRight: 10, fontSize: 11}} className = "pointerOnHover">
            <FontAwesomeIcon icon = {faPlay} style = {{color: '#111111'}}/>
          </td>
        )
      } else if(state === 'RUNNING_AVAILABLE' && !lock) {
        return(
          <td onClick = {() => this.deallocateVM(vm_name)} style = {{paddingLeft: 20, paddingRight: 10, fontSize: 11}} className = "pointerOnHover">
            <FontAwesomeIcon icon = {faPause} style = {{color: '#111111'}}/>
          </td>
        )
      }
    }

    return (
      <div>
      {
      this.props.vmsUpdated
      ?
      <div style = {{maxHeight: 600, overflowY: 'scroll', width: '100%', display: 'block'}}>
      <div style = {{background: 'none', display: 'flex', marginBottom: 20}}>
        <div style = {{height: 18, width: 18, position: 'relative', top: 4, borderRadius: 2, backgroundColor: 'rgba(171, 235, 235, 0.6)'}}></div>
        <div style = {{marginLeft: 10, marginRight: 10}}> Dev Mode </div>
        <div style = {{height: 18, width: 18, position: 'relative', top: 4, borderRadius: 2, backgroundColor: 'rgba(242, 181, 179, 0.2)'}}></div>
        <div style = {{marginLeft: 10, marginRight: 10}}> Locked </div>
        <div style = {{height: 18, width: 18, position: 'relative', top: 4, borderRadius: 2, backgroundColor: 'rgba(193, 245, 174, 0.2)'}}></div>
        <div style = {{marginLeft: 10, marginRight: 10}}> Unlocked </div>
      </div>
      <table style = {{backgroundColor: "#FFFFFF", width: '100%', boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.20)"}}>
        <tr style = {{color: 'white', backgroundColor: "#1e1f36", fontSize: 13, textAlign: 'left'}}>
          <th></th>
          {header.map((value, index) => {
            return(
              <th style = {{padding: 20}}>{value}</th>
            )
          })}
        </tr>
        {this.props.vm_info.map((value, index) => {
          return (
            <tr style = {{borderTop: "solid 0.5px #EBEBEB", color: "#333333", fontSize: 12, backgroundColor: value['dev'] ? 'rgba(171, 235, 235, 0.3)' : (value['lock'] ? 'rgba(242, 181, 179, 0.2)' : 'rgba(193, 245, 174, 0.2)')}}>
              <td>
              {vmButton(value['state'], value['vm_name'], value['lock'])}
              </td>
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
    vms_updating: state.AccountReducer.vms_updating ? state.AccountReducer.vms_updating : []
  }
}

export default connect(mapStateToProps)(VMTable)
