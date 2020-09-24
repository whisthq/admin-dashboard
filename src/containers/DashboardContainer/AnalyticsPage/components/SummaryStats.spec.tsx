import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Card, Row, Col } from 'antd'
import toJson from 'enzyme-to-json'

import { SummaryStats } from './SummaryStats'

// necessary for enzyme to work
Enzyme.configure({ adapter: new Adapter() })

/*
SummaryStats should tell us about some summary stats (like total number of minutes, of signups, etcetera)
about customers and so forth. It will have one row with two columns. Each column has a card with a chunk of the
summary stats (one is minutes, one is signups).
*/
describe('<SummaryStats />', () => {
    // snapshot test
    it('renders correctly', () => {
        const wrapper = shallow(
            <SummaryStats
                totalMinutes={{
                    day: 0,
                }}
                totalSignups={{
                    day: 0,
                }}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(toJson(wrapper)).toMatchSnapshot()
    })

    test('componentDidMount fetches both minutes and signups', () => {
        // TODO
    })

    it('has one row and two columns and two cards', () => {
        const wrapper = shallow(
            <SummaryStats
                totalMinutes={{
                    day: 0,
                }}
                totalSignups={{
                    day: 0,
                }}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )
        expect(wrapper.find(Row)).toHaveLength(1)
        expect(wrapper.find(Col)).toHaveLength(2)
        expect(wrapper.find(Card)).toHaveLength(2)
    })
})
