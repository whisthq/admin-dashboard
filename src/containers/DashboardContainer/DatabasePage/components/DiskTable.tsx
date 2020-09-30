import React from 'react'
import { connect } from 'react-redux'
import ToggleButton from 'react-toggle-button'
import { Table } from 'antd'

import 'antd/dist/antd.css'
import '../../../../static/App.css'
import Style from '../../../../styles/components/pageAdmin.module.css'

import {
    fetchDiskTable,
    changeBranch,
    setStun,
    setAutoupdate,
} from '../../../../actions/index'

/*
The disk table is deprecated! You cannot change anything with the disk table since the azure endpoints no longer
exist as we are moving to AWS containers. This will be removed soon and is left so you can see the disks.
*/
export class DiskTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props)

        this.state = {
            filterKeyword: null,
        }
    }

    intervalID: any

    componentDidMount() {
        this.props.dispatch(fetchDiskTable(true))
    }

    componentWillUnmount() {
        // stop auto-refreshing
        clearInterval(this.intervalID)
    }

    changeBranch = (disk_name: any, branch: any) => {
        console.log(`changed branch`)
        this.props.dispatch(changeBranch(disk_name, branch))
    }

    toggleStun = (mode: any, disk_name: any) => {
        console.log(`toggled stun`)
        if (mode == null) {
            this.props.dispatch(setStun(disk_name, true))
        } else {
            this.props.dispatch(setStun(disk_name, !mode))
        }
    }

    toggleAutoupdate = (mode: any, disk_name: any) => {
        console.log(`toggled autoupdated`)
        if (mode == null) {
            this.props.dispatch(setAutoupdate(disk_name, true))
        } else {
            this.props.dispatch(setAutoupdate(disk_name, !mode))
        }
    }

    keywordFilter = (e: any) => {
        let filterKeyword = e.target.value
        this.setState({
            filterKeyword: filterKeyword,
        })
    }

    render() {
        const branchToggle = (disk_name: any, branch: any) => (
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

        let columns: any[] = []
        let data: any[] = []
        let headers = [
            'branch',
            'using_stun',
            'allow_autoupdate',
            'disk_id',
            'user_id',
            'location',
            'os',
            'version',
            'disk_size',
            'last_pinged',
            'has_dedicated_vm',
            'rsa_private_key',
            'ssh_password',
        ]
        let component = this

        if (this.props.disk_info && this.props.disk_info.length) {
            headers.forEach(function (key) {
                let fixWidth: any = false
                if (key === 'disk_id') {
                    fixWidth = 400
                } else if (key === 'version') {
                    fixWidth = 300
                } else if (key === 'using_stun' || key === 'user_id') {
                    fixWidth = 100
                } else if (key === 'has_accepted_update') {
                    fixWidth = 180
                } else if (key === 'branch') {
                    fixWidth = 200
                }
                let customRender: any = false
                if (key === 'branch') {
                    customRender = (_text: any, record: any, _index: any) => {
                        return branchToggle(record['disk_id'], record['branch'])
                    }
                } else if (key === 'using_stun') {
                    customRender = (_text: any, record: any, _index: any) => (
                        <ToggleButton
                            value={record['using_stun']}
                            onToggle={(mode: any) => {
                                component.toggleStun(mode, record['disk_id'])
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
                } else if (key === 'allow_autoupdate') {
                    customRender = (_text: any, record: any, _index: any) => (
                        <ToggleButton
                            value={record['allow_autoupdate']}
                            onToggle={(mode: any) => {
                                component.toggleAutoupdate(
                                    mode,
                                    record['disk_id']
                                )
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
                } else if (key === 'has_dedicated_vm') {
                    customRender = (text: any) => (
                        <span>{text ? 'true' : 'false'}</span>
                    )
                }
                columns.push({
                    title: key,
                    dataIndex: key,
                    sorter: (a: any, b: any) => {
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

            this.props.disk_info.forEach(function (disk: any) {
                data.push(disk)
            })

            if (component.state.filterKeyword) {
                data = data.filter((element) => {
                    return (
                        // Commenting out until we figure a clean way to fetch user email
                        // (element.user_id &&
                        //     element.user_id.includes(
                        //         component.state.filterKeyword
                        //     )) ||

                        element.disk_id &&
                        element.disk_id.includes(component.state.filterKeyword)
                    )
                })
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
                    dataSource={data}
                    scroll={{ y: 450, x: 2300 }}
                    size="middle"
                    rowClassName={Style.tableRow}
                    loading={!this.props.disks_fetched}
                />
            </div>
        )
    }
}

function mapStateToProps(state: any) {
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
