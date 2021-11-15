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
import { getDatabase, ref, get, child, set, remove } from "firebase/database";


export default class ManageAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignmentList : [],
      showHide: false,
      openedDialog: -1,
      actionType: "",
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
    handleAssignmentInput = (e) => {
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
   handleRemoveClass = (assignmentID) => {
    const db = getDatabase();
    ///

    if (window.confirm("Are you sure you wish to delete this item?")) {
      remove(ref(db, "assignments/" + assignmentID))
        .then(() => {
          window.location.reload(false);
          document.getElementById("feedback").style.display = "block";
          document.getElementById("feedback").innerText =
            "Assignment " + assignmentID + " remove successfully!";
        })
        .catch((error) => {
          console.log(
            "Failed to remove class :" + assignmentID + " error :" + error
          );
        });
    }

    ///
  };
  //method to update assignment to the database
  handleUpdateAssignment = (assignmentid) => {
   //alert(document.getElementById('duedate_Val').value);
    const db = getDatabase();
    set(ref(db, "assignments/" + assignmentid), {
      assignmentID:assignmentid,
      description: document.getElementById('description_Val').value,
      dueDate:document.getElementById('duedate_Val').value,
      title:document.getElementById('title_Val').value,
      published:1,
      points: document.getElementById('points_Val').value,
      summary: document.getElementById('summary_Val').value,
      classID: document.getElementById('classID_Val').value,
      teacher: this.props.teacherID
    })
      .then(() => {
       // window.location.reload(false);
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
                    variant="secondary class-more-btn"
                    onClick={() =>
                      this.openModal(assignment_item.assignmentID, "details")
                    }
                  >
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                    Details
                  </Button>{" "}
                  <DropdownButton title="Manage" >
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() =>
                        this.openModal(assignment_item.assignmentID, "update")
                      }
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>{" "}
                      Update
                    </Dropdown.Item>
                   
                    <Dropdown.Item eventKey="2"    onClick={() => this.handleRemoveClass(assignment_item.assignmentID)}>
                      <i class="fa fa-trash" aria-hidden="true"></i> Delete
                    </Dropdown.Item>
                  </DropdownButton>
                </td>
                <Modal
                  show={this.state.openedDialog === assignment_item.assignmentID}
                  onHide={this.closeModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{assignment_item.title}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                  <Form  onSubmit={() => this.handleUpdateAssignment(assignment_item.assignmentID)}>
                <Form.Group id="classID">
                  
                  <Form.Label>Class Name</Form.Label>
                  <Form.Control
                      type="text"
                      name="classID"
                      id= "classID_Val"
                      defaultValue= {assignment_item.classID}
                      required
                      onChange={this.handleAssignmentInput}
                      readOnly="true"
                    ></Form.Control>                  
                    </Form.Group>
           
                  <Form.Group id="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      id= "title_Val"
                      defaultValue= {assignment_item.title}
                      required
                      onChange={this.handleAssignmentInput}
                      readOnly={
                        this.state.actionType === "update" ? false : true
                      }
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      id= "description_Val"
                      defaultValue= {assignment_item.description}
                      required
                      onChange={this.handleAssignmentInput}
                      readOnly={
                        this.state.actionType === "update" ? false : true
                      }
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="summary">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="summary"
                      id= "summary_Val"
                      style={{ height: '100px' }}
                      defaultValue= {assignment_item.summary}
                      required
                      onChange={this.handleAssignmentInput}
                      readOnly={
                        this.state.actionType === "update" ? false : true
                      }
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="duedate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="duedate"
                      id= "duedate_Val"
                      defaultValue= {assignment_item.dueDate}
                      required
                      onChange={this.handleAssignmentInput}
                      readOnly={
                        this.state.actionType === "update" ? false : true
                      }
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="points">
                    <Form.Label>Points</Form.Label>
                    <Form.Control
                      type="text"
                      name="points"
                      id= "points_Val"
                      defaultValue= {assignment_item.points}
                      required
                      onChange={this.handleAssignmentInput}
                      readOnly={
                        this.state.actionType === "update" ? false : true
                      }
                    ></Form.Control>
                  </Form.Group>
<Form.Group id="published">

<Form.Check
        type="checkbox"
        id= "published"
        className="mb-2"
        label="Published"
      />
  </Form.Group>
  <Form.Group>
  <Button    disabled={
                        this.state.actionType === "update" ? false : true
                      }
                      variant="primary"
                     type = "submit"
                    >
                      Save Changes
                    </Button>
  </Form.Group>
                
                </Form>
                  </Modal.Body>
                
                </Modal>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
