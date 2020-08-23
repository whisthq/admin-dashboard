import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'

import '../../../../static/App.css'

class VMPieChart extends Component {
    render() {
        const data = [
            { name: 'Deallocated', value: this.props.deallocated },
            { name: 'Running Available', value: this.props.available },
            { name: 'Running Unavailable', value: this.props.unavailable },
        ]
        const colors = ['#bf3762', '#15d157', '#e2e620']
        return (
            <div>
                <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                        <text
                            x={100}
                            y={85}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                                fontSize: 40,
                                fontWeight: 'bold',
                            }}
                        >
                            {this.props.deallocated +
                                this.props.available +
                                this.props.unavailable}
                        </text>
                        <text
                            x={100}
                            y={125}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#777777',
                            }}
                        >
                            {this.props.location}
                        </text>
                        <Pie data={data} dataKey="value" innerRadius={70}>
                            {data.map((entry, index) => (
                                <Cell fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default connect()(VMPieChart)
