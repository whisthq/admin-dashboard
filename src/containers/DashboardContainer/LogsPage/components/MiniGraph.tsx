import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts'

import 'react-tabs/style/react-tabs.css'

import '../../../../static/App.css'

export class MiniGraph extends React.Component<any, any> {
    render() {
        // these exist for readability
        let filename = this.props.filename
        let log_analysis = this.props.log_analysis
        let metric = this.props.metric
        let sender = this.props.sender
        let connection_id = this.props.connection_id

        if (
            !filename ||
            (log_analysis &&
                log_analysis[connection_id] &&
                log_analysis[connection_id][sender] &&
                log_analysis[connection_id][sender][metric])
        ) {
            if (
                !filename ||
                log_analysis[connection_id][sender][metric].output.length < 2
            ) {
                return (
                    <div
                        style={{
                            paddingLeft: 10,
                            width: 300,
                        }}
                    >
                        <div
                            style={{
                                fontWeight: 'bold',
                                marginBottom: 10,
                                marginTop: 10,
                            }}
                        >
                            {this.props.title}
                        </div>
                        <div style={{ fontSize: 13, marginTop: 10 }}>
                            Not enough data to plot
                        </div>
                    </div>
                )
            } else {
                let mainPath = log_analysis[connection_id][sender][metric]
                return (
                    <div>
                        <div
                            style={{
                                fontWeight: 'bold',
                                marginBottom: 10,
                                marginTop: 10,
                                paddingLeft: 10,
                            }}
                        >
                            {this.props.title}
                        </div>
                        <div
                            style={{
                                position: 'relative',
                                right: 30,
                            }}
                        >
                            <div
                                style={{
                                    paddingLeft: 40,
                                    fontSize: 12,
                                    marginBottom: 10,
                                }}
                            >
                                Mean:{' '}
                                {(
                                    mainPath.summary_statistics.mean *
                                    this.props.scale
                                )
                                    .toFixed(1)
                                    .toString()}{' '}
                                {this.props.unit}, Median:{' '}
                                {(
                                    mainPath.summary_statistics.median *
                                    this.props.scale
                                )
                                    .toFixed(1)
                                    .toString()}{' '}
                                {this.props.unit}, Std:{' '}
                                {(
                                    mainPath.summary_statistics
                                        .standard_deviation * this.props.scale
                                )
                                    .toFixed(1)
                                    .toString()}{' '}
                            </div>
                            <ResponsiveContainer width={'100%'} height={150}>
                                <LineChart
                                    data={mainPath.output}
                                    syncId="usageChart"
                                >
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        dot={false}
                                        strokeWidth={2}
                                        stroke="#8884d8"
                                    />
                                    <YAxis
                                        dataKey="value"
                                        axisLine={false}
                                        tickLine={false}
                                        allowDecimals={false}
                                        tick={{
                                            fontSize: 12,
                                        }}
                                        tickFormatter={(element) => {
                                            if (Number(element) > 10000) {
                                                return (
                                                    (
                                                        Number(element) / 1000
                                                    ).toString() + 'K'
                                                )
                                            } else {
                                                return element.toString()
                                            }
                                        }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            border: 'none',
                                            fontSize: 14,
                                        }}
                                        labelFormatter={(element) => {
                                            if (!mainPath.output[element]) {
                                                return 'Time: N/A'
                                            }
                                            return 'Time: '.concat(
                                                mainPath.output[element].time
                                            )
                                        }}
                                        formatter={(value: any) =>
                                            value
                                                .toFixed(2)
                                                .toString()
                                                .concat(' ', this.props.unit)
                                        }
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div
                    style={{
                        paddingLeft: 10,
                        width: 300,
                    }}
                >
                    <div
                        style={{
                            fontWeight: 'bold',
                            marginBottom: 10,
                            marginTop: 10,
                        }}
                    >
                        {this.props.title}
                    </div>
                    <div style={{ fontSize: 13 }}>
                        <FontAwesomeIcon
                            icon={faCircleNotch}
                            spin
                            style={{
                                marginRight: 10,
                                fontSize: 12,
                                color: '#4b3ba8',
                            }}
                        />
                        Calculating {this.props.title}
                    </div>
                </div>
            )
        }
    }
}

export default MiniGraph
