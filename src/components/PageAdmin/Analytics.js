import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import '../../static/App.css'

import { logout } from '../../actions/index.js'
import LeftMenu from './components/LeftMenu.js'

import GeneralStats from './components/GeneralStats.js'

class Analytics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            day: 0,
            month: 0,
            year: 0,
        }
    }

    componentDidMount() {
        var today = new Date()
        this.setState({
            day: today.getDate(),
            month: this.monthConvert(today.getMonth()),
            year: today.getFullYear(),
        })
    }

    monthConvert = (month) => {
        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        var selectedMonthName = months[month]
        return selectedMonthName
    }

    render() {
        return (
            <div style={{ backgroundColor: '#FFFFFF' }}>
                {this.props.authenticated ? (
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div
                            style={{
                                width: '20%',
                                minHeight: '100vh',
                                maxWidth: 300,
                                background: 'white',
                                paddingTop: 50,
                                paddingLeft: 75,
                            }}
                        >
                            <LeftMenu />
                        </div>
                        <div
                            style={{
                                width: '80%',
                                padding: 50,
                                paddingRight: 75,
                            }}
                        >
                            <div>
                                {this.state.month} {this.state.day},{' '}
                                {this.state.year}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div
                                    style={{
                                        marginTop: 5,
                                        fontSize: 45,
                                        fontWeight: 'bold',
                                        marginBottom: 60,
                                        width: 275,
                                        color: '#111111',
                                    }}
                                >
                                    ANALYTICS
                                </div>
                                <div style={{ float: 'right' }}>
                                    <Button
                                        onClick={() =>
                                            this.props.dispatch(logout())
                                        }
                                        style={{
                                            border: 'none',
                                            padding: '10px 30px',
                                            fontWeight: 'bold',
                                            color: '#1ba8e0',
                                            background:
                                                'rgba(94, 195, 235, 0.2)',
                                            borderRadius: 3,
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                            <GeneralStats />
                        </div>
                    </div>
                ) : (
                    <Redirect to="/" />
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.AccountReducer.authenticated,
    }
}

export default connect(mapStateToProps)(Analytics)
