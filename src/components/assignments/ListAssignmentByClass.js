import React, { Component } from 'react'
import "font-awesome/css/font-awesome.min.css";
import ListGroup from "react-bootstrap/Accordion";
import "../../firebase";
import { getDatabase, ref, get, child } from "firebase/database";
import { Link } from "react-router-dom";

export default class ListAssignmentByClass extends Component {
  constructor(props) {
    super(props);
    this.state = {assignmentList : [] };

        }
        componentDidMount() {
            
            const dbRef = ref(getDatabase());
            let assignmentList = [];
           

    //get list of assignments
    get(child(dbRef, `assignments`)).then((snapshot) => {
     
      let classID = this.props.classID;
      console.log("searching for assignments"+classID);
      if (snapshot.exists()) {
        snapshot.forEach(function (item) {
        
          var itemVal = item.val();
         // console.log("found 1"+itemVal.classID);
          if(itemVal.classID == classID && itemVal.published == 1)
          {
           
            assignmentList.push(itemVal);
          }
        
         
        });
        this.setState({ assignmentList: assignmentList });
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
           
            this.state.assignmentList.map((assignment_item) =>
              <div className="assignments-list">
       
        <ListGroup>
          <ListGroup.Item>
          <i className="fa fa-pencil-square-o"></i>
              <Link
                to={`/assignmentDetails/${assignment_item.assignmentID}/${this.props.classID}/${this.props.euid}`}
              >
                {assignment_item.title}
         </Link>
         <br/>
         <i className="fa fa-calendar-plus-o"></i> Due Date :  <span Style="color:red">{assignment_item.dueDate}</span>|  Possible points :{assignment_item.points} 
          </ListGroup.Item>
        </ListGroup>
            </div>
               ));
        
    }
}
