import React, { Component } from 'react'
import { Button, Card} from "react-bootstrap";
import "../../firebase";
import { getDatabase, ref, get, child } from "firebase/database";
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
      console.log(`object list`,   this.props.euid);
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
                  
<<<<<<< HEAD
  <Card.Img variant="top" alt="" className="class_img" Style={"Background-color:"+class_item.classColor}  />
=======
  <Card variant="top" alt="Class" className="class_img" Style={"Background-color:"+class_item.classColor} />
>>>>>>> f1118a2f38b0aa379aeb2e91391a877ce432a641
  <Card.Body>
    <Card.Title>{class_item.name}</Card.Title>
    <Card.Text>
    {class_item.description}
    </Card.Text>
    <Button variant="primary class-more-btn"><Link to={`/classDetails/${class_item.classID}/${this.props.euid}`}>
    <i class="fa fa-angle-double-right"></i>  Access
          </Link></Button>         
  </Card.Body>
</Card>
            </div>
               ));
        
    }
}
