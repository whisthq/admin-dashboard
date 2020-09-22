import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { LineChart } from 'recharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MiniGraph } from './MiniGraph'

Enzyme.configure({ adapter: new Adapter() })

/*
The MiniGraph is a small graph that appears inside each log element in the big infinte scroll. It takes in
its plotted data from props (which if you go up far enough comes from Redux + middleware).

It needs at least two datapoints to plot since it is a line graph. If it can plot in has a line graph chart.
Otherwise, if there is no data it shows the icon and a loading message.
 */
describe('<MiniGraph />', () => {
    it('displays an icon and a message if it gets empty/null props', () => {
        const wrapper = shallow(
            <MiniGraph
                // buncha dummy data
                filename={false} // should short-circuit on the first if statement
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

        expect(wrapper.find(LineChart)).toHaveLength(0)
        expect(wrapper.find(FontAwesomeIcon)).toHaveLength(1)
    })

    it('displays a message instead of a plot if there is not enough data', () => {
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

        expect(wrapper.find(LineChart)).toHaveLength(0)
        expect(wrapper.find('div')).toHaveLength(3) // a div containing one with the title and one with a message
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
                logAnalysis={{
                    user_id: {
                        sender: {
                            metric: {
                                output: [1, 2, 3],
                            },
                        },
                    },
                }}
            />
        )

        expect(wrapper.find(LineChart)).toHaveLength(1)
    })
})
