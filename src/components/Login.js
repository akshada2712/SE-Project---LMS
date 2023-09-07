import React from 'react'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { Button, Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

// TODO : don't hardcode?
const clientId = '316944316847-r3pqce4qe70k5iu02u85hrksfmih10pj.apps.googleusercontent.com'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginUserName: '',
      loginPassword: '',
      loginOAuthEmail: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  attemptLogin = async (url = '') => {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.loginUserName,
        password: this.state.loginPassword
      })
    }
    )
    return response.json()
  }

  attemptOAuthLogin = async (url = '') => {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.loginOAuthEmail
      })
    }
    )
    return response.json()
  }

  oAuthLoginValidation = async () => {
    let response
    try {
      response = await this.attemptOAuthLogin('http://localhost:9000/getCredentials/OAuth')
      console.log(response)
      alert('credentials matched')
      const response_role = (response === undefined) ? '' : response.user_role
      const sendData = []
      sendData.push(response.username)
      sendData.push(response.user_id)
      if (response_role === 'Student') this.props.history.push({ pathname: '/home/studentdashboard', state: { detail: sendData } })
      if (response_role === 'Educator') this.props.history.push({ pathname: '/home/professordashboard', state: { detail: sendData } })
      if (response_role === 'Admin') this.props.history.push('/home/AdminAdd')
      return true
    } catch (e) {
      console.log(e)
      alert('no account found with google email')
      return false
    }
  }

  formSubmit = async () => {
    let response
    try {
      response = await this.attemptLogin('http://localhost:9000/getCredentials')
      console.log(response)
    } catch (e) {
      console.log(e)
      alert('no account found with that username and/or password')
      return false
    }
    // let response_user = response.results[0].username;
    const response_user = (response === undefined) ? '' : response.username
    const response_role = (response === undefined) ? '' : response.user_role
    console.log('response_user' + response_user)
    console.log(response.user_id)
    console.log(response_role)
    if (
      (this.state.loginUserName === 'admin' &&
        this.state.loginPassword === 'admin') || this.state.loginUserName === response_user
    ) {
      alert('credentials matched')
      const sendData = []
      sendData.push(response.username)
      sendData.push(response.user_id)
      if (response_role === 'Student') {
        this.props.history.push({ pathname: '/home/studentdashboard', state: { detail: sendData } })
        return true
      } else if (response_role === 'Educator') {
        this.props.history.push({ pathname: '/home/professordashboard', state: { detail: sendData } })
        return true
      } else {
        // admin login
        this.props.history.push({ pathname: '/home/adminAdd', state: { detail: sendData } })
      }
    } else {
      alert('invalid credentials')
      return false
    }
  }

  render () {
    const { loginUserName, loginPassword } = this.state
    return (
      <GoogleOAuthProvider clientId={clientId}>
      <div className="menu p-md-5 p-sm-0 min-vh-100">
        <div className=" py-5 bg-light loginreg rounded">
          <div>
            <p className=" h4 text-center text-primary font-weight-bold font-italic">
            Login
            </p>
          </div>
          <AvForm onValidSubmit={this.formSubmit}>
            <Container>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <AvField
                    onChange={this.handleChange}
                    name="loginUserName"
                    label="User Name"
                    type="text"
                    validate={{
                      required: {
                        value: { loginUserName },
                        errorMessage: 'Please enter your user name'
                      },
                      pattern: {
                        value: '^[A-Za-z0-9]+$',
                        errorMessage:
                          'First Name must be composed only with letter and numbers'
                      },
                      minLength: {
                        value: 4,
                        errorMessage: 'User name must be b/w 4 to 16 characters'
                      },
                      maxLength: {
                        value: 16,
                        errorMessage: 'User name must be b/w 6 to 16 characters'
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <AvField
                    onChange={this.handleChange}
                    name="loginPassword"
                    label="Password"
                    type="password"
                    validate={{
                      required: {
                        value: { loginPassword },
                        errorMessage: 'Please enter your password'
                      },
                      pattern: {
                        value: '^[A-Za-z0-9]+$',
                        errorMessage:
                          'Password must be composed only with letter and numbers'
                      },
                      minLength: {
                        value: 5,
                        errorMessage:
                          'Password name must be b/w 5 to 16 characters'
                      },
                      maxLength: {
                        value: 16,
                        errorMessage:
                          'Password name must be b/w 6 to 16 characters'
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Button type="submit" color="primary">
                    Login
                  </Button>
                </Col>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <div className='w-25 pt-3'>
                  <GoogleLogin
                    size='medium'
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse)
                      const decoded_creds = jwt_decode(credentialResponse.credential)
                      console.log(decoded_creds.email)
                      this.setState({
                        loginOAuthEmail: decoded_creds.email
                      })
                      this.oAuthLoginValidation()
                    }}
                    onError={() => {
                      console.log('Login Failed')
                    }}/>
                  </div>
                </Col>
              </Row>
            </Container>
          </AvForm>
          <Link
            to="/home/usernameCheck"
            className="btn btn-link float-center mx-auto text-center w-100 btn-small mt-4">
            Forgot your password?
          </Link>
        </div>
        </div>
        </GoogleOAuthProvider>
    )
  }
}
