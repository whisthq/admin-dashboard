import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import moment from 'moment'

import '../../../../static/App.css'
import 'antd/dist/antd.css'
import Style from '../../../../styles/components/pageAdmin.module.css'

import { fetchCustomers } from '../../../../actions/index'

class CustomerTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers_fetched: false,
            filterKeyword: '',
        }
    }

    // intervalID var to keep track of auto-refreshing across functions
    intervalID

    componentDidMount() {
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

    keywordFilter = (e) => {
        let filterKeyword = e.target.value
        this.setState({
            filterKeyword: filterKeyword,
        })
    }

    render() {
        let columns = []
        let data = []
        if (this.props.customers && this.props.customers.length) {
            Object.keys(this.props.customers[0]).forEach(function (key) {
                let fixWidth = false
                if (key === 'username') {
                    fixWidth = 200
                } else if (key === 'trial_end' || key === 'created') {
                    fixWidth = 150
                }
                let customRender = false
                if (key === 'trial_end' || key === 'created') {
                    customRender = (text) => (
                        <p>{moment(text * 1000).format('lll')}</p>
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
            columns.reverse()

            this.props.customers.forEach(function (customer) {
                data.push(customer)
            })
            if (this.state.filterKeyword) {
                data = data.filter((element) => {
                    return element.username.includes(this.state.filterKeyword)
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
                    scroll={{ x: 1000, y: 450 }}
                    size="middle"
                    rowClassName={Style.tableRow}
                    loading={this.props.customers.length === 0}
                />
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
