import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const Step1 = props => {
  if (props.currentStep !== 1) {
    return null
  }

  return (
    <>
      <FormGroup>
        <Label for="email">Email Id</Label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your Email Id"
          value={props.email} // Prop: The email input data
          onChange={props.handleChange} // Prop: Puts data into the state
        />
      </FormGroup>
    </>
  )
}

export default Step1
