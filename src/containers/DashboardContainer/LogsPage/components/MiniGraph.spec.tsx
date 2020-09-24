import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { LineChart } from 'recharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toJson from 'enzyme-to-json'

import { MiniGraph } from './MiniGraph'

Enzyme.configure({ adapter: new Adapter() })

/*
The MiniGraph is a small graph that appears inside each log element in the big infinte scroll. It takes in
its plotted data from props (which if you go up far enough comes from Redux + middleware).

It needs at least two datapoints to plot since it is a line graph. If it can plot in has a line graph chart.
Otherwise, if there is no data it shows the icon and a loading message.
 */
describe('<MiniGraph />', () => {
    // snapshot test
    it('renders correctly', () => {
        const wrapper = shallow(
            <MiniGraph
                // buncha dummy data
                dispatch={(items: any) => {
                    // mock
                }}
                title="title"
                username="user"
                sender="sender"
                connection_id="id"
                metric="metric"
                logAnalysis={null}
            />
        )

        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('displays an icon and a message if it gets filename, but no data props', () => {
        const wrapper = shallow(
            <MiniGraph
                // buncha dummy data
                dispatch={(items: any) => {
                    // mock
                }}
                filename="filename"
                title="title"
                username="user"
                sender="sender"
                connection_id="id"
                metric="metric"
            />
        )

        expect(wrapper.find(LineChart)).toHaveLength(0)
        expect(wrapper.find(FontAwesomeIcon)).toHaveLength(1)
        expect(wrapper.find('div')).toHaveLength(3)
    })

    it('displays a message instead of a plot if there is not enough data or null/empty data', () => {
        const wrapper = shallow(
            <MiniGraph
                // buncha dummy data
                dispatch={(items: any) => {
                    // mock
                }}
                title="title"
                filename="filename"
                username="user"
                sender="sender"
                connection_id="id"
                metric="metric"
                logAnalysis={{
                    user_id: {
                        sender: {
                            metric: {
                                output: [1], // not enough data to plot
                            },
                        },
                    },
                }}
            />
        )

        const otherWrapper = shallow(
            <MiniGraph
                // buncha dummy data
                dispatch={(items: any) => {
                    // mock
                }}
                title="title"
                username="user"
                sender="sender"
                connection_id="id"
                metric="metric"
            />
        )

        expect(otherWrapper.find(LineChart)).toHaveLength(0)
        expect(otherWrapper.find(FontAwesomeIcon)).toHaveLength(0)
        expect(otherWrapper.find('div')).toHaveLength(3) // a div containing one with the title and one with a message
    })

    it('displays a plot if it gets chartable props', () => {
        const wrapper = shallow(
            <MiniGraph
                // buncha dummy data
                filename="filename"
                dispatch={(items: any) => {
                    // mock
                }}
                title="title"
                username="user"
                sender="sender"
                connection_id="id"
                metric="metric"
                log_analysis={{
                    user_id: {
                        sender: {
                            metric: {
                                output: [
                                    { x: 0, y: 0 },
                                    { x: 1, y: 1 },
                                    { x: 2, y: 2 },
                                ],
                                summary_statistics: {
                                    mean: 0,
                                },
                            },
                        },
                    },
                }}
            />
        )

        expect(wrapper.find(LineChart)).toHaveLength(1)
    })
})
