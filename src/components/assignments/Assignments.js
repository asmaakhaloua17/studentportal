import React, { Component } from 'react';
import "../../firebase";
import { getDatabase, ref, get, child } from "firebase/database"
import "../../css/assignmentStyle.css";
import { Link } from 'react-router-dom';
import { Badge, Button } from "react-bootstrap";

export default class Assignments extends Component {
    constructor(props) {
        super(props);
        this.state = { assignmentsList: [] };
    }

    componentDidMount() {
        const dbRef = ref(getDatabase());
        let assignmentList = [];

        // Get list of assignments
        get(child(dbRef, 'assignments'))
            .then(assignment => {
                if (assignment.exists()) {
                    assignment.forEach(item => {
                        let itemVal = item.val();
                        assignmentList.push(itemVal);
                        console.log(itemVal.title);
                    });

                    this.setState({ assignmentsList: assignmentList });
                } else {
                    console.log("No assignemnts found");
                }
            }, {
                onlyOnce: true
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        // Creates assignemnts cards
        return (
            this.state.assignmentsList.map(item => 
                <div  id="card">
                    <h2 className="title card-title h5">{item.title}</h2>
                    <section>
                    <p> <Badge pill  bg="success">{item.className}</Badge> | 
                   <Badge pill  bg="danger">{item.dueDate}</Badge>
                    </p>
                   <p> {item.summary} </p>
                
                      
                    <Button variant="secondary class-more-btn"><Link to={`/assignmentDetails/${item.assignmentID}/${item.classID}/${this.props.euid}`}>+ More</Link></Button>
                    </section>
                </div>
            )
        );
    }
}
