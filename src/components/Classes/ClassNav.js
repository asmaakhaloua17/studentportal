


import React, { Component } from 'react'
import { Nav} from "react-bootstrap";
import   "../../firebase";



export default class ClassNav extends Component {

    render() {
  
        return (
        
            <Nav defaultActiveKey="/" className="class-nav flex-column">
        
            <Nav.Link href={ "/classDetails/"+ this.props.classId+"/"+this.props.euid} className={(this.props.isActive == 1) ?"active": ""}>Modules</Nav.Link>
            <Nav.Link href={"/Grades/"+ this.props.classId+"/"+this.props.euid} className={(this.props.isActive ==2) ?"active": ""}>Grades</Nav.Link>
            <Nav.Link href={`/assignmentListsByClass/`+this.props.classId+"/"+this.props.euid} className={(this.props.isActive == 3) ?"active": ""}>Assignments</Nav.Link>
            <Nav.Link eventKey="link-4" href={ "/attendances/"+ this.props.classId+"/"+this.props.euid} className={(this.props.isActive == 4) ?"active": ""}>Attendance</Nav.Link>
            <Nav.Link eventKey="link-5"  href={ "/people/"+ this.props.classId+"/"+this.props.euid}  className={(this.props.isActive ==5) ?"active": ""}>People</Nav.Link>
          </Nav>


            );
        
    }
}
