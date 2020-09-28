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
                value={{
                    server_logs: 'server_logs',
                    client_logs: 'client_logs',
                    user_id: 'user_id',
                    connection_id: 'connection_id',
                }}
                log_analysis={{}}
                bookmarked_logs={[]}
                bookmarkLogs={(args: any) => {}}
                copyLink={(args: any) => {}}
                deleteLogs={(args: any) => {}}
            />
        )

        expect(toJson(wrapper)).toMatchSnapshot()
    })

    // TODO (adriano) add tests for functionality given the callbacks passed as
    // props and so on
})
