import React, { Component } from 'react'
import { NavDropdown, Navbar, Container,Nav } from "react-bootstrap";
import   "../firebase";
import { getDatabase, ref,get,child } from "firebase/database";
export default class Sidenav extends Component {
   
    constructor(props) {
    
        super(props);
       
        
        this.state = {classList : [],assignmentList : []}
        }
        componentDidMount() {
            
            const dbRef = ref(getDatabase());
            let classList = [];
            let assignmentList = [];

            //get list of classes
            get(child(dbRef, `classes`)).then((snapshot) => {
              if (snapshot.exists()) {
                snapshot.forEach(function(item) {
                    var itemVal = item.val();
                    classList.push(itemVal);
                   console.log(itemVal.classID);
                });
               
               
               this.setState({ classList:classList });
            
              } else {
                console.log("No data available");
              }
            }, {
                onlyOnce: true
              }).catch((error) => {
              console.error(error);
            }); 
          

              //get list of assignments
              get(child(dbRef, `assignments`)).then((snapshot) => {
                if (snapshot.exists()) {
                  snapshot.forEach(function(item) {
                      var itemVal = item.val();
                      assignmentList.push(itemVal);
                     console.log(itemVal.title);
                  });
                 
                 
                 this.setState({ assignmentList:assignmentList });
              
                } else {
                  console.log("No data available");
                }
              }, {
                  onlyOnce: true
                }).catch((error) => {
                console.error(error);
              }); 
            
        }
    render() {
        
        //create nav nodes for classes
        const listclasses = this.state.classList.map((class_item) =>
        
        <NavDropdown.Item href="#" key={class_item.classID}>{class_item.name}</NavDropdown.Item>
    );  
 //create nav nodes for assignments
     const listassignments = this.state.assignmentList.map((assignment_item) =>
        
    <NavDropdown.Item href="#" key={assignment_item.assignmentID}>{assignment_item.title}</NavDropdown.Item>
    );  
        return (
         
             

<div id="slide-out" className="side-nav fixed">
<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Student portal</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Dashboard</Nav.Link>
       
        <NavDropdown title="Classes" id="basic-nav-dropdown">
           {listclasses} 
        </NavDropdown>
        <NavDropdown title="Assignments" id="basic-nav-dropdown">
           {listassignments} 
        </NavDropdown>
        <Nav.Link href="#home">Attendance</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>

           
        )
    }
}
