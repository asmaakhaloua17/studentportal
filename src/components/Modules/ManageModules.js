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


export default class ManageModules extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moduleList : [],
      showHide: false,
      openedDialog: -1,
      actionType: "",
      moduleID: "",
      classID: "",
      description: "",
      published: 0,
      title: "",
      ressourcesList: [],
      teacherID: this.props.teacherID,
      sel_moduleID : ""
    };
  }

  openModal = (moduleid, actionType) => {
    this.setState({
      openedDialog: moduleid,
      actionType: actionType
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
    handleModuleInput = (e) => {
      const name = e.target.name;
  
      const value = e.target.value;
  
      this.setState({ [name]: value });
      console.log("Name: " + name + "value:" + value);
    };
  //handle popup
  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }
  //method to update module to the database
  handleUpdateModule = (moduleid) => {
    const db = getDatabase();
    set(ref(db, "modules/" + moduleid), {
      moduleID:moduleid,
      description: document.getElementById('description_Val'+moduleid).value,
    
      title:document.getElementById('title_Val'+moduleid).value,
      published:1,
      classID:this.props.classID
    })
      .then(() => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("Failed to save data new class!" + error);
      });
  };
  //method to get list of ressources by module
  getRessources= (moduleid) => {
    let ressourcesList = [];
    const db = getDatabase();
       //get list of ressources
       get(ref(db, "ressources/" + moduleid))
       .then(
         (snapshot) => {
           if (snapshot.exists()) {
             snapshot.forEach(function (item) {
               var itemVal = item.val();
                ressourcesList.push(itemVal);
             });
           
             this.setState({ ressourcesList: ressourcesList });
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
  componentDidMount() {
    const dbRef = ref(getDatabase());
    let moduleList = [];
    let classID = this.props.classID;
   
 
     //get list of modules
     get(child(dbRef, `modules`))
     .then(
       (snapshot) => {
         if (snapshot.exists()) {
           snapshot.forEach(function (item) {
         
             var itemVal = item.val();
            
             if (itemVal.classID == classID) {
            
               moduleList.push(itemVal);
             }
           });
           // this.setState({nb_classes: nb_classes});
           this.setState({ moduleList: moduleList });
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
              <th>Module</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.moduleList.map((module_item) => (
              <tr>
                 
                <td>{module_item.moduleID}</td>
                <td>{module_item.classID}</td>
                <td>{module_item.title}</td>
                <td width="37%">
                  {" "}
                  <Button
                    variant="secondary class-more-btn"
                    onClick={() =>
                      this.openModal(module_item.moduleID, "details")
                    }
                  >
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                    Details
                  </Button>{" "}
                  <DropdownButton title="Manage" >
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() =>
                        this.openModal(module_item.moduleID, "update")
                      }
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>{" "}
                      Update
                    </Dropdown.Item>
                   
                    <Dropdown.Item eventKey="2">
                      <i class="fa fa-trash" aria-hidden="true"></i> Delete
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="3"
                      
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>{" "}
                      Add new ressource
                    </Dropdown.Item>
                   
                  </DropdownButton>
                </td>
                <Modal
                  show={this.state.openedDialog === module_item.moduleID}
                  onHide={this.closeModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{module_item.title}</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                  <Form  onSubmit={() => this.handleUpdateModule(module_item.moduleID)}>
                <Form.Group id="moduleID">
                  
                  <Form.Label>Module Code</Form.Label>
                  <Form.Control
                      type="text"
                      name="moduleID"
                      id= "moduleID_Val"{...module_item.moduleID}
                      value= {module_item.moduleID}
                      required
                      onChange={this.handleModuleInput}
                      readOnly="true"
                    ></Form.Control>                  
                    </Form.Group>
           
                  <Form.Group id="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      id= "title_Val"{...module_item.moduleID}
                      value= {module_item.title}
                      required
                      onChange={this.handleModuleInput}
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
                      id= "description_Val"{...module_item.moduleID}
                      value= {module_item.description}
                      required
                      onChange={this.handleModuleInput}
                      readOnly={
                        this.state.actionType === "update" ? false : true
                      }
                    ></Form.Control>
                  </Form.Group>
               
<Form.Group id="published">

<Form.Check
        type="checkbox"
        id= "published"{...module_item.moduleID}
        className="mb-2"
        label="Published"
      />
  </Form.Group>
                
                </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button    disabled={
                        this.state.actionType === "update" ? false : true
                      }
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


        <Modal
                  show={this.state.openedDialog === this.state.sel_moduleID}
                  onHide={this.closeModal}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>New Ressources</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                  <Form  onSubmit={() => this.handleAddRessource(this.state.moduleID)}>
                <Form.Group id="ressourceID">
                  
                  <Form.Label>Ressource Code</Form.Label>
                  <Form.Control
                      type="text"
                      name="ressourceID"
                      id= "ressourceID_Val"{...this.state.moduleID}
                      required
                      onChange={this.handleModuleInput}
                   
                    ></Form.Control>                  
                    </Form.Group>
           
                  <Form.Group id="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      id= "title_Val_res"{...this.state.moduleID}
                      required
                      onChange={this.handleModuleInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      id= "description_Val_res"{...this.state.moduleID}
                      required
                      onChange={this.handleModuleInput}
                   
                    ></Form.Control>
                  </Form.Group>
               
<Form.Group id="published">

<Form.Check
        type="checkbox"
        id= "published_res"{...this.state.moduleID}
        className="mb-2"
        label="Published"
      />
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
      </div>
    );
  }
}
