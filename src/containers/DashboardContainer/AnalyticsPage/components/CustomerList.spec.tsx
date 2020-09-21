import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { CustomerList } from './CustomerList'

// necessary for enzyme to work
Enzyme.configure({ adapter: new Adapter() })

/*
The customerList is a list of divs or a spinning icon depending on how many customers are passed in.
We need to test that the right divs generate for the corresponding numbers of customers and that for
an empty customers list or '' customers we generate appropriate responses (either some spinning/loading icon
or for a '' customer we load an empty div)

We also have to test that on mount we will set 
*/
describe('<CustomerList />', () => {
    /*
    For both of these:
    we have to test with/without access token, and with/without customers being fetched | length >= 0.

    You should not be fetching if you do not have an access token.
    */
    test('ensure componentDidUpdate dispatches a fetch if it is necessary', () => {
        // TODO
    })
    test('ensure customer fetch was dispatched on componentMount if necessary', () => {
        // TODO
    })
    // this should **always** fetch
    test('ensure customer fetch was dispatched on getUpdatedDatabase', () => {
        // TODO
    })

    it('displays a div per customer', () => {
        const customers: string[] = ['alice', 'bob']
        const wrapper = mount(
            <CustomerList
                customers={customers}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(wrapper.find(FontAwesomeIcon)).toHaveLength(0)
        // has a parent div, a wrapper div, and customers
        expect(wrapper.find('div')).toHaveLength(2 + customers.length)
    })

    it('displays an empty div for a customer that has a non-empty name, and otherwise empty', () => {
        const customers: string[] = ['bob', '']
        const wrapper = mount(
            <CustomerList
                customers={customers}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(wrapper.find(FontAwesomeIcon)).toHaveLength(0)

        const divsFound = wrapper.find('div')
        expect(divsFound).toHaveLength(2 + customers.length)
        expect(
            wrapper.containsAllMatchingElements([
                <div></div>, // one empty div for the '' customer
            ])
        ).toEqual(true)
    })

    it('displays a fontAwesomeIcon (spinner) if customers length = 0', () => {
        const customers: string[] = []
        const wrapper = mount(
            <CustomerList
                customers={customers}
                dispatch={(items: any) => {
                    // mock
                }}
            />
        )

        expect(wrapper.find(FontAwesomeIcon)).toHaveLength(1)
    })
})
