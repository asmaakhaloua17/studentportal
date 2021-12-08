import { React, useState, Component }  from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import "../../firebase";
import "../../css/style.css";


export default class AttendancesTableRows extends Component {
    constructor(props) {
        super(props);
        this.state = { attendsList : [] };
      }
      componentDidMount() {
        const dbRef = ref(getDatabase());
        let attendList = [];
        let classId = this.props.classID;
        let euid = this.props.euid;

          // get grades
          get(child(dbRef, "attendances/" + classId + "/" + euid))
            .then(attend => {
                if (attend.exists()) {
                    attend.forEach(item => {
                        let itemVal = item.val();
                        attendList.push(itemVal);
                        console.log(itemVal.title);
                        console.log(itemVal.dueDate);
                        console.log(itemVal.points);
                    });
                    
                    this.setState({ attendsList: attendList });
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
    // Creates attendance items
    return (
        
        this.state.attendsList.map(item => 
            <tr>
                <td>{item.date}</td>
                <td>{item.status}</td>
            </tr>
        )
    );
}
}