import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { PieChart, Pie, Cell } from 'recharts'

import { VMPieChart } from './VMPieChart'

// necessary for enzyme to work
Enzyme.configure({ adapter: new Adapter() })
/*
The VMPieChart uses ReCharts do siplay pretty pie chart circle edges with colors failure or success.

It should have a cell per color in a pie in a pie chart. It should take in props for deallocated, available,
unavailable, and location and then output their sum as the text above the location as well as a cell w/ color
per each of these props.
*/
describe('<VMPieChart />', () => {
    it('allows us to set props and will display correctly, displays both name and sum', () => {

        const wrapper = mount(<VMPieChart deallocated={3} available={2} unavailable={1} location="foo"/>)
        expect(wrapper.props().deallocated).toEqual(3)
        expect(wrapper.props().available).toEqual(2)
        expect(wrapper.props().unavailable).toEqual(1)
        expect(wrapper.props().location).toEqual("foo")

        expect(
            wrapper.containsAllMatchingElements([
                <text>6</text>, //sum of deallocated, available, and unavailable
                <text>foo</text>,
            ])
        ).toEqual(true)
    })

    it('has a pie in a pie chart with a cells per color', () => {
        const numColors = 3

        const wrapper = shallow(<VMPieChart />)
        expect(wrapper.find(PieChart)).toHaveLength(1)
        expect(wrapper.find(Pie)).toHaveLength(1)
        expect(wrapper.find(Cell)).toHaveLength(numColors)
    })

    it('maps each entry in data to a corresponding cell in a pie', () => {
        const colors = ['#bf3762', '#15d157', '#e2e620']
        const colorsRemaining = new Set(colors)

        const wrapper = mount(
            <VMPieChart
                deallocated={0}
                available={0}
                unavailable={0}
                location=""
             />
        )
        const foundCells = wrapper.find(Cell) // we checked in a previous test for the length
        
        foundCells.forEach((cell) => {
            let color = cell.prop("fill")
            color = color ? color : "" // undefined -> ""

            expect(colorsRemaining.has(color)).toEqual(true)
            colorsRemaining.delete(color)
        })

    })
})