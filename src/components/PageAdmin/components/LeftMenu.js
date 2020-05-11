import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

import Logo from '../../../assets/logo.svg'
import '../../../static/App.css';

withRouter(props => <LeftMenu {...props}/>);

class LeftMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {width: 0, height: 0, page: 'dashboard'}
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
        <img src = {Logo} alt = "" style = {{width: 40, height: 40}}/>
        <div style = {{marginTop: 25, fontSize: 18}}>
          <div style = {{marginBottom: 15}}>
            {
            this.state.page === 'dashboard'
            ?
            <Link onClick = {() => this.setState({page: 'dashboard'})} style = {{textDecoration: 'none', color: '#111111'}} to = "/">
              Dashboard
            </Link>
            :
            <Link onClick = {() => this.setState({page: 'dashboard'})} style = {{textDecoration: 'none', color: '#111111'}} to = "/">
              Dashboard
            </Link>
            }
          </div>
          <div style = {{marginBottom: 15}}>
            {
            this.state.page === 'dashboard'
            ?
            <Link onClick = {() => this.setState({page: 'logs'})} style = {{textDecoration: 'none', color: '#111111'}} to = "/logs">
              Logs
            </Link>
            :
            <Link onClick = {() => this.setState({page: 'logs'})} style = {{textDecoration: 'none', color: '#111111'}} to = "/logs">
              Logs
            </Link>
            }
          </div>
          <div style = {{marginBottom: 15}}>
            <a target="_blank" rel="noopener noreferrer" href = "https://drive.google.com/open?id=1kbpGbVeYd5LVJgzGN0dKro-ryizQr2kg">
              Google Drive
            </a>
          </div>
          <div style = {{marginBottom: 15}}>
            <a target="_blank" rel="noopener noreferrer" href = "https://github.com/orgs/fractalcomputers/dashboard">
              GitHub
            </a>
          </div>
          <div style = {{marginBottom: 15}}>
            <a target="_blank" rel="noopener noreferrer" href = "https://www.notion.so/fractalcomputers/2fa59d87701b4ec7967377450c75008a?v=f20e6d7d6d5f4d4c9a0f886871259833">
              Notion
            </a>
          </div>
          <div style = {{marginBottom: 15}}>
            <a target="_blank" rel="noopener noreferrer" href = "https://fractalcomputers.slack.com">
              Slack 
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftMenu;
