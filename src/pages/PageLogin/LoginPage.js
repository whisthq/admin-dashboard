import React, { Component } from 'react'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import '../../static/App.css'
import { Redirect } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/index.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailLogin: '',
            passwordLogin: '',
            loggingIn: false,
            failed_login_attempt: false,
        }
    }

    changeEmailLogin = (evt) => {
        this.setState({
            emailLogin: evt.target.value,
        })
    }

    loginKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.setState({ loggingIn: true, failed_login_attempt: false })
            this.props.dispatch(
                loginUser(this.state.emailLogin, this.state.passwordLogin)
            )
        }
    }

    handleLogin = () => {
        this.setState({ loggingIn: true, failed_login_attempt: false })
        this.props.dispatch(
            loginUser(this.state.emailLogin, this.state.passwordLogin)
        )
    }

    changePasswordLogin = (evt) => {
        if (evt.key === 'Enter') {
            this.props.dispatch(
                loginUser(this.state.emailLogin, this.state.passwordLogin)
            )
        } else {
            this.setState({
                passwordLogin: evt.target.value,
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.login_attempts !== this.props.login_attempts &&
            !this.state.failed_login_attempt
        ) {
            this.setState({ failed_login_attempt: true, loggingIn: false })
        }
    }

    render() {
        return (
            <div style={{ height: '100vh' }}>
                {this.props.authenticated ? (
                    <Redirect to="/admin" />
                ) : (
                    <div style={{ width: 300, margin: 'auto', marginTop: 150 }}>
                        <div
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 30,
                                marginBottom: 30,
                            }}
                        >
                            Fractal Admin
                        </div>
                        {this.state.failed_login_attempt ? (
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontSize: 14,
                                    color: '#f9000b',
                                    background: 'white',
                                    width: '100%',
                                    padding: 10,
                                    borderRadius: 5,
                                    fontWeight: 'bold',
                                    marginBottom: 20,
                                }}
                            >
                                Invalid credentials
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <InputGroup className="mb-3">
                            <FormControl
                                type="email"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder="Username"
                                onChange={this.changeEmailLogin}
                                onKeyPress={this.loginKeyPress}
                                style={{
                                    borderRadius: 5,
                                    maxWidth: 600,
                                    backgroundColor: '#e3e5e8',
                                    border: 'none',
                                    padding: '30px 20px',
                                }}
                            />
                            <br />
                        </InputGroup>

                        <InputGroup className="mb-3" style={{ marginTop: 20 }}>
                            <FormControl
                                aria-label="Default"
                                type="password"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder="Password"
                                onChange={this.changePasswordLogin}
                                onKeyPress={this.loginKeyPress}
                                style={{
                                    borderRadius: 5,
                                    maxWidth: 600,
                                    backgroundColor: '#e3e5e8',
                                    border: 'none',
                                    padding: '30px 20px',
                                }}
                            />
                        </InputGroup>
                        {!this.state.loggingIn ? (
                            <Button
                                onClick={this.handleLogin}
                                style={{
                                    marginTop: 10,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    width: '100%',
                                    border: 'none',
                                    background: '#111111',
                                    padding: '15px',
                                }}
                            >
                                LOG IN
                            </Button>
                        ) : (
                            <Button
                                disabled="true"
                                style={{
                                    marginTop: 10,
                                    fontWeight: 'bold',
                                    color: 'white',
                                    width: '100%',
                                    border: 'none',
                                    background: '#111111',
                                    padding: '15px',
                                    textAlign: 'center',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faCircleNotch}
                                    spin
                                    style={{ color: 'white', fontSize: 13 }}
                                />
                            </Button>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        login_attempts: state.AccountReducer.login_attempts,
        authenticated: state.AccountReducer.authenticated,
    }
}

export default connect(mapStateToProps)(LoginPage)