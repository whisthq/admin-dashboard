import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Logs from './Logs'

Enzyme.configure({ adapter: new Adapter() })

/*
Logs is an infinite scroll component where the items are logs. It should be searchable by keys in the logs.
Thus it will have an input (search bar) and two buttons (to search by the input and to search all). It also
should have a ticbox for bookmarked logs.

If there are no logs found it should tell you. If it is still loading it should show an icon. Otherwise, it should
display one log div per log. Inside each log elements should be ordered by rows and columns, though that logic would
better be served in another component. I will hold off on this until this file is more manageable.

On componentMount various fetches should be dispatched as well as a page change. On component update, the logs
should be analyzed, else the state should be changed to acknowledge their arrival (though note that this in itself
will change the state again, triggering analysis, maybe).

There is a function called flatMap which does .map for strings. It should be tested or removed.

*/

describe('<Logs />', () => {
    test('ensure a page change and data fetches were dispatched to redux on component mount', () => {
        // TODO
    })
    test('ensure flatMap works', () => {
        // TODO
    })
    test('on component update corresponding actions are taken', () => {
        // TODO
    })
    test('helper functions work', () => {
        // TODO
        // this can be split into more than one test
        // basically all the other declared properties/functions
        // since these are stateful (using Redux) we leave it till later
    })

    it('displays two buttons, one searchbar (input), and a star button', () => {
        // TODO not easy to test since it has state information which would rely on a Redux mock
    })

    // this cannot be tested since it is stateful (uses Redux) yet
    it('displays one log div per log', () => {
        // TODO (need to add classname so it's recognizeable)
    })

    // TODO seperate the individual logs into their own component file and then write tests for that
    // it should have various different things like a plot, some buttons, etcetera
})
