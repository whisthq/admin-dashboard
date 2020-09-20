import React from 'react';
import { shallow } from 'enzyme';

import Analytics from "./Analytics"

/*
The Analytics component renders the ANALYTICS page in the dashboard.

It must have two horizontally aligned components: on the left there is are tabs which display
sub-components and on the right there are three VM pie charts that display labels for the regions with the
total number of deallocated, unavailable, and available numbers of VMs passed as props. The order of
these pie charts does not matter but the correct label should correspond to its pie chart.
*/

describe('<Analytics />', () => {
    test('ensure page change was dispatched to redux on component mount', () => {
        // do something
    })

    it('renders a row with two cols', () => {
        // do something
    })

    it('renders the three tabs: general stats, user stats, summary stats', () => {
        // do something
    });

    it('renders three vm pie charts', () => {
        // do something
    })

    it('renders the correct labels for the pie charts', () => {
        let labels = ['Eastus', 'Northcentralus', 'Southcentralus'];
    })
})