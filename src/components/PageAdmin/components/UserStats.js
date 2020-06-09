import React, { Component } from 'react'
import Popup from 'reactjs-popup'

import CustomerTable from './CustomerTable.js'

class UserStats extends Component {
    constructor(props) {
        super(props)
        this.state = { modalOpen: false, username: null }
    }

    openModal = (username) => {
        this.setState({ open: true, username: username })
    }
    closeModal = () => {
        this.setState({ open: false })
    }

    render() {
        return (
            <div>
                <p>Click on a customer to view their usage history.</p>
                <CustomerTable openModal={this.openModal} />
                <Popup
                    open={this.state.modalOpen}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                ></Popup>
            </div>
        )
    }
}

export default UserStats
