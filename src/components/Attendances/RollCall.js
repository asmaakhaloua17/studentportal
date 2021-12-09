import React, { Component } from "react";
import {
  Table,
  Card, ProgressBar,
  Button,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import "../../firebase";
import { getDatabase, ref, get, child, set } from "firebase/database";
import Sidenav from "../Sidenav";
let pres = 0;
let abs = 0;
let rec = 0;
export default class RollCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionType: "",
      studentList: [],
      classID: "",
      teacherID: this.props.match.params.teacherID,
      hidefeedback: "none",
      classList:[],
      firstName :"",
      pres : 0,
      abs: 0,
      rec :0
    };
  }
 //method to update the state variables with the user selection
 getListofstudents = (e) => {
 

  const classID = e.target.value;

  this.setState({ classID: classID });
  this.setState({studentList: [] });
console.log("get student of  :"+classID);
  //get list of student of the selected class
  const dbRef = ref(getDatabase());
  let studentList = [];
  get(child(dbRef, "classes/"+classID+"/students"))
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
 // console.log("Name: " + name + "value:" + value);
};

getstudentFirstName = (euid,i) => {

  const dbRef = ref(getDatabase());
  let firstName = "";

  get(child(dbRef, "users/"+euid))
  .then(
    (snapshot) => {
      if (snapshot.exists()) {
     
        firstName = snapshot.child("firstname").val();
document.getElementsByName("firstnames")[i].innerHTML = firstName;
      console.log(firstName);
      } else {
        console.log("No data available");
      }
    },
    {
      onlyOnce: false,
    

    },
   
  )
  .catch((error) => {
    console.error(error);
  });

return firstName;
};
  //method to roll call 
  handleRollCall = (studentID,status) => {
    const db = getDatabase();
    const date = new Date();
    let today = date.getMonth() +"-" +date.getFullYear() + "-" +date.getDate()  ;
    set(ref(db, "attendances/" + this.state.classID+ "/"+studentID + "/" + today), {
    
     "status": status,
     "teacherID":this.state.teacherID,
    
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
    let teacher = this.state.teacherID;

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


       // get attendances
 
this.setState({ pres: 0 });
this.setState({ abs: 0 });
this.setState({ rec: 0 });
       get(child(dbRef, "attendances/" +  this.state.classID ))
       .then(attend => {
           if (attend.exists()) {
               pres = 0;
               abs = 0;
               rec = 0;
               attend.forEach(item => {
                   let itemVal = item.val();
                 //  attendList.push(itemVal);
                   console.log("attendances:");
                
                   if(itemVal.status == "Present" ){ 
                     pres++;
                   }
                   else{
                     abs++;
                   }
                   rec++;
               });
               
               this.setState({ pres: pres });
               this.setState({ abs: abs });
               this.setState({ rec: rec });
           } 
           else {
               console.log("No attendances found");
           }
       }, {
           onlyOnce: true
       }).catch(error => {
           console.log(error);
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
     
      <Sidenav role="teacher"  euid={this.props.match.params.teacherID}/>
      <Container>
        <Row className="theme_body">
          <Col>
            {" "}
            <div className="big-title">
              <h3 className="big_title">Classes</h3>
             

      <div>
        

<Form.Group id="classID" Style=" margin-bottom: 14px;">
                  
                
                <Form.Select  name= "classID" aria-label="dropdown list of classes"   onChange={this.getListofstudents} required>
                <option value="">
         Select Class</option>
                  {listclasses}
                  </Form.Select>
                  </Form.Group>
                  
               
        <Table striped bordered hover size="sm" style={{visibility: this.state.classID ? 'visible' : 'hidden' }}>
          <thead>
            <tr>
          
              <th>Student ID</th>
              <th>First Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.studentList.map((student_item,index) => (
              <tr>
                <td>{student_item}</td>
                <td>{ this.getstudentFirstName(student_item,index)} <label name="firstnames"></label></td>
                <td width="37%">
                  {" "}
                  <Button
                    variant="success class-more-btn"
                    onClick={() =>
                      this.handleRollCall(student_item, "Present")
                    }
                  >
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                    Present
                  </Button>{" "}
                  <Button
                    variant="danger class-more-btn"
                    onClick={() =>
                      this.handleRollCall(student_item, "Absent")
                    }
                  >
                    <i class="fa fa-angle-double-right" aria-hidden="true"></i>{" "}
                    Absent
                  </Button>{" "}
                  
                </td>
                            </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </div> 
   
      <Card style={{'padding': '0px 10px',visibility: this.state.classID ? 'visible' : 'hidden' }}>
   
                <h4 className="mb-2 mt-2">Attendance Count</h4>
                  <h5>Present</h5>
                  <ProgressBar now={(pres/rec) * 100} label={pres} className="mb-2"/>
                  <h5>Absent</h5>
                  <ProgressBar now={(abs/rec) * 100} label={abs} className="mb-2"/>
                </Card>
      </Col>
      </Row>
     
        </Container>
      </div>
    );
  }
}
