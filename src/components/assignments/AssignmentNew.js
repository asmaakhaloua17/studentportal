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
import ManageAssignments from "./ManageAssignment";
import "../../firebase";
import { getDatabase, ref, get, child, set } from "firebase/database";

export default class AssignmentNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showHide: false,
      openedDialog: -1,
      assignmentID: "",
      classID: "",
      className: "",
      description: "",
      duedate: "",
      points: "",
      published: 0,
      summary: "",
      title: "",
      classList: [],
      teacherID: this.props.match.params.euid,
    };
  }

  //handle the student list popup
  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }
  
  //method to update the state variables with the user inputs
  handleAssignmentInput = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    this.setState({ [name]: value });
   // console.log("Name: " + name + "value:" + value);
  };
  //method to add Assignment to the database
  handleAddAssignment = (event) => {
    const db = getDatabase();
    set(ref(db, "assignments/" + this.state.assignmentID), {
      assignmentID: this.state.assignmentID,
      description: this.state.description,
      title: this.state.title,
      classID: this.state.classID,
      dueDate: this.state.duedate,
      published: this.state.published,
      points: this.state.points,
      summary: this.state.summary,
      teacher: this.props.match.params.euid,
    })
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("Failed to save data new Assignment!" + error);
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
          //create nav nodes for classes
          const listclasses = this.state.classList.map((class_item) =>
        
          <option value={class_item.classID}>
            {class_item.classID} -- {class_item.name} </option>
      );
    return (
      <div>
        <Sidenav role="teacher" euid={this.props.match.params.euid} />
        <Container>
          <Row className="theme_body">
            <Col>
              {" "}
              <div className="big-title">
                <h3 className="big_title">Assignments</h3>

                <div>
                  <ManageAssignments
                    teacherID={this.state.teacherID}
                  ></ManageAssignments>
                </div>
              </div>
            </Col>
            <Col>
              {" "}
              <div className="big-title">
                <h3 className="big_title">New Assignments</h3>
                {this.state.description}
                <Form  onSubmit={this.handleAddAssignment}>
                <Form.Group id="classID">
                  
                  <Form.Label>Class Name</Form.Label>
                <Form.Select  name= "classID" aria-label="dropdown list of classes"   onChange={this.handleAssignmentInput} required>
                <option value="">
         Select Class</option>
                  {listclasses}
                  </Form.Select>
                  </Form.Group>
                <Form.Group id="assignmentID">
                  
                    <Form.Label>Assignment Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="assignmentID"
                      required
                      onChange={this.handleAssignmentInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      required
                      onChange={this.handleAssignmentInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      required
                      onChange={this.handleAssignmentInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="summary">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="summary"
                      style={{ height: '100px' }}
                      required
                      onChange={this.handleAssignmentInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="duedate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="duedate"
                      required
                      onChange={this.handleAssignmentInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="points">
                    <Form.Label>Points</Form.Label>
                    <Form.Control
                      type="text"
                      name="points"
                      required
                      onChange={this.handleAssignmentInput}
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
