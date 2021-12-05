import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Footer from "../Footer";
import Sidenav from "../Sidenav";
import ClassNav from "../Classes/ClassNav";
import { getDatabase, ref, get, child } from "firebase/database";

export default class AttendanceByClass extends Component {
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
          
              <ClassNav classId={this.props.match.params.classId} euid={this.props.match.params.euid} isActive="4"></ClassNav>
            </Col>
            <Col> <h3 className="big_title">Attendances for {this.state.classTitle} Section {this.state.classSection}</h3>
           
            
            <Col lg= {6} md ={12}>
                <Table striped hover size ="sm" className="gradesTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>12/12/1212</td>
                            <td>Present</td>
                        </tr>
                        <tr>
                            <td>Two</td>
                            <td>temp</td>
                        </tr>
                        <tr>
                            <td>Three</td>
                            <td>temp</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
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
