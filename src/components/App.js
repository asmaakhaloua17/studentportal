import React  from "react";
import Register from "./Register";
import Login from "./Login";
import RessourceDetail from "./Modules/Ressources/RessourceDetail";
import {Switch, Route, HashRouter  as Router} from 'react-router-dom';
import Dashboard from "./Dashboard";
import ClassDetails from "./Classes/ClassDetails";
import AssignmentDetails from "./Assignments/AssignmentDetails";
import DashboardTeacher from "./DashboardTeacher";
import ClassNew from "./Classes/ClassNew";
import Grades from "./Grades/Grades";
import AssignmentList from "./Assignments/AssignmentList";
import PeopleByClass from "./Attendances/PeopleByClass";
import AttendanceByClass from "./Attendances/AttendanceByClass";
import AssignmentNew from "./Assignments/AssignmentNew";
import ModuleNew from "./Modules/ModuleNew";
import RollCall from "./Attendances/RollCall";

function App() {
  return (
<main>
    <div className="App">
      
      <Router>
 <Switch>
      <Route path="/" component={Login} exact/>
      <Route path="/Register" component={Register}/>
      <Route path="/Dashboard/:euid" component={Dashboard}/>
      <Route path="/DashboardTeacher/:euid" component={DashboardTeacher}/>
      <Route path="/ressourceDetails/:ressourceId/:moduleId/:classId/:euid" component={RessourceDetail}/>
      <Route path="/classDetails/:classId/:euid" component={ClassDetails}/>
      <Route path="/newClass/:euid/" component={ClassNew}/>
      <Route path="/manageAssignment/:euid/" component={AssignmentNew}/>
      <Route path="/manageModules/:classID/:teacherID/" component={ModuleNew}/>
      <Route path="/assignmentDetails/:assignmentID/:classId/:euid" component={AssignmentDetails} />
      <Route path="/assignmentListsByClass/:classId/:euid" component={AssignmentList} />
      <Route path="/attendances/:classId/:euid" component={AttendanceByClass} />
      <Route path="/people/:classId/:euid" component={PeopleByClass} />
      <Route path="/Grades/:classId/:euid" component={Grades}/>
      <Route path="/rollCall/:teacherID/" component={RollCall}/>
   
    </Switch>
</Router>
    </div>
    </main>
 
    
  )
}

export default App;
