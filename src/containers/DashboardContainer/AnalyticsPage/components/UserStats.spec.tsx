import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { UserStats } from './UserStats'

// necessary for enzyme to work
Enzyme.configure({ adapter: new Adapter() })

/*
UserStats is a chart with various users you can pick from below. The users below are CustomerList.
An openModal is passed but not used. The openModal and closeModal functions should work, changing the state
accordingly, as well as handleChartSelect. componentDidUpdate should respond by updating the chart activity.

If the activity has length 0 it should tell you to click on someone, and otherwise it should say that there is no
data for that person (because there is no activity.)

If there is an activity, it should have a <BarChart /> with one Bar and 3 (2 for now) ToggleButtons for each 
of the timescales. It should have one <Bar />.

Always there should be a <CustomerList />
*/
describe('<UserStats />', () => {
    test('openModal(username) opens the a modal and sets state correct, dispatches it correctly', () => {
        // TODO
    })
    test("closeModal() closes the modal setting state to {openModal : false, timescale : 'week'}", () => {
        // TODO
    })
    test('handleChartSelect sets state and dispatches fetchUserReport properly', () => {
        // TODO
    })
    test('componentDidUpdate updates state activity iff props.userReport changed (and sets empty activity if needed)', () => {
        // TODO
    })

    // everything below depends on length of activity depend on the Redux store
    // so we need to get the mocked redux store working before we can make these work

    it('displays a message with and no BarChart/Bar if activity length = 0', () => {
        // TODO
    })

    it('has a BarChart with non-empty activity.', () => {
        // really
    })

    it('has a Bar with non-empty activity', () => {
        // really
    })

    it('has two togglebuttons', () => {
        // really
    })

    it('has a CustomerList', () => {
        // really
    })
})
