import React, { Component } from 'react'

export default class PasswordReset extends Component {
  constructor (props) {
    super(props)
    const { state } = this.props.location
    this.state = {
      loginUserName: state.username,
      text: '',
      confirmText: ''
    }
    console.log(this.state.loginUserName)
  }

  handleSubmit = (event) => {
    if (this.state.text === this.state.confirmText) {
      this.props.history('/home')
      alert('Password Reset')
    } else {
      alert("Confirm password doesn't match")
    }
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  updatePassword = async (url = '') => {
    console.log(`passwords entered: ${this.state.text} ${this.state.confirmText}`)
    if (this.state.confirmText !== this.state.text) {
      alert("bruh not the same can't change it")
      return false
    }
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.loginUserName,
        password: this.state.text
      })
    })
    return response
  }

  passwordChangeValidation = async () => {
    let response
    try {
      response = await this.updatePassword('http://localhost:9000/changePassword')
      console.log(response)
      alert(`updated password of ${this.state.loginUserName}!!`)
      this.props.history.push('/home/login')
      return true
    } catch (e) {
      console.log(e)
      alert('password failed to change')
      return false
    }
  }

  // username + security loading
  changePassFormSubmit = (event) => {
    event.preventDefault()
    this.passwordChangeValidation()
  }

  render () {
    return (
    <div className="menu p-md-5 p-sm-0 min-vh-100">
      <div className="mx-auto py-5 bg-light loginreg w-25 rounded">
        <form onSubmit={this.changePassFormSubmit} className="p-4">
          <label>Enter new Password: </label>
          <input
            value={this.state.text}
            onChange={this.handleChange}
            minLength="6"
            maxLength="16"
            type="password"
            className="ml-3"
            name="text"
          />
          <br />
          <br />
          <label>Confirm Password:  </label>
          <input
            value={this.state.confirmText}
            onChange={this.handleChange}
            minLength="6"
            maxLength="16"
            type="password"
            className="ml-3"
            name="confirmText"
          />
          <br />
          <br />
          <input type="submit" value="Submit" className="btn btn-primary"/>
        </form>
      </div>
    </div>
    )
  }
}

// function PasswordReset()  {
// const [text, setText] = useState("");
// const [confirmText, setConfirmText] = useState("");

//   function changePassword(event) {
//     setText(event.target.value);
//   }

//   function confirmPassword(event) {
//     setConfirmText(event.target.value);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();

//     if (text === confirmText) {
//       alert("Password Reset");
//       setText("");
//       setConfirmText("");
//     } else {
//       alert("Confirm password doesn't match");
//       setText("");
//       setConfirmText("");
//     }
//   }

//   return (
//     <div className="menu p-md-5 p-sm-0 min-vh-100">
//       <div className="mx-auto py-5 bg-light loginreg w-25 rounded">
//         <form onSubmit={handleSubmit} className="p-4">
//           <label>Enter new Password: </label>
//           <input
//             value={text}
//             onChange={changePassword}
//             minLength="6"
//             maxLength="16"
//             type="password"
//             className="ml-3"
//           />
//           <br />
//           <br />
//           <label>Confirm Password:  </label>
//           <input
//             value={confirmText}
//             onChange={confirmPassword}
//             minLength="6"
//             maxLength="16"
//             type="password"
//             className="ml-3"
//           />
//           <br />
//           <br />
//           <input type="submit" value="Submit" className="btn btn-primary"/>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PasswordReset;
