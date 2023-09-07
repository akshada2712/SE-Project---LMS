import React from 'react'
import './M1.css' // import CSS file for styling
import myPdf from './Week1_LM.pdf'

function M1 () {
  return (
    <div className="modules-container">
      <h1 className="modules-heading">Week 1 Learning Modules</h1>
      <p className="modules-text">Welcome to week 1!<br></br>In this week, we will be learning about The Product And The Process in Software Engineering
      <br></br>
      More reference files will be uploaded soon.<br></br>
      Till then refer the slides below.</p>
      <div className="modules-pdf">
        {/* Placeholder for PDF to come from backend */}
        <embed src={myPdf} type="application/pdf" width="100%" height="600px" />
      </div>
    </div>
  )
}

export default M1
