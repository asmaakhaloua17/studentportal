import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer";
import Sidenav from "../Sidenav";
import ClassNav from "../Classes/ClassNav";
import { getDatabase, ref, get, child } from "firebase/database";

import ListAssignmentByClass from "./ListAssignmentByClass";
export default class AssignmentList extends Component {
  constructor(props) {
    super(props);
    this.state = { classTitle: "" ,classSection :"" };
  }
  componentDidMount() {
    const dbRef = ref(getDatabase());

    //get  classe title

    get(child(dbRef, "classes/" + this.props.match.params.classId))
      .then(
        (snapshot) => {
          if (snapshot.exists()) {
          
            if (
              this.props.match.params.classId == snapshot.child("classID").val()
            ) {
              this.setState({ classTitle: snapshot.child("name").val() });
              this.setState({ classSection: snapshot.child("section").val() });
            }
          } else {
            console.log("No data available");
          }
        },
        {
          onlyOnce: true,
        }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
    
       <Sidenav euid={this.props.match.params.euid}/>
        <Container>
          <Row className="theme_body">
            <Col xs lg="2">
          
              <ClassNav classId={this.props.match.params.classId} euid={this.props.match.params.euid} isActive="3"></ClassNav>
            </Col>
            <Col> <h3 className="big_title">Assignments for {this.state.classTitle} Section {this.state.classSection}</h3>
           
            <ListAssignmentByClass classID={this.props.match.params.classId} euid={this.props.match.params.euid}></ListAssignmentByClass>
            </Col>
          </Row>
          <Row>
            <Footer></Footer>
          </Row>
        </Container>
      </div>
    );
  }
}
