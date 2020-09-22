import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Table } from 'antd'

import { DiskTable } from './DiskTable'

Enzyme.configure({ adapter: new Adapter() })

/*
The DiskTable is similar to other tables. It will display an ant design table with different disks. These
will have different colors/information based on branch and whatnot. It dispatches instructions when changes
are made to disks (I think) and fetches disk data from the main webserver.
 */
describe('<DiskTable />', () => {
    test('component mounts properly (sets interval, fetches any data)', () => {
        // TODO
    })
    test('component dismounts properly (clears interval)', () => {
        // TODO
    })
    test('component update can fetch and change state, resets counter for interval', () => {
        // TODO
    })
    test('helper functions are functional (toggle stun, other controls, etcetera)', () => {
        // TODO (optional)
        // as usual this is here to encourage you to test your helper functions
    })

    it('displays the ant design table', () => {
        const wrapper = shallow(
            <DiskTable
                // buncha dummy data
                disk_info={[]}
                disks_fetched={true}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(wrapper.find(Table)).toHaveLength(1)
    })

    it('branchToggle properly generates the three colorful divs for each branch', () => {
        // TODO can't test until we move this helper method out of render()
    })
})
