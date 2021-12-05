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
 <NavDropdown.Item href="#">
     {<Link className="dropdown-item" to={`/assignmentDetails/${assignment_item.assignmentID}/${assignment_item.classID}/${assignment_item.teacher}`}>
       {assignment_item.title} -- Section {assignment_item.className} {assignment_item.section} - {assignment_item.courseName}
     </Link>}
 </NavDropdown.Item>
 
);
        return (
         
             
       
<div id="slide-out" className="side-nav fixed">
<Navbar bg="light" expand="lg" className="nav-portal">
  <Container>
    
    <Navbar.Brand href="#"><img src={logo} alt="portal logo" className="nav-logo"></img></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
       
       <Link to={`/`+this.state.dashboardlink+`/`+this.props.euid} className="nav-link-selected">
   Dashboard
 </Link>
    
        
         
        
         
     
       
        <NavDropdown title="Classes" id="basic-nav-dropdown">
           {listclasses} 
        </NavDropdown>
        <NavDropdown title="Assignments" id="basic-nav-dropdown2">
           {listassignments} 
        </NavDropdown>
    
     <Link to={`/`}  className="nav-link">
     Attendance
   </Link>
       <Link to={`/`}  className="nav-link-logout">
   Logout
 </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>

           
        )
    }
}
