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
import { getDatabase, ref, get, child } from "firebase/database";
import { Link } from "react-router-dom";

export default class ManageClasses extends Component {
  constructor(props) {
    super(props);

    this.state = { classList: [], show: false, openedDialog: -1 };
  }

  openModal = (classid) => {
    this.setState({
      openedDialog: classid,
    });
  };

  closeModal = () => {
    this.setState({
      openedDialog: null,
    });
  };
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
              console.log(itemVal.classID);
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
                    onClick={() => this.openModal(class_item.classID)}
                  >
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                    Details
                  </Button>{" "}
                  <DropdownButton title="Manage" id="bg-nested-dropdown">
                    <Dropdown.Item eventKey="1">
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
                  show={this.state.openedDialog === class_item.classID}
                  onHide={this.closeModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{class_item.name}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form>
                      <Form.Group id="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={class_item.name}
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="section">
                        <Form.Label>Section</Form.Label>
                        <Form.Control
                          type="text"
                          value={class_item.section}
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="session">
                        <Form.Label>Session</Form.Label>
                        <Form.Control
                          type="text"
                          value={class_item.session}
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="roomNumber">
                        <Form.Label>Room Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={class_item.roomNumber}
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="seats">
                        <Form.Label>Seats</Form.Label>
                        <Form.Control
                          type="text"
                          value={class_item.seats}
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="meetingDates">
                        <Form.Label>Meeting Day</Form.Label>
                        <Form.Control
                          type="text"
                          value={class_item.meetingDates}
                          readOnly
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group id="action"></Form.Group>
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
