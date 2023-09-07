import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import './Ass1.css'
import mypdf1 from './AdeshOak_lectureSummary.pdf'
import mypdf2 from './AdeshOak_lecture2Summary.pdf'

const Ass1 = ({location}) =>{

  
  const assignData = {
    title:location.state.object.title,
    total:location.state.object.totalMarks,
    grade:location.state.object.grade,
    subdate:location.state.object.subDate,
  }

  console.log("IN THAT ASSIGNMENT PAGE:",assignData)

  
  let submitted=false;
  if(assignData.subdate){
    submitted = true;
  }

  
  
    return (
      <div className="Ass1">
        {submitted ? (
          <SubmittedAss1 assignmentData = {assignData}/>
        ) : (
          <NotSubmitted assignmentData = {assignData}/>
        )}
      </div>
    );
  };
  
  const SubmittedAss1 = ({assignmentData}) => {

    const mypdfs = {
      'Lecture Summary 1': mypdf1,
      'Lecture Summary 2': mypdf2,
    };
  
    const pdfSrc = mypdfs[assignmentData.title];
    const subDate = new Date(assignmentData.subdate)
    const formattedDate = subDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return (
      <div className="modules-container">
        <h1 className="modules-heading">{assignmentData.title}</h1>
        <p className="modules-total-marks">Total Marks: {assignmentData.total}</p>
        <p className="modules-submission-date">
          Submission Date: {formattedDate}
        </p>
        <p className="success-text">Grade: {assignmentData.grade}</p>
        <div className="modules-pdf">
          <embed src={pdfSrc} type="application/pdf" width="100%" height="600px" />
        </div>
        
      </div>
    );
  };
  
  const NotSubmitted = ({assignmentData}) =>{
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
  const myList = ['Item 1', 'Item 2', 'Item 3'];

  return (
 <><div className="modules-container">
      <h1 className="modules-heading">{assignmentData.title}</h1>
      <p className="modules-total-marks">Total Marks: {assignmentData.total}</p>
      <p className="modules-submission-date">Submission Date: May 1, 2023</p>
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
    </> 
      
  )
}

export default Ass1;
