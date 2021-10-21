import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/Accordion'

import "../../../firebase";
import { getDatabase, ref, get, child } from "firebase/database";


export default class RessourceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {ressourceList : [] };

        }
        componentDidMount() {
            
            const dbRef = ref(getDatabase());
            let ressourceList = [];
           

    //get list of ressources
    get(child(dbRef, `ressources`)).then((snapshot) => {
     
      let moduleID = this.props.moduleID;
      console.log("searching for ressources"+moduleID);
      if (snapshot.exists()) {
        snapshot.forEach(function (item) {
        
          var itemVal = item.val();
         // console.log("found 1"+itemVal.moduleID);
          if(itemVal.moduleID == moduleID)
          {
            console.log("found :"+moduleID);
            ressourceList.push(itemVal);
          }
        
         
        });
        this.setState({ ressourceList: ressourceList });
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
           
            this.state.ressourceList.map((ressource_item) =>
                   <div className="ressources"> 
                  
                     <ListGroup>
  <ListGroup.Item>{ressource_item.title}</ListGroup.Item>
</ListGroup>
         
            </div>
               ));
        
    }
}
