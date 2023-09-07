import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const Step2 = props => {
  if (props.currentStep !== 2) {
    return null
  }

  return (
    <>
      <p>Your Security Question : </p>
      <FormGroup>
        <Label for="username">Question</Label>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your Username"
          value={props.username} // Prop: The username input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
      </FormGroup>
    </>
  )
}

export default Step2
