import React from 'react'
import { Card } from 'react-bootstrap' // import the Bootstrap Card component

function AssignmentList (props) {
  // define a list of assignments
  const assignments = [
    { title: 'Assignment 1', description: 'Complete Chapter 1 exercises' },
    { title: 'Assignment 2', description: 'Write a research paper on topic X' },
    { title: 'Assignment 3', description: 'Create a presentation on topic Y' }
  ]

  // handle click event
  const handleClick = (assignment) => {
    window.open(
      `https://example.com/assignments/${assignment.title}`,
      '_blank'
    )
  }

  return (
    <div>
      {assignments.map((assignment, index) => (
        <Card
          key={index}
          style={{ marginBottom: '10px' }}
          onClick={() => handleClick(assignment)}
        >
          <Card.Body>
            <Card.Title>{assignment.title}</Card.Title>
            <Card.Text>{assignment.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default AssignmentList
