/*
A log entry is a log entry that a minigraph, buttons to bookmark/trash, links to the client and server raw logs,
a count of the number of errors, and some average analytics like decode time etcetera.
*/

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

import { LogEntry } from './LogEntry'

Enzyme.configure({ adapter: new Adapter() })

describe('<LogEntry />', () => {
    // snapshot test
    it('renders correctly', () => {
        const wrapper = shallow(
            <LogEntry
                // buncha dummy data
                dispatch={(items: any) => {
                    // mock
                }}
                value = {{}}
                logs_object={null}
            />
        )

        expect(toJson(wrapper)).toMatchSnapshot()
    })

    // FIXME
})
