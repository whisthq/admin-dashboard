import React from 'react'
import { shallow } from 'enzyme'

import CustomerList from './CustomerList'
import SummaryStats from './SummaryStats'
import UserStats from './UserStats'
import VMPieChart from './VMPieChart'



/*
*/
describe('<SummaryStats />', () => {
    // do some tests
})

/*
*/
describe('<UserStats />', () => {
    // do some tests
})

/*
*/
describe('<CustomerList />', () => {
    test('ensure interval was set to correct value on component mount', () => {
        let interval = 60000; // counted in milliseconds, 60 * 1000 ms = 60 s = 1 minute
        // do something
    })

    test('ensure customer fetch was dispatched on component mount', () => {
        // do something
    })

    test('ensure customer fetch was dispatched on getUpdatedDatabase', () => {
        // do something
    })
    

})

/*
The VMPieChart uses ReCharts do siplay pretty pie chart circle edges with colors failure or success.
*/
describe('<VMPieChart />', () => {
    it('shows the total sum of VMs as the count', () => {
        // do something
    })

    it('maps each entry in data to a corresponding cell', () => {
        let colors = ['#bf3762', '#15d157', '#e2e620']
        // do something
    })
})