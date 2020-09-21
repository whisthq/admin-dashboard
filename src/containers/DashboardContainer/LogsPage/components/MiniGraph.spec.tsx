import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


import { MiniGraph } from './MiniGraph'

Enzyme.configure({ adapter: new Adapter() })

/*
The MiniGraph is a small graph that appears inside each log element in the big infinte scroll. It takes in
its plotted data from props (which if you go up far enough comes from Redux + middleware).

It needs at least two datapoints to plot since it is a line graph. If it can plot in has a line graph chart.
Otherwise, if there is no data it shows the icon and a loading message.
 */
describe('<MiniGraph />', () => {
    it('displays a message instead of a plot if there is not enough data', () => {
        // really
    })

    it('displays an icon and a message if it gets empty/null props', () => {
        // really
    })

    it('displays a plot if it gets chartable props', () => {
        // really
    })
})
