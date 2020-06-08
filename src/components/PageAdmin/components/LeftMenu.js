import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import Logo from '../../../assets/logo.svg'
import '../../../static/App.css'
import { Dropdown } from 'react-bootstrap'

withRouter((props) => <LeftMenu {...props} />)

class LeftMenu extends Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0 }
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
                <img src={Logo} alt="" style={{ width: 40, height: 40 }} />
                <div style={{ marginTop: 40, fontSize: 18 }}>
                    <div style={{ marginBottom: 15 }}>
                        <Link
                            style={{ 
                                textDecoration: 'none', 
                                color: '#111111', 
                                fontWeight: this.props.page === 'dashboard' ? 'bold' : 'normal'
                            }}
                            to="/"
                        >
                            Dashboard
                        </Link>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                        <Link
                            style={{ 
                                textDecoration: 'none', 
                                color: '#111111', 
                                fontWeight: this.props.page === 'analytics' ? 'bold' : 'normal'
                            }}
                            to="/analytics"
                        >
                            Analytics
                        </Link>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                        <Link
                            style={{ 
                                textDecoration: 'none', 
                                color: '#111111', 
                                fontWeight: this.props.page === 'logs' ? 'bold' : 'normal'
                            }}
                            to="/logs"
                        >
                            User Logs
                        </Link>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Links
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                        <Dropdown.Item style={{ marginBottom: 5 }}>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://papertrailapp.com/dashboard"
                            >
                                Webserver Logs
                            </a>
                        </Dropdown.Item>
                        <Dropdown.Item style={{ marginBottom: 5 }}>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://s3.console.aws.amazon.com/s3/home?region=us-east-1#"
                            >
                                AWS S3
                            </a>
                        </Dropdown.Item>{' '}
                        <Dropdown.Item style={{ marginBottom: 5 }}>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://lightsail.aws.amazon.com/ls/webapp/home/instances?#"
                            >
                                AWS Lightsail
                            </a>
                        </Dropdown.Item>
                        <Dropdown.Item style={{ marginBottom: 5 }}>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/orgs/fractalcomputers/dashboard"
                            >
                                GitHub
                            </a>
                        </Dropdown.Item>
                        <Dropdown.Item style={{ marginBottom: 5 }}>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://drive.google.com/open?id=1kbpGbVeYd5LVJgzGN0dKro-ryizQr2kg"
                            >
                                Google Drive
                            </a>
                        </Dropdown.Item>
                        <Dropdown.Item style={{ marginBottom: 5 }}>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.notion.so/fractalcomputers/2fa59d87701b4ec7967377450c75008a?v=f20e6d7d6d5f4d4c9a0f886871259833"
                            >
                                Notion
                            </a>
                        </Dropdown.Item>
                        <Dropdown.Item style={{ marginBottom: 5 }}>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://fractalcomputers.slack.com"
                            >
                                Slack
                            </a>
                        </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        page: state.AccountReducer.page
    }
}

export default connect(mapStateToProps)(LeftMenu)
