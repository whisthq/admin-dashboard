import React, { Component } from 'react'
import { fetchUserReport } from '../../../actions/index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import moment from 'moment'
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import {
    LineChart,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts'

import Style from '../../../styles/components/analytics.module.css'

// https://devhints.io/moment
// https://github.com/recharts/recharts/issues/956#issuecomment-339279600

class UsageChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: null,
            eastus: null,
            northcentralus: null,
            southcentralus: null,
            timescale: 'day',
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchUserReport(this.state.timescale))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userReport !== this.props.userReport) {
            let total = [],
                eastus = [],
                northcentralus = [],
                southcentralus = []

            this.props.userReport.forEach((element) => {
                total.push({
                    x: element.timestamp,
                    'Number of users': element.users_online,
                })
                eastus.push({
                    x: element.timestamp,
                    'Number of users': element.eastus_unavailable,
                })
                northcentralus.push({
                    x: element.timestamp,
                    'Number of users': element.northcentralus_unavailable,
                })
                southcentralus.push({
                    x: element.timestamp,
                    'Number of users': element.southcentralus_unavailable,
                })
            })
            this.setState({
                total: total,
                eastus: eastus,
                northcentralus: northcentralus,
                southcentralus: southcentralus,
            })
        }
    }

    handleChartSelect = (val) => {
        this.setState({ timescale: val })
        this.props.dispatch(fetchUserReport(val))
        console.log(val)
    }

    chartElement = (userType) => {
        let dataList = null
        switch (userType) {
            case 'total':
                dataList = this.state.total
                break
            case 'eastus':
                dataList = this.state.eastus
                break
            case 'northcentralus':
                dataList = this.state.northcentralus
                break
            case 'southcentralus':
                dataList = this.state.southcentralus
                break
            default:
                dataList = this.state.total
        }
        let format = 'MMM Do'
        if (this.state.timescale === 'day') {
            format = 'h A'
        } else {
            format = 'MMM Do'
        }

        return (
            <ResponsiveContainer height={100} width="100%">
                <LineChart data={dataList}>
                    <Line
                        type="monotone"
                        dataKey="Number of users"
                        dot={false}
                        strokeWidth={2}
                        stroke="#8884d8"
                    />
                    <XAxis
                        dataKey="x"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fontSize: 12,
                            transform: 'translate(0, 10)',
                        }}
                        domain={['auto', 'auto']}
                        tickFormatter={(unixTime) =>
                            moment(unixTime * 1000).format(format)
                        }
                        type="number"
                        scale="time"
                    />
                    <YAxis
                        dataKey="Number of users"
                        axisLine={false}
                        tickLine={false}
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
                            moment(unixTime * 1000).format(format)
                        }
                    />
                </LineChart>
            </ResponsiveContainer>
        )
    }

    render() {
        if (this.state.total) {
            return (
                <div>
                    <div className=" d-flex justify-content-between">
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: 24,
                                marginBottom: 30,
                            }}
                        >
                            Active Users
                        </div>
                        <div>
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
                                {/* <ToggleButton value={'all'}>
                                    All Time
                                </ToggleButton> */}
                            </ToggleButtonGroup>
                        </div>
                    </div>
                    <p>Total</p>
                    {this.chartElement('total')}
                    <p>Eastus</p>
                    {this.chartElement('eastus')}
                    <p>Northcentralus</p>
                    {this.chartElement('northcentralus')}
                    <p>Southcentralus</p>
                    {this.chartElement('southcentralus')}
                </div>
            )
        } else {
            return (
                <div>
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        userReport: state.AccountReducer.userReport,
    }
}

export default connect(mapStateToProps)(UsageChart)
