import React, { useState } from 'react'
import './A1.css'

const A2 = () => {
  // sample data for 5 students
  const [students, setStudents] = useState([
    { name: 'John', id: '001', marks: 18, maxMarks: 20 },
    { name: 'Jane', id: '002', marks: 16, maxMarks: 20 },
    { name: 'Bob', id: '003', marks: 14, maxMarks: 20 },
    { name: 'Alice', id: '004', marks: 19, maxMarks: 20 },
    { name: 'Eve', id: '005', marks: 15, maxMarks: 20 }
  ])

  const handleSaveGrades = () => {
    // save the grades
    alert('Grades saved successfully!')
  }

  const handlePostGrades = () => {
    // post the grades
    alert('Grades posted successfully!')
  }

  const handleMarksChange = (index, newMarks) => {
    // update the marks for a student
    const newStudents = [...students]
    newStudents[index].marks = newMarks
    setStudents(newStudents)
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Marks Gotten</th>
            <th>Maximum Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.id}</td>
              <td>
                <input
                  type="number"
                  value={item.marks}
                  min="0"
                  max={item.maxMarks}
                  onChange={(e) =>
                    handleMarksChange(index, parseInt(e.target.value))
                  }
                />
              </td>
              <td>{item.maxMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-container">
        <button className='save_button' onClick={handleSaveGrades}>Save Grades</button>
        <button className='post_button' onClick={handlePostGrades}>Post Grades</button>
      </div>
    </div>
  )
}

export default A2
