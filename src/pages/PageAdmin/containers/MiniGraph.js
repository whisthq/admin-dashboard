import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts'

import 'react-tabs/style/react-tabs.css'

import 'static/App.css'

class MiniGraph extends Component {
    render() {
        if (
            !this.props.filename ||
            (this.props.log_analysis &&
                this.props.log_analysis[
                    this.props.username.concat('_', this.props.connection_id)
                ] &&
                this.props.log_analysis[
                    this.props.username.concat('_', this.props.connection_id)
                ][this.props.sender] &&
                this.props.log_analysis[
                    this.props.username.concat('_', this.props.connection_id)
                ][this.props.sender][this.props.metric])
        ) {
            if (
                !this.props.filename ||
                this.props.log_analysis[
                    this.props.username.concat('_', this.props.connection_id)
                ][this.props.sender][this.props.metric].output.length < 2
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
                                marginTop: 10,
                            }}
                        >
                            <ResponsiveContainer width={'100%'} height={150}>
                                <LineChart
                                    data={
                                        this.props.log_analysis[
                                            this.props.username.concat(
                                                '_',
                                                this.props.connection_id
                                            )
                                        ][this.props.sender][this.props.metric]
                                            .output
                                    }
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
                                            return 'Time: '.concat(
                                                this.props.log_analysis[
                                                    this.props.username.concat(
                                                        '_',
                                                        this.props.connection_id
                                                    )
                                                ][this.props.sender][
                                                    this.props.metric
                                                ].output[element].time
                                            )
                                        }}
                                        formatter={(value) =>
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
