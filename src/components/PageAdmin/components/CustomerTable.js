import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { fetchCustomers } from '../../../actions/index.js'

import Style from '../../../styles/components/pageAdmin.module.css'

import '../../../static/App.css'

class CustomerTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            customers_fetched: false,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    // intervalID var to keep track of auto-refreshing across functions
    intervalID

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.intervalID = setInterval(this.getUpdatedDatabase.bind(this), 60000)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)

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

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false })
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose()
        }
        var header = []
        if (this.props.customers.length > 0) {
            Object.keys(this.props.customers[0]).forEach(function (key) {
                header.push(key)
            })
        }

        header.reverse()

        return (
            <div style = {{
                maxHeight: 650,
                overflowY: "scroll"
            }}>
                {this.props.customers.length > 0 ? (
                    <div className={Style.tableContainer}>
                        <table className={Style.table}>
                            <tr className={Style.tableHead}>
                                {header.map((value, index) => {
                                    return (
                                        <th style={{ padding: 20 }} key={index}>
                                            {value}
                                        </th>
                                    )
                                })}
                            </tr>
                            {this.props.customers.map((value, index) => (
                                <tr className={Style.tableRow} key={index}>
                                    {header.map((value1, index1) => (
                                        <td
                                            className={Style.tableCell}
                                            key={index1}
                                        >
                                            {value[value1] == null ? (
                                                <div></div>
                                            ) : (
                                                <div
                                                    style={{
                                                        maxWidth: 150,
                                                        overflowX: 'scroll',
                                                    }}
                                                >
                                                    {value[value1].toString()}
                                                </div>
                                            )}
                                        </td>
                                    ))}
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
    console.log(state)
    return {
        customers: state.AccountReducer.customers
            ? state.AccountReducer.customers.reverse()
            : [],
        access_token: state.AccountReducer.access_token,
    }
}

export default connect(mapStateToProps)(CustomerTable)