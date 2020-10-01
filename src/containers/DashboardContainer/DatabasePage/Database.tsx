import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { connect } from 'react-redux'

import 'react-tabs/style/react-tabs.css'
import '../../../static/App.css'

import { changePage } from '../../../actions/index'

import VMTable from './components/VMTable'
import UserTable from './components/UserTable'
import CustomerTable from './components/CustomerTable'
import DiskTable from './components/DiskTable'

export class Dashboard extends React.Component<any, any> {
    componentDidMount() {
        this.props.dispatch(changePage('dashboard'))
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
        access_token: state.AccountReducer.access_token,
    }
}

export default connect(mapStateToProps)(Dashboard)
