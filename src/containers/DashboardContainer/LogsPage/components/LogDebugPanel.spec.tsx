import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toJson from 'enzyme-to-json'

import { LogDebugPanel } from './LogDebugPanel'

Enzyme.configure({ adapter: new Adapter() })

/*
The Log Debug panel is basically a small icon + text box in the log that tells us how many errors happened.
It depends purely on props. If it gets props and they have a corresponding filename it returns either a green
check with a message for no errors, or a red exclamation point with the error rate. If there is nothing (no logs)
for that sender (client or server) it displays an icon and helpful message.

If the props are null it displays a loading icon and says that it is loading.
 */
describe('<LogDebugPanel />', () => {
    // snapshot test
    it('renders correctly', () => {
        const wrapper = shallow(
            <LogDebugPanel
                // buncha dummy data
                dispatch={(items: any) => {
                    // mock
                }}
                title="title"
                filename="filename"
                username="user"
                sender="sender"
                connection_id="id"
                metric="metric"
                logAnalysis={{
                    user_id: {
                        sender: {
                            metric: {
                                output: [1], // not enough data to plot
                            },
                        },
                    },
                }}
            />
        )

        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('displays an icon (always)', () => {
        const wrapper = shallow(
            <LogDebugPanel
                // buncha dummy data
                dispatch={(items: any) => {
                    // mock
                }}
                title="title"
                filename="filename"
                username="user"
                sender="sender"
                connection_id="id"
                metric="metric"
                logAnalysis={{
                    user_id: {
                        sender: {
                            metric: {
                                output: [1], // not enough data to plot
                            },
                        },
                    },
                }}
            />
        )

        expect(wrapper.find(FontAwesomeIcon)).toHaveLength(1)
    })

    // TODO (optional) test for string matching messages
    // since we don't want to pin down the message in case we want to change it for now, we are keeping
    // from implementing it it this way
})
