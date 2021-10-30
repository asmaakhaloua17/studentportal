


import React, { Component } from 'react'
import { Nav} from "react-bootstrap";
import   "../../firebase";



export default class ClassNav extends Component {

    render() {
  
        return (
        
            <Nav defaultActiveKey="/" className="class-nav flex-column">
        
            <Nav.Link href={ "/classDetails/"+ this.props.classId+"/"+this.props.euid}>Modules</Nav.Link>
            <Nav.Link href={"/Grades/"+ this.props.classId+"/"+this.props.euid}>Grades</Nav.Link>
            <Nav.Link href={`assignmentDetails/`}>Assignments</Nav.Link>
            <Nav.Link eventKey="link-4">Attendance</Nav.Link>
            <Nav.Link eventKey="link-5">People</Nav.Link>
          </Nav>


            );
        
    }
}
