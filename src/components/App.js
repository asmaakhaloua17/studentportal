import React  from "react";
import Register from "./Register";
import {Container} from "react-bootstrap";
function App() {
  return ( 
<Container className="d-flex align-item-center justify-content-center">
  <div className="w-100" style={{maxWidth: "400px"}}>
    <Register/>
  </div>

</Container>
 
    
    )

}

export default App;
