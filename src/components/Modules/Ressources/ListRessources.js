import React, { Component } from 'react'
import   "../../../firebase";

import Ressourcetem from './RessourceItem';

export default class ListRessources extends Component {

    render() {
        
       
        return (
           <div>

                <Ressourcetem classID ={this.props.classID} moduleID={this.props.moduleID}></Ressourcetem>
     
           </div>
          


            );
        
    }
}
