import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import '../../../../static/App.css'
import Style from '../../../../styles/components/pageAdmin.module.css'

import { fetchCustomers } from '../../../../actions/index'

class CustomerList extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            customers_fetched: false,
        }
    }

    // intervalID var to keep track of auto-refreshing across functions
    intervalID: any | undefined

    componentDidMount() {
        // refresh the customer table every 60 seconds
        this.intervalID = setInterval(this.getUpdatedDatabase.bind(this), 60000)
        this.props.dispatch(fetchCustomers())
    }

    componentWillUnmount() {
        // stop auto-refreshing
        clearInterval(this.intervalID)
    }

    componentDidUpdate() {
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
        let component = this

        return (
            <div
                style={{
                    maxHeight: 300,
                    overflowY: 'scroll',
                }}
            >
                {this.props.customers.length > 0 ? (
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}
                    >
                        {this.props.customers.map(function (
                            value: any,
                            index: any
                        ) {
                            if (value && value['username'] !== '') {
                                return (
                                    <div
                                        key={index}
                                        className="pointerOnHover"
                                        onClick={() => {
                                            component.props.openModal(
                                                value['username']
                                            )
                                        }}
                                        style={{
                                            padding: '5px 10px',
                                            marginRight: 10,
                                            marginBottom: 10,
                                            fontSize: 13,
                                            color: '#8884d8',
                                            background:
                                                'rgba(136, 132, 216, 0.1)',
                                        }}
                                    >
                                        {value['username']}
                                    </div>
                                )
                            } else {
                                return <div></div>
                            }
                        })}
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

function mapStateToProps(state: any) {
    return {
        customers: state.AccountReducer.customers
            ? state.AccountReducer.customers.reverse()
            : [],
        access_token: state.AccountReducer.access_token,
    }
}

export default connect(mapStateToProps)(CustomerList)
