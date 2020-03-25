import React, { Component } from 'react'
import '../../../static/App.css';

class SpecBox extends Component {
  constructor(props) {
    super(props)
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

  render() {
    return (
      <div style = {this.props.boxStyle} className = "spec-box">
        <table style = {{width: '100%'}}>
          <tr style = {{width: '100%'}}>
            <td style = {{fontSize: 20, fontWeight: 'bold', width: '60%', textAlign: 'left'}}>
              <span style = {this.props.mainFont}>{this.props.name}</span></td>
            <td style = {{width: '40%', textAlign: 'right', color: '#94a8ed', fontWeight: 'bold'}}>
              <span style = {this.props.subFont}>{this.props.price}</span>
            </td>
          </tr>
          <tr style = {{height: 15}}></tr>
          <tr style = {{width: '100%', textAlign: 'left'}}>
            <img src = {this.props.graphic} style = {{width: '175%', maxHeight: 120, maxWidth: 450}}/>
          </tr>
        </table>
      </div>
    );
  }
}

export const TYPES = {
  BASE: 'baseBox',
  ENHANCED: 'enhancedBox'
}

export default SpecBox