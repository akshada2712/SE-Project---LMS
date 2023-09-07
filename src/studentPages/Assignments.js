import React,{useState,useEffect} from 'react'
import { Card } from 'react-bootstrap' // import the Bootstrap Card component
import { useHistory } from 'react-router-dom';



const attemptFetchCourseAssignments = async (url = '', uid,cid) => {
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


function AssignmentList (props) {
  // define a list of assignments
  const assignments = [
    { title: 'Introduction', description: 'Introduction' },
    { title: 'Lecture Summary 1', description: 'Week 1 Lecture Summary' },
    { title: 'Lecture Summary 2', description: 'Week 2 Lecture Summary' }
  ]

  const courseID = props.courseID;
  const userID = props.userID;
  console.log("IN ASSIGNMENT SCREEN \n USER ID:",userID,"COURSEID:",courseID)






  const [assigns, setAssignments] = useState([])

  useEffect(() => {
    async function fetchAssignments () {
      const response = await attemptFetchCourseAssignments('http://localhost:9000/getCourseAssignments', userID,courseID)
      //console.log("In frontend for grades:",response)
      const resList = [];
      for (let i = 0; i < response.results.length; i++) {
        resList.push({
          title: response.results[i].title,
          description: response.results[i].description,
          totalMarks: response.results[i].total,
          grade: response.results[i].grade,
          subdate: response.results[i].subdate
        })
      }
      setAssignments(resList)
    }
    fetchAssignments()
  }, [])

  

  console.log("Static obj",assignments)
  console.log("Backen obj",assigns)

  const history = useHistory();
  // handle click event
  const handleClick = (assignment) => {

    console.log(assignment)
    history.push({ pathname: '/Assignments/Ass1', state: { 
      object:{
        title: assignment.title, 
        totalMarks: assignment.totalMarks,
        grade:assignment.grade,
        subDate: assignment.subdate }
   } });

  }


  return (
    <div>
      {assigns.map((assignment, index) => (
        <Card
          key={index}
          style={{ marginBottom: '10px' }}
          onClick={() => handleClick(assignment)}
        >
          <Card.Body>
            <Card.Title>{assignment.title}</Card.Title>
            <Card.Text>{assignment.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default AssignmentList;
