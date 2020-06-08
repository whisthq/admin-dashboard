import React, { Component } from 'react'
import {
    Button,
    Card,
    Row,
    Col,
    ToggleButtonGroup,
    ToggleButton,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleNotch,
    faClock,
    faUserClock,
    faUserCircle,
    faPowerOff,
} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import '../../static/App.css'

import { logout, fetchLatestReport } from '../../actions/index.js'
import LeftMenu from './components/LeftMenu.js'
import { convertUnix } from '../util.js'

import Sunburst from 'sunburst-chart'
import UsageChart from './components/UsageChart.js'

class Logs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0,
            loaded: false,
            day: 0,
            month: 0,
            year: 0,
            logsFetched: false,
            timelineMode: 'day',
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
        var today = new Date()
        this.setState({
            day: today.getDate(),
            month: this.monthConvert(today.getMonth()),
            year: today.getFullYear(),
        })
        this.props.dispatch(fetchLatestReport())
        this.sunburstChart = Sunburst()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
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

    formatTime = (log) => {
        var logArr = log.split(',')
        var time = logArr[1]
        time = time.substring(0, time.length - 3)
        var timeArr = time.split(':')
        var hour = parseInt(timeArr[0]) - 12
        logArr[0] = logArr[0].substring(0, logArr[0].length - 5)
        logArr[0] = logArr[0].replace('-', '/')
        if (hour < 0) {
            return (
                Math.abs(hour).toString() +
                ':' +
                timeArr[1] +
                ' AM (' +
                logArr[0] +
                ')'
            )
        } else {
            return (
                Math.abs(hour).toString() +
                ':' +
                timeArr[1] +
                ' PM (' +
                logArr[0] +
                ')'
            )
        }
    }

    handleChartSelect = (val) => {
        this.setState({ timelineMode: val })
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
                                {convertUnix(this.props.latestReport.timestamp)}
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
                            <Row>
                                <Col lg={8}>
                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 24,
                                            marginBottom: 30,
                                        }}
                                    >
                                        Active Users
                                    </div>
                                    <div
                                        style={{
                                            position: 'relative',
                                            right: 30,
                                        }}
                                    >
                                        <UsageChart />
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 25,
                                            marginBottom: 25,
                                        }}
                                    >
                                        <ToggleButtonGroup
                                            type="radio"
                                            name="select"
                                            defaultValue={'day'}
                                            onChange={this.handleChartSelect}
                                        >
                                            <ToggleButton value={'day'}>
                                                24 Hours
                                            </ToggleButton>
                                            <ToggleButton value={'week'}>
                                                7 Days
                                            </ToggleButton>
                                            <ToggleButton value={'month'}>
                                                30 Days
                                            </ToggleButton>
                                            <ToggleButton value={'all'}>
                                                All Time
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
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
        latestReport: state.AccountReducer.latestReport,
        authenticated: state.AccountReducer.authenticated,
    }
}

export default connect(mapStateToProps)(Logs)
