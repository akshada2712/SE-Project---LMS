import React, { useEffect, useState, useRef } from 'react'
import { Layout, Menu, Table, Select, Input } from 'antd'
import './styles.css'

const { Header, Content, Sider } = Layout
const { Option } = Select
const { Search } = Input

const getStudents = async (url = 'http://localhost:9000/getStudents') => {
// const getStudents = async ({ url}) => {
  const response = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
  if (!response.ok) throw new Error(response.statusText)
  return response.json()
}

const getProfessors = async (url = 'http://localhost:9000/getProfessors') => {
  const response = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
  if (!response.ok) throw new Error(response.statusText)
  return response.json()
}

const getCourses = async (url = 'http://localhost:9000/getCourses/all') => {
  const response = await fetch(url, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
  if (!response.ok) throw new Error(response.statusText)
  return response.json()
}

const newEnrollment = async (data = {}) => {
  const url = 'http://localhost:9000/updateEnrollment'
  console.log(data)
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      course_id: data.course_id,
      semester_id: data.semester_id,
      user_id: data.user_id,
      enrollment_date: data.enrollment_date,
      course_title: data.course_title
    })
  }
  )
  if (!response.ok) throw new Error(response.statusText)
  return response
}

const CourseList = () => {
  const [coursesUpdated, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState(coursesUpdated)
  const [studentOptions, setStudents] = useState([])
  const [profOptions, setProfs] = useState([])

  useEffect(() => {
    async function fetchStudents () {
      const response = await getStudents()
      console.log(response)
      const resList = []
      for (let i = 0; i < response.length; i++) {
        resList.push(response[i])
      }
      setStudents(resList)
      return response
    }
    async function fetchProfessors () {
      const response = await getProfessors()
      console.log(response)
      const resList = []
      for (let i = 0; i < response.length; i++) {
        resList.push(response[i])
      }
      setProfs(resList)
      return response
    }
    async function fetchCourses () {
      const response = await getCourses()
      console.log(response)
      const resList = []
      for (let i = 0; i < response.length; i++) {
        resList.push({
          course_id: response[i].course_id,
          course_title: response[i].course_title,
          students: [],
          professors: []
        })
      }
      setCourses(resList)
      setFilteredCourses(resList)
      return response
    }
    fetchStudents()
    fetchProfessors()
    fetchCourses()
  }, [])

  const handleSearch = (value) => {
    const filtered = coursesUpdated.filter((course) =>
      course.course_title.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredCourses(filtered)
  }

  const handleAssign = (code, students) => {
    const courseIndex = coursesUpdated.findIndex((course) => course.course_id === code)
    coursesUpdated[courseIndex].students = students
    setFilteredCourses([...coursesUpdated])
  }

  const handleAssignAdmin = (code, professors) => {
    const courseIndex = coursesUpdated.findIndex((course) => course.course_id === code)
    coursesUpdated[courseIndex].professors = professors
    setFilteredCourses([...coursesUpdated])
  }

  const handleSave = async () => {
    for (let i = 0; i < filteredCourses.length; i++) {
      for (let s = 0; s < filteredCourses[i].students.length; s++) {
        const matches = filteredCourses[i].course_title.match(/\b(\w)/g) // ['J','S','O','N']
        const acronym = matches.join('')
        const request = {
          course_id: filteredCourses[i].course_id,
          user_id: filteredCourses[i].students[s],
          enrollment_date: new Date().toISOString(),
          semester_id: 'SP23',
          course_title: acronym
        }
        const resp = await newEnrollment(request)
        if (!resp.ok) throw new Error('issue in new enrollment')
      }
      for (let p = 0; p < filteredCourses[i].professors.length; p++) {
        const matches = filteredCourses[i].course_title.match(/\b(\w)/g) // ['J','S','O','N']
        const acronym = matches.join('')
        const request = {
          course_id: filteredCourses[i].course_id,
          user_id: filteredCourses[i].professors[p],
          enrollment_date: new Date().toISOString(),
          semester_id: 'SP23',
          course_title: acronym

        }
        const resp = await newEnrollment(request)
        if (!resp.ok) throw new Error('issue in new enrollment')
      }
      if (filteredCourses[i].students.length > 0 || filteredCourses[i].professors.length > 0) { console.log('updated the course ' + filteredCourses[i].course_title) }
    }
    alert('Updated courses succesfully!')
    window.location.reload(true)
  }
  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'course_title',
      key: 'course_title'
    },
    {
      title: 'Course Code',
      dataIndex: 'course_id',
      key: 'course_id'
    },
    {
      title: 'Number of Students',
      dataIndex: 'students',
      key: 'students',
      render: (students) => students.length
    },
    {
      title: 'Assign Students',
      dataIndex: 'assign',
      key: 'assign',
      render: (_, record) => {
        const { students, course_id } = record
        const handleChange = (value) => {
          handleAssign(course_id, value)
        }
        return (
          <Select
            mode="multiple"
            placeholder="Select students"
            style={{ minWidth: 200 }}
            onChange={handleChange}
            value={students}
            filterOption={(inputValue, option) =>
              option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
            }
            optionFilterProp="children"
            showSearch
            >
            <Option value="all">Select All Students</Option>
            {studentOptions.map((student) => (
              <Option key={student.user_id} value={student.user_id}>{student.username}</Option>
            ))}
          </Select>
        )
      }
    },
    {
      title: 'Assign Professors',
      dataIndex: 'assign',
      key: 'assign',
      render: (_, record) => {
        const { professors, course_id } = record
        const handleChangeAdmin = (value) => {
          handleAssignAdmin(course_id, value)
        }
        return (
          <Select
            mode="multiple"
            placeholder="Select professors"
            style={{ minWidth: 200 }}
            onChange={handleChangeAdmin}
            value={professors}
            filterOption={(inputValue, option) =>
              option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
            }
            optionFilterProp="children"
            showSearch
            >
            <Option value="all">Select All Professors</Option>
            {profOptions.map((prof) => (
              <Option key={prof.user_id} value={prof.user_id}>{prof.username}</Option>
            ))}
          </Select>
        )
      }
    }
  ]

  return (
    <div className="course-list-container">
      <h1>All Courses</h1>
      <Search placeholder="Search courses" onSearch={handleSearch} style={{ width: 200 }} />
      <Table className="course-list-table" columns={columns} dataSource={filteredCourses} />

      {filteredCourses.map((course) => (
        <div key={course.course_id}>
              <h2>{course.course_title} ({course.course_id})</h2>
              <h3> Students </h3>
          <ul>
            {course.students.map((student) => (
              <li key={student}>{student}</li>
            ))} </ul>
            <h3> Professors </h3>
            <ul>
            {course.professors.map((professor) => (
              <li key={professor}>{professor}</li>
            ))}
              </ul>
      </div>

      ))}

      <button className="save-button" onClick={handleSave}>Save changes</button>
    </div>
  )
}

const Sidebar = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.SubMenu key="sub1" title="Dashboard">
          <Menu.Item key="1">Overview</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" title="Courses">
          <Menu.Item key="2">All Courses</Menu.Item>
          <Menu.Item key="2">Add Courses</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub3" title="Assignments">
          <Menu.Item key="3">Upcoming</Menu.Item>
          <Menu.Item key="4">Grades</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub4" title="Calendar">
          <Menu.Item key="5">View Calendar</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  )
}
const AdminView = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo-container">
          <img
            src="https://dummyimage.com/50x50/f0f0f0/000000.png&text=LMS+Logo"
            alt="LMS Logo"
            className="logo"
          />
          <span className="title">Learning Management System</span>
        </div>
      </Header>
      <Layout>
        <Sidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <CourseList />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default AdminView
