import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import '../../../static/App.css'

import { fetchLatestReport } from '../../../actions/index.js'

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
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight })
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
