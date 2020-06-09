import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Route, Switch, Redirect } from 'react-router-dom'

import { fetchUserActivity, logout } from '../../actions/index.js'

import LeftMenu from './components/LeftMenu.js'
import Dashboard from './Dashboard'
import Logs from './Logs'
import Analytics from './Analytics'
import { Button } from 'react-bootstrap'

import '../../static/App.css'
import 'react-tabs/style/react-tabs.css'

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        this.setState({
            date: moment(Date.now()).format('MMMM Do, YYYY'),
        })
        this.props.dispatch(fetchUserActivity(false))
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    render() {
        return (
            <div>
                {this.props.authenticated ? (
                    <div style={{ backgroundColor: '#FFFFFF' }}>
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
                                <div className="d-flex justify-content-between">
                                    <p>{this.state.date}</p>
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
                                <Switch>
                                    <Route
                                        exact
                                        path="/admin"
                                        component={Dashboard}
                                    />
                                    <Route
                                        path="/admin/dashboard"
                                        component={Dashboard}
                                    />
                                    <Route
                                        path="/admin/logs"
                                        component={Logs}
                                    />
                                    <Route
                                        path="/admin/analytics"
                                        component={Analytics}
                                    />
                                </Switch>
                            </div>
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

export default connect(mapStateToProps)(Admin)
