import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import '../../static/App.css'

import GeneralStats from './components/GeneralStats'
import UserStats from './components/UserStats'

class Analytics extends Component {
    render() {
        return (
            <div style={{ backgroundColor: '#FFFFFF' }}>
                <div
                    style={{
                        marginTop: 5,
                        fontSize: 45,
                        fontWeight: 'bold',
                        marginBottom: 10,
                        width: 275,
                        color: '#111111',
                    }}
                >
                    ANALYTICS
                </div>
                <Tabs>
                    <TabList
                        style={{
                            textAlign: 'left',
                            border: 'none',
                            fontSize: 16,
                            marginBottom: 20,
                        }}
                    >
                        <Tab>General</Tab>
                        <Tab>Users</Tab>
                    </TabList>
                    <TabPanel>
                        <GeneralStats />
                    </TabPanel>
                    <TabPanel>
                        <UserStats />
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default Analytics
