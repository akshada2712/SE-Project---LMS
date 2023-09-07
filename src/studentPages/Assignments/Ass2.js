import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import './Ass1.css'

function Ass2 () {
  const submissionDate = new Date('May 1, 2023')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [submissionStatus, setSubmissionStatus] = useState(null)
  const [submissionTime, setSubmissionTime] = useState(null)

  useEffect(() => {
    let timer
    if (submissionStatus === 'success') {
      timer = setTimeout(() => {
        setSubmissionStatus(null)
      }, 5000)
    }
    return () => clearTimeout(timer)
  }, [submissionStatus])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // submit logic here
    setPreview(URL.createObjectURL(file))
    const currentTime = new Date()
    if (currentTime <= submissionDate) {
      setSubmissionStatus('success')
      setSubmissionTime(currentTime.toLocaleString())
    } else {
      setSubmissionStatus('late')
    }
  }

  return (
    <div className="modules-container">
      <h1 className="modules-heading">Lecture Summary 2</h1>
      <p className="modules-total-marks">Total Marks: 30</p>
      <p className="modules-submission-date">Submission Date: 1 May 2023</p>
      <form onSubmit={handleFormSubmit}>
        <div className="modules-file-input">
          <label htmlFor="file-input">Upload File</label>
          <input type="file" id="file-input" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submissionStatus === 'success' && (
        <div className="success-message">
          <Confetti />
          <p className="success-text">Submitted successfully on {submissionTime}</p>
        </div>
      )}
      {submissionStatus === 'late' && (
        <div className="late-message">
          <p className="late-text">Late Submission</p>
        </div>
      )}
      <div className="modules-pdf">
        {preview && (
          <embed src={preview} type="application/pdf" width="100%" height="600px" />
        )}
      </div>
    </div>
  )
}

export default Ass2
