import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Database } from './Database'

Enzyme.configure({ adapter: new Adapter() })

/*
The Database is basically a table with tabs that have various differnet properties. There should be a <Tabs> with
four TabPanels and four <Tab> elements in a TabList. There is one for the VMTable, one for the DiskTable, one for
the UserTable, and one for the CustomerTable. We must make sure that each of these show up. Everything else is 
just styling.

On component mount we simply need user activity to be fetched and the page to be changed (not sure about user activity
being fetched). When the component updates we need fetches for the user table or something like that and the state to
be set properly. These are not clear if they are necessary since it appears that the tables handle it so we won't
provide test bodies.
*/

describe('<Database />', () => {
    test('ensure componentDidMount fetches necessary data and dispatchs page changes', () => {
        // TODO
    })
    test('ensure componentDidUpdate fetches necessary data and dispatches state information', () => {
        // TODO
    })
    // TODO it may be nice to test the helper method to delete users, but I'm not sure its used

    it('displays a tablist with four tabs and then four tab panels all in a <Tabs>', () => {
        // really
    })

    it('contains each of the components: VMTable, DiskTable, UserTable, CustomerTable', () => {
        // really
    })
})

/*
All the Database's components are tested very shallowly. Tests that are ommitted are those that may check that
the right props are passed to the antd table, or that the right width/colors are generated based on different
parameters. These are much more complicated, and we may want to hold off until we have reason to do so.
*/