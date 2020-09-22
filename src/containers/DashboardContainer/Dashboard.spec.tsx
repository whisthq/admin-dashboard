import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import { Admin } from './Dashboard'

import { DashboardMenu } from './DashboardMenu'

Enzyme.configure({ adapter: new Adapter() })

/*
The admin should render a switch to the four components it can display and a <DashboardMenu />.
It should also have a logout button.
 */
describe('<Admin />', () => {
    // snapshot test
    it('renders correctly', () => {
        const wrapper = shallow(
            <Admin
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(toJson(wrapper)).toMatchSnapshot()
    })

    test('check that componentDidMount fetches user activity', () => {
        //TODO
    })
    test('check that componentDidMount sets the date', () => {
        // TODO
    })
    test('updateWindowdimensions() sets state based on window.*', () => {
        // TODO
    })

    it('renders a DashboardMenu', () => {
        const wrapper = shallow(
            <Admin
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )
        expect(wrapper.find(DashboardMenu)).toHaveLength(1)
    })

    it('renders one <Switch /> components', () => {
        const wrapper = shallow(
            <Admin
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )
        expect(wrapper.find(Switch)).toHaveLength(1)
    })

    it('renders four <Route /> components', () => {
        const wrapper = shallow(
            <Admin
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )
        expect(wrapper.find(Route)).toHaveLength(4)
    })

    it('renders the logout button', () => {
        const wrapper = shallow(
            <Admin
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )
        expect(wrapper.find(Button)).toHaveLength(1)
    })
})
