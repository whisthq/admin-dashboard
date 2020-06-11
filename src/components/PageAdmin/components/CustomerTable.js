import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { fetchCustomers } from '../../../actions/index.js'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import Style from '../../../styles/components/pageAdmin.module.css'

import '../../../static/App.css'

class CustomerTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers_fetched: false,
        }
    }

    // intervalID var to keep track of auto-refreshing across functions
    intervalID

    componentDidMount() {
        // refresh the customer table every 60 seconds
        this.intervalID = setInterval(this.getUpdatedDatabase.bind(this), 60000)
    }

    componentWillUnmount() {
        // stop auto-refreshing
        clearInterval(this.intervalID)
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.access_token &&
            this.props.customers.length === 0 &&
            !this.state.customers_fetched
        ) {
            this.props.dispatch(fetchCustomers())
            this.setState({ customers_fetched: true })

            // refresh the customer table every 60 seconds
            this.intervalID = setInterval(
                this.getUpdatedDatabase.bind(this),
                60000
            )
        }
    }

    getUpdatedDatabase() {
        this.props.dispatch(fetchCustomers())
    }

    render() {
        let columns = []
        let data = []
        if (this.props.customers && this.props.customers.length) {
            Object.keys(this.props.customers[0]).forEach(function (key) {
                var fixWidth = key == 'username' ? 200 : false
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
                })
            })
            this.props.customers.forEach(function (customer) {
                data.push(customer)
            })
        }
        columns.reverse()

        return (
            <div>
                {this.props.customers.length > 0 ? (
                    // <div className={Style.tableContainer}>
                    //     <table className={Style.table}>
                    //         <tr className={Style.tableHead}>
                    //             {header.map((value, index) => {
                    //                 return (
                    //                     <th style={{ padding: 20 }} key={index}>
                    //                         {value}
                    //                     </th>
                    //                 )
                    //             })}
                    //         </tr>
                    //         {this.props.customers.map((value, index) => (
                    //             <tr
                    //                 className={Style.tableRow}
                    //                 key={index}
                    //                 onClick={() => {
                    //                     this.props.openModal(
                    //                         this.props.customers[index][
                    //                             'username'
                    //                         ]
                    //                     )
                    //                 }}
                    //             >
                    //                 {header.map((value1, index1) => (
                    //                     <td
                    //                         className={Style.tableCell}
                    //                         key={index1}
                    //                     >
                    //                         {value[value1] == null ? (
                    //                             <div></div>
                    //                         ) : (
                    //                             <div
                    //                                 style={{
                    //                                     maxWidth: 150,
                    //                                     overflowX: 'scroll',
                    //                                 }}
                    //                             >
                    //                                 {value[value1].toString()}
                    //                             </div>
                    //                         )}
                    //                     </td>
                    //                 ))}
                    //             </tr>
                    //         ))}
                    //     </table>
                    // </div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        scroll={{ y: 400 }}
                        pagination={{ pageSize: 20 }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: (event) => {
                                    console.log(record)
                                    this.props.openModal(record['username'])
                                },
                            }
                        }}
                        size="middle"
                    />
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
        customers: state.AccountReducer.customers
            ? state.AccountReducer.customers.reverse()
            : [],
        access_token: state.AccountReducer.access_token,
    }
}

export default connect(mapStateToProps)(CustomerTable)
