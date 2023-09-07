import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import './M1.css'

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

function ModuleContent () {
  const { state } = useLocation()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  console.log("idk why it's saying this " + state.courseTitle)
  const [courseTitle, setCourseTitle] = useState(state.courseTitle || '')
  const [courseId, setCourseId] = useState(state.courseId || '')
  // todo: file stuff later
  const [file, setFile] = useState(null)

  useEffect(() => {
    async function fetchModule () {
      const response = await getModule(state.courseId, state.moduleTitle)
      setTitle(response.results[0].module_title)
      setText(response.results[0].module_text)
      // todo: file stuff
      return response
    }
    fetchModule()
  }, [])

  const handleEditModule = (event) => {
    history.push('/editModule', { courseId, courseTitle, moduleTitleOld: title })
  }

  return (
        <div>
            <h2 className={{ textAlign: 'center' }}>{title}</h2>
            <p>{text}</p>
          {file ? <img src={file} /> : <p> No file included </p>}
          <button onClick={handleEditModule}>Edit module</button>
      </div>
  )
}

export default ModuleContent
