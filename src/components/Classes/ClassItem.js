import React, { Component } from 'react'
import { Button, Card,DropdownButton,Dropdown } from "react-bootstrap";
import "../../firebase";
import { getDatabase, ref, get, child } from "firebase/database";
import logo from "../../img/course_card-2.png"
import {Link} from 'react-router-dom';

export default class ClassItem extends Component {
    constructor(props) {
    
        super(props);
      
        
        this.state = {classList : []}
        }
        componentDidMount() {
            
            const dbRef = ref(getDatabase());
            let classList = [];
           

    //get list of classes
    get(child(dbRef, `classes`)).then((snapshot) => {
      let euid = this.props.euid;
      console.log(`object`,   this.props.euid);
      if (snapshot.exists()) {
        snapshot.forEach(function (item) {
          var itemVal = item.val();
          console.log(" euid:"+ euid +  itemVal.students+ itemVal.students.includes(euid));
          if(itemVal.teacherID == euid || itemVal.students.includes(euid)){
          classList.push(itemVal);
         
          }
        });
        this.setState({ classList: classList });
      } else {
        console.log("No data available");
      }
    }, {
      onlyOnce: true
    }).catch((error) => {
      console.error(error);
    });
  }

            
        
    render() {
        
       
        return (
            
            this.state.classList.map((class_item) =>
                   <div>
                
                <Card style={{ width: '18rem','marginRight': '20px' }}>
  <Card.Img variant="top" className="class_img" src={logo} />
  <Card.Body>
    <Card.Title>{class_item.name}</Card.Title>
    <Card.Text>
    {class_item.description}
    </Card.Text>
    <Button variant="primary class-more-btn"><Link to={`/classDetails/${class_item.classID}/${this.props.euid}`}>
    <i class="fa fa-angle-double-right" aria-hidden="true"></i>  Access
          </Link></Button>
          {this.props.role === "teacher" ? (
             <DropdownButton  title="Manage" id="bg-nested-dropdown">
             <Dropdown.Item eventKey="1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Update</Dropdown.Item>
             <Dropdown.Item eventKey="2"><i class="fa fa-trash" aria-hidden="true"></i> Delete</Dropdown.Item>
           </DropdownButton>
         
            ) : ""}
         
  </Card.Body>
</Card>
            </div>
               ));
        
    }
}
