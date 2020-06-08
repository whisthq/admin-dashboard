import React, { Component } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { fetchUserReport } from '../../../actions/index.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import moment from 'moment'
import { Badge } from 'react-bootstrap'

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
            this.props.userReport.forEach((element) => {
                total.push({
                    x: new Date(element.timestamp * 1000),
                    y: element.users_online,
                })
                eastus.push({
                    x: new Date(element.timestamp * 1000),
                    y: element.eastus_unavailable,
                })
                northcentralus.push({
                    x: new Date(element.timestamp * 1000),
                    y: element.northcentralus_unavailable,
                })
                southcentralus.push({
                    x: new Date(element.timestamp * 1000),
                    y: element.southcentralus_unavailable,
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
        return moment(timeStamp).format(format)
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
                <ResponsiveLine
                    data={[
                        {
                            id: 'Read',
                            data: dataList,
                        },
                    ]}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10,
                    }}
                    yScale={{
                        type: 'linear',
                        stacked: false,
                    }}
                    xScale={{
                        type: 'time',
                        format: 'native',
                    }}
                    axisBottom={null}
                    axisLeft={null}
                    enableGridY={false}
                    colors={{ scheme: 'nivo' }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    enableArea={true}
                    enableSlices="x"
                    sliceTooltip={({ slice }) => {
                        const date = slice.points[0].data.xFormatted
                        return (
                            <Badge variant="light">
                                <div className={Style.chartTooltipDiv}>
                                    <strong className="pr-2">
                                        {`${this.getRequiredDateFormat(
                                            date,
                                            'h A'
                                        )}`}
                                    </strong>
                                    {slice.points.map((point) => (
                                        <div key={point.id}>
                                            <strong
                                                style={{
                                                    color: point.serieColor,
                                                }}
                                            >
                                                {`${point.data.yFormatted}`}
                                            </strong>
                                        </div>
                                    ))}
                                </div>
                            </Badge>
                        )
                    }}
                />
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
