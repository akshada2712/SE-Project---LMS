import React from 'react'
export default class SecurityCheck extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginUserName: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleSubmit = event => {
    event.preventDefault()

    // if (confirmSecAnswer) {
    //     /* TODO: move to the password reset page. no idea how
    //     setSecAnswer("");
    //     this.props.history.push({
    //         pathname: "/home/passwordReset",
    //         // data: this.state.formValues //TODO: what
    //     });
    //     */
    // } else {
    //     alert("security answer wrong");
    //     setSecAnswer("");
    // }
  }

  render () {
    return (
            <div className="menu p-md-5 p-sm-0 min-vh-100">
                <div className="mx-auto py-5 bg-light loginreg w-25 rounded">
                    <form onSubmit={this.handleSubmit} className="p-4">
                        <br />
                        <label>Your Security Question:  </label>
                        <input
                            value={'fdsfasdf'}
                            disabled={true}
                        />
                        <br />
                        <label>Enter Security Question Answer:  </label>
                        <input
                            value={'secAnswer'}
                            onChange={this.handleChange}
                            className="ml-3"
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
