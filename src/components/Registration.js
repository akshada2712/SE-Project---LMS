import React from 'react'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { Button, Container, Row, Col } from 'reactstrap'

export default class Registration extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      lastName: '',
      mobile: '',
      emailId: '',
      password: '',
      confirmPassword: '',
      role: 'Student',
      securityQuestion: '',
      securityAnswer: '',
      formValues: [],
      showDetails: false
    }
  }

  newAccount = async (url = '', data = {}) => {
    console.log(this.state.username)
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.emailId,
        username: this.state.userName,
        password: this.state.password,
        role: this.state.role,
        mobile: this.state.mobile,
        securityQuestion: this.state.securityQuestion,
        securityAnswer: this.state.securityAnswer
      })
    }
    )
    return response.json()
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  formSubmit = async () => {
    if (this.state.password !== this.state.confirmPassword) {
      alert('passwords do not matched')
      return false
    } else {
      this.setState({
        formValues: [
          this.state.userName,
          this.state.mobile,
          this.state.emailId,
          this.state.password,
          this.state.role,
          this.state.securityQuestion,
          this.state.securityAnswer
        ],
        showDetails: true
      })
      // inserting into the database the info
      try {
        const response = this.newAccount('http://localhost:9000/registerAccount')
      } catch (e) {
        console.log(e)
      }
      console.log(this.state.formValues)
      this.props.history.push({
        pathname: '/home/',
        data: this.state.formValues
      })
      alert('Form Submitted Successfully')
      return true
    }
  }

  // formSubmit = () => {
  //   if (this.state.password !== this.state.confirmPassword) {
  //     alert('passwords did not matched')
  //     return false
  //   } else {
  //     alert('Form Submitted Successfully')
  //     this.setState({
  //       formValues: [
  //         this.state.userName,
  //         this.state.mobile,
  //         this.state.emailId
  //       ],
  //       showDetails: true
  //     })
  //     console.log(this.state.formValues)
  //     this.props.history.push({
  //       pathname: '/home/employeelist',
  //       data: this.state.formValues
  //     })
  //     return true
  //   }
  // }

  render () {
    const { userName, emailId, mobile, password, confirmPassword, securityQuestion, securityAnswer, role } = this.state
    const isSecurityAnsEnabled = securityQuestion !== ''
    return (
      <div className="menu p-md-5 p-sm-0 min-vh-100">
        <div className="mx-auto py-5 bg-light loginreg rounded">
          <div className="">
            <p className="h4 text-center text-primary font-weight-bold font-italic">
              Sign-Up

            </p>
          </div>
          <AvForm onValidSubmit={this.formSubmit}>
            <Container>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <AvField
                    onChange={this.handleChange}
                    name="userName"
                    label="User Name"
                    type="text"
                    validate={{
                      required: {
                        value: { userName },
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
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <AvField
                    onChange={this.handleChange}
                    name="mobile"
                    label="Mobile No"
                    type="text"
                    validate={{
                      required: {
                        value: { mobile },
                        errorMessage: 'Please enter your mobile number'
                      },
                      pattern: {
                        value: '^[0-9]+$',
                        errorMessage:
                          'Mobile Number must be composed only with numbers'
                      },
                      minLength: {
                        value: 10,
                        errorMessage:
                          'Your mobile number must be composed of 10 digits'
                      },
                      maxLength: { value: 10 }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <AvField
                    onChange={this.handleChange}
                    name="emailId"
                    label="Email Address"
                    type="email"
                    errorMessage="Invalid email address"
                    validate={{
                      required: {
                        value: { emailId },
                        errorMessage: 'Please enter your email address'
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <AvField
                    onChange={this.handleChange}
                    name="password"
                    label="Password"
                    type="password"
                    validate={{
                      required: {
                        value: { password },
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
                          'Password name must be b/w 5 to 16 characters'
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <AvField
                    onChange={this.handleChange}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    validate={{
                      required: {
                        value: { confirmPassword },
                        errorMessage: 'Please enter your confirm password'
                      },
                      pattern: {
                        value: '^[A-Za-z0-9]+$',
                        errorMessage:
                          'Confirm Password must be composed only with letter and numbers'
                      },
                      minLength: {
                        value: 5,
                        errorMessage:
                          'Password name must be b/w 5 to 16 characters'
                      },
                      maxLength: {
                        value: 16,
                        errorMessage:
                          'Password name must be b/w 5 to 16 characters'
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <AvField
                    onChange={this.handleChange}
                    name="role"
                    label="Role"
                    type="select"
                    validate={{
                      required: {
                        value: { role },
                        errorMessage: 'Please select a role'
                      }
                    }}>
                    <option>Student</option>
                    <option>Educator</option>
                    <option>Admin</option>
                  </AvField>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <AvField
                    onChange={this.handleChange}
                    name="securityQuestion"
                    label="Security Question"
                    type="select"
                    validate={{
                      required: {
                        value: { securityQuestion },
                        errorMessage: 'Please pick a security question'
                      }
                    }}>
                    <option></option>
                    <option>What is the name of your favorite pet?</option>
                    <option>What is your mother`&rsquo;`s maiden name?</option>
                    <option>What was your favorite food as a child?</option>
                  </AvField>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <AvField
                    onChange={this.handleChange}
                    name="securityAnswer"
                    label="Security Answer"
                    type="text"
                    validate={{
                      required: {
                        value: { securityAnswer },
                        errorMessage: 'Please type an answer'
                      }
                    }}
                    disabled={!isSecurityAnsEnabled}>

                  </AvField>
                </Col>
              </Row>
              <Row>
                <Col className="text-center" sm="12" md={{ size: 10, offset: 1 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Container>
          </AvForm>
          <div>
            {this.state.showDetails && (
              <div className="mt-5">
                <>
                  <p className="text-secondary h5 font-weight-bold font-italic">
                    Submitted form values
                  </p>
                </>
                <ul style={{ listStyleType: 'none' }}>
                  <li>
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: 'grey'
                      }}
                    >
                      User Name:{' '}
                    </span>
                    {this.state.userName}
                  </li>
                  <li>
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: 'grey'
                      }}
                    >
                      Mobile No:{' '}
                    </span>
                    {this.state.mobile}
                  </li>
                  <li>
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        color: 'grey'
                      }}
                    >
                      Mail Address:{' '}
                    </span>
                    {this.state.emailId}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
