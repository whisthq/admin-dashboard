import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Table } from 'antd'
import toJson from 'enzyme-to-json'

import { VMTable } from './VMTable'

Enzyme.configure({ adapter: new Adapter() })

/*
The VMTable is an ant-design table with custom buttons that have our own necessary functionality. It must display
a table and be able to fetch VM data and dispatch changes that need to be made.

Next time the code is updated please make it more legible.
*/
describe('<VMTable />', () => {
    // snapshot test
    it('renders correctly', () => {
        const wrapper = shallow(
            <VMTable
                // buncha dummy data
                vmsUpdated={false}
                vms_updating={[]}
                vms_info={[]}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(toJson(wrapper)).toMatchSnapshot()
    })

    test('vm_button helper is functional', () => {
        // TODO not possible to test until it is brought outside of the render() function
        // right now it's declared inside which is irritating and probably not optimal for performance
    })

    test('component mounts correctly with needed fetches and page change', () => {
        // TODO
    })
    test('component unmounts correctly', () => {
        // TODO
    })
    test('helpers work', () => {
        // TODO (this is optional)
        // this is less spec and more implementation, but you may want to use this test
        // or turn it into various tests to check whether your helper functions work
    })

    it('displays a table', () => {
        const wrapper = shallow(
            <VMTable
                // buncha dummy data
                vmsUpdated={false}
                vms_updating={[]}
                vms_info={[]}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(wrapper.find(Table)).toHaveLength(1)
    })
})
