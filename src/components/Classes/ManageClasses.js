import React, { Component } from "react";
import {
  Table,
  DropdownButton,
  Dropdown,
  Button,
  Modal,
  Form,Alert
} from "react-bootstrap";
import "../../firebase";
import { getDatabase, ref, get, child, set, remove } from "firebase/database";
import ColorPicker from "../Tools/ColorPicker";


export default class ManageClasses extends Component {
  constructor(props) {
    super(props);

      this.state = {
      classList: [],
      show: false,
      openedDialog: -1,
      nb_classes: 0,
      actionType: "",
      classColor: "",
      showHide: false,
      studentList: [],
      studentListUI: [],
      studentsID: [],
      nbclasses: 0,
      classID: "",
      description: "",
      meetingDates: "",
      title: "",
      published: 0,
      roomNumber: "",
      seats: 0,
      section: "",
      session: 2,
      students: [],
      teacherID: this.props.teacherID,
      hidefeedback : "none"
    };
  }

  openModal = (classid, actionType) => {
    this.setState({
      openedDialog: classid,
      actionType: actionType,
    });
  };

  closeModal = () => {
    this.setState({
      openedDialog: null,
    });
  };
  handleColorCode = (colorValue) => {
    this.setState({ classColor: colorValue });
  };
    //method to update the state variables with the user inputs
    handleClassInput = (e) => {
      const name = e.target.name;
  
      const value = e.target.value;
  
      this.setState({ [name]: value });
      console.log("Name: " + name + "value:" + value);
    };
  //handle popup
  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

   //method to remove class to the database
   handleRemoveClass = (classID) => {
    const db = getDatabase();
    ///
  
    if (window.confirm('Are you sure you wish to delete this item?'))
    {
        remove(ref(db, "classes/" + classID)).then(() => {
          window.location.reload(false);
          document.getElementById('feedback').style.display = "block";
          document.getElementById('feedback').innerText = "Class " + classID + " remove successfully!";
        })
        .catch((error) => {
          console.log("Failed to remove class :" + classID  + " error :"+ error);
        });
   }

    ///
  }
  //method to update class to the database
  handleUpdateClass = (classID) => {
    const db = getDatabase();
    set(ref(db, "classes/" + classID), {
      classID:classID,
      description: document.getElementById('description_val').value,
      meetingDates:document.getElementById('meetingDates_val').value,
      name:document.getElementById('name_val').value,
      published:1,
      roomNumber: document.getElementById('roomNumber_val').value,
      seats: document.getElementById('seats_val').value,
      section: document.getElementById('section_val').value,
      session:document.getElementById('session_val').value,
     students: document.getElementById('studentIDs_val').value.split(','),
      teacherID: this.props.teacherID,
      classColor: this.state.classColor,
    })
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("Failed to save data new class!" + error);
      });
  };
  componentDidMount() {
    const dbRef = ref(getDatabase());
    let classList = [];
    let teacher = this.props.teacherID;
   
    //get list of classes
    get(child(dbRef, `classes`))
      .then(
        (snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach(function (item) {
          
              var itemVal = item.val();
              console.log("Teacher ID" + itemVal.teacherID + "---" + teacher);
              if (itemVal.teacherID == teacher) {
                console.log("Teacher ID" + itemVal.teacherID);
                classList.push(itemVal);
              }
            });
            // this.setState({nb_classes: nb_classes});
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
       <Alert key="feedback" id ="feedback" variant="" Style ="display :" {...this.state.hidefeedback}>
  
  </Alert>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.classList.map((class_item) => (
              <tr>
                <td>{class_item.classID}</td>
                <td>{class_item.name}</td>
                <td width="37%">
                  {" "}
                  <Button
                    variant="primary class-more-btn"
                    onClick={() =>
                      this.openModal(class_item.classID, "details")
                    }
                  >
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                    Details
                  </Button>{" "}
                  <DropdownButton title="Manage" id="bg-nested-dropdown">
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() =>
                        this.openModal(class_item.classID, "update")
                      }
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>{" "}
                      Update
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="1">
                      <i class="fa fa-address-book" aria-hidden="true"></i> Add
                      Student
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2"  onClick={() =>
                        this.handleRemoveClass(class_item.classID)
                      }>
                      <i class="fa fa-trash" aria-hidden="true"></i> Delete
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
                <Modal
                  show={this.state.openedDialog === class_item.classID}
                  onHide={this.closeModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{class_item.name}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form  onSubmit={() => this.handleUpdateClass(class_item.classID)}>
                      <Form.Group id="name">
                        <Form.Label>Name</Form.Label>
                        
                        <Form.Control
                          type="text" id = "name_val"
                          value={class_item.name}
                          onChange={this.handleClassInput}
                          readOnly={
                            this.state.actionType === "update" ? false : true
                          }
                        ></Form.Control>
                        
                      </Form.Group>
                      <Form.Group id="description">
                        <Form.Label>Description</Form.Label>
                        
                        <Form.Control
                          type="text" id = "description_val"
                          value={class_item.description}
                          onChange={this.handleClassInput}
                          readOnly={
                            this.state.actionType === "update" ? false : true
                          }
                        ></Form.Control>
                        
                      </Form.Group>
                      <Form.Group id="section">
                        <Form.Label>Section</Form.Label>
                        <Form.Control 
                          type="text" id = "section_val"
                          value={class_item.section}
                          onChange={this.handleClassInput}
                          readOnly={
                            this.state.actionType === "update" ? false : true
                          }
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="session">
                        <Form.Label>Session</Form.Label>
                        <Form.Control
                          type="text" id = "session_val" 
                          onChange={this.handleClassInput}
                          value={class_item.session}
                          readOnly={
                            this.state.actionType === "update" ? false : true
                          }
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="roomNumber">
                        <Form.Label>Room Number</Form.Label>
                        <Form.Control
                          type="text" id = "roomNumber_val"
                          onChange={this.handleClassInput}
                          value={class_item.roomNumber}
                          readOnly={
                            this.state.actionType === "update" ? false : true
                          }
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="seats">
                        <Form.Label>Seats</Form.Label>
                        <Form.Control
                          type="text"   id = "seats_val"
                          onChange={this.handleClassInput}
                          value={class_item.seats}
                          readOnly={
                            this.state.actionType === "update" ? false : true
                          }
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="meetingDates">
                        <Form.Label>Meeting Day</Form.Label>
                        <Form.Control
                          type="text"  id = "meetingDates_val"
                          onChange={this.handleClassInput}
                          value={class_item.meetingDates}
                          readOnly={
                            this.state.actionType === "update" ? false : true
                          }
                        ></Form.Control>
                      </Form.Group>
                      <input type="hidden"  id="studentIDs_val" value={class_item.students}></input>
                      <Form.Group
                        id="class-color"
                        Style={
                          this.state.actionType === "update"
                            ? "display:block"
                            : "display:none"
                        }
                      >
                        <Form.Label>Pick a color</Form.Label>

                        <ColorPicker
                          onSelectcolor={this.handleColorCode}
                        ></ColorPicker>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                     type = "submit"
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
