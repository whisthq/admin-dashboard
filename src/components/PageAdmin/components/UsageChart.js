import React, { Component } from 'react'
import { fetchUserReport } from '../../../actions/index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import moment from 'moment'
import { Badge } from 'react-bootstrap'
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

class UsageChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: null,
            eastus: null,
            northcentralus: null,
            southcentralus: null,
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchUserReport())
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userReport !== this.props.userReport) {
            let total = [],
                eastus = [],
                northcentralus = [],
                southcentralus = []
            let component = this
            this.props.userReport.forEach((element) => {
                total.push({
                    x: component.getRequiredDateFormat(
                        new Date(element.timestamp * 1000),
                        'h A'
                    ),
                    'Number of users': element.users_online,
                })
                eastus.push({
                    x: component.getRequiredDateFormat(
                        new Date(element.timestamp * 1000),
                        'h A'
                    ),
                    'Number of users': element.eastus_unavailable,
                })
                northcentralus.push({
                    x: component.getRequiredDateFormat(
                        new Date(element.timestamp * 1000),
                        'h A'
                    ),
                    'Number of users': element.northcentralus_unavailable,
                })
                southcentralus.push({
                    x: component.getRequiredDateFormat(
                        new Date(element.timestamp * 1000),
                        'h A'
                    ),
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

    getRequiredDateFormat = (timeStamp, format = 'MM-DD-YYYY') => {
        return moment(timeStamp).format(format) + ' UTC'
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
        return (
            <div className={Style.usageChart}>
                <ResponsiveContainer height="100%" width="100%">
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
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }

    render() {
        if (this.state.total) {
            return (
                <div>
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
