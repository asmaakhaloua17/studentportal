import React, { Component } from 'react'
import   "../../../firebase";

import Ressourcetem from './RessourceItem';

export default class ListRessources extends Component {

    render() {
        
       
        return (
           <div>

                <Ressourcetem moduleID={this.props.moduleID}></Ressourcetem>
     
           </div>
          


            );
        
    }
}
