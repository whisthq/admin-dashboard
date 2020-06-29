import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleNotch,
    faExclamation,
    faCheck,
} from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup'

import 'react-tabs/style/react-tabs.css'

import 'static/App.css'

class LogDebugPanel extends Component {
    render() {
        if (
            !this.props.filename ||
            (this.props.log_analysis &&
                this.props.log_analysis[
                    this.props.username.concat('_', this.props.connection_id)
                ] &&
                this.props.log_analysis[
                    this.props.username.concat('_', this.props.connection_id)
                ][this.props.sender] &&
                this.props.log_analysis[
                    this.props.username.concat('_', this.props.connection_id)
                ][this.props.sender].debug)
        ) {
            if (!this.props.filename) {
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
                        No {this.props.sender} logs
                    </div>
                )
            } else if (
                !this.props.log_analysis[
                    this.props.username.concat('_', this.props.connection_id)
                ][this.props.sender].debug ||
                this.props.log_analysis[
                    this.props.username.concat('_', this.props.connection_id)
                ][this.props.sender].debug.number_of_errors === 0
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
                        No {this.props.sender} errors
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
                                    this.props.log_analysis[
                                        this.props.username.concat(
                                            '_',
                                            this.props.connection_id
                                        )
                                    ][this.props.sender].debug.number_of_errors
                                }{' '}
                                {this.props.sender} error(s) (
                                {(
                                    this.props.log_analysis[
                                        this.props.username.concat(
                                            '_',
                                            this.props.connection_id
                                        )
                                    ][this.props.sender].debug.error_rate * 100
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
                                {this.props.sender.charAt(0).toUpperCase() +
                                    this.props.sender.slice(1)}{' '}
                                Errors
                            </div>
                            {this.props.log_analysis[
                                this.props.username.concat(
                                    '_',
                                    this.props.connection_id
                                )
                            ][this.props.sender].debug.errors.map(function (
                                value,
                                index
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
                        Scanning {this.props.sender} logs for errors
                    </div>
                </div>
            )
        }
    }
}

export default LogDebugPanel
