import React from 'react'
import ProfessorSidebar from './ProfessorSidebar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AssignmentList from '../pages/Assignments'
import A1 from '../pages/overview/A1'
import A2 from '../pages/overview/A2'
import M1 from '../pages/Products/M1'
import ModuleContent from '../pages/Products/ModuleContent'
import Ass1 from '../pages/Assignments/Ass1'
import ProfessorModuleHome from './ProfessorModuleHome'
import EditModuleContent from '../pages/Products/EditModuleContent'

const ProfessorCourseDetails = () => {
  return (
    <Router>
      <ProfessorSidebar />
      <Switch>
        {/* <Route path="/specificModule" exact component={ModuleTemplate}/> */}
        <Route path="/Modules" exact component={ProfessorModuleHome} />
        <Route path="/editModule" exact component = {EditModuleContent} />
        <Route path="/Assignments" exact component={AssignmentList} />
        <Route path="/overview/A1" exact component={A1} />
        <Route path="/overview/A2" exact component={A2} />
        <Route path="/Products/ModuleContent" exact component={ModuleContent} />
        <Route path="/Products/M1" exact component={M1} />
        <Route path="/Assignments/Ass1" exact component={Ass1} />
      </Switch>
      </Router>
  )
}

export default ProfessorCourseDetails
