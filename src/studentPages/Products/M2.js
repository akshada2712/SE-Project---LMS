import React from 'react'
import './M2.css' // import CSS file for styling
import myPdf from './Week2_LM.pdf'

function M2 () {
  return (
    <div className="modules-container">
      <h1 className="modules-heading">Week 2 Learning Modules</h1>
      <p className="modules-text">Welcome to week 2!<br></br>In this week, we will be learning in depth about the <b>Software Process</b>
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

export default M2;
