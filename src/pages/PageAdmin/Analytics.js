import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { changePage } from '../../actions/index.js'

import '../../static/App.css'

import GeneralStats from './components/GeneralStats'
import UserStats from './components/UserStats'
import SummaryStats from './components/SummaryStats'
import VMPieChart from './containers/VMPieChart'

class Analytics extends Component {
    componentDidMount() {
        this.props.dispatch(changePage('analytics'))
    }

    render() {
        return (
            <div
                style={{
                    position: 'relative',
                    bottom: 10,
                    width: '100vw',
                }}
            >
                <div
                    style={{
                        fontSize: 45,
                        fontWeight: 'bold',
                        marginBottom: 30,
                        color: '#111111',
                    }}
                >
                    ANALYTICS
                </div>
                <Row>
                    <Col lg={8}>
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
                                <Tab>Stats</Tab>
                            </TabList>
                            <TabPanel>
                                <GeneralStats />
                            </TabPanel>
                            <TabPanel>
                                <UserStats />
                            </TabPanel>
                            <TabPanel>
                                <SummaryStats />
                            </TabPanel>
                        </Tabs>
                    </Col>
                    <Col>
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: 24,
                                marginBottom: 30,
                                marginTop: 60,
                            }}
                        >
                            Cloud PCs
                        </div>
                        <VMPieChart
                            location="Eastus"
                            deallocated={
                                this.props.latestReport
                                    ? this.props.latestReport.eastus_deallocated
                                    : 0
                            }
                            unavailable={
                                this.props.latestReport
                                    ? this.props.latestReport.eastus_unavailable
                                    : 0
                            }
                            available={
                                this.props.latestReport
                                    ? this.props.latestReport.eastus_available
                                    : 0
                            }
                        />
                        <VMPieChart
                            location="Northcentralus"
                            deallocated={
                                this.props.latestReport
                                    ? this.props.latestReport
                                          .northcentralus_deallocated
                                    : 0
                            }
                            unavailable={
                                this.props.latestReport
                                    ? this.props.latestReport
                                          .northcentralus_unavailable
                                    : 0
                            }
                            available={
                                this.props.latestReport
                                    ? this.props.latestReport
                                          .northcentralus_available
                                    : 0
                            }
                        />
                        <VMPieChart
                            location="Southcentralus"
                            deallocated={
                                this.props.latestReport
                                    ? this.props.latestReport
                                          .southcentralus_deallocated
                                    : 0
                            }
                            unavailable={
                                this.props.latestReport
                                    ? this.props.latestReport
                                          .southcentralus_unavailable
                                    : 0
                            }
                            available={
                                this.props.latestReport
                                    ? this.props.latestReport
                                          .southcentralus_available
                                    : 0
                            }
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

export default connect(mapStateToProps)(Analytics)
