import { React, useState, Component }  from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import "../../firebase";
import "../../css/style.css";


export default class GradesTableRows extends Component {
    constructor(props) {
        super(props);
        this.state = { gradesList : [] };
      }
      componentDidMount() {
        const dbRef = ref(getDatabase());
        let gradeList = [];
        let classId = this.props.classID;
        let euid = this.props.euid;

          // get grades
          get(child(dbRef, "grades/" + classId + "/" + euid))
            .then(grade => {
                if (grade.exists()) {
                    grade.forEach(item => {
                        let itemVal = item.val();
                        gradeList.push(itemVal);
                        console.log(itemVal.title);
                        console.log(itemVal.dueDate);
                        console.log(itemVal.points);
                    });
                    
                    this.setState({ gradesList: gradeList });
                } 
                else {
                    console.log("No grades found");
                }
            }, {
                onlyOnce: true
            }).catch(error => {
                console.log(error);
            });
      }

    render() {
    // Creates grade items
    return (
        this.state.gradesList.map(item => 
            <tr>
                <td>{item.title}</td>
                <td>{item.dueDate}</td>
                <td>{item.points}</td>
            </tr>
        )
    );
}
}