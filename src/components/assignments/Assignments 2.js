import React, { Component } from 'react';
import "../../firebase";
import { getDatabase, ref, get, child } from "firebase/database"
import "../../css/assignmentStyle.css";

export default class Assignments2 extends Component {
    constructor(props) {
        super(props);
        this.state = { assignmentsList: [] }
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
                    <h6 className="title">{item.title}</h6>
                    <section>
                        <h3 className="description">{item.description}</h3>
                        <p className="dueDate">{item.dueDate}</p>
                        <p>With supporting text below as a natural lead-in to additional content.</p>
                        <button> + MORE DETAIL</button>
                    </section>
                </div>
            )
        );
    }
}
