import React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MiniGraph from './MiniGraph'
import LogDebugPanel from './LogDebugPanel'

import { faTrash, faClone, faStar } from '@fortawesome/free-solid-svg-icons'

/*
I encourage you to think of LogEntry as an extension of the file Logs. It exists as a seperate file for readability.
That said, noting that it takes in various callbacks that are logs properties in...

As props it takes in bookmarked logs, bookmarkLogs (a function), copyLink (a function), deleteLogs (a function),
and log_analysis
*/
export class LogEntry extends React.Component<any, any> {
    // creates a raw logs link that can be clicked to view the raw logs txt
    // if it exists (and is purple);
    // otherwise, will have opacity and take you nowhere
    // current options: (Client, client_logs), (Server, server_logs)
    rawLogsLink = (text: string, props_value_query: string) => {
        return (
            <div
                style={{
                    width: 70,
                    marginRight: 10,
                }}
            >
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.props.value[props_value_query]}
                    style={{
                        background: '#2c45a8',
                        padding: '8px 12px',
                        borderRadius: 3,
                        fontSize: 14,
                        opacity: this.props.value[props_value_query]
                            ? 1.0
                            : 0.25,
                    }}
                >
                    <span
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        {text}
                    </span>
                </a>
            </div>
        )
    }

    // username text will display 'no username' if there is no username and a username in bold otherwise
    usernameText = () => {
        return this.props.value['user_id'] ? (
            <div
                style={{
                    width: 200,
                    fontWeight: 'bold',
                    color: '#4636a6',
                    overflowX: 'scroll',
                    fontSize: 13,
                    position: 'relative',
                    bottom: 1,
                }}
            >
                {this.props.value['user_id']}
            </div>
        ) : (
            <div
                style={{
                    color: '#888888',
                    width: 200,
                    overflowX: 'scroll',
                }}
            >
                No username
            </div>
        )
    }

    render() {
        return (
            <div
                style={{
                    background: 'white',
                    borderRadius: 5,
                    padding: 30,
                    marginBottom: 20,
                    maxWidth: 'calc(100% - 200px)',
                }}
            >
                <div
                    style={{
                        fontSize: 12,
                        height: 50,
                        padding: 10,
                        paddingBottom: 20,
                        width: '100%',
                        display: 'flex',
                    }}
                >
                    {this.rawLogsLink('Server', 'server_logs')}
                    {this.rawLogsLink('Client', 'client_logs')}
                    {this.usernameText()}
                    <div
                        style={{
                            textAlign: 'left',
                            width: 140,
                        }}
                    >
                        {this.props.value['last_updated']}
                    </div>
                    <div
                        style={{
                            width: 100,
                        }}
                    >
                        Conn. {this.props.value['connection_id']}
                    </div>
                    <div
                        style={{
                            width: 250,
                        }}
                    >
                        V. {this.props.value['version']}
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
                            this.props.bookmarkLogs(
                                this.props.value['connection_id']
                            )
                        }
                        className="pointerOnHover"
                        style={{
                            marginRight: 15,
                            position: 'relative',
                            background:
                                this.props.bookmarked_logs &&
                                this.props.bookmarked_logs.includes(
                                    this.props.value['connection_id'].toString()
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
                                    this.props.bookmarked_logs &&
                                    this.props.bookmarked_logs.includes(
                                        this.props.value[
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
                            this.props.copyLink(
                                this.props.value['connection_id']
                            )
                        }
                        className="pointerOnHover"
                        style={{
                            marginRight: 15,
                            position: 'relative',
                            background: '#4b3ba8',
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
                            this.props.deleteLogs(
                                this.props.value['connection_id']
                            )
                        }
                        style={{
                            color: '#e8553f',
                            background: 'rgba(176, 37, 16, 0.1)',
                            border: 'none',
                            position: 'relative',
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
                <div style={{ display: 'flex' }}>
                    <div>
                        <LogDebugPanel
                            log_analysis={this.props.log_analysis}
                            sender="server"
                            filename={this.props.value['server_logs']}
                            username={
                                this.props.value['user_id']
                                    ? this.props.value['user_id']
                                    : ''
                            }
                            connection_id={this.props.value['connection_id']}
                        />
                    </div>
                    <div>
                        <LogDebugPanel
                            log_analysis={this.props.log_analysis}
                            sender="client"
                            filename={this.props.value['client_logs']}
                            username={
                                this.props.value['user_id']
                                    ? this.props.value['user_id']
                                    : ''
                            }
                            connection_id={this.props.value['connection_id']}
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
                            log_analysis={this.props.log_analysis}
                            username={
                                this.props.value['user_id']
                                    ? this.props.value['user_id']
                                    : ''
                            }
                            connection_id={this.props.value['connection_id']}
                            sender="server"
                            metric="encode_time"
                            filename={this.props.value['server_logs']}
                            unit="ms"
                            scale={1000}
                        />
                    </Col>
                    <Col lg={6} xl={3} sm={12}>
                        <MiniGraph
                            title="Avg. Encode Size"
                            log_analysis={this.props.log_analysis}
                            username={
                                this.props.value['user_id']
                                    ? this.props.value['user_id']
                                    : ''
                            }
                            connection_id={this.props.value['connection_id']}
                            sender="server"
                            metric="encode_size"
                            filename={this.props.value['server_logs']}
                            unit="bytes"
                            scale={1}
                        />
                    </Col>
                    <Col lg={6} xl={3} sm={12}>
                        <MiniGraph
                            title="Avg. Decode Time"
                            log_analysis={this.props.log_analysis}
                            username={
                                this.props.value['user_id']
                                    ? this.props.value['user_id']
                                    : ''
                            }
                            connection_id={this.props.value['connection_id']}
                            sender="client"
                            metric="decode_time"
                            filename={this.props.value['client_logs']}
                            unit="ms"
                            scale={1000}
                        />
                    </Col>
                    <Col lg={6} xl={3} sm={12}>
                        <MiniGraph
                            title="Client Latency"
                            log_analysis={this.props.log_analysis}
                            username={
                                this.props.value['user_id']
                                    ? this.props.value['user_id']
                                    : ''
                            }
                            connection_id={this.props.value['connection_id']}
                            sender="client"
                            metric="latency"
                            filename={this.props.value['client_logs']}
                            unit="ms"
                            scale={1000}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        access_token: state.AccountReducer.access_token,
        logs_fetched: state.AccountReducer.logs_fetched
            ? state.AccountReducer.logs_fetched
            : false,
        logs_not_found: state.AccountReducer.logs_not_found
            ? state.AccountReducer.logs_not_found
            : false,
    }
}

export default connect(mapStateToProps)(LogEntry)
