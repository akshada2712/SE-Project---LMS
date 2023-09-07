import React, { useState , useEffect} from 'react'
import './A1.css'


const attemptFetchCourseGrades = async (url = '', uid,cid) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: uid,
      course_id: cid
    })
  }
  )
  return response.json()
}

const A1 = (props) => {
  // sample data for 5 assignments
  const [assignments, setAssignments] = useState([
    { name: 'Introduction', maxMarks: 20, marks: 18 },
    { name: 'Lecture Summary 1', maxMarks: 30, marks: '' },
    { name: 'Lecture Summary 2', maxMarks: 30, marks: '' },
  ])
  const courseID = props.courseID;
  const userID = props.userID;
  console.log("IN GRADE SCREEN \n USER ID:",userID,"COURSEID:",courseID)

  /*const totalMarks = assignments.reduce((sum, item) => sum + item.marks, 0)
  const totalMaxMarks = assignments.reduce((sum, item) => sum + item.maxMarks, 0)
  const totalGrades = ((totalMarks / totalMaxMarks) * 100).toFixed(2)*/



  const [grades, setGrades] = useState([])

  useEffect(() => {
    async function fetchGrades () {
      const response = await attemptFetchCourseGrades('http://localhost:9000/getCourseGrades', userID,courseID)
      //console.log("In frontend for grades:",response)
      const resList = [];
      for (let i = 0; i < response.results.length; i++) {
        resList.push({
          name: response.results[i].professor_title,
          maxMarks: parseInt(response.results[i].professor_total),
          marks: parseInt(response.results[i].grade)
        })
      }
      setGrades(resList)
    }
    fetchGrades()
  }, [])

  console.log("Static obj",assignments)
  console.log("Backen obj",grades)

  /*const totalMarks = grades.reduce((sum, item) => sum + (item.marks ? item.marks : 0), 0)
  const totalMaxMarks = grades.reduce((sum, item) => sum + item.maxMarks, 0)
  const totalGrades = ((totalMarks / totalMaxMarks) * 100).toFixed(2)*/

  const totalMarks = grades.reduce((sum, item) => {
    const marks = parseFloat(item.marks);
    if (!isNaN(marks) && item.maxMarks !== 0) {
      return sum + marks;
    } else {
      return sum;
    }
  }, 0);
  

  console.log(totalMarks)
  
  const totalMaxMarks = grades.reduce((sum, item) => {
    const marks = parseFloat(item.marks);
    if (item.maxMarks !== 0 && !isNaN(marks)) {
      return sum + item.maxMarks;
    } else {
      return sum;
    }
  }, 0);
  console.log(totalMaxMarks)
  const totalGrades = ((totalMarks / totalMaxMarks) * 100).toFixed(2);
  
  
  

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Maximum Marks</th>
            <th>Marks Gotten</th>
            <th>View Assignment</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.maxMarks}</td>
              <td>{isNaN(item.marks) ? "" : item.marks}</td>
              <td><button>View the assignment</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="grades-container">
        <span>Total Grades:</span>
        <span>{totalGrades}%</span>
      </div>
    </div>
  )
}

export default A1
