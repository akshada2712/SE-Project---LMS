import React from 'react'
import ReactDOM from 'react-dom'
import Registration from './components/Registration'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import UsernameCheck from './components/UsernameCheck'
import './styles.css'
import SecurityCheck from './components/SecurityCheck'
import PasswordReset from './components/PasswordReset'
import StudentDashboard from './components/StudentDashboard'
import ProfessorDashboard from './professorComponents/ProfessorDashboard'
import CourseDetails from './professorComponents/ProfessorCourseDetails'
import AdminView from './components/Admin'

function App () {
  console.log(process.env.REACT_APP_DATABASE_URL)

  return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/home" exact component={HomePage} />
            <Route path="/home/login" component={Login} />
            <Route path="/home/register" component={Registration} />
            <Route path="/home/logout" component={HomePage} />
            <Route path="/home/usernameCheck" component={UsernameCheck} />
            <Route path="/home/securityCheck" component={SecurityCheck} />
          <Route path="/home/passwordReset" component={PasswordReset} />
          <Route path="/home/AdminAdd" component={AdminView} />
          <Route path="/home/studentdashboard" component={StudentDashboard}/>
            <Route path="/home/professordashboard" component={ProfessorDashboard}/>
            <Route path="/home/courseDetails" component={CourseDetails}/>
          </Switch>
        </Router>
      </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
