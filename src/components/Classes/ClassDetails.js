import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer";
import Sidenav from "../Sidenav";
import ClassNav from "./ClassNav";
import { getDatabase, ref, get, child } from "firebase/database";
export default class ClassDetails extends Component {
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
            console.log(
              this.props.match.params.classId +
                " " +
                snapshot.child("classID").val()
            );
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
        <Sidenav />
        <Container>
          <Row className="theme_body">
            <Col xs lg="2">
              {" "}
              <ClassNav></ClassNav>
            </Col>
            <Col> <h3 className="big_title">{this.state.classTitle} Section {this.state.classSection}</h3></Col>
          </Row>
          <Row>
            <Footer></Footer>
          </Row>
        </Container>
      </div>
    );
  }
}
