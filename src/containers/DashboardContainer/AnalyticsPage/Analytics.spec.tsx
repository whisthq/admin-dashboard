import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Row, Col } from 'react-bootstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import toJson from 'enzyme-to-json'

import { Analytics } from './Analytics'

import VMPieChart from './components/VMPieChart'
import UserStats from './components/UserStats'
import GeneralStats from './components/GeneralStats'
import SummaryStats from './components/SummaryStats'

// necessary for enzyme to work
Enzyme.configure({ adapter: new Adapter() })

/*
The Analytics component renders the ANALYTICS page in the dashboard.

It must have two horizontally aligned components: on the left there is are tabs which display
sub-components and on the right there are three VM pie charts that display labels for the regions with the
total number of deallocated, unavailable, and available numbers of VMs passed as props. The order of
these pie charts does not matter but the correct label should correspond to its pie chart.
*/

describe('<Analytics />', () => {
    // snapshot test
    it('renders correctly', () => {
        const wrapper = shallow(
            <Analytics
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(toJson(wrapper)).toMatchSnapshot()
    })

    test('ensure page change was dispatched to redux on component mount', () => {
        // TODO
    })

    it('renders a row with two cols', () => {
        const wrapper = shallow(
            <Analytics
                dispatch={(items: any) => {
                    // mock
                }}
                latest_report={{
                    eastus_deallocated: 0,
                    eastus_unavailable: 0,
                    eastus_available: 0,
                    northcentralus_deallocated: 0,
                    northcentralus_unavailable: 0,
                    northcentralus_available: 0,
                    southcentralus_deallocated: 0,
                    southcentralus_unavailable: 0,
                    southcentralus_available: 0,
                }}
            />
        )
        expect(wrapper.find(Row)).toHaveLength(1)
        expect(wrapper.find(Col)).toHaveLength(2)
    })

    it('renders the three tabs with general stats, user stats, summary stats', () => {
        const wrapper = shallow(
            <Analytics
                dispatch={(items: any) => {
                    // mock
                }}
                latest_report={{
                    eastus_deallocated: 0,
                    eastus_unavailable: 0,
                    eastus_available: 0,
                    northcentral_deallocated: 0,
                    northcentral_unavailable: 0,
                    northcentral_available: 0,
                    southcentral_deallocated: 0,
                    southcentral_unavailable: 0,
                    southcentral_available: 0,
                }}
            />
        )

        expect(wrapper.find(Tabs)).toHaveLength(1)

        expect(wrapper.find(TabList)).toHaveLength(1)
        expect(wrapper.find(Tab)).toHaveLength(3)

        // each of the tab panel can be a loading screen inside the component, but not here
        expect(wrapper.find(TabPanel)).toHaveLength(3)

        expect(wrapper.find(UserStats)).toHaveLength(1)
        expect(wrapper.find(SummaryStats)).toHaveLength(1)
        expect(wrapper.find(GeneralStats)).toHaveLength(1)
    })

    it('renders three vm pie charts', () => {
        const wrapper = shallow(
            <Analytics
                dispatch={(items: any) => {
                    // mock
                }}
                latest_report={{
                    eastus_deallocated: 0,
                    eastus_unavailable: 0,
                    eastus_available: 0,
                    northcentral_deallocated: 0,
                    northcentral_unavailable: 0,
                    northcentral_available: 0,
                    southcentral_deallocated: 0,
                    southcentral_unavailable: 0,
                    southcentral_available: 0,
                }}
            />
        )
        expect(wrapper.find(VMPieChart)).toHaveLength(3)
    })

    it('renders the correct labels for the pie charts', () => {
        const labels = ['Eastus', 'Northcentralus', 'Southcentralus']
        const remainingLabels = new Set(labels)

        const wrapper = shallow(
            <Analytics
                dispatch={(items: any) => {
                    // mock
                }}
                latest_report={{
                    eastus_deallocated: 0,
                    eastus_unavailable: 0,
                    eastus_available: 0,
                    northcentral_deallocated: 0,
                    northcentral_unavailable: 0,
                    northcentral_available: 0,
                    southcentral_deallocated: 0,
                    southcentral_unavailable: 0,
                    southcentral_available: 0,
                }}
            />
        )
        wrapper.find(VMPieChart).forEach((vmPieChart) => {
            let location = vmPieChart.prop('location')
            expect(remainingLabels.has(location)).toEqual(true)
            remainingLabels.delete(location)
        })
    })
})
