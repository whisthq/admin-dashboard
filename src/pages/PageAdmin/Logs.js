import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faTrash } from '@fortawesome/free-solid-svg-icons'
import 'react-tabs/style/react-tabs.css'

import '../../static/App.css'
import {
    fetchUserActivity,
    deleteUser,
    fetchLogs,
    logsFound,
    deleteLogs,
    changePage,
} from '../../actions/index.js'

class Logs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            logsFetched: false,
            username: '',
            processing: false,
            last_index: 10,
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchUserActivity(false))
        this.props.dispatch(logsFound(false))
        this.props.dispatch(changePage('logs'))
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.access_token &&
            this.props.logs.length === 0 &&
            !this.state.logsFetched
        ) {
            this.setState({ logsFetched: true })
        }
        if (
            !prevProps.logs_fetched &&
            this.props.logs_fetched &&
            this.state.processing
        ) {
            this.setState({ processing: false })
        }
    }

    deleteUser = (user) => {
        this.props.dispatch(deleteUser(user))
    }

    updateUser = (evt) => {
        this.setState({
            username: evt.target.value,
        })
    }

    searchUser = () => {
        this.props.dispatch(fetchLogs(this.state.username, true, false))
        this.setState({ processing: true, last_index: 20 })
    }

    searchUserKey = (evt) => {
        if (evt.key === 'Enter' && !this.state.processing) {
            this.searchUser()
        }
    }

    searchAllUsers = () => {
        this.props.dispatch(fetchLogs(this.state.username, true, true))
        this.setState({ processing: true })
    }

    deleteLogs = (connection_id) => {
        this.props.dispatch(deleteLogs(connection_id))
    }

    flatMap = (array, fn) => {
        var result = []
        for (var i = 0; i < array.length; i++) {
            var mapping = fn(array[i])
            result = result.concat(mapping)
        }
        return result
    }

    render() {
        var header = []
        if (this.props.logs.length > 0) {
            Object.keys(this.props.logs[0]).forEach(function (key) {
                header.push(key)
            })
        }

        return (
            <div
                style={{
                    position: 'relative',
                    bottom: 10,
                    width: '100vw',
                }}
            >
                <div
                    style={{
                        fontSize: 45,
                        fontWeight: 'bold',
                        marginBottom: 30,
                        color: '#111111',
                    }}
                >
                    LOGS
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={this.updateUser}
                        onKeyPress={this.searchUserKey}
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#e3e5e8',
                            borderRadius: 3,
                            marginRight: 10,
                            border: 'none',
                            height: 45,
                            width: 300,
                        }}
                    />
                    {!this.state.processing ? (
                        <Button
                            onClick={() => this.searchUser()}
                            style={{
                                padding: '10px 30px',
                                fontWeight: 'bold',
                                backgroundColor: '#111111',
                                borderRadius: 3,
                                marginRight: 10,
                                border: 'none',
                                height: 45,
                                position: 'relative',
                                bottom: 2,
                                width: 120,
                            }}
                        >
                            Search
                        </Button>
                    ) : (
                        <Button
                            disabled={true}
                            style={{
                                width: 120,
                                padding: '10px 30px',
                                fontWeight: 'bold',
                                backgroundColor: '#111111',
                                borderRadius: 3,
                                marginRight: 10,
                                border: 'none',
                                height: 45,
                                position: 'relative',
                                bottom: 2,
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleNotch} spin />
                        </Button>
                    )}
                    {!this.state.processing ? (
                        <Button
                            onClick={() => this.searchAllUsers()}
                            style={{
                                color: 'white',
                                padding: '10px 30px',
                                fontWeight: 'bold',
                                backgroundColor: '#4636a6',
                                borderRadius: 3,
                                marginRight: 10,
                                border: 'none',
                                height: 45,
                                position: 'relative',
                                bottom: 2,
                                width: 180,
                            }}
                        >
                            Load All Logs
                        </Button>
                    ) : (
                        <Button
                            disabled={true}
                            style={{
                                width: 120,
                                padding: '10px 30px',
                                fontWeight: 'bold',
                                backgroundColor: '#4636a6',
                                borderRadius: 3,
                                marginRight: 10,
                                border: 'none',
                                height: 45,
                                position: 'relative',
                                bottom: 2,
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleNotch} spin />
                        </Button>
                    )}
                </div>
                <div>
                    {this.props.logs_fetched &&
                    this.props.logs.length === 0 &&
                    this.props.logs_not_found ? (
                        <div
                            style={{
                                marginTop: 10,
                                fontSize: 14,
                                background: 'rgba(94, 195, 235, 0.1)',
                                color: '#1ba8e0',
                                width: 430,
                                fontWeight: 'bold',
                                padding: 15,
                                borderRadius: 3,
                            }}
                        >
                            No logs found! Search for a valid user.
                        </div>
                    ) : (
                        <div
                            style={{
                                maxHeight: 600,
                                overflowY: 'scroll',
                                marginTop: 25,
                            }}
                        >
                            <table style={{ width: 900 }}>
                                {this.props.logs
                                    .slice(
                                        0,
                                        Math.min(
                                            this.props.logs.length,
                                            this.state.last_index
                                        )
                                    )
                                    .map((value, index) => {
                                        return (
                                            <tr
                                                style={{
                                                    fontSize: 12,
                                                    height: 50,
                                                    padding: 10,
                                                    paddingBottom: 20,
                                                    key: 'logs',
                                                }}
                                            >
                                                <td
                                                    style={{
                                                        width: 50,
                                                    }}
                                                >
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={
                                                            value['server_logs']
                                                        }
                                                        style={{
                                                            background:
                                                                '#4b3ba8',
                                                            padding:
                                                                '10px 12px',
                                                            borderRadius: 5,
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: 'white',
                                                                fontWeight:
                                                                    'bold',
                                                            }}
                                                        >
                                                            S
                                                        </span>
                                                    </a>
                                                </td>
                                                <td
                                                    style={{
                                                        width: 50,
                                                    }}
                                                >
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={
                                                            value['client_logs']
                                                        }
                                                        style={{
                                                            background:
                                                                '#2c45a8',
                                                            padding:
                                                                '10px 12px',
                                                            borderRadius: 5,
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: 'white',
                                                                fontWeight:
                                                                    'bold',
                                                            }}
                                                        >
                                                            C
                                                        </span>
                                                    </a>
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: 'center',
                                                        maxWidth: 100,
                                                    }}
                                                >
                                                    {value['last_updated']}
                                                </td>
                                                <td>
                                                    Connection{' '}
                                                    {value['connection_id']}
                                                </td>
                                                <td
                                                    style={{
                                                        maxWidth: 200,
                                                    }}
                                                >
                                                    Version {value['version']}
                                                </td>
                                                {value['username'] ? (
                                                    <td
                                                        style={{
                                                            width: 100,
                                                        }}
                                                    >
                                                        {value['username']}
                                                    </td>
                                                ) : (
                                                    <td
                                                        style={{
                                                            color: '#888888',
                                                        }}
                                                    >
                                                        No username
                                                    </td>
                                                )}
                                                <Button
                                                    onClick={() =>
                                                        this.deleteLogs(
                                                            value[
                                                                'connection_id'
                                                            ]
                                                        )
                                                    }
                                                    style={{
                                                        marginLeft: 40,
                                                        color: '#111111',
                                                        background: 'none',
                                                        border: 'none',
                                                        fontSize: 14,
                                                        position: 'relative',
                                                        top: 10,
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </Button>
                                            </tr>
                                        )
                                    })}
                            </table>
                            {this.props.logs &&
                            Math.min(20, this.state.last_index) <
                                this.props.logs.length ? (
                                <div
                                    style={{
                                        marginTop: 20,
                                        color: '#5ec3eb',
                                    }}
                                    className="pointerOnHover"
                                    onClick={() =>
                                        this.setState({
                                            last_index:
                                                this.state.last_index + 20,
                                        })
                                    }
                                >
                                    Load More Logs
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        logs: state.AccountReducer.logs ? state.AccountReducer.logs : [],
        access_token: state.AccountReducer.access_token,
        logs_fetched: state.AccountReducer.logs_fetched
            ? state.AccountReducer.logs_fetched
            : false,
        logs_not_found: state.AccountReducer.logs_not_found
            ? state.AccountReducer.logs_not_found
            : false,
    }
}

export default connect(mapStateToProps)(Logs)
