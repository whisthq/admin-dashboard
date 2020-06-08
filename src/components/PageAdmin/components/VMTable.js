import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ToggleButton from 'react-toggle-button'
import {
    faCircleNotch,
    faPlay,
    faPause,
} from '@fortawesome/free-solid-svg-icons'

import {
    startVM,
    deallocateVM,
    updateDB,
    setDev,
} from '../../../actions/index.js'

import Style from '../../../styles/components/pageAdmin.module.css'

import '../../../static/App.css'

class VMTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            sortBy: 'vm_name',
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    // intervalID var to keep track of auto-refreshing across functions
    intervalID

    componentDidMount() {
        this.updateWindowDimensions()
        this.props.dispatch(updateDB(false))

        // refresh the VM table every 60 seconds
        this.intervalID = setInterval(this.getUpdatedDatabase.bind(this), 60000)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)

        // stop auto-refreshing
        clearInterval(this.intervalID)
    }

    getUpdatedDatabase() {
        this.props.dispatch(updateDB(false))
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    startVM = (vm_name) => {
        this.props.dispatch(startVM(vm_name))
    }

    deallocateVM = (vm_name) => {
        this.props.dispatch(deallocateVM(vm_name))
    }

    toggleDev = (mode: any, vm_name) => {
        this.props.dispatch(setDev(vm_name, !mode))
    }

    sortArray = (prop) => {
        return function (a, b) {
            if (a[prop] === null) {
                return 1
            }
            if (b[prop] === null) {
                return -1
            }

            var a_temp = a[prop].toString().toLowerCase()
            var b_temp = b[prop].toString().toLowerCase()
            if (a_temp > b_temp) {
                return 1
            } else if (a_temp < b_temp) {
                return -1
            }

            return 0
        }
    }

    unixToDate = (unix) => {
        if (unix && unix > 0) {
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(unix * 1000)
            // Hours part from the timestamp
            var hours = date.getHours()
            // Minutes part from the timestamp
            var minutes = '0' + date.getMinutes()
            // Seconds part from the timestamp
            var seconds = '0' + date.getSeconds()

            // Will display time in 10:30:23 format
            var formattedTime =
                hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)

            const milliseconds = unix * 1000
            const dateObject = new Date(milliseconds)
            const humanDateFormat = dateObject
                .toLocaleString('en-US')
                .split(',')[0]
            var dateArr = humanDateFormat.split('/')
            const month = dateArr[0].toString()
            var finalDate =
                month +
                '/' +
                dateArr[1].toString() +
                '/' +
                dateArr[2].toString()
            return finalDate + ', ' + formattedTime
        } else {
            return "Never Winlogon'ed"
        }
    }

    setSortBy = (type) => {
        this.setState({ sortBy: type })
        console.log('set sort by ' + type)
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false })
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose()
        }
        var header = []
        if (this.props.vm_info.length > 0) {
            Object.keys(this.props.vm_info[0]).forEach(function (key) {
                header.push(key)
            })
        }
        header.reverse()

        const vmButton = (state, vm_name, lock) => {
            const intermediate_states = [
                'DEALLOCATING',
                'STARTING',
                'ATTACHING',
                'STOPPING',
            ]
            if (
                this.props.vms_updating.includes(vm_name) &&
                intermediate_states.includes(state)
            ) {
                return (
                    <td
                        style={{
                            paddingLeft: 20,
                            paddingRight: 30,
                            fontSize: 11,
                        }}
                        className="pointerOnHover"
                    >
                        <FontAwesomeIcon
                            icon={faCircleNotch}
                            spin
                            style={{ color: '#111111' }}
                        />
                    </td>
                )
            } else if (
                (state === 'STOPPED' || state === 'DEALLOCATED') &&
                !lock
            ) {
                return (
                    <td
                        onClick={() => this.startVM(vm_name)}
                        style={{
                            paddingLeft: 20,
                            paddingRight: 30,
                            fontSize: 11,
                        }}
                        className="pointerOnHover"
                    >
                        <FontAwesomeIcon
                            icon={faPlay}
                            style={{ color: '#961418' }}
                        />
                    </td>
                )
            } else if (state === 'RUNNING_AVAILABLE' && !lock) {
                return (
                    <td
                        onClick={() => this.deallocateVM(vm_name)}
                        style={{
                            paddingLeft: 20,
                            paddingRight: 30,
                            fontSize: 11,
                        }}
                        className="pointerOnHover"
                    >
                        <FontAwesomeIcon
                            icon={faPause}
                            style={{ color: '#1ac447' }}
                        />
                    </td>
                )
            }
        }

        return (
            <div>
                {this.props.vmsUpdated ? (
                    <div
                        style={{
                            maxHeight: 600,
                            overflowY: 'scroll',
                            width: '100%',
                            display: 'block',
                        }}
                    >
                        <div
                            style={{
                                background: 'none',
                                display: 'flex',
                                marginBottom: 20,
                            }}
                        >
                            <div
                                style={{
                                    height: 18,
                                    width: 18,
                                    position: 'relative',
                                    top: 4,
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(171, 235, 235, 0.6)',
                                }}
                            ></div>
                            <div style={{ marginLeft: 10, marginRight: 10 }}>
                                {' '}
                                Dev Mode{' '}
                            </div>
                            <div
                                style={{
                                    height: 18,
                                    width: 18,
                                    position: 'relative',
                                    top: 4,
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(242, 181, 179, 0.2)',
                                }}
                            ></div>
                            <div style={{ marginLeft: 10, marginRight: 10 }}>
                                {' '}
                                Locked{' '}
                            </div>
                            <div
                                style={{
                                    height: 18,
                                    width: 18,
                                    position: 'relative',
                                    top: 4,
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(193, 245, 174, 0.2)',
                                }}
                            ></div>
                            <div style={{ marginLeft: 10, marginRight: 10 }}>
                                {' '}
                                Unlocked{' '}
                            </div>
                            <FontAwesomeIcon
                                icon={faPlay}
                                style={{
                                    fontSize: 14,
                                    position: 'relative',
                                    top: 5,
                                    marginLeft: 10,
                                    borderRadius: 2,
                                    color: '#961418',
                                }}
                            />
                            <div style={{ marginLeft: 10, marginRight: 10 }}>
                                {' '}
                                Powered off (click to start){' '}
                            </div>
                            <FontAwesomeIcon
                                icon={faPause}
                                style={{
                                    fontSize: 14,
                                    position: 'relative',
                                    top: 5,
                                    marginLeft: 10,
                                    borderRadius: 2,
                                    color: '#1ac447',
                                }}
                            />
                            <div style={{ marginLeft: 10, marginRight: 10 }}>
                                {' '}
                                Powered on (click to deallocate){' '}
                            </div>
                        </div>
                        <table
                            style={{
                                backgroundColor: '#FFFFFF',
                                width: '100%',
                                boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.20)',
                            }}
                        >
                            <tr
                                style={{
                                    color: 'white',
                                    backgroundColor: '#1e1f36',
                                    fontSize: 13,
                                    textAlign: 'left',
                                    key: 'vm-header',
                                }}
                            >
                                <th></th>
                                <th>dev</th>
                                {header.map((value, index) => {
                                    if (value !== 'dev') {
                                        return (
                                            <th
                                                style={{ padding: 20 }}
                                                name={value}
                                                onClick={() =>
                                                    this.setSortBy(value)
                                                }
                                                className={
                                                    this.state.sortBy === value
                                                        ? Style.tableHeadFocus
                                                        : Style.tableHead
                                                }
                                            >
                                                {value}
                                            </th>
                                        )
                                    }
                                    return <th style={{ width: 0 }}></th>
                                })}
                            </tr>
                            {this.props.vm_info
                                .sort(this.sortArray(this.state.sortBy))
                                .map((value, index) => (
                                    <tr
                                        style={{
                                            borderTop: 'solid 0.5px #EBEBEB',
                                            color: '#333333',
                                            fontSize: 12,
                                            key: 'vm-body',
                                            backgroundColor: value['dev']
                                                ? 'rgba(171, 235, 235, 0.3)'
                                                : value['lock'] ||
                                                  Number(
                                                      value['temporary_lock']
                                                  ) >
                                                      Math.round(
                                                          new Date().getTime() /
                                                              1000
                                                      )
                                                ? 'rgba(242, 181, 179, 0.2)'
                                                : 'rgba(193, 245, 174, 0.2)',
                                        }}
                                        key={index}
                                    >
                                        <td>
                                            {vmButton(
                                                value['state'],
                                                value['vm_name'],
                                                value['lock']
                                            )}
                                        </td>
                                        <td style={{ paddingRight: 15 }}>
                                            <ToggleButton
                                                value={value['dev']}
                                                onToggle={(mode) =>
                                                    this.toggleDev(
                                                        mode,
                                                        value['vm_name']
                                                    )
                                                }
                                                colors={{
                                                    active: {
                                                        base: '#5EC4EB',
                                                    },
                                                    inactive: {
                                                        base: '#161936',
                                                    },
                                                }}
                                            />
                                        </td>
                                        {header.map((value1, index1) => {
                                            if (value1 !== 'dev') {
                                                if (
                                                    value1 ===
                                                        'ready_to_connect' ||
                                                    value1 === 'temporary_lock'
                                                ) {
                                                    return (
                                                        <td
                                                            style={{
                                                                paddingLeft: 20,
                                                                paddingTop: 10,
                                                                paddingBottom: 10,
                                                            }}
                                                        >
                                                            {value[value1] ==
                                                            null ? (
                                                                <div></div>
                                                            ) : (
                                                                <div>
                                                                    {this.unixToDate(
                                                                        value[
                                                                            value1
                                                                        ]
                                                                    ).toString()}
                                                                </div>
                                                            )}
                                                        </td>
                                                    )
                                                }
                                                return (
                                                    <td
                                                        className={
                                                            Style.tableCell
                                                        }
                                                    >
                                                        {value[value1] ==
                                                        null ? (
                                                            <div />
                                                        ) : (
                                                            <div>
                                                                {value[
                                                                    value1
                                                                ].toString()}
                                                            </div>
                                                        )}
                                                    </td>
                                                )
                                            }
                                            return (
                                                <th style={{ width: 0 }}></th>
                                            )
                                        })}
                                    </tr>
                                ))}
                        </table>
                    </div>
                ) : (
                    <div className={Style.spinnerContainer}>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <FontAwesomeIcon
                                icon={faCircleNotch}
                                spin
                                style={{
                                    color: '#1e1f36',
                                    margin: 'auto',
                                    marginTop: 220,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        vm_info: state.AccountReducer.vm_info
            ? state.AccountReducer.vm_info.reverse()
            : [],
        vmsUpdated: state.AccountReducer.vmsUpdated,
        vms_updating: state.AccountReducer.vms_updating
            ? state.AccountReducer.vms_updating
            : [],
    }
}

export default connect(mapStateToProps)(VMTable)
