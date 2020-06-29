import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ToggleButton from 'react-toggle-button'
import moment from 'moment'
import { Table } from 'antd'

import 'static/App.css'
import 'antd/dist/antd.css'
import Style from 'styles/components/pageAdmin.module.css'

import {
    faCircleNotch,
    faPlay,
    faPause,
} from '@fortawesome/free-solid-svg-icons'

import { startVM, deallocateVM, updateDB, setDev } from 'actions/index.js'

class VMTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            filteredData: [],
            filterKeyword: '',
            modifyData: true,
        }
    }

    // intervalID var to keep track of auto-refreshing across functions
    intervalID

    componentDidMount() {
        this.props.dispatch(updateDB(false))

        // refresh the VM table every 60 seconds
        this.intervalID = setInterval(this.getUpdatedDatabase.bind(this), 60000)
        this.setState({ data: [], modifyData: true })
    }

    componentWillUnmount() {
        // stop auto-refreshing
        clearInterval(this.intervalID)
    }

    getUpdatedDatabase() {
        this.props.dispatch(updateDB(false))
    }

    startVM = (vm_name) => {
        this.props.dispatch(startVM(vm_name))
    }

    deallocateVM = (vm_name) => {
        this.props.dispatch(deallocateVM(vm_name))
    }

    toggleDev = (mode, vm_name) => {
        this.props.dispatch(setDev(vm_name, !mode))
    }

    keywordFilter = (e) => {
        let component = this
        let filterKeyword = e.target.value
        this.setState({ modifyData: false }, function () {
            let filteredData = component.state.data.filter(function (element) {
                return (
                    (element.username &&
                        element.username.includes(filterKeyword)) ||
                    (element.vm_name &&
                        element.vm_name.includes(filterKeyword)) ||
                    (element.disk_name &&
                        element.disk_name.includes(filterKeyword)) ||
                    (element.location &&
                        element.location.includes(filterKeyword)) ||
                    (element.ip && element.ip.includes(filterKeyword))
                )
            })
            console.log(filteredData)

            component.setState({
                filterKeyword: filterKeyword,
                filteredData: filteredData,
            })
        })
    }

    render() {
        let columns = []
        if (this.props.vm_info && this.props.vm_info.length) {
            Object.keys(this.props.vm_info[0]).forEach(function (key) {
                let fixWidth = false
                if (key === 'username') {
                    fixWidth = 200
                } else if (key === 'disk_name') {
                    fixWidth = 400
                } else if (
                    key === 'temporary_lock' ||
                    key === 'last_updated' ||
                    key === 'state'
                ) {
                    fixWidth = 150
                }
                let customRender = false
                if (key === 'temporary_lock') {
                    customRender = (unix) => (
                        <span> {moment(unix * 1000).format('lll')}</span>
                    )
                } else if (key === 'lock') {
                    customRender = (val) => <span>{val.toString()}</span>
                }
                if (key !== 'dev') {
                    columns.push({
                        title: key,
                        dataIndex: key,
                        sorter: (a, b) => {
                            if (a[key] === null) {
                                return 1
                            }
                            if (b[key] === null) {
                                return -1
                            }

                            var a_temp = a[key].toString().toLowerCase()
                            var b_temp = b[key].toString().toLowerCase()
                            if (a_temp > b_temp) {
                                return 1
                            } else if (a_temp < b_temp) {
                                return -1
                            }

                            return 0
                        },
                        width: fixWidth,
                        render: customRender,
                    })
                }
            })
            columns.push({
                title: 'dev',
                dataIndex: 'dev',
                render: (text, record, index) => (
                    <ToggleButton
                        value={record['dev']}
                        onToggle={function (mode) {
                            record['dev'] = !record['dev']
                            component.toggleDev(mode, record['vm_name'])
                        }}
                        colors={{
                            active: {
                                base: '#5EC4EB',
                            },
                            inactive: {
                                base: '#161936',
                            },
                        }}
                    />
                ),
                sorter: (a, b) => {
                    if (a['dev'] === null) {
                        return 1
                    }
                    if (b['dev'] === null) {
                        return -1
                    }
                    if (a['dev'] && !b['dev']) {
                        return 1
                    } else if (!a['dev'] && b['dev']) {
                        return -1
                    }
                    return 0
                },
            })
            columns.push({
                title: '',
                dataIndex: 'vmBtn',
                render: (text, record, index) =>
                    vmButton(
                        record['state'],
                        record['vm_name'],
                        record['lock']
                    ),
                width: 70,
            })
            let component = this
            if (this.state.modifyData) {
                this.props.vm_info.forEach(function (vm) {
                    component.state.data.push(vm)
                })
                this.setState({ modifyData: false })
            }
        }
        columns.reverse()

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
            <div className={Style.tableWrapper}>
                <input
                    type="text"
                    placeholder="Filter by keyword"
                    style={{
                        width: '100%',
                        border: 'none',
                        padding: '10px 20px',
                        background: '#ebecf0',
                    }}
                    onChange={this.keywordFilter}
                />
                <Table
                    columns={columns}
                    dataSource={
                        this.state.filterKeyword
                            ? [...new Set(this.state.filteredData)]
                            : [...new Set(this.state.data)]
                    }
                    scroll={{ y: 450, x: 2000 }}
                    size="middle"
                    rowClassName={(record, index) =>
                        [
                            record['dev']
                                ? Style.blueBg
                                : record['lock'] ||
                                  Number(record['temporary_lock']) >
                                      Math.round(new Date().getTime() / 1000)
                                ? Style.redBg
                                : Style.greenBg,
                            Style.tableRow,
                        ].join(' ')
                    }
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {},
                        }
                    }}
                    loading={!this.props.vmsUpdated}
                />
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
