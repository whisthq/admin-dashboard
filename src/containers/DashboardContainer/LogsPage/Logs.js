import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleNotch,
    faTrash,
    faClone,
    faStar,
} from '@fortawesome/free-solid-svg-icons'
import 'react-tabs/style/react-tabs.css'

import '../../../static/App.css'
import {
    fetchUserActivity,
    deleteUser,
    fetchLogs,
    fetchLogsByConnection,
    logsFound,
    deleteLogs,
    changePage,
    analyzeLogs,
    fetchBookmarkedLogs,
    storeBookmarkedLogs,
    bookmarkLogs,
    clearLogs,
} from '../../../actions/index.js'

import { config } from '../../../constants'

import MiniGraph from '../LogsPage/components/MiniGraph'
import LogDebugPanel from '../LogsPage/components/LogDebugPanel'

class Logs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            logsFetched: false,
            username: '',
            processing: false,
            last_index: 10,
            bookmarked_logs: [],
            load_bookmarked: false,
        }
    }

    componentDidMount() {
        this.setState({ processing: false }, function () {
            this.props.dispatch(storeBookmarkedLogs([]))
            this.props.dispatch(fetchUserActivity(false))
            this.props.dispatch(logsFound(false))
            this.props.dispatch(changePage('logs'))
            this.props.dispatch(fetchBookmarkedLogs())

            var connection_id = this.props.location.search
            connection_id = connection_id.substring(1, connection_id.length)
            if (connection_id && connection_id !== '') {
                this.props.dispatch(
                    fetchLogsByConnection(connection_id, true, false, true)
                )
                this.setState({ processing: true })
            } else {
                this.searchAllUsers()
            }
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
        if (this.props.logs_fetched && this.state.processing) {
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
                        element.user_id,
                        element.server_logs,
                        element.client_logs
                    )
                )
            })
        }

        if (
            JSON.stringify(this.props.bookmarked_log_ids) !==
            JSON.stringify(prevProps.bookmarked_log_ids)
        ) {
            this.setState({
                bookmarked_logs: [...new Set(this.props.bookmarked_log_ids)],
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
            component.state.last_index + 10
        )

        var rendered_logs = component.props.logs.slice(
            last_true_index - 10,
            last_true_index
        )

        rendered_logs.forEach(function (element) {
            component.props.dispatch(
                analyzeLogs(
                    element.connection_id,
                    element.user_id,
                    element.server_logs,
                    element.client_logs
                )
            )
        })

        this.setState({
            last_index: this.state.last_index + 10,
        })
    }

    copyLink = (connection_id) => {
        navigator.clipboard.writeText(
            config.url.WEBSITE_URL.concat('/admin/logs?').concat(connection_id)
        )
    }

    bookmarkLogs = (connection_id) => {
        connection_id = connection_id.toString()
        var bookmarked_logs_copy = []

        if (this.state.bookmarked_logs.includes(connection_id)) {
            this.props.dispatch(bookmarkLogs(false, connection_id))

            bookmarked_logs_copy = [...this.state.bookmarked_logs]

            const index = bookmarked_logs_copy.indexOf(connection_id)
            if (index !== -1) {
                bookmarked_logs_copy.splice(index, 1)
                this.setState({
                    bookmarked_logs: [...new Set(bookmarked_logs_copy)],
                })
            }
        } else {
            this.props.dispatch(bookmarkLogs(true, connection_id))

            bookmarked_logs_copy = [
                ...this.state.bookmarked_logs,
                connection_id,
            ]

            this.setState({
                bookmarked_logs: [...new Set(bookmarked_logs_copy)],
            })
        }
    }

    loadBookmarkedLogs = () => {
        let component = this
        console.log(this.state.bookmarked_logs)
        if (!this.state.load_bookmarked) {
            this.setState({ load_bookmarked: true, processing: true })
            this.props.dispatch(clearLogs())
            this.state.bookmarked_logs.forEach(function (connection_id, index) {
                if (index === component.state.bookmarked_logs.length - 1) {
                    component.props.dispatch(
                        fetchLogsByConnection(connection_id, true, false, true)
                    )
                } else {
                    component.props.dispatch(
                        fetchLogsByConnection(connection_id, true, false, false)
                    )
                }
            })
        } else {
            this.setState({ load_bookmarked: false })
            window.location.reload(false)
        }
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
                    <Button
                        disabled={this.state.processing}
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
                    <Button
                        disabled={this.state.processing}
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
                    <div
                        onClick={this.loadBookmarkedLogs}
                        style={{
                            display: 'inline',
                            position: 'absolute',
                            right: 200,
                        }}
                    >
                        <div
                            style={{
                                padding: '8px 20px',
                                color: '#555555',
                                background: 'rgba(132, 132, 138, 0.1)',
                                borderRadius: 3,
                                display: 'flex',
                                fontSize: 14,
                            }}
                        >
                            <Form.Check
                                type="checkbox"
                                checked={this.state.load_bookmarked}
                            />
                            <div
                                style={{
                                    marginLeft: 5,
                                }}
                            >
                                Show Starred
                            </div>
                        </div>
                    </div>
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
                                {this.state.processing && (
                                    <div
                                        style={{
                                            padding: 30,
                                            marginBottom: 20,
                                            maxWidth: 'calc(100% - 200px)',
                                            position: 'relative',
                                            height: '100%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCircleNotch}
                                            spin
                                            style={{
                                                marginRight: 10,
                                                fontSize: 24,
                                                color: '#111111',
                                                marginTop: 100,
                                            }}
                                        />
                                    </div>
                                )}
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
                                                    padding: 30,
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
                                                            width: 70,
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
                                                                    '8px 12px',
                                                                borderRadius: 3,
                                                                fontSize: 14,
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
                                                                Server
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 70,
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
                                                                    '8px 12px',
                                                                borderRadius: 3,
                                                                fontSize: 14,
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
                                                                Client
                                                            </span>
                                                        </a>
                                                    </div>
                                                    {value['user_id'] ? (
                                                        <div
                                                            style={{
                                                                width: 200,
                                                                fontWeight:
                                                                    'bold',
                                                                color:
                                                                    '#4636a6',
                                                                overflowX:
                                                                    'scroll',
                                                                fontSize: 13,
                                                                position:
                                                                    'relative',
                                                                bottom: 1,
                                                            }}
                                                        >
                                                            {value['user_id']}
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
                                                            width: 140,
                                                        }}
                                                    >
                                                        {value['last_updated']}
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 100,
                                                        }}
                                                    >
                                                        Conn.{' '}
                                                        {value['connection_id']}
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: 250,
                                                        }}
                                                    >
                                                        V. {value['version']}
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        float: 'right',
                                                        display: 'flex',
                                                        bottom: 50,
                                                        position: 'relative',
                                                        width: 250,
                                                    }}
                                                >
                                                    <div
                                                        onClick={() =>
                                                            this.bookmarkLogs(
                                                                value[
                                                                    'connection_id'
                                                                ]
                                                            )
                                                        }
                                                        className="pointerOnHover"
                                                        style={{
                                                            marginRight: 15,
                                                            position:
                                                                'relative',
                                                            background:
                                                                this.state
                                                                    .bookmarked_logs &&
                                                                this.state.bookmarked_logs.includes(
                                                                    value[
                                                                        'connection_id'
                                                                    ].toString()
                                                                )
                                                                    ? 'rgba(75, 59, 168, 0.1)'
                                                                    : '#f2f8ff',
                                                            padding: '7px 15px',
                                                            borderRadius: 3,
                                                            color: 'white',
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            style={{
                                                                fontSize: 13,
                                                                color:
                                                                    this.state
                                                                        .bookmarked_logs &&
                                                                    this.state.bookmarked_logs.includes(
                                                                        value[
                                                                            'connection_id'
                                                                        ].toString()
                                                                    )
                                                                        ? '#4b3ba8'
                                                                        : '#d5dae0',
                                                            }}
                                                            icon={faStar}
                                                        />
                                                    </div>
                                                    <div
                                                        onClick={() =>
                                                            this.copyLink(
                                                                value[
                                                                    'connection_id'
                                                                ]
                                                            )
                                                        }
                                                        className="pointerOnHover"
                                                        style={{
                                                            marginRight: 15,
                                                            position:
                                                                'relative',
                                                            background:
                                                                '#4b3ba8',
                                                            padding: '7px 15px',
                                                            borderRadius: 3,
                                                            color: 'white',
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            style={{
                                                                fontSize: 13,
                                                                marginRight: 10,
                                                                color: 'white',
                                                            }}
                                                            icon={faClone}
                                                        />
                                                        Copy Link
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
                                                            color: '#e8553f',
                                                            background:
                                                                'rgba(176, 37, 16, 0.1)',
                                                            border: 'none',
                                                            position:
                                                                'relative',
                                                            outline: 'none',
                                                            boxShadow: 'none',
                                                            borderRadius: 2,
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            style={{
                                                                fontSize: 13,
                                                            }}
                                                            icon={faTrash}
                                                        />
                                                    </Button>
                                                </div>
                                                <div
                                                    style={{ display: 'flex' }}
                                                >
                                                    <div>
                                                        <LogDebugPanel
                                                            log_analysis={
                                                                this.props
                                                                    .log_analysis
                                                            }
                                                            sender="server"
                                                            filename={
                                                                value[
                                                                    'server_logs'
                                                                ]
                                                            }
                                                            username={
                                                                value['user_id']
                                                                    ? value[
                                                                          'user_id'
                                                                      ]
                                                                    : ''
                                                            }
                                                            connection_id={
                                                                value[
                                                                    'connection_id'
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <LogDebugPanel
                                                            log_analysis={
                                                                this.props
                                                                    .log_analysis
                                                            }
                                                            sender="client"
                                                            filename={
                                                                value[
                                                                    'client_logs'
                                                                ]
                                                            }
                                                            username={
                                                                value['user_id']
                                                                    ? value[
                                                                          'user_id'
                                                                      ]
                                                                    : ''
                                                            }
                                                            connection_id={
                                                                value[
                                                                    'connection_id'
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <Row
                                                    style={{
                                                        marginTop: 20,
                                                    }}
                                                >
                                                    <Col lg={6} xl={3} sm={12}>
                                                        <MiniGraph
                                                            title="Avg. Encode Time"
                                                            log_analysis={
                                                                this.props
                                                                    .log_analysis
                                                            }
                                                            username={
                                                                value['user_id']
                                                                    ? value[
                                                                          'user_id'
                                                                      ]
                                                                    : ''
                                                            }
                                                            connection_id={
                                                                value[
                                                                    'connection_id'
                                                                ]
                                                            }
                                                            sender="server"
                                                            metric="encode_time"
                                                            filename={
                                                                value[
                                                                    'server_logs'
                                                                ]
                                                            }
                                                            unit="ms"
                                                            scale={1000}
                                                        />
                                                    </Col>
                                                    <Col lg={6} xl={3} sm={12}>
                                                        <MiniGraph
                                                            title="Avg. Encode Size"
                                                            log_analysis={
                                                                this.props
                                                                    .log_analysis
                                                            }
                                                            username={
                                                                value['user_id']
                                                                    ? value[
                                                                          'user_id'
                                                                      ]
                                                                    : ''
                                                            }
                                                            connection_id={
                                                                value[
                                                                    'connection_id'
                                                                ]
                                                            }
                                                            sender="server"
                                                            metric="encode_size"
                                                            filename={
                                                                value[
                                                                    'server_logs'
                                                                ]
                                                            }
                                                            unit="bytes"
                                                            scale={1}
                                                        />
                                                    </Col>
                                                    <Col lg={6} xl={3} sm={12}>
                                                        <MiniGraph
                                                            title="Avg. Decode Time"
                                                            log_analysis={
                                                                this.props
                                                                    .log_analysis
                                                            }
                                                            username={
                                                                value['user_id']
                                                                    ? value[
                                                                          'user_id'
                                                                      ]
                                                                    : ''
                                                            }
                                                            connection_id={
                                                                value[
                                                                    'connection_id'
                                                                ]
                                                            }
                                                            sender="client"
                                                            metric="decode_time"
                                                            filename={
                                                                value[
                                                                    'client_logs'
                                                                ]
                                                            }
                                                            unit="ms"
                                                            scale={1000}
                                                        />
                                                    </Col>
                                                    <Col lg={6} xl={3} sm={12}>
                                                        <MiniGraph
                                                            title="Client Latency"
                                                            log_analysis={
                                                                this.props
                                                                    .log_analysis
                                                            }
                                                            username={
                                                                value['user_id']
                                                                    ? value[
                                                                          'user_id'
                                                                      ]
                                                                    : ''
                                                            }
                                                            connection_id={
                                                                value[
                                                                    'connection_id'
                                                                ]
                                                            }
                                                            sender="client"
                                                            metric="latency"
                                                            filename={
                                                                value[
                                                                    'client_logs'
                                                                ]
                                                            }
                                                            unit="ms"
                                                            scale={1000}
                                                        />
                                                    </Col>
                                                </Row>
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
                                        color: '#4636a6',
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
        bookmarked_log_ids: state.AccountReducer.bookmarked_log_ids,
    }
}

export default connect(mapStateToProps)(Logs)
