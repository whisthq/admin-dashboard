import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlay,
    faPause,
} from '@fortawesome/free-solid-svg-icons'

class VMTableHeader extends Component {
    render() {
        return (
            <div
                style={{
                    background: 'none',
                    display: 'flex',
                    marginBottom: 20,
                }}
            >
                <div
                    style={{
                        height: 18,
                        width: 18,
                        position: 'relative',
                        top: 4,
                        borderRadius: 2,
                        backgroundColor: 'rgba(171, 235, 235, 0.6)',
                    }}
                ></div>
                <div style={{ marginLeft: 10, marginRight: 10 }}>
                    {' '}
                    Dev Mode{' '}
                </div>
                <div
                    style={{
                        height: 18,
                        width: 18,
                        position: 'relative',
                        top: 4,
                        borderRadius: 2,
                        backgroundColor: 'rgba(242, 181, 179, 0.2)',
                    }}
                ></div>
                <div style={{ marginLeft: 10, marginRight: 10 }}>
                    {' '}
                    Locked{' '}
                </div>
                <div
                    style={{
                        height: 18,
                        width: 18,
                        position: 'relative',
                        top: 4,
                        borderRadius: 2,
                        backgroundColor: 'rgba(193, 245, 174, 0.2)',
                    }}
                ></div>
                <div style={{ marginLeft: 10, marginRight: 10 }}>
                    {' '}
                    Unlocked{' '}
                </div>
                <FontAwesomeIcon
                    icon={faPlay}
                    style={{
                        fontSize: 14,
                        position: 'relative',
                        top: 5,
                        marginLeft: 10,
                        borderRadius: 2,
                        color: '#961418',
                    }}
                />
                <div style={{ marginLeft: 10, marginRight: 10 }}>
                    {' '}
                    Click to start{' '}
                </div>
                <FontAwesomeIcon
                    icon={faPause}
                    style={{
                        fontSize: 14,
                        position: 'relative',
                        top: 5,
                        marginLeft: 10,
                        borderRadius: 2,
                        color: '#1ac447',
                    }}
                />
                <div style={{ marginLeft: 10, marginRight: 10 }}>
                    {' '}
                    Click to deallocate{' '}
                </div>
            </div>
        )
    }
}

export default VMTableHeader;
