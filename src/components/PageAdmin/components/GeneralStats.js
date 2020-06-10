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
                <Col lg={12}>
                    <UsageChart />
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
