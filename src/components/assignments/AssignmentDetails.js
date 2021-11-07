import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Badge,
  Button,
} from "react-bootstrap";
import Footer from "../Footer";
import Sidenav from "../Sidenav";
import ClassNav from "../Classes/ClassNav";
import "../../firebase";
//import "font-awesome/css/font-awesome.min.css";
import { getDatabase, ref, get, child } from "firebase/database";
import { Link } from "react-router-dom";

export default class AssignmentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", title: "", dueDate: "", className: "" };
  }
  componentDidMount() {
    const dbRef = ref(getDatabase());

    let title = "";
    let description = "";
    let dueDate = "";
    let points = "";
    let className = "";
    //get list of ressources
    get(child(dbRef, `assignments`))
      .then(
        (snapshot) => {
          let assignmentID = this.props.match.params.assignmentID;
          console.log("searching for assignments" + assignmentID);
          if (snapshot.exists()) {
            snapshot.forEach(function (item) {
              var itemVal = item.val();
              //  console.log("ressource "+ressourceID);
              if (itemVal.assignmentID == assignmentID) {
                description = itemVal.description;
                title = itemVal.title;
                dueDate = itemVal.dueDate;
                points = itemVal.points;
                className = itemVal.className;
              }
            });
            this.setState({ description: description });
            this.setState({ title: title });
            this.setState({ dueDate: dueDate });
            this.setState({ points: points });
            this.setState({ className: className });
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
        <Sidenav euid={this.props.match.params.euid} />
        <Container>
          <Row className="theme_body">
            <Col xs lg="2">
              <ClassNav
                euid={this.props.match.params.euid}
                classId={this.props.match.params.classId}
                isActive="3"
              ></ClassNav>
            </Col>
            <Col>
              <div className="assignment">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link
                      to={`/classDetails/${this.props.match.params.classId}/${this.props.match.params.euid}`}
                    >
                      Class
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link
                      to={`/assignmentListsByClass/${this.props.match.params.classId}/${this.props.match.params.euid}`}
                    >
                      Assignments {this.props.match.params.moduleId}
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>{this.state.title}</Breadcrumb.Item>
                </Breadcrumb>

                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{this.state.title}</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        <Col>
                          <span Style="font-weight: bold;color: red;">
                            {" "}
                            <i className="fa fa-calendar-plus-o"></i>Due Date :
                          </span>{" "}
                          <Badge bg="secondary">{this.state.dueDate}</Badge> |    <Badge bg="info">{this.state.className}</Badge>
                        </Col>
                      </Row>
                    
                      <Row>
                        <p>{this.state.description}</p>
                      </Row>
                      <Button variant="primary">Submit assignment</Button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
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
