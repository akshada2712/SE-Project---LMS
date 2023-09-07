import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import './M1.css'
import { DateLocalizer } from 'react-big-calendar'

// this file will be used for editing modules

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
ß
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
  const { state } = useLocation()
  const history = useHistory()
  console.log('in edit module ' + state.courseId)

  const [courseId, setCourseId] = useState(state.courseId)
  const [courseTitle, setCourseTitle] = useState(state.courseTitle)
  const [moduleTitleOld, setModuleTitleOld] = useState(state.moduleTitleOld)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  // todo: file upload
  const [file, setFile] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const getModule = async (course_id, module_title) => {
    const url = 'http://localhost:9000/getModules/specificModule'
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        course_id,
        module_title
      })
    }
    )
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
  }

  useEffect(() => {
    async function fetchModule () {
      const response = await getModule(state.courseId, state.moduleTitleOld)
      setTitle(response.results[0].module_title)
      setText(response.results[0].module_text)
      // todo: file stuff
      return response
    }
    fetchModule()
  }, [])

  const editModule = async (data = {}) => {
    const response = await fetch('http://localhost:9000/addModule', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        courseId: data.courseId,
        moduleTitleOld: data.moduleTitleOld,
        moduleTitleNew: data.moduleTitleNew,
        moduleText: data.moduleText
      })
    }
    )
    if (!response.ok) throw new Error(response.statusText)
    return response
  }

  const handleFileChange = (newFile) => {
    setFile(newFile)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      editModule({ courseId, moduleTitleOld, moduleTitleNew: title, moduleText: text })
      setIsSubmitted(true)
      alert('Form submitted successfully!')
      history.push('/Modules', { selectedCourse: courseTitle })
    } catch (e) {
      alert('Form submitted incorrectly')
    }
  }

  const handleEdit = () => {
    setTitle('')
    setText('')
    setFile(null)
    setIsSubmitted(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      {isSubmitted
        ? (
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
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
            <label htmlFor="file">Attach file:</label>
            <FileInput onChange={handleFileChange} disabled={isSubmitted} />
          </div>
          <button type="submit" disabled={isSubmitted}>Submit</button>
        </div>
          )}
    </form>
  )
}

function EditModuleContent () {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Edit Module</h2>
      <MyForm />
    </div>
  )
}

export default EditModuleContent
