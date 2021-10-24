import React  from "react";
import Register from "./Register";
import Login from "./Login";

import {Switch, Route} from 'react-router-dom';
import Dashboard from "./Dashboard";
import ClassDetails from "./Classes/ClassDetails";
import RessourceDetail from "./Modules/Ressources/RessourceDetail";
import DashboardTeacher from "./DashboardTeacher";
import ClassNew from "./Classes/ClassNew";
import Grades from "./Grades/Grades";

function App() {
  return (

  
    <Switch>
      <Route path="/" component={Login} exact/>
      <Route path="/Register" component={Register}/>
      <Route path="/Dashboard" component={Dashboard}/>
      <Route path="/DashboardTeacher/:firstName/:userID" component={DashboardTeacher}/>
      <Route path="/classDetails/:classId" component={ClassDetails}/>
      <Route path="/newClass/:userId" component={ClassNew}/>
      <Route path="/ressourceDetails/:ressourceId/:moduleId/:classId" component={RessourceDetail}/>
      <Route path="/Grades" component={Grades}/>
      <Route component={Error} />
    </Switch>

 
    
  )
}

export default App;
