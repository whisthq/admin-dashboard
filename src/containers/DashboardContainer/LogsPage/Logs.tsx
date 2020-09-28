import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
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
} from '../../../actions/index'

import { config } from '../../../constants'

import LogEntry from './components/LogEntry'

export class Logs extends React.Component<any, any> {
    constructor(props: any) {
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
        let component = this
        this.setState({ processing: false }, function () {
            component.props.dispatch(storeBookmarkedLogs([]))
            component.props.dispatch(fetchUserActivity())
            component.props.dispatch(logsFound(false))
            component.props.dispatch(changePage('logs'))
            component.props.dispatch(fetchBookmarkedLogs())

            var connection_id = component.props.location.search
            connection_id = connection_id.substring(1, connection_id.length)
            if (connection_id && connection_id !== '') {
                component.props.dispatch(
                    fetchLogsByConnection(connection_id, true, false, true)
                )
                component.setState({ processing: true })
            } else {
                component.searchAllUsers()
            }
        })
    }

    componentDidUpdate(prevProps: { bookmarked_log_ids: any }) {
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
            rendered_logs.forEach(function (element: any) {
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

    deleteUser = (user: any) => {
        this.props.dispatch(deleteUser(user))
    }

    updateUser = (evt: { target: { value: any } }) => {
        this.setState({
            username: evt.target.value,
        })
    }

    searchUser = () => {
        this.props.dispatch(fetchLogs(this.state.username, true, false))
        this.setState({ processing: true, last_index: 20 })
    }

    searchUserKey = (evt: { key: string }) => {
        if (evt.key === 'Enter' && !this.state.processing) {
            this.searchUser()
        }
    }

    searchAllUsers = () => {
        this.props.dispatch(fetchLogs(this.state.username, true, true))
        this.setState({ processing: true })
    }

    deleteLogs = (connection_id: any) => {
        this.props.dispatch(deleteLogs(connection_id))
    }

    flatMap = (array: string | any[], fn: (arg0: any) => any) => {
        var result: any[] = []
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

        rendered_logs.forEach(function (element: {
            connection_id: any
            user_id: any
            server_logs: any
            client_logs: any
        }) {
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

    copyLink = (connection_id: string) => {
        navigator.clipboard.writeText(
            config.url.WEBSITE_URL.concat('/admin/logs?').concat(connection_id)
        )
    }

    bookmarkLogs = (connection_id: { toString: () => any }) => {
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

        console.log(this.state.bookmarked_logs) // ok

        if (!this.state.load_bookmarked) {
            this.setState({ load_bookmarked: true, processing: true })
            this.props.dispatch(clearLogs())
            this.state.bookmarked_logs.forEach(function (
                connection_id: any,
                index: number
            ) {
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

    searchBar = () => {
        return (
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
        )
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
                {this.searchBar()}
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
                                    .map((value: any) => {
                                        return (
                                            <LogEntry
                                                value={value}
                                                log_analysis={
                                                    this.props.log_analysis
                                                }
                                                bookmarked_logs={
                                                    this.state.bookmarked_logs
                                                }
                                                bookmarkLogs={this.bookmarkLogs}
                                                copyLink={this.copyLink}
                                                deleteLogs={this.deleteLogs}
                                            />
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

function mapStateToProps(state: any) {
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
