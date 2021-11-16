import React, { Component } from 'react'
import { NavDropdown, Navbar, Container,Nav } from "react-bootstrap";
import   "../firebase";
import { getDatabase, ref,get,child } from "firebase/database";
import logo from "../img/logo-nav.png"
import {Link} from 'react-router-dom';
export default class Sidenav extends Component {
   
    constructor(props) {
    
        super(props);
       
        
        this.state = {classList : [],assignmentList : [],dashboardlink :"",currentuser : this.props.euid}
        }
        componentDidMount() {
            
            const dbRef = ref(getDatabase());
            let classList = [];
            let assignmentList = [];
let dashboardlink ="Dashboard";
let currentuser =this.state.currentuser;
            //get list of classes
            get(child(dbRef, `classes`)).then((snapshot) => {
              if (snapshot.exists()) {
                snapshot.forEach(function(item) {
                    var itemVal = item.val();
                    classList.push(itemVal);
               
                if(itemVal.teacherID == currentuser)
                {
                  dashboardlink = "DashboardTeacher";
                }
               
                   console.log(itemVal.classID);
                });
               
                this.setState({ dashboardlink:dashboardlink });
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
        
        <NavDropdown.Item key={class_item.classID}>
       
          {<Link to={`/classDetails/${class_item.classID}/${class_item.teacherID}`}>
          {class_item.name} Section {class_item.section} - {class_item.courseName}
     </Link>}
          
          </NavDropdown.Item>
    );  
 //create nav nodes for assignments
 const listassignments = this.state.assignmentList.map((assignment_item) =>
<Link to={`/assignmentDetails/${assignment_item.assignmentID}/${assignment_item.classID}/${assignment_item.teacher}`}>
       {assignment_item.title} -- Section {assignment_item.className} {assignment_item.section} - {assignment_item.courseName}
     </Link>
 
);
        return (
         
             
       
<div id="slide-out" className="side-nav fixed">
<Navbar bg="light" expand="lg" className="nav-portal">
  <Container>
    
    <Navbar.Brand href="#"><img src={logo} alt="logo" className="nav-logo"></img></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
       
        <Nav.Link href="#"><Link to={`/`+this.state.dashboardlink+`/`+this.props.euid}>
   Dashboard
 </Link></Nav.Link>
    
        
         
        
         
     
       
        <NavDropdown title="Classes" id="basic-nav-dropdown">
           {listclasses} 
        </NavDropdown>
        <NavDropdown title="Assignments" id="basic-nav-dropdown">
           {listassignments} 
        </NavDropdown>
        <Nav.Link href="#">Attendance</Nav.Link>
 
        <Nav.Link className="nav-link-logout"><Link to={`/`}>
   Logout
 </Link></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>

           
        )
    }
}
