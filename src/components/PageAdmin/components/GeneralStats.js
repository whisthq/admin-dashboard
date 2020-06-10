import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import {
    faCircleNotch,
    faClock,
    faUserClock,
    faUserCircle,
    faPowerOff,
} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import '../../../static/App.css'

import { fetchLatestReport } from '../../../actions/index.js'

import Sunburst from 'sunburst-chart'
import UsageChart from './UsageChart.js'

class GeneralStats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        this.props.dispatch(fetchLatestReport())
        this.sunburstChart = Sunburst()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.latestReport !== this.props.latestReport) {
            let sunburstData = {
                name: 'All Regions',
                color: '#eceff1',
                children: [
                    {
                        name: 'East US',
                        color: '#81d4fa',
                        children: [
                            {
                                name: 'Running Available',
                                color: '#4ba3c7',
                                size: this.props.latestReport.eastus_available,
                            },
                            {
                                name: 'Running Unavailable',
                                color: '#b6ffff',
                                size: this.props.latestReport
                                    .eastus_unavailable,
                            },
                            {
                                name: 'Deallocated',
                                color: 'grey',
                                size: this.props.latestReport
                                    .eastus_deallocated,
                            },
                        ],
                    },
                    {
                        name: 'Northcentral US',
                        color: '#ef5350',
                        children: [
                            {
                                name: 'Running Available',
                                color: '#b61827',
                                size: this.props.latestReport
                                    .northcentralus_available,
                            },
                            {
                                name: 'Running Unavailable',
                                color: '#ff867c',
                                size: this.props.latestReport
                                    .northcentralus_unavailable,
                            },
                            {
                                name: 'Deallocated',
                                color: 'grey',
                                size: this.props.latestReport
                                    .northcentralus_deallocated,
                            },
                        ],
                    },
                    {
                        name: 'Southcentral US',
                        color: '#66bb6a',
                        children: [
                            {
                                name: 'Running Available',
                                color: '#338a3e',
                                size: this.props.latestReport
                                    .southcentralus_available,
                            },
                            {
                                name: 'Running Unavailable',
                                color: '#98ee99',
                                size: this.props.latestReport
                                    .southcentralus_unavailable,
                            },
                            {
                                name: 'Deallocated',
                                color: 'grey',
                                size: this.props.latestReport
                                    .southcentralus_deallocated,
                            },
                        ],
                    },
                ],
            }
            this.sunburstChart
                .data(sunburstData)
                .width(this.state.height / 2)
                .height(this.state.height / 2)
                .size('size')
                .color('color')
                .tooltipContent((d, node) => `VMs: <i>${node.value}</i>`)(
                document.getElementById('sunburstDiv')
            )
        }
    }

    render() {
        let summaryCard = (
            <div>
                {this.props.latestReport ? (
                    <div>
                        <div className="d-flex justify-content-between">
                            <h6>
                                <FontAwesomeIcon icon={faClock} /> Last updated:
                            </h6>
                            <h6>
                                {moment(
                                    this.props.latestReport.timestamp * 1000
                                ).format('lll')}
                            </h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6>
                                <FontAwesomeIcon icon={faPowerOff} /> VMs
                                deallocated past hour:
                            </h6>
                            <h6>
                                {this.props.latestReport.total_vms_deallocated}
                            </h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6>
                                <FontAwesomeIcon icon={faUserCircle} />
                                {'  '}
                                Logons past hour:
                            </h6>
                            <h6>{this.props.latestReport.logons}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6>
                                <FontAwesomeIcon icon={faUserClock} />
                                {'  '}
                                Logoffs past hour:
                            </h6>
                            <h6>{this.props.latestReport.logoffs}</h6>
                        </div>
                    </div>
                ) : (
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                )}
            </div>
        )

        return (
            <Row>
                <Col lg={8}>
                    <UsageChart />
                </Col>
                <Col lg={4}>
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            marginBottom: 30,
                        }}
                    >
                        Summary
                    </div>
                    {summaryCard}

                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            marginBottom: 30,
                        }}
                    >
                        Virtual Machines
                    </div>
                    <div id="sunburstDiv" className="mt-3" />
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    return {
        latestReport: state.AccountReducer.latestReport,
    }
}

export default connect(mapStateToProps)(GeneralStats)
