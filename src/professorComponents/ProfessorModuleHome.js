import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const getCourseIdForCourse = async (course_title) => {
  const response = await fetch('http://localhost:9000/getCourses/courseTitle', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      course_title
    })
  }
  )
  if (!response.ok) throw new Error(response.statusText)
  return response.json()
}

const getModules = async (course_title) => {
  const url = 'http://localhost:9000/getModules'
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      course_title
    })
  }
  )
  if (!response.ok) throw new Error(response.statusText)
  return response.json()
}

const ProfessorModuleHome = () => {
  const history = useHistory()
  const { state } = useLocation()
  const [courseTitle, setCourseTitle] = useState(window.history.state.selectedCourse || state.selectedCourse)
  const [courseId, setCourseId] = useState('')
  const [modules, setModules] = useState([])

  console.log('modules home ' + courseTitle)
  console.log('modules home ' + courseId)

  const removeModuleDB = async (moduleTitle) => {
    const url = 'http://localhost:9000/removeModule'
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        courseId,
        moduleTitle
      })
    }
    )
    if (!response.ok) throw new Error(response.statusText)
    return response
  }

  useEffect(() => {
    async function fetchCourseId () {
      const response = await getCourseIdForCourse(courseTitle)
      setCourseId(response.results[0].course_id)
      return response
    }
    async function fetchModules () {
      console.log('sinside fetch modules' + courseId)
      const response = await getModules(courseTitle)
      console.log(response)
      const resList = []
      for (let i = 0; i < response.results.length; i++) {
        resList.push({
          module_id: response.results[i].module_id,
          course_id: response.results[i].course_id,
          module_title: response.results[i].module_title,
          module_text: response.results[i].module_text
          // todo: add in the module file later
        })
      }
      setModules(resList)
      return response
    }
    fetchCourseId()
    fetchModules()
  }, [])

  const handleModuleSelection = (event) => {
    console.log('thing that was selected on button is  ' + event.target.id)
    history.push('/Products/ModuleContent', { courseId, courseTitle, moduleTitle: event.target.id })
  }

  const handleAddModule = (event) => {
    history.push('/Products/M1', { courseId, courseTitle })
  }

  const handleRemoveModule = (event) => {
    const removeModule = prompt("Please enter the module's title that you'd like to remove:")
    async function removeModuleAsync () {
      const response = await removeModuleDB(removeModule)
      console.log(response)
    }
    removeModuleAsync()
    alert('That module (if it exists) has been removed')
    history.push('/Modules', { courseId })
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>View Module</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((item, index) => (
            <tr key={index}>
              <td>{item.module_title}</td>
                  <td><button id={item.module_title} onClick={handleModuleSelection}>View the module</button></td>
            </tr>
          ))}
        </tbody>
          </table>
      <button onClick={handleAddModule} style={{ marginRight: '30px' }}>Add module</button>
      <button onClick={handleRemoveModule}>Remove module</button>
    </div>
  )
}

export default ProfessorModuleHome
