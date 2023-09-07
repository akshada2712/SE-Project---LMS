import React, { useState } from 'react'
import './Ass1.css'
function FileInput ({ onChange }) {
  const [file, setFile] = useState(null)
  const handleChange = (event) => {
    const newFile = event.target.files[0]
    setFile(newFile)
    onChange && onChange(newFile)
  }
  return (
    <div>
      <input type="file" onChange={handleChange} />
      {file && (
        <div>

          {file.type === 'application/pdf' && (
            <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          )}
        </div>
      )}
    </div>
  )
}

function MyForm () {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionDate, setSubmissionDate] = useState('')
  const [totalMarks, setTotalMarks] = useState('')

  const handleFileChange = (newFile) => {
    setFile(newFile)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Submit form data and file to server
    // ...
    setIsSubmitted(true)
    alert('Form submitted successfully!')
  }

  const handleEdit = () => {
    setTitle('')
    setText('')
    setFile(null)
    setIsSubmitted(false)
    setSubmissionDate('')
    setTotalMarks('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }} className="MyForm">
      {isSubmitted
        ? (
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
          <p>Submission Date: {submissionDate}</p>
          <p>Total Marks: {totalMarks}</p>
          <button style={{ textAlign: 'center' }} type="button" onClick={handleEdit}>Edit</button>
          {file && file.type === 'application/pdf' && (
            <object data={URL.createObjectURL(file)} type="application/pdf" width="600px" height="600px">
              <embed src={URL.createObjectURL(file)} type="application/pdf" width="600px" height="600px" />
            </object>
          )}
        </div>
          )
        : (
        <div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isSubmitted}
            />
          </div>
          <div>
            <label htmlFor="text">Text:</label>
            <textarea
              id="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              disabled={isSubmitted}
            />
          </div>
          <div>
            <label htmlFor="submissionDate">Submission Date:</label>
            <input
              type="text"
              id="submissionDate"
              value={submissionDate}
              onChange={(event) => setSubmissionDate(event.target.value)}
              disabled={isSubmitted}
            />
          </div>
          <div>
            <label htmlFor="totalMarks">Total Marks:</label>
            <input
              type="text"
              id="totalMarks"
              value={totalMarks}
              onChange={(event) => setTotalMarks(event.target.value)}
              disabled={isSubmitted}
            />
          </div>
          <div>
            <label htmlFor="file">Attach file:</label>
            <FileInput onChange={handleFileChange} disabled={isSubmitted} />
          </div>
          <button type="submit" disabled={isSubmitted}>Submit</button>
        </div>
          )}
    </form>
  )
}

function Ass1 () {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Assignment 1</h2>
      <MyForm />
    </div>
  )
}

export default Ass1
