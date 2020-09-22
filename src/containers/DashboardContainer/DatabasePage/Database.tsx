import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { connect } from 'react-redux'

import 'react-tabs/style/react-tabs.css'
import '../../../static/App.css'

import {
    fetchUserActivity,
    fetchUserTable,
    deleteUser,
    changePage,
} from '../../../actions/index'

import VMTable from './components/VMTable'
import UserTable from './components/UserTable'
import CustomerTable from './components/CustomerTable'
import DiskTable from './components/DiskTable'

export class Dashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            loaded: false,
            userTableFetched: false,
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchUserActivity())
        this.props.dispatch(changePage('dashboard'))
    }

    componentDidUpdate() {
        if (
            this.props.access_token &&
            this.props.userTable.length === 0 &&
            !this.state.userTableFetched
        ) {
            this.props.dispatch(fetchUserTable(true))
            this.setState({ userTableFetched: true })
        }
    }

    deleteUser = (user: any) => {
        this.props.dispatch(deleteUser(user))
    }

    render() {
        return (
            <div
                style={{
                    position: 'relative',
                    bottom: 10,
                }}
            >
                <div
                    style={{
                        fontSize: 45,
                        fontWeight: 'bold',
                        marginBottom: 60,
                        width: 275,
                        color: '#111111',
                    }}
                >
                    DASHBOARD
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginTop: 5,
                    }}
                >
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
                                <div>
                                    <VMTable />
                                </div>
                            </TabPanel>
                            <TabPanel style={{ paddingTop: 20 }}>
                                <div>
                                    <DiskTable />
                                </div>
                            </TabPanel>
                            <TabPanel style={{ paddingTop: 20 }}>
                                <div>
                                    <UserTable />
                                </div>
                            </TabPanel>
                            <TabPanel style={{ paddingTop: 20 }}>
                                <CustomerTable openModal={() => null} />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
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
