import { React, useState, Component }  from "react";
import { getDatabase, ref, get, child } from "firebase/database";
import "../../firebase";
import "../../css/style.css";


export default class PeopleTableRows extends Component {
    constructor(props) {
        super(props);
        this.state = { peoplesList : [] };
      }
      componentDidMount() {
        const dbRef = ref(getDatabase());
        let peopleList = [];
        let classId = this.props.classID;

          // get people
          get(child(dbRef, "classes/" + classId + "/students"))
            .then(people => {
                if (people.exists()) {
                    people.forEach(item => {
                        let itemVal = item.val();
                        peopleList.push(itemVal);
                        console.log(itemVal);
                    });
                    
                    this.setState({ peoplesList: peopleList });
                } 
                else {
                    console.log("No people found");
                }
            }, {
                onlyOnce: true
            }).catch(error => {
                console.log(error);
            });
      }

    render() {
    // Creates person items
    return (
        
        this.state.peoplesList.map(item => 
            <tr>
                <td>{item}</td>
                <td></td>
                <td>Student</td>
            </tr>
        )
    );
}
}