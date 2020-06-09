import React, { Component } from 'react'

import CustomerTable from './CustomerTable.js'

class UserStats extends Component {
    render() {
        return (
            <div>
                <p>Click on a customer to view their usage history.</p>
                <CustomerTable />
            </div>
        )
    }
}

export default UserStats
