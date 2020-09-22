import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Table } from 'antd'

import { UserTable } from './UserTable'

Enzyme.configure({ adapter: new Adapter() })

/*
 */
describe('<UserTable />', () => {
    test('component mounts properly (fetches any data)', () => {
        // TODO
    })
    test('helper functions are functional (deleteUser, keywordFilter)', () => {
        // TODO (optional)
        // as usual this is here to encourage you to test your helper functions
    })

    it('displays the ant design table', () => {
        const wrapper = shallow(
            <UserTable
                // buncha dummy data
                userTable={[]}
                usersUpdated={true}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(wrapper.find(Table)).toHaveLength(1)
    })
})
