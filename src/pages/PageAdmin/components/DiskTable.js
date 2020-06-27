import React, { Component } from 'react'
import { connect } from 'react-redux'
import ToggleButton from 'react-toggle-button'

import { fetchDiskTable, changeBranch } from '../../../actions/index.js'

import Style from '../../../styles/components/pageAdmin.module.css'
import { Table } from 'antd'
import 'antd/dist/antd.css'

import '../../../static/App.css'

import { setStun } from '../../../actions/index.js'

class DiskTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            filteredData: [],
            filterKeyword: '',
            modifyData: true,
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchDiskTable())
    }

    componentWillUnmount() {
        // stop auto-refreshing
        clearInterval(this.intervalID)
    }

    changeBranch = (disk_name, branch) => {
        this.props.dispatch(changeBranch(disk_name, branch))
    }

    toggleStun = (mode, disk_name) => {
        if (mode == null) {
            this.props.dispatch(setStun(disk_name, true))
        } else {
            this.props.dispatch(setStun(disk_name, !mode))
        }
    }

    keywordFilter = (e) => {
        let component = this
        let filterKeyword = e.target.value
        this.setState({ modifyData: false }, function () {
            let filteredData = component.state.data.filter(function (element) {
                return (
                    (element.username &&
                        element.username.includes(filterKeyword)) ||
                    (element.disk_name &&
                        element.disk_name.includes(filterKeyword))
                )
            })
            component.setState({
                filterKeyword: filterKeyword,
                filteredData: filteredData,
            })
        })
    }

    render() {
        const branchToggle = (disk_name, branch) => (
            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        marginRight: 6,
                        fontWeight: branch === 'dev' ? 'bold' : 'normal',
                        color: '#1ba8e0',
                        background:
                            branch === 'dev'
                                ? 'rgba(94, 195, 235, 0.2)'
                                : 'none',
                        border:
                            branch === 'dev'
                                ? 'none'
                                : 'solid 1px rgba(94, 195, 235, 0.2)',
                        padding: '5px 10px',
                        borderRadius: 2,
                    }}
                    onClick={() => this.changeBranch(disk_name, 'dev')}
                    className="pointerOnHover"
                >
                    Dev
                </div>
                <div
                    style={{
                        marginRight: 6,
                        fontWeight: branch === 'staging' ? 'bold' : 'normal',
                        color: '#1ba8e0',
                        background:
                            branch === 'staging'
                                ? 'rgba(94, 195, 235, 0.2)'
                                : 'none',
                        border:
                            branch === 'staging'
                                ? 'none'
                                : 'solid 1px rgba(94, 195, 235, 0.2)',
                        padding: '5px 10px',
                        borderRadius: 2,
                    }}
                    onClick={() => this.changeBranch(disk_name, 'staging')}
                    className="pointerOnHover"
                >
                    Staging
                </div>
                <div
                    style={{
                        marginRight: 6,
                        fontWeight: branch === 'master' ? 'bold' : 'normal',
                        color: '#1ba8e0',
                        background:
                            branch === 'master'
                                ? 'rgba(94, 195, 235, 0.2)'
                                : 'none',
                        border:
                            branch === 'master'
                                ? 'none'
                                : 'solid 1px rgba(94, 195, 235, 0.2)',
                        padding: '5px 10px',
                        borderRadius: 2,
                    }}
                    onClick={() => this.changeBranch(disk_name, 'master')}
                    className="pointerOnHover"
                >
                    Master
                </div>
            </div>
        )

        let columns = []
        let data = []
        let headers = [
            'branch',
            'using_stun',
            'disk_name',
            'state',
            'username',
            'location',
            'os',
            'version',
            'disk_size',
            'vm_name',
            'vm_size',
            'has_accepted_update',
            'first_time',
        ]
        let component = this
        if (this.props.disk_info && this.props.disk_info.length) {
            headers.forEach(function (key) {
                let fixWidth = false
                if (key === 'username') {
                    fixWidth = 250
                } else if (key === 'disk_name') {
                    fixWidth = 400
                } else if (
                    key === 'vm_password' ||
                    key === 'vm_name' ||
                    key === 'version'
                ) {
                    fixWidth = 130
                } else if (key === 'has_accepted_update') {
                    fixWidth = 180
                } else if (key === 'branch') {
                    fixWidth = 200
                }
                let customRender = false
                if (key === 'branch') {
                    customRender = (text, record, index) =>
                        branchToggle(record['disk_name'], record['branch'])
                } else if (key === 'using_stun') {
                    customRender = (text, record, index) => (
                        <ToggleButton
                            value={record['using_stun']}
                            onToggle={(mode) => {
                                component.toggleStun(mode, record['disk_name'])
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
                    )
                }
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
            })
            let component = this
            if (this.state.modifyData) {
                this.props.disk_info.forEach(function (disk) {
                    component.state.data.push(disk)
                })
                this.setState({ modifyData: false })
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
                    scroll={{ y: 450, x: 2300 }}
                    size="middle"
                    rowClassName={Style.tableRow}
                    loading={!this.props.disks_fetched}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        disk_info: state.AccountReducer.disk_info
            ? state.AccountReducer.disk_info
            : [],
        disks_fetched: state.AccountReducer.disks_fetched
            ? state.AccountReducer.disks_fetched
            : false,
    }
}

export default connect(mapStateToProps)(DiskTable)
