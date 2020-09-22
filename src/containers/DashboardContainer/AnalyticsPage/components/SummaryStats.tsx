import React from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'antd'

import 'antd/dist/antd.css'

import { fetchTotalSignups, fetchTotalMinutes } from '../../../../actions/index'

class SummaryStats extends React.Component<any, any> {
    componentDidMount() {
        this.props.dispatch(fetchTotalSignups())
        this.props.dispatch(fetchTotalMinutes())
    }

    render() {
        return (
            <div>
                <p
                    style={{
                        fontWeight: 'bold',
                        fontSize: 24,
                    }}
                >
                    Summary
                </p>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            title="Total Session length"
                            size="small"
                            loading={this.props.totalMinutes == null}
                        >
                            {this.props.totalMinutes !== null && (
                                <div>
                                    <p>
                                        Past day:{' '}
                                        <strong>
                                            {Math.round(
                                                this.props.totalMinutes['day'] /
                                                    60
                                            ).toString() +
                                                'h ' +
                                                (
                                                    this.props.totalMinutes[
                                                        'day'
                                                    ] % 60
                                                ).toString() +
                                                'm'}
                                        </strong>
                                    </p>
                                    <p>
                                        Past week:{' '}
                                        <strong>
                                            {Math.round(
                                                this.props.totalMinutes[
                                                    'week'
                                                ] / 60
                                            ).toString() +
                                                'h ' +
                                                (
                                                    this.props.totalMinutes[
                                                        'week'
                                                    ] % 60
                                                ).toString() +
                                                'm'}
                                        </strong>
                                    </p>
                                    <p>
                                        Past month:{' '}
                                        <strong>
                                            {Math.round(
                                                this.props.totalMinutes[
                                                    'month'
                                                ] / 60
                                            ).toString() +
                                                'h ' +
                                                (
                                                    this.props.totalMinutes[
                                                        'month'
                                                    ] % 60
                                                ).toString() +
                                                'm'}
                                        </strong>
                                    </p>
                                </div>
                            )}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title="Number of signups"
                            size="small"
                            loading={this.props.totalSignups == null}
                        >
                            {this.props.totalSignups !== null && (
                                <div>
                                    <p>
                                        Past day:{' '}
                                        <strong>
                                            {this.props.totalSignups['day']}
                                        </strong>
                                    </p>
                                    <p>
                                        Past week:{' '}
                                        <strong>
                                            {this.props.totalSignups['week']}
                                        </strong>
                                    </p>
                                    <p>
                                        Past month:{' '}
                                        <strong>
                                            {this.props.totalSignups['month']}
                                        </strong>
                                    </p>
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        totalSignups: state.AccountReducer.totalSignups,
        totalMinutes: state.AccountReducer.totalMinutes,
    }
}

export default connect(mapStateToProps)(SummaryStats)
