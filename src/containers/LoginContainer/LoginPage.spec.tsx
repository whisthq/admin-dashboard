import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import { Login } from './LoginPage'

// necessary for enzyme to work
Enzyme.configure({ adapter: new Adapter() })

/*
A login page. Should have a login button and two inputs: one for the password and one for the username.
It should correctly update the state and dispatch (for middleware to call server) on login. It should remember
when it's failed and stuff to show you if you have some number of failed login attempts.
 */
describe('<Login />', () => {
    // snapshot test
    it('renders correctly', () => {
        const wrapper = shallow(
            <Login
                login_attempts={0}
                authenticated={false}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(toJson(wrapper)).toMatchSnapshot()
    })

    test('on component update it sets state correctly', () => {
        // TODO
    })
    test('helpers correctly dispatch and change state', () => {
        // TODO (optional) here to encourage you to test the helpers are necessary
    })

    it('displays two inputs and one button regardless of state', () => {
        let wrapper = shallow(
            <Login
                login_attempts={0}
                authenticated={false}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(wrapper.find(InputGroup)).toHaveLength(2)
        expect(wrapper.find(Button)).toHaveLength(1)
    })

    // TODO (stateful) check whether the loading icon properly shows when it's in the loading state
})
