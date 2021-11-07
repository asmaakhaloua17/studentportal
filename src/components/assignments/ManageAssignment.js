import React, { Component } from "react";
import {
  Table,
  DropdownButton,
  Dropdown,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "../../firebase";
import { getDatabase, ref, get, child, set } from "firebase/database";


export default class ManageAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignmentList : [],
      showHide: false,
      openedDialog: -1,
      assignmentID: "",
      classID: "",
      className: "",
      description: "",
      dueDate: "",
      points: "",
      published: 0,
      summary: "",
      title: "",
      classList: [],
      teacherID: this.props.teacherID,
    };
  }

  openModal = (assignmentid, actionType) => {
    this.setState({
      openedDialog: assignmentid,
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
  //method to add class to the database
  handleUpdateAssignment = (assignmentid) => {
    const db = getDatabase();
    set(ref(db, "assignments/" + assignmentid), {
      assignmentID:assignmentid,
      description: document.getElementById('description_val').value,
      dueDate:document.getElementById('dueDate_val').value,
      title:document.getElementById('title_val').value,
      published:1,
      points: document.getElementById('points_val').value,
      summary: document.getElementById('summary_val').value,
      classID: document.getElementById('classID_val').value,
      teacherID: this.props.teacherID
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
    let assignmentList = [];
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

     //get list of assignments
     get(child(dbRef, `assignments`))
     .then(
       (snapshot) => {
         if (snapshot.exists()) {
           snapshot.forEach(function (item) {
         
             var itemVal = item.val();
            
             if (itemVal.teacher == teacher) {
            
               assignmentList.push(itemVal);
             }
           });
           // this.setState({nb_classes: nb_classes});
           this.setState({ assignmentList: assignmentList });
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
    const listclasses = this.state.classList.map((class_item) =>
        
    <option value={class_item.classID}>
      {class_item.classID} -- {class_item.name} </option>
);
    return (
      <div>
      
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Class</th>
              <th>Assignment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.assignmentList.map((assignment_item) => (
              <tr>
                 
                <td>{assignment_item.assignmentID}</td>
                <td>{assignment_item.classID}</td>
                <td>{assignment_item.title}</td>
                <td width="37%">
                  {" "}
                  <Button
                    variant="primary class-more-btn"
                    onClick={() =>
                      this.openModal(assignment_item.assignmentid, "details")
                    }
                  >
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                    Details
                  </Button>{" "}
                  <DropdownButton title="Manage" id="bg-nested-dropdown">
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() =>
                        this.openModal(assignment_item.assignmentid, "update")
                      }
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>{" "}
                      Update
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="1">
                      <i class="fa fa-address-book" aria-hidden="true"></i> Add
                      Student
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                      <i class="fa fa-trash" aria-hidden="true"></i> Delete
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
                <Modal
                  show={this.state.openedDialog === assignment_item.assignmentid}
                  onHide={this.closeModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{assignment_item.name}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                  <Form>
                <Form.Group id="classID">
                  
                  <Form.Label>Class Name</Form.Label>
                <Form.Select  name= "classID" aria-label="dropdown list of classes"   onChange={this.handleAssignmentInput}>
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
                      type="Button"
                      onClick={this.handleAddClass}
                    >
                      Save
                    </Button>
                  </Form.Group>
                </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() => this.handleUpdateAssignment(assignment_item.assignmentid)}
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
