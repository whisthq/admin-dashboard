import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';

import Logo from '../../../assets/logo.svg'
import '../../../static/App.css';


class LeftMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {width: 0, height: 0}
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
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    return (
      <div>
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
    );
  }
}

export default LeftMenu;