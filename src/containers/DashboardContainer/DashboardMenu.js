import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from 'react-bootstrap'
import {
    faHome,
    faChartArea,
    faList,
    faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FaLink } from 'react-icons/fa'

import 'static/App.css'

import Logo from 'assets/logo.svg'

withRouter((props) => <DashboardMenu {...props} />)

class DashboardMenu extends Component {
    constructor(props) {
        super(props)
        this.state = { page: 'dashboard' }
    }

    render() {
        return (
            <div
                style={{
                    backgroundColor: 'white',
                    height: '100%',
                    width: 75,
                    minHeight: '100vh',
                    paddingRight: 25,
                    paddingLeft: 0,
                    paddingTop: 50,
                }}
            >
                <div style={{ paddingLeft: 25 }}>
                    <img
                        src={Logo}
                        alt=""
                        style={{ width: 30, height: 30, marginBottom: 70 }}
                    />
                </div>
                <div style={{ marginTop: 40, fontSize: 18 }}>
                    <div style={{ marginBottom: 30, marginLeft: 5 }}>
                        <Link
                            style={{
                                textDecoration: 'none',
                                color:
                                    this.props.page === 'dashboard'
                                        ? '#111111'
                                        : '#999999',
                                fontWeight:
                                    this.props.page === 'dashboard'
                                        ? 'bold'
                                        : 'normal',
                                borderLeft:
                                    this.props.page === 'dashboard'
                                        ? 'solid 4px #6241e8'
                                        : 'solid 4px white',
                                paddingLeft: 18,
                            }}
                            to="/admin/dashboard"
                        >
                            <FontAwesomeIcon
                                icon={faHome}
                                style={{
                                    color:
                                        this.props.page === 'dashboard'
                                            ? '#111111'
                                            : '#d0ced9',
                                    fontSize: 20,
                                }}
                            />
                        </Link>
                    </div>
                    <div style={{ marginBottom: 30, marginLeft: 5 }}>
                        <Link
                            style={{
                                textDecoration: 'none',
                                fontWeight:
                                    this.props.page === 'analytics'
                                        ? 'bold'
                                        : 'normal',
                                borderLeft:
                                    this.props.page === 'analytics'
                                        ? 'solid 4px #6241e8'
                                        : 'solid 4px white',
                                paddingLeft: 20,
                            }}
                            to="/admin/analytics"
                        >
                            <FontAwesomeIcon
                                icon={faChartArea}
                                style={{
                                    color:
                                        this.props.page === 'analytics'
                                            ? '#111111'
                                            : '#d0ced9',
                                    fontSize: 20,
                                }}
                            />
                        </Link>
                    </div>
                    <div style={{ marginBottom: 30, marginLeft: 5 }}>
                        <Link
                            style={{
                                textDecoration: 'none',
                                fontWeight:
                                    this.props.page === 'logs'
                                        ? 'bold'
                                        : 'normal',
                                borderLeft:
                                    this.props.page === 'logs'
                                        ? 'solid 4px #6241e8'
                                        : 'solid 4px white',
                                paddingLeft: 21,
                            }}
                            to="/admin/logs"
                        >
                            <FontAwesomeIcon
                                icon={faList}
                                style={{
                                    color:
                                        this.props.page === 'logs'
                                            ? '#111111'
                                            : '#d0ced9',
                                    fontSize: 19,
                                }}
                            />
                        </Link>
                    </div>
                    <Dropdown
                        style={{
                            textDecoration: 'none',
                            paddingLeft: 29,
                        }}
                    >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <FontAwesomeIcon
                                icon={faExternalLinkAlt}
                                style={{
                                    color: '#d0ced9',
                                    fontSize: 18,
                                    outline: 'none',
                                }}
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ border: 'none', padding: 20 }}>
                            <Dropdown.Item style={{ marginBottom: 5 }}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://s3.console.aws.amazon.com/s3/home?region=us-east-1#"
                                >
                                    <FaLink
                                        style={{
                                            marginRight: 10,
                                            color: '#d0ced9',
                                            fontSize: 12,
                                        }}
                                    />
                                    AWS S3
                                </a>
                            </Dropdown.Item>{' '}
                            <Dropdown.Item style={{ marginBottom: 5 }}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://lightsail.aws.amazon.com/ls/webapp/home/instances?#"
                                >
                                    <FaLink
                                        style={{
                                            marginRight: 10,
                                            color: '#d0ced9',
                                            fontSize: 12,
                                        }}
                                    />
                                    AWS Lightsail
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Item style={{ marginBottom: 5 }}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://dashboard.heroku.com/teams/fractalcomputers/apps"
                                >
                                    <FaLink
                                        style={{
                                            marginRight: 10,
                                            color: '#d0ced9',
                                            fontSize: 12,
                                        }}
                                    />
                                    Heroku
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Item style={{ marginBottom: 5 }}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://fractalcomputers.postman.co/workspaces/6ded464f-396a-4792-a5c9-5ac7c689d269/apis"
                                >
                                    <FaLink
                                        style={{
                                            marginRight: 10,
                                            color: '#d0ced9',
                                            fontSize: 12,
                                        }}
                                    />
                                    Postman
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Item style={{ marginBottom: 5 }}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://drive.google.com/open?id=1kbpGbVeYd5LVJgzGN0dKro-ryizQr2kg"
                                >
                                    <FaLink
                                        style={{
                                            marginRight: 10,
                                            color: '#d0ced9',
                                            fontSize: 12,
                                        }}
                                    />
                                    Google Drive
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Item style={{ marginBottom: 5 }}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.notion.so/fractalcomputers/2fa59d87701b4ec7967377450c75008a?v=f20e6d7d6d5f4d4c9a0f886871259833"
                                >
                                    <FaLink
                                        style={{
                                            marginRight: 10,
                                            color: '#d0ced9',
                                            fontSize: 12,
                                        }}
                                    />
                                    Notion
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
        page: state.AccountReducer.page,
    }
}

export default connect(mapStateToProps)(DashboardMenu)
