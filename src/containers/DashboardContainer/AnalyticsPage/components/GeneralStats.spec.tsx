import React from 'react'
import Enzyme, { } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { GeneralStats } from './GeneralStats'

// necessary for enzyme to work
Enzyme.configure({ adapter: new Adapter() })

/*
GeneralStats should have a chart with four "chart-header" divs (for total, eastus, northcentralus, southcentralus).
It should also have a LineChart. These are both if this.state.total is not empty/undefined, in which case we should
expect to see a FontAwesomeIcon for loading. There are four togglebuttons for the headers.

On mount it should fetch the latest reports and on update it should update its data store accordingly. When you
select the chart you should be able to set a timescale, and the state dispatch should happen accordingly.
*/
describe('<GeneralStats />', () => {
    test('componentDidMount fetches reports', () => {
        // TODO
    })
    test('componentDidUpdate should rewrite its state accordingly', () => {
        // TODO
    })
    test('handleChartSelect should set the state accordingly and dispatch', () => {
        // TODO
    })

    // everything below also depeneds on redux state mocking for the interaction
    // and cannot be better tested until we have those (as above); these might be considered
    // "integration" tests

    it('displays an icon when there is nothing to display', () => {
        // TODO
    })
    it('displays a chart with four ToggleButton and four headers when there is something to display', () => {
        // TODO
    })
})
