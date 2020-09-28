import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleNotch,
    faExclamation,
    faCheck,
} from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup'

import 'react-tabs/style/react-tabs.css'

import '../../../../static/App.css'

export class LogDebugPanel extends React.Component<any, any> {
    render() {
        // these exist for readability
        let filename = this.props.filename
        let log_analysis = this.props.log_analysis
        let sender = this.props.sender
        let username = this.props.username
        let connection_id = this.props.connection_id

        let query_by = username.concat('_', connection_id)

        if (
            !filename ||
            (log_analysis &&
                log_analysis[query_by] &&
                log_analysis[query_by][sender] &&
                log_analysis[query_by][sender].debug)
        ) {
            if (!filename) {
                return (
                    <div
                        style={{
                            marginLeft: 10,
                            display: 'inline-block',
                            padding: '8px 20px',
                            color: '#555555',
                            background: 'rgba(132, 132, 138, 0.1)',
                            fontSize: 13,
                            borderRadius: 3,
                            marginBottom: 10,
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faExclamation}
                            style={{
                                marginRight: 10,
                                fontSize: 12,
                            }}
                        />
                        No {sender} logs
                    </div>
                )
            } else if (
                !log_analysis[query_by][sender].debug ||
                log_analysis[query_by][sender].debug.number_of_errors === 0
            ) {
                return (
                    <div
                        style={{
                            marginLeft: 10,
                            display: 'inline-block',
                            padding: '8px 20px',
                            color: '#31de4b',
                            background: 'rgba(49, 222, 75, 0.1)',
                            fontSize: 13,
                            borderRadius: 3,
                            marginBottom: 10,
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faCheck}
                            style={{
                                marginRight: 10,
                                fontSize: 12,
                            }}
                        />
                        No {sender} errors
                    </div>
                )
            } else {
                return (
                    <Popup
                        trigger={
                            <div
                                style={{
                                    marginLeft: 10,
                                    display: 'inline-block',
                                    padding: '8px 20px',
                                    color: '#f5792c',
                                    background: 'rgba(245, 121, 44, 0.1)',
                                    fontSize: 13,
                                    borderRadius: 3,
                                    marginBottom: 10,
                                }}
                                className="pointerOnHover"
                            >
                                <FontAwesomeIcon
                                    icon={faExclamation}
                                    style={{
                                        marginRight: 10,
                                        fontSize: 12,
                                    }}
                                />
                                {
                                    log_analysis[
                                        username.concat('_', connection_id)
                                    ][sender].debug.number_of_errors
                                }{' '}
                                {sender} error(s) (
                                {(
                                    log_analysis[
                                        username.concat('_', connection_id)
                                    ][sender].debug.error_rate * 100
                                )
                                    .toFixed(2)
                                    .toString()}{' '}
                                % error rate)
                            </div>
                        }
                        modal
                        contentStyle={{
                            width: 600,
                            borderRadius: 5,
                            backgroundColor: 'white',
                            border: 'none',
                            height: 500,
                            padding: 30,
                            textAlign: 'left',
                            overflowY: 'scroll',
                            overflowX: 'scroll',
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    marginBottom: 15,
                                    fontSize: 18,
                                }}
                            >
                                {sender.charAt(0).toUpperCase() +
                                    sender.slice(1)}{' '}
                                Errors
                            </div>
                            {log_analysis[username.concat('_', connection_id)][
                                sender
                            ].debug.errors.map(function (
                                value: any,
                                _index: any
                            ) {
                                return <div>{value}</div>
                            })}
                        </div>
                    </Popup>
                )
            }
        } else {
            return (
                <div
                    style={{
                        paddingLeft: 10,
                    }}
                >
                    <div
                        style={{
                            fontWeight: 'bold',
                            marginBottom: 10,
                            marginTop: 10,
                        }}
                    >
                        {this.props.title}
                    </div>
                    <div style={{ fontSize: 13 }}>
                        <FontAwesomeIcon
                            icon={faCircleNotch}
                            spin
                            style={{
                                marginRight: 10,
                                fontSize: 12,
                                color: '#4b3ba8',
                            }}
                        />
                        Scanning {sender} logs for errors
                    </div>
                </div>
            )
        }
    }
}

export default LogDebugPanel
