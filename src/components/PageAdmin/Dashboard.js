import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { connect } from 'react-redux'
import 'react-tabs/style/react-tabs.css'

import '../../static/App.css'
import {
    fetchUserActivity,
    fetchUserTable,
    deleteUser,
} from '../../actions/index.js'
import VMTable from './components/VMTable.js'
import UserTable from './components/UserTable.js'
import CustomerTable from './components/CustomerTable.js'
import DiskTable from './components/DiskTable.js'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            showPopup: false,
            loaded: false,
            userTableFetched: false,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.props.dispatch(fetchUserActivity(false))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.access_token &&
            this.props.userTable.length === 0 &&
            !this.state.userTableFetched
        ) {
            this.props.dispatch(fetchUserTable())
            this.setState({ userTableFetched: true })
        }
    }

    deleteUser = (user) => {
        this.props.dispatch(deleteUser(user))
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false })
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose()
        }
        return (
            <div>
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
                    DASHBOARD
                </div>
                <div style={{ display: 'flex', marginTop: 5 }}>
                    <div
                        style={{
                            display: 'block',
                            width: '100%',
                            position: 'relative',
                            bottom: 36,
                        }}
                    >
                        <Tabs>
                            <TabList
                                style={{
                                    textAlign: 'left',
                                    border: 'none',
                                    fontSize: 16,
                                }}
                            >
                                <Tab>Cloud PCs</Tab>
                                <Tab>Disks</Tab>
                                <Tab>Users</Tab>
                                <Tab>Customers</Tab>
                            </TabList>
                            <TabPanel style={{ paddingTop: 20 }}>
                                <VMTable />
                            </TabPanel>
                            <TabPanel style={{ paddingTop: 20 }}>
                                <DiskTable />
                            </TabPanel>
                            <TabPanel style={{ paddingTop: 20 }}>
                                <UserTable />
                            </TabPanel>
                            <TabPanel style={{ paddingTop: 20 }}>
                                <CustomerTable />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        vm_info: state.AccountReducer.vm_info
            ? state.AccountReducer.vm_info
            : [],
        vmsUpdated: state.AccountReducer.vmsUpdated,
        activityFetched: state.AccountReducer.activityFetched,
        userActivity: state.AccountReducer.userActivity
            ? state.AccountReducer.userActivity
            : [],
        userTable: state.AccountReducer.userTable
            ? state.AccountReducer.userTable
            : [],
        usersUpdated: state.AccountReducer.usersUpdated,
        access_token: state.AccountReducer.access_token,
        login_attempts: state.AccountReducer.login_attempts,
    }
}

export default connect(mapStateToProps)(Dashboard)
