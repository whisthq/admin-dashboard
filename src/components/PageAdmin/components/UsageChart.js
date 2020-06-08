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
    Tooltip
} from 'recharts';

import Style from '../../../styles/components/analytics.module.css'

// https://devhints.io/moment

class UsageChart extends Component {
    constructor(props) {
        super(props)
        this.state = { dataList: null }
    }

    componentDidMount() {
        this.props.dispatch(fetchUserReport())
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userReport !== this.props.userReport) {
            let data = []
            this.props.userReport.forEach((element) => {
                data.push({
                    x: new Date(element.timestamp * 1000),
                    y: element.users_online,
                })
            })
            this.setState({ dataList: data })
        }
    }

    getRequiredDateFormat = (timeStamp, format = 'MM-DD-YYYY') => {
        return moment(timeStamp).format(format) + " UTC"
    }
    
    render() {
        if (this.state.dataList) {
            let component = this;
            this.state.dataList = this.state.dataList.map(function(el, index, arr) {
                var curr_x = component.getRequiredDateFormat(el.x, 'h A');
                if(index > 0) {
                    var prev_x = component.getRequiredDateFormat(arr[index - 1].x, 'h A');
                    if(curr_x !== prev_x) {
                        return {
                            'x': curr_x,
                            'Number of users': el.y
                        }
                    }
                } else {
                    return {
                        'x': curr_x,
                        'Number of users': el.y
                    }  
                }
            }).filter(function(x) {
                return x !== undefined;
            })

            return (
                <div className={Style.usageChart}>
                    <ResponsiveContainer height='100%' width='100%'>
                        <LineChart 
                            data={this.state.dataList}
                        >
                            <Line 
                                type="monotone" 
                                dataKey="Number of users" 
                                dot={false}
                                strokeWidth={2}    
                                stroke="#8884d8" 
                            />
                            <XAxis 
                                dataKey = "x" 
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 12,
                                    transform: 'translate(0, 10)'
                                }}
                            />
                            <YAxis 
                                dataKey = "Number of users" 
                                axisLine={false}
                                tickLine={false}
                                allowDecimals={false}
                                tick={{
                                    fontSize: 12
                                }}
                            />
                            <Tooltip 
                                contentStyle = {{
                                    border: "none",
                                    fontSize: 14
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
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
