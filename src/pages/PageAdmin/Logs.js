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
    analyzeLogs,
} from '../../actions/index.js'

import MiniGraph from 'pages/PageAdmin/containers/MiniGraph'
import { FaThinkPeaks } from 'react-icons/fa'

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
        this.setState({ processing: false }, function () {
            this.props.dispatch(fetchUserActivity(false))
            this.props.dispatch(logsFound(false))
            this.props.dispatch(changePage('logs'))
            this.searchAllUsers()
        })
    }

    componentDidUpdate(prevProps) {
        let component = this
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
            var last_index = Math.min(
                this.props.logs.length,
                this.state.last_index
            )
            var rendered_logs = this.props.logs.slice(0, last_index)
            rendered_logs.forEach(function (element) {
                component.props.dispatch(
                    analyzeLogs(
                        element.connection_id,
                        element.username,
                        element.server_logs,
                        element.client_logs
                    )
                )
            })
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

    loadMoreLogs = () => {
        let component = this

        var last_true_index = Math.min(
            component.props.logs.length,
            component.state.last_index + 20
        )
        console.log('fetching logs from')
        console.log(last_true_index)
        var rendered_logs = component.props.logs.slice(
            last_true_index - 20,
            last_true_index
        )
        console.log(rendered_logs)
        rendered_logs.forEach(function (element) {
            component.props.dispatch(
                analyzeLogs(
                    element.connection_id,
                    element.username,
                    element.server_logs,
                    element.client_logs
                )
            )
        })

        this.setState({
            last_index: this.state.last_index + 20,
        })
    }

    render() {
        let format = 'MMM Do'
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
                            No logs found! Try again.
                        </div>
                    ) : (
                        <div
                            style={{
                                maxHeight: 600,
                                overflowY: 'scroll',
                                marginTop: 25,
                            }}
                        >
                            <div style={{ width: '100%' }}>
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
                                            <div
                                                style={{
                                                    background: 'white',
                                                    borderRadius: 5,
                                                    padding: 20,
                                                    marginBottom: 20,
                                                    maxWidth:
                                                        'calc(100% - 200px)',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: 12,
                                                        height: 50,
                                                        padding: 10,
                                                        paddingBottom: 20,
                                                        key: 'logs',
                                                        width: '100%',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: 45,
                                                        }}
                                                    >
                                                        <a
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            href={
                                                                value[
                                                                    'server_logs'
                                                                ]
                                                            }
                                                            style={{
                                                                background:
                                                                    '#4b3ba8',
                                                                padding:
                                                                    '10px 12px',
                                                                borderRadius: 3,
                                                                fontWeight:
                                                                    'bold',
                                                                opacity: value[
                                                                    'server_logs'
                                                                ]
                                                                    ? 1.0
                                                                    : 0.25,
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color:
                                                                        'white',
                                                                    fontWeight:
                                                                        'bold',
                                                                }}
                                                            >
                                                                S
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 45,
                                                            marginRight: 10,
                                                        }}
                                                    >
                                                        <a
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            href={
                                                                value[
                                                                    'client_logs'
                                                                ]
                                                            }
                                                            style={{
                                                                background:
                                                                    '#2c45a8',
                                                                padding:
                                                                    '10px 12px',
                                                                borderRadius: 3,
                                                                fontWeight:
                                                                    'bold',
                                                                opacity: value[
                                                                    'client_logs'
                                                                ]
                                                                    ? 1.0
                                                                    : 0.25,
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color:
                                                                        'white',
                                                                    fontWeight:
                                                                        'bold',
                                                                }}
                                                            >
                                                                C
                                                            </span>
                                                        </a>
                                                    </div>
                                                    {value['username'] ? (
                                                        <div
                                                            style={{
                                                                width: 200,
                                                                overflowX:
                                                                    'scroll',
                                                            }}
                                                        >
                                                            {value['username']}
                                                        </div>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                color:
                                                                    '#888888',
                                                                width: 200,
                                                                overflowX:
                                                                    'scroll',
                                                            }}
                                                        >
                                                            No username
                                                        </div>
                                                    )}
                                                    <div
                                                        style={{
                                                            textAlign: 'left',
                                                            width: 150,
                                                        }}
                                                    >
                                                        {value['last_updated']}
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 150,
                                                        }}
                                                    >
                                                        Conn.{' '}
                                                        {value['connection_id']}
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 200,
                                                        }}
                                                    >
                                                        V. {value['version']}
                                                    </div>
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
                                                            position:
                                                                'relative',
                                                            bottom: 5,
                                                            outline: 'none',
                                                            boxShadow: 'none',
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </Button>
                                                </div>
                                                <div
                                                    style={{ display: 'flex' }}
                                                >
                                                    <MiniGraph
                                                        title="Avg. Encode Time"
                                                        log_analysis={
                                                            this.props
                                                                .log_analysis
                                                        }
                                                        username={
                                                            value['username']
                                                        }
                                                        connection_id={
                                                            value[
                                                                'connection_id'
                                                            ]
                                                        }
                                                        sender="server"
                                                        metric="encode_time"
                                                        filename={
                                                            value['server_logs']
                                                        }
                                                        unit="ms"
                                                    />
                                                    <MiniGraph
                                                        title="Avg. Decode Time"
                                                        log_analysis={
                                                            this.props
                                                                .log_analysis
                                                        }
                                                        username={
                                                            value['username']
                                                        }
                                                        connection_id={
                                                            value[
                                                                'connection_id'
                                                            ]
                                                        }
                                                        sender="client"
                                                        metric="decode_time"
                                                        filename={
                                                            value['client_logs']
                                                        }
                                                        unit="ms"
                                                    />
                                                    <MiniGraph
                                                        title="Avg. Encode Size"
                                                        log_analysis={
                                                            this.props
                                                                .log_analysis
                                                        }
                                                        username={
                                                            value['username']
                                                        }
                                                        connection_id={
                                                            value[
                                                                'connection_id'
                                                            ]
                                                        }
                                                        sender="server"
                                                        metric="encode_size"
                                                        filename={
                                                            value['server_logs']
                                                        }
                                                        unit="bytes"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                            {this.props.logs &&
                            Math.min(20, this.state.last_index) <
                                this.props.logs.length ? (
                                <div
                                    style={{
                                        marginTop: 20,
                                        color: '#5ec3eb',
                                    }}
                                    className="pointerOnHover"
                                    onClick={this.loadMoreLogs}
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
    console.log(state.AccountReducer.log_analysis)
    return {
        logs: state.AccountReducer.logs ? state.AccountReducer.logs : [],
        access_token: state.AccountReducer.access_token,
        logs_fetched: state.AccountReducer.logs_fetched
            ? state.AccountReducer.logs_fetched
            : false,
        logs_not_found: state.AccountReducer.logs_not_found
            ? state.AccountReducer.logs_not_found
            : false,
        log_analysis: state.AccountReducer.log_analysis,
    }
}

export default connect(mapStateToProps)(Logs)
