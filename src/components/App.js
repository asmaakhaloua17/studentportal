import React  from "react";
import Register from "./Register";
import Login from "./Login";
import {Container} from "react-bootstrap";
import {Switch, Route} from 'react-router-dom';

function App() {
  return (

  <Container className="d-flex align-item-center justify-content-center">
    <Switch>
      <Route path="/" component={Login} exact/>
      <Route path="/Register" component={Register}/>
      <Route component={Error} />
    </Switch>
  </Container>
 
    
  )
}

export default App;
