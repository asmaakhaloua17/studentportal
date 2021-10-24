import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import Footer from "../../Footer";
import Sidenav from "../../Sidenav";
import ClassNav from "../../Classes/ClassNav";
import "../../../firebase";
import "font-awesome/css/font-awesome.min.css";
import { getDatabase, ref, get, child } from "firebase/database";
import { Link } from "react-router-dom";

export default class RessourceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { description: "", title: "" };
  }
  componentDidMount() {
    const dbRef = ref(getDatabase());

    let title = "";
    let description = "";
    //get list of ressources
    get(child(dbRef, `ressources`))
      .then(
        (snapshot) => {
          let ressourceID = this.props.match.params.ressourceId;
          console.log("searching for ressources" + ressourceID);
          if (snapshot.exists()) {
            snapshot.forEach(function (item) {
              var itemVal = item.val();
              //  console.log("ressource "+ressourceID);
              if (itemVal.ressourceID == ressourceID) {
                description = itemVal.description;
                title = itemVal.title;
              }
            });
            this.setState({ description: description });
            this.setState({ title: title });
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
      <div className="class">
        <Sidenav />
        <Container>
          <Row className="theme_body">
            <Col xs lg="2">
              <ClassNav></ClassNav>
            </Col>
            <Col>
              <div className="ressources">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to={`/Dashboard`}>Dashboard</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link
                      to={`/classDetails/${this.props.match.params.classId}`}
                    >
                      Class
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link
                      to={`/classDetails/${this.props.match.params.classId}`}
                    >
                      Module {this.props.match.params.moduleId}
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>{this.state.title}</Breadcrumb.Item>
                </Breadcrumb>

                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{this.state.title}</Accordion.Header>
                    <Accordion.Body>{this.state.description}</Accordion.Body>
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
