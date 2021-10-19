import React, { Component } from 'react'
import { Button, Card } from "react-bootstrap";
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
    <Button variant="primary class-more-btn"><Link to={`/classDetails/${class_item.classID}`}>
            More
          </Link></Button>
  </Card.Body>
</Card>
            </div>
               ));
        
    }
}
