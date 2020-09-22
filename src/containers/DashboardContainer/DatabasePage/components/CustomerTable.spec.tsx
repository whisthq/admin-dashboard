import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Table } from 'antd'
import toJson from 'enzyme-to-json'

import { CustomerTable } from './CustomerTable'

Enzyme.configure({ adapter: new Adapter() })

/*
CustomerTable is an antd table (ant design) that should be able to fetch and dispatch actions regarding customer
parameters. Right now this is read only I believe.
 */
describe('<CustomerTable />', () => {
    // snapshot test
    it('renders correctly', () => {
        const wrapper = shallow(
            <CustomerTable
                // buncha dummy data
                customers={[]}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(toJson(wrapper)).toMatchSnapshot()
    })

    test('component mounts properly (sets interval, fetches any data)', () => {
        // TODO
    })
    test('component dismounts properly (clears interval)', () => {
        // TODO
    })
    test('component update can fetch and change state, resets counter for interval', () => {
        // TODO
    })
    test('helper functions are functional', () => {
        // TODO (optional)
        // as usual this is here to encourage you to test your helper functions
    })

    it('displays the ant design table', () => {
        const wrapper = shallow(
            <CustomerTable
                // buncha dummy data
                customers={[]}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(wrapper.find(Table)).toHaveLength(1)
    })
})
