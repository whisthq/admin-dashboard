import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { fetchUserReport } from '../../../actions/index.js'
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

import CustomerTable from './CustomerTable.js'

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
                        'Minutes online': element.minutes,
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
        this.setState({ timescale: val })
        this.props.dispatch(fetchUserReport(val, this.state.username))
    }

    render() {
        let format = 'MMM Do'

        return (
            <div>
                <p>Click on a customer to view their usage history.</p>
                <CustomerTable openModal={this.openModal} />
                <Popup
                    open={this.state.modalOpen}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                    modal
                    contentStyle={{
                        width: 600,
                        borderRadius: 5,
                        backgroundColor: 'white',
                        border: 'none',
                        padding: 30,
                    }}
                >
                    <div className=" d-flex justify-content-between">
                        <p
                            style={{
                                fontSize: 18,
                            }}
                        >
                            Usage stats for {this.state.username}
                        </p>
                        <div>
                            <ToggleButtonGroup
                                type="radio"
                                name="select"
                                defaultValue={'week'}
                                onChange={this.handleChartSelect}
                            >
                                {/* <ToggleButton value={'day'}>
                                    24 Hours
                                </ToggleButton> */}
                                <ToggleButton value={'week'}>
                                    7 Days
                                </ToggleButton>
                                <ToggleButton value={'month'}>
                                    30 Days
                                </ToggleButton>
                                {/* <ToggleButton value={'all'}>
                                    All Time
                                </ToggleButton> */}
                            </ToggleButtonGroup>
                        </div>
                    </div>
                    {this.state.activity ? (
                        this.state.activity.length ? (
                            <ResponsiveContainer height={150} width="100%">
                                <BarChart data={this.state.activity}>
                                    <XAxis
                                        dataKey="x"
                                        domain={
                                            this.state.timescale === 'week'
                                                ? [
                                                      moment()
                                                          .subtract('days', 7)
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
                                            moment(unixTime * 1000).format(
                                                format
                                            )
                                        }
                                        type="number"
                                        scale="time"
                                    />
                                    <YAxis
                                        dataKey="Minutes online"
                                        allowDecimals={false}
                                        tick={{
                                            fontSize: 12,
                                        }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            border: 'none',
                                            fontSize: 14,
                                        }}
                                        labelFormatter={(unixTime) =>
                                            moment(unixTime * 1000).format(
                                                format
                                            )
                                        }
                                    />
                                    <Bar
                                        dataKey="Minutes online"
                                        fill="#8884d8"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <p>No usage recorded for this period.</p>
                        )
                    ) : (
                        <p>NOT loaded</p>
                    )}
                </Popup>
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
