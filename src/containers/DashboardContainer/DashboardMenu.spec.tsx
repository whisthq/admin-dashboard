import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DashboardMenu } from './DashboardMenu'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import {
    faHome,
    faChartArea,
    faList,
    faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'

// necessary for enzyme to work
Enzyme.configure({ adapter: new Adapter() })

/*
 */
describe('<DashboardMenu />', () => {
    it('renders three <Link /> components', () => {
        const wrapper = shallow(<DashboardMenu />)
        expect(wrapper.find(Link)).toHaveLength(3)
    }) 

    it('renders one <Dropdown /> component with a toggle and a menu with eight items', () => {
        const wrapper = shallow(<DashboardMenu />)
        expect(wrapper.find(Dropdown)).toHaveLength(1)

        expect(wrapper.find(Dropdown.Toggle)).toHaveLength(1)
        expect(wrapper.find(Dropdown.Menu)).toHaveLength(1)
        // should be s3, lightsail, heroku, datadog, sentry, postman, drive, notion
        expect(wrapper.find(Dropdown.Item)).toHaveLength(8)
    }) 

    it('renders four <FontAwesomeIcon /> with the correct picture for the links/dropdown', () => {
        const wrapper = shallow(<DashboardMenu />)
        expect(wrapper.find(FontAwesomeIcon)).toHaveLength(4)
    })
})
