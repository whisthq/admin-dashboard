import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import '../../../static/App.css'

import { fetchLatestReport } from '../../../actions/index.js'

import UsageChart from './UsageChart.js'

class GeneralStats extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchLatestReport())
    }

    render() {
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
