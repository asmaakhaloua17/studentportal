import React, { Component } from 'react'
import { CardGroup} from "react-bootstrap";
import   "../../firebase";
import { getDatabase, ref,get,child } from "firebase/database";
import ClassItem from './ClassItem';

export default class ListClasses extends Component {
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
                snapshot.forEach(function(item) {
                    var itemVal = item.val();
                    classList.push(itemVal);
                   console.log(itemVal.classID);
                });
               
               
               this.setState({ classList:classList });
            
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
            <CardGroup>
                <ClassItem></ClassItem>
            </CardGroup>


            );
        
    }
}
