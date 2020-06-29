import React, { Component } from 'react'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { connect } from 'react-redux'
import moment from 'moment'
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts'

import { fetchUserReport } from 'actions/index.js'

import CustomerList from 'containers/DashboardContainer/AnalyticsPage/components/CustomerList'

class UserStats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            username: null,
            timescale: 'week',
            activity: null,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userReport !== this.props.userReport) {
            let activity = []
            if (this.props.userReport.length) {
                this.props.userReport.forEach((element) => {
                    activity.push({
                        x: element.timestamp,
                        'Time online': element.minutes,
                    })
                })
            }

            this.setState({ activity: activity })
        }
    }

    openModal = (username) => {
        this.setState({ modalOpen: true, username: username })
        this.props.dispatch(fetchUserReport(this.state.timescale, username))
    }

    closeModal = () => {
        this.setState({ modalOpen: false, timescale: 'week' })
    }

    handleChartSelect = (val) => {
        console.log(val)
        this.setState({ timescale: val })
        this.props.dispatch(fetchUserReport(val, this.state.username))
    }

    render() {
        let format = 'MMM Do'

        return (
            <div>
                {this.state.activity && this.state.activity.length > 0 ? (
                    <div
                        style={{
                            position: 'relative',
                            right: 40,
                        }}
                    >
                        <div style={{ textAlign: 'right' }}>
                            <ToggleButtonGroup
                                type="radio"
                                name="select"
                                defaultValue={'week'}
                            >
                                {/* <ToggleButton value={'day'}>
                                24 Hours
                            </ToggleButton> */}
                                <ToggleButton
                                    value={'week'}
                                    onClick={() =>
                                        this.handleChartSelect('week')
                                    }
                                >
                                    7 Days
                                </ToggleButton>
                                <ToggleButton
                                    value={'month'}
                                    onClick={() =>
                                        this.handleChartSelect('month')
                                    }
                                >
                                    30 Days
                                </ToggleButton>
                                {/* <ToggleButton value={'all'}>
                                All Time
                            </ToggleButton> */}
                            </ToggleButtonGroup>
                        </div>
                        <ResponsiveContainer height={300} width="100%">
                            <BarChart data={this.state.activity}>
                                <XAxis
                                    dataKey="x"
                                    domain={
                                        this.state.timescale === 'week'
                                            ? [
                                                  moment()
                                                      .subtract('days', 8)
                                                      .unix(),
                                                  Date.now() / 1000,
                                              ]
                                            : [
                                                  moment()
                                                      .subtract('months', 1)
                                                      .unix(),
                                                  Date.now() / 1000,
                                              ]
                                    }
                                    tick={{
                                        fontSize: 12,
                                        transform: 'translate(0, 10)',
                                    }}
                                    tickFormatter={(unixTime) =>
                                        moment(unixTime * 1000).format(format)
                                    }
                                    type="number"
                                    scale="time"
                                    dx={20}
                                />
                                <YAxis
                                    dataKey="Time online"
                                    allowDecimals={false}
                                    tick={{
                                        fontSize: 12,
                                    }}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        border: 'none',
                                        fontSize: 14,
                                    }}
                                    labelFormatter={(unixTime) =>
                                        moment(unixTime * 1000).format(format)
                                    }
                                />
                                <Bar
                                    dataKey="Time online"
                                    barSize={10}
                                    fill="#4636a6"
                                    formatter={(value, name, entry) =>
                                        Math.round(value / 60).toString() +
                                        'h ' +
                                        (value % 60).toString() +
                                        'm'
                                    }
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div
                        style={{
                            width: '100%',
                            height: 300,
                            textAlign: 'center',
                            paddingTop: 140,
                            background: '#f5f7fa',
                            fontWeight: 'bold',
                            borderRadius: 4,
                        }}
                    >
                        {!this.state.username || this.state.username === '' ? (
                            <div>Click on a user to view their data</div>
                        ) : (
                            <div>
                                No data available for {this.state.username}
                            </div>
                        )}
                    </div>
                )}
                <div style={{ marginTop: 50 }}>
                    <CustomerList openModal={this.openModal} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userReport: state.AccountReducer.userReport,
    }
}

export default connect(mapStateToProps)(UserStats)
