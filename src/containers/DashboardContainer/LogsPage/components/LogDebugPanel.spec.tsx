import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

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
    it('displays an icon (always)', () => {
        // really
    })

    it('displays loading + text if there is null props', () => {
        // really
    })

    it('displays error percent when there is a file and errors', () => {
        // really
    })

    it('displays a helpful message when there is no error', () => {
        // really
    })

    it('no logs when there are no logs', () => {
        // really
    })
})
