import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { changePage } from '../../actions/index.js'

import '../../static/App.css'

import GeneralStats from './components/GeneralStats'
import UserStats from './components/UserStats'
import VMPieChart from './containers/VMPieChart'

class Analytics extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(changePage("analytics"))
    }

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
                <Row>
                    <Col lg = {8}>
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
                    </Col>
                    <Col>
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: 24,
                                marginBottom: 30,
                                marginTop: 60
                            }}
                        >
                            Cloud PCs
                        </div>
                        <VMPieChart
                            location = "Eastus"
                            deallocated = {this.props.latestReport.eastus_deallocated}
                            unavailable = {this.props.latestReport.eastus_unavailable}
                            available = {this.props.latestReport.eastus_available}
                        />
                        <VMPieChart
                            location = "Northcentralus"
                            deallocated = {this.props.latestReport.northcentralus_deallocated}
                            unavailable = {this.props.latestReport.northcentralus_unavailable}
                            available = {this.props.latestReport.northcentralus_available}
                        />
                        <VMPieChart
                            location = "Southcentralus"
                            deallocated = {this.props.latestReport.southcentralus_deallocated}
                            unavailable = {this.props.latestReport.southcentralus_unavailable}
                            available = {this.props.latestReport.southcentralus_available}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        latestReport: state.AccountReducer.latestReport,
    }
}

export default connect(mapStateToProps)(Analytics);
