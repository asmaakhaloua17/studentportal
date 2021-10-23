


import React, { Component } from 'react'
import { Nav} from "react-bootstrap";
import   "../../firebase";



export default class ClassNav extends Component {

    render() {
        
       
        return (
            <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/">Modules</Nav.Link>
            <Nav.Link  href="/Grades">Grades</Nav.Link>
            <Nav.Link eventKey="link-2">Assignments</Nav.Link>
       
            <Nav.Link eventKey="link-2">Attendance</Nav.Link>
            <Nav.Link eventKey="link-2">People</Nav.Link>
          </Nav>


            );
        
    }
}
