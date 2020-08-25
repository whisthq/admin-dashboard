import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { fetchUserActivity, logout } from '../../actions/index'

import DashboardMenu from './DashboardMenu'
import Database from './DatabasePage/Database'
import Logs from './LogsPage/Logs'
import Analytics from './AnalyticsPage/Analytics'

import '../../static/App.css'
import 'react-tabs/style/react-tabs.css'


class Admin extends React.Component<any, any> {
    constructor(props: any) {
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
        this.props.dispatch(fetchUserActivity())
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    render() {
        return (
            <div style={{ backgroundColor: '#f3f2f5', minHeight: '100vh' }}>
                {this.props.authenticated ? (
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 75, margin: 0 }}>
                            <DashboardMenu />
                        </div>
                        <div
                            style={{
                                width: 'calc(100%-75px)',
                                margin: 0,
                                overflowX: 'hidden',
                            }}
                        >
                            <div className="p-5">
                                <div className="d-flex justify-content-between">
                                    <div>{this.state.date}</div>
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
                                        component={Database}
                                    />
                                    <Route
                                        path="/admin/dashboard"
                                        component={Database}
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

function mapStateToProps(state: any) {
    return {
        authenticated: state.AccountReducer.authenticated,
    }
}

export default connect(mapStateToProps)(Admin)
