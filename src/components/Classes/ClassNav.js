import React, { Component } from 'react'
import { Nav} from "react-bootstrap";
import   "../../firebase";
import {Link} from 'react-router-dom';


export default class ClassNav extends Component {

    render() {
  
        return (
        
            <Nav defaultActiveKey="/" className="class-nav flex-column">
        
            <Nav.Link> <Link to={"/classDetails/"+ this.props.classId+"/"+this.props.euid} className={(this.props.isActive === 1) ?"active": ""}>Modules </Link></Nav.Link>
            <Nav.Link> <Link to={"/Grades/"+ this.props.classId+"/"+this.props.euid} className={(this.props.isActive ==2) ?"active": ""}>Grades </Link></Nav.Link>
            <Nav.Link> <Link to={`/assignmentListsByClass/`+this.props.classId+"/"+this.props.euid} className={(this.props.isActive == 3) ?"active": ""}>Assignments </Link></Nav.Link>
            <Nav.Link>  <Link to={"/attendances/"+ this.props.classId+"/"+this.props.euid} className={(this.props.isActive == 4) ?"active": ""}>Attendance </Link></Nav.Link>
            <Nav.Link> <Link to={"/people/"+ this.props.classId+"/"+this.props.euid}  className={(this.props.isActive ==5) ?"active": ""}>People </Link></Nav.Link>
          </Nav>


            );
        
    }
}
