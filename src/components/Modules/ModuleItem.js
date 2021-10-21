import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'

import "../../firebase";
import { getDatabase, ref, get, child } from "firebase/database";
import {Link} from 'react-router-dom';
import ListRessources from './Ressources/ListRessources';

export default class ModuleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {moduleList : [] };

        }
        componentDidMount() {
            
            const dbRef = ref(getDatabase());
            let moduleList = [];
           

    //get list of modules
    get(child(dbRef, `modules`)).then((snapshot) => {
     
      let classID = this.props.classID;
      console.log("searching for modules"+classID);
      if (snapshot.exists()) {
        snapshot.forEach(function (item) {
        
          var itemVal = item.val();
         // console.log("found 1"+itemVal.classID);
          if(itemVal.classID == classID)
          {
            console.log("found :"+classID);
            moduleList.push(itemVal);
          }
        
         
        });
        this.setState({ moduleList: moduleList });
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
           
            this.state.moduleList.map((module_item) =>
                   <div className="modules">
           <Accordion defaultActiveKey="0" flush>
  <Accordion.Item eventKey="0">
    <Accordion.Header>{module_item.title}</Accordion.Header>
    <Accordion.Body>
  <ListRessources moduleID={module_item.moduleID}></ListRessources>
    </Accordion.Body>
  </Accordion.Item>
  </Accordion>
            </div>
               ));
        
    }
}
