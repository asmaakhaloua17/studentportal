import React, { Component } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Button,
  Modal,
  ListGroup,
} from "react-bootstrap";
import Footer from "../Footer";
import Sidenav from "../Sidenav";
import ManageModules from "./ManageModules";
import "../../firebase";
import { getDatabase, ref, get, child, set } from "firebase/database";

export default class ModuleNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHide: false,
      openedDialog: -1,
      moduleID: "",
      classID: "",
      description: "",
      published: 0,
      title: "",
      teacherID: this.props.match.params.teacherID,
    };
  }

  //handle the student list popup
  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

  //method to update the state variables with the user inputs
  handleModuleInput = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    this.setState({ [name]: value });
    // console.log("Name: " + name + "value:" + value);
  };
  //method to add Module to the database
  handleAddModule = (event) => {
    const db = getDatabase();
    set(ref(db, "modules/" + this.state.moduleID), {
      moduleID: this.state.moduleID,
      description: this.state.description,
      title: this.state.title,
      published: this.state.published,
      classID: this.props.match.params.classID,
    })
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("Failed to save data new Module!" + error);
      });
    event.preventDefault();
  };

  //get List of classes

  componentDidMount() {
    const dbRef = ref(getDatabase());
    let classList = [];

    //get list of classes
    get(child(dbRef, `classes`))
      .then(
        (snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach(function (item) {
              var itemVal = item.val();
              classList.push(itemVal);
            });
            this.setState({ classList: classList });
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

        <Sidenav role="teacher" euid={this.props.match.params.teacherID} />
        <Container>
          <Row className="theme_body">
            <Col>
              {" "}
              <div className="big-title">
                <h3 className="big_title">Modules</h3>

                <div>
                  <ManageModules
                    teacherID={this.props.match.params.teacherID}
                    classID={this.props.match.params.classID}
                  ></ManageModules>
                </div>
              </div>
            </Col>
            <Col>
              {" "}
              <div className="big-title">
                <h3 className="big_title">New Modules</h3>
                {this.state.description}
                <Form onSubmit={this.handleAddModule}>
                  <Form.Group id="moduleID">
                    <Form.Label>Module Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="moduleID"
                      required
                      onChange={this.handleModuleInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      required
                      onChange={this.handleModuleInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      required
                      onChange={this.handleModuleInput}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group id="published">
                    <Form.Check
                      type="checkbox"
                      id="published"
                      className="mb-2"
                      label="Published"
                    />
                  </Form.Group>
                  <Form.Group id="action">
                    <Button
                      className="w-100 btn-secondary"
                      size="lm"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Form.Group>
                </Form>
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
