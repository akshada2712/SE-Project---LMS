import React from 'react'

export default class UsernameCheck extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginUserName: '',
      securityQuestion: '',
      securityAnswer: ''
    }
    console.log(this.state)
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  retrieveQuestionUser = async (url = '') => {
    console.log(`here is the login name: ${this.state.loginUserName}`)
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.loginUserName
      })
    })
    return response.json()
  }

  retrieveAnswer = async (url = '') => {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        securityQuestion: this.state.securityQuestion,
        securityAnswer: this.state.securityAnswer
      })
    })
    return response.json()
  }

  userQuestionExists = async () => {
    let response
    try {
      response = await this.retrieveQuestionUser('http://localhost:9000/securityQuestionGet')
      console.log(response)
      if (response === undefined) {
        alert('that user does not exist thus no question')
        return false
      } else {
        this.setState({
          securityQuestion: response.security_question
        })
        alert('user was found! security question loaded')
        return true
      }
    } catch (e) {
      console.log(e)
      alert('that user does not exist')
      return false
    }
  }

  validateAnswer = async () => {
    let response
    try {
      response = await this.retrieveAnswer('http://localhost:9000/validateSecurityAnswer')
      console.log(response.exists)
      if (response.exists === false) {
        alert('that was an incorrect answer')
        return false
      } else {
        alert('validation succeeded. may now change password')
        this.props.history.push({
          pathname: '/home/passwordReset',
          state: {
            username: this.state.loginUserName
          }
        })
        return true
      }
    } catch (e) {
      console.log(e)
      alert('not the right answer')
      return false
    }
  }

  // username + security loading
  userNameFormSubmit = (event) => {
    event.preventDefault()
    this.userQuestionExists()
  }

  answerFormSubmit = (event) => {
    event.preventDefault()
    this.validateAnswer()
  }

  render () {
    return (
            <div className="menu p-md-5 p-sm-0 min-vh-100">
                <div className="mx-auto py-5 bg-light loginreg w-25 rounded">
                    <form onSubmit={this.userNameFormSubmit} className="p-4">
                        <label>Enter Username: </label>
                        <input
                            onChange={this.handleChange}
                            className="ml-3"
                            name="loginUserName"
                        />
                        <br />
                        <br />
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </form>
                    <form onSubmit={this.answerFormSubmit} className="p-4">
                        <br />
                        <br />
                        <label>Your Security Question:  </label>
                        <input
                            onChange={this.handleChange}
                            className="ml-3"
                            name="securityQuestion"
                            value={this.state.securityQuestion}
                            disabled={true}
                        />
                        <br />
                        <br />
                        <label>Enter Security Question Answer:  </label>
                        <input
                            onChange={this.handleChange}
                            className="ml-3"
                            name="securityAnswer"
                            value={ this.state.securityAnswer}
                        />
                        <br />
                        <br />
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </form>
                </div>
            </div>
    )
  }
}
