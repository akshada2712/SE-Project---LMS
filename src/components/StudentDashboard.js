import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, Router, Route, Switch } from 'react-router-dom'
import { Layout, Menu, Card, Row, Col, Input } from 'antd'
import StudentCourseDetails from './StudentCourseDetails'
import MyCalendar from './MyCalender'
import logo from './edumatelogo.png'
import Search from 'antd/es/transfer/search'
const { Header, Content, Sider } = Layout


const attemptFetchCourses = async (url = '', uid) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: uid
    })
  }
  )
  return response.json()
}

const MainScreen = ({ subjects, onSelectCourse }) => {
  const history = useHistory()
  console.log('subjects', subjects, ' type:', typeof (subjects))
  const [courses, setCourses] = useState([])

  useEffect(() => {
    async function fetchCourses () {
      const response = await attemptFetchCourses('http://localhost:9000/getCourses', subjects)
      console.log(response)
      const resList = []
      for (let i = 0; i < response.results.length; i++) {
        resList.push({
          course_id: response.results[i].course_id,
          course_title: response.results[i].course_title,
          semester_id: response.results[i].semester_id
        })
      }
      setCourses(resList)
    }
    fetchCourses()
  }, [])

  if (courses.length > 0) {
    console.log(courses)
  }
  function handleCardClick (subject) {
    onSelectCourse(subject/*.course_title*/)
    console.log('Clicked in main screen', subject)
  }

  const [searchQuery, setSearchQuery] = useState('')
  const filteredSubjects = courses.filter((subject) =>
    subject.course_title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <div>
      <h1>Dashboard</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search for a subject..."
      />
      <Row gutter={[16, 16]}>
        {filteredSubjects.map((subject) => (
          <Col span={8} key={subject.course_id}>
            <Card title={subject.course_title}
            onClick = {() => handleCardClick(subject)}>
              <p>Sub Code: {subject.course_id}</p>
              <p>Sem code: {subject.semester_id}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

const Sidebar = ({ subjects, onMenuClick }) => {
  console.log('subjects', subjects, ' type:', typeof (subjects))
  const [courses, setCourses] = useState([])
  useEffect(() => {
    async function fetchCourses () {
      const response = await attemptFetchCourses('http://localhost:9000/getCourses', subjects)
      console.log(response)
      const resList = []
      for (let i = 0; i < response.results.length; i++) {
        resList.push({
          course_title: response.results[i].course_title,
          course_id: response.results[i].course_id,
          semester_id: response.results[i].semester_id
        })
      }
      setCourses(resList)
    }
    fetchCourses()
  }, [])

  const handleItemClick = (item) => {
    onMenuClick(item)
  }

  if (courses.length > 0) {
    console.log(courses)
  }

  /* STATIC DATA */
  const assignments = [
    { subject: 'English', title: 'Essay', deadline: 'March 15, 2023' },
    { subject: 'Mathematics', title: 'Problem Set 5', deadline: 'March 17, 2023' },
    { subject: 'History', title: 'Research Paper', deadline: 'March 20, 2023' },
    { subject: 'Science', title: 'Lab Report', deadline: 'March 22, 2023' }
  ]

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >

        <Menu.SubMenu key="sub1" title="Dashboard">
        <Menu.Item key="0" onClick={() => handleItemClick('Home')}>
        Home
      </Menu.Item>
          <Menu.Item key="1" onClick={() => handleItemClick('Overview')} >Overview</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" title="Courses">
          {courses.map((subject) => (
            <Menu.Item key={subject.course_id} onClick={() => handleItemClick(subject/*.course_title*/)}>{subject.course_title}</Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.SubMenu key="sub3" title="Assignments">
        <Menu.SubMenu key="sub3-1" title="Upcoming">
          {assignments.map((assignment, index) => (
            <Menu.Item key={index}>
              {assignment.subject}: {assignment.title} (Due: {assignment.deadline})
            </Menu.Item>
          ))}
          </Menu.SubMenu>
          <Menu.Item key="4" onClick={() => handleItemClick('Grades')}>Grades</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub4" title="Calender" >
          <Menu.Item key="5" onClick={() => handleItemClick('Calender')}>Calendar
            {/* <Router>
                <Route path='/calendar' Component={CalendarImplementation}>
                </Route>
            </Router> */}
              {/* <CalendarImplementation /> */}
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  )
}

const CoursesScreen = () => {
  return (
    <div>
      <h1>Course Details</h1>
      <p>View your course details.</p>
    </div>
  )
}

const GradesScreen = () => {
  return (
    <div>
      <h1>Grades</h1>
      <p>View your grades.</p>
    </div>
  )
}

const Home = ({ Profile }) => {
  console.log('In home', Profile)
  return (
    <div>
      <div style={{ marginTop: '100px', marginLeft: '200px' }}>
      <h1>Home</h1>
      <p> Welcome {Profile} !</p>
      </div>
    </div>
  )
}

const StudentDashboard = () => {
  const location = useLocation()
  const id = location.state.detail
  console.log(id[1])

  const [selectedItem, setSelectedItem] = useState('Home')

  const [selectedCourse, setSelectedCourse] = useState('')

  const handleMenuClick = (item) => {
    setSelectedItem(item)
  }

  const handleCardClick = (course) => {
    setSelectedCourse(course)
    window.history.pushState({ selectedCourse: course }, null, null)
  }

  useEffect(() => {
    const handlePopState = (event) => {
      const { selectedCourse } = event.state || {}
      setSelectedCourse(selectedCourse)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  console.log('Sidebar Item clicked : ', selectedItem,selectedItem.course_id)
  console.log('Selected course in dashboard', selectedCourse)

  return (
      <Layout>
        <Header className="header">
          <div className="logo-container">
            <img
              src={logo}
              className="logo"
            />
            {/*<span className="title">Edumate Dashboard</span>*/}
          </div>
        </Header>
        <Layout>
          <Sidebar subjects={id[1]} onMenuClick={handleMenuClick} />
          <Content className="site-layout-background">
            {/* <MainScreen subjects = {id}/> */}

            { selectedItem === 'Home'
              ? (
                <Home Profile = {id[0]}/>)
              : selectedItem === 'Overview'
                ? (
                    selectedCourse ? <StudentCourseDetails  courseTitle = {selectedCourse.course_title} courseID = {selectedCourse.course_id} userID= {id[1]}/> : <MainScreen subjects={id[1]} onSelectCourse={handleCardClick} />
                  )
                  : selectedItem === 'Grades'
                    ? (
    <GradesScreen/>
                      )
                    : selectedItem === 'Calender'
                      ? (
    <MyCalendar />
                        )
                        : selectedItem ? ( <StudentCourseDetails courseTitle = {selectedItem.course_title} courseID = {selectedItem.course_id} userID= {id[1]}/> )
                      : (
    <div>No content selected</div>
                        )}
          </Content>
        </Layout>
      </Layout>
  )
}
export default StudentDashboard