import React, { Component } from 'react'

import '../../static/App.css'

import GeneralStats from './components/GeneralStats.js'

class Analytics extends Component {
    render() {
        return (
            <div style={{ backgroundColor: '#FFFFFF' }}>
                <div
                    style={{
                        marginTop: 5,
                        fontSize: 45,
                        fontWeight: 'bold',
                        marginBottom: 60,
                        width: 275,
                        color: '#111111',
                    }}
                >
                    ANALYTICS
                </div>
                <GeneralStats />
            </div>
        )
    }
}

export default Analytics
