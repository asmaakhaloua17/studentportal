


import React, { Component } from 'react'
import { Nav} from "react-bootstrap";
import   "../../firebase";



export default class ClassNav extends Component {

    render() {
       
        return (
            <Nav defaultActiveKey="/" className="class-nav flex-column">
            <Nav.Link href="/">Modules</Nav.Link>
            <Nav.Link href="/Grades">Grades</Nav.Link>
            <Nav.Link eventKey="link-3">Assignments</Nav.Link>
            <Nav.Link eventKey="link-4">Attendance</Nav.Link>
            <Nav.Link eventKey="link-5">People</Nav.Link>
          </Nav>


            );
        
    }
}
