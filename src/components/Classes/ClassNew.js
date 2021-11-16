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
import ManageClasses from "./ManageClasses";
import "../../firebase";
import { getDatabase, ref, get, child, set, } from "firebase/database";
import ColorPicker from "../Tools/ColorPicker";

export default class ClassNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentList: [],
      studentListUI: [],
      studentsID: [],
      classList: [],
      showHide: false,
      openedDialog: -1,
      nbclasses:0,
      classID: "",
      description: "",
      meetingDates: "",
      title: "",
      published: 0,
      roomNumber: "",
      seats: 0,
      section: "",
      session: 2,
      classColor:"",
      students: [],
      teacherID: this.props.match.params.euid,
    };
  }

  //handle the student list popup
  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }
  //if student is selected, add it to the studentsID array
  handleCheckboxChange = (event) => {
    let newArray = [...this.state.studentsID, event.target.id];

    if (this.state.studentsID.includes(event.target.id)) {
      newArray = newArray.filter((day) => day !== event.target.id);
    }
    this.setState({
      studentsID: newArray,
    });
  };

  //method to update the state variables with the user inputs
  handleClassInput = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    this.setState({ [name]: value });
    console.log("Name: " + name + "value:" + value);
  };
  //method to add class to the database
  handleAddClass= () => {
    const db = getDatabase();
    set(ref(db, "classes/"+this.state.classID), {
      classID: this.state.classID,
      description: this.state.description,
      meetingDates: this.state.meetingDates,
      name: this.state.title,
      published: this.state.published,
      roomNumber: this.state.roomNumber,
      seats: this.state.seats,
      section: this.state.section,
      session: this.state.session,
      students: this.state.studentsID,
      teacherID: this.props.match.params.euid,
      classColor:this.state.classColor
    }).then(() => {
          
      window.location.reload(false);
    }).catch((error) => {
      console.log("Failed to save data new class!" + error);
    });
  }
  handleColorCode =(colorValue)  =>{
    this.setState({classColor: colorValue});
}
  //get List of students

  componentDidMount() {
    const dbRef = ref(getDatabase());
    let studentList = [];

    //get list of students
    get(child(dbRef, `users`))
      .then(
        (snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach(function (item) {
              var itemVal = item.val();
              studentList.push(itemVal);
            });
            this.setState({ studentList: studentList });
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
    //create UI to list list of students
    const studentListUI = this.state.studentList.map((student_item) => (
      <ListGroup.Item as="li">
        <Form.Check
          inline
          type="checkbox"
          onChange={this.handleCheckboxChange}
          id={student_item.euid}
          checked={this.state.studentsID.includes(student_item.euid)}
        />
        {student_item.firstname} -- {student_item.euid}
      </ListGroup.Item>
    ));
    //
    return (
      <div>
        <Sidenav role="teacher"  euid={this.props.match.params.euid}/>
        <Container>
          <Row className="theme_body">
            <Col>
              {" "}
              <div className="big-title">
                <h3 className="big_title">Classes</h3>

                <div>
               
                  <ManageClasses teacherID={this.state.teacherID}></ManageClasses>
                </div>
              </div>
            </Col>
            <Col Style="Background:#eee">
              {" "}
              <div className="big-title">
                <h3 className="big_title">New Classes</h3>
              
                <Form    onSubmit={this.handleAddClass}>
                <Form.Group id="classID">
                    <Form.Label>Class Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="classID"
                      required
                      onChange={this.handleClassInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="title">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      required
                      onChange={this.handleClassInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                       as="textarea"
                    
                       style={{ height: '70px' }}
                      name="description"
                      maxLength= "124"
                      required
                      onChange={this.handleClassInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="section">
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                      type="text"
                      name="section"
                      required
                      onChange={this.handleClassInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="session">
                    <Form.Label>Session</Form.Label>
                    <Form.Control
                      type="number"
                      name="session"
                      required
                      onChange={this.handleClassInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="roomNumber">
                    <Form.Label>Room Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="roomNumber"
                      required
                      onChange={this.handleClassInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="seats">
                    <Form.Label>Seats</Form.Label>
                    <Form.Control
                      type="number"
                      name="seats"
                      required
                      onChange={this.handleClassInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="meetingDates">
                    <Form.Label>Meeting Day</Form.Label>
                 
                    <Form.Select   name="meetingDay" defaultValue=""  required
                      onChange={this.handleClassInput}>
        <option>Choose...</option>
        <option value="MWF">MWF</option>
        <option value="TTH">TTH</option>
      </Form.Select>
                  </Form.Group>
                  <Form.Group id="class-color">
                    <Form.Label>Pick a color</Form.Label>
                
                   <ColorPicker onSelectcolor={this.handleColorCode}></ColorPicker>
              
                   <Button
                      variant="outline-secondary" className="add-student-btn"
                      onClick={() => this.handleModalShowHide()}
                    >
                      Add Students
                    </Button>
                  </Form.Group>
                  <Form.Group id="action"  Style="padding-left: 15px">                   
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
            <Modal show={this.state.showHide}>
              <Modal.Header
                closeButton
                onClick={() => this.handleModalShowHide()}
              >
                <Modal.Title>Students</Modal.Title>
              </Modal.Header>
              <Modal.Body>{studentListUI}</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.handleModalShowHide()}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => this.handleModalShowHide()}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Row>
          <Row>
            <Footer></Footer>
          </Row>
        </Container>
      </div>
    );
  }
}
