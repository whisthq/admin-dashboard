import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { deleteUser } from '../../../actions/index.js'
import { Table } from 'antd'
import 'antd/dist/antd.css'

import Style from '../../../styles/components/pageAdmin.module.css'

import '../../../static/App.css'

class UserTable extends Component {
    deleteUser = (user) => {
        this.props.dispatch(deleteUser(user))
    }

    render() {
        let columns = [
            {
                title: 'Delete user',
                dataIndex: 'deleteBtn',
                render: (username) => (
                    <Popup
                        trigger={
                            <FontAwesomeIcon
                                className="pointerOnHover"
                                icon={faTimes}
                                style={{
                                    color: '#b01717',
                                    width: 12,
                                }}
                            />
                        }
                        modal
                        contentStyle={{
                            width: 400,
                            borderRadius: 5,
                            backgroundColor: 'white',
                            border: 'none',
                            height: 210,
                            padding: 30,
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: 20,
                                color: '#333333',
                            }}
                        >
                            <strong>Are You Sure?</strong>
                        </div>
                        <div
                            style={{
                                fontSize: 12,
                                color: '#555555',
                                marginTop: 15,
                            }}
                        >
                            You are about to permanently delete{' '}
                            <strong>{username}</strong>
                        </div>
                        <button
                            onClick={() => this.deleteUser(username)}
                            style={{
                                fontWeight: 'bold',
                                marginTop: 30,
                                outline: 'none',
                                width: '100%',
                                fontSize: 12,
                                borderRadius: 5,
                                display: 'inline',
                                padding: '10px 10px',
                                border: 'solid 1px #e34d4d',
                                color: '#e34d4d',
                                backgroundColor: 'rgba(227, 77, 77, 0.05)',
                            }}
                        >
                            DELETE USER
                        </button>
                    </Popup>
                ),
            },
        ]
        let data = []
        if (this.props.userTable && this.props.userTable.length) {
            Object.keys(this.props.userTable[0]).forEach(function (key) {
                var fixWidth = false
                if (key === 'username') {
                    fixWidth = 250
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
                    ellipsis: key === 'password',
                })
            })
            this.props.userTable.forEach(function (user) {
                data.push({ ...user, deleteBtn: user['username'] })
            })
        }
        columns.reverse()

        return (
            <Table
                columns={columns}
                dataSource={data}
                scroll={{ y: 400, x: 1500 }}
                size="middle"
                rowClassName={Style.tableRow}
                loading={!this.props.usersUpdated}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        userTable: state.AccountReducer.userTable
            ? state.AccountReducer.userTable.reverse()
            : [],
        usersUpdated: state.AccountReducer.usersUpdated,
    }
}

export default connect(mapStateToProps)(UserTable)
