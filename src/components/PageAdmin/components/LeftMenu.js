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
        this.state = { page: 'dashboard' }
    }

    render() {
        return (
            <div className="pl-5 pt-5">
                <img src={Logo} alt="" style={{ width: 40, height: 40 }} />
                <div style={{ marginTop: 40, fontSize: 18 }}>
                    <div style={{ marginBottom: 15 }}>
                        <Link
                            onClick={() => this.setState({ page: 'dashboard' })}
                            style={{ textDecoration: 'none', color: '#111111' }}
                            to="/admin/dashboard"
                        >
                            Dashboard
                        </Link>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                        <Link
                            onClick={() => this.setState({ page: 'logs' })}
                            style={{ textDecoration: 'none', color: '#111111' }}
                            to="/admin/analytics"
                        >
                            Analytics
                        </Link>
                    </div>
                    <div style={{ marginBottom: 15 }}>
                        <Link
                            onClick={() => this.setState({ page: 'logs' })}
                            style={{ textDecoration: 'none', color: '#111111' }}
                            to="/admin/logs"
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
