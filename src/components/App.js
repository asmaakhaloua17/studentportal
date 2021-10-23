import React  from "react";
import Register from "./Register";
import Login from "./Login";
import {Container} from "react-bootstrap";
import {Switch, Route} from 'react-router-dom';
import Dashboard from "./Dashboard";
import ClassDetails from "./Classes/ClassDetails";
import Grades from "./Grades/Grades";

function App() {
  return (

  
    <Switch>
      <Route path="/" component={Login} exact/>
      <Route path="/Register" component={Register}/>
      <Route path="/Dashboard" component={Dashboard}/>
      <Route path="/classDetails/:classId" component={ClassDetails}/>
      <Route path="/Grades" component={Grades}/>
      <Route component={Error} />
    </Switch>

 
    
  )
}

export default App;
