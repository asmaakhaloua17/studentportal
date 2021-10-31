import React, { Component } from 'react'
import { CardGroup} from "react-bootstrap";
import   "../../firebase";

import ModuleItem from './ModuleItem';

export default class ListModules extends Component {

    render() {
        
       
        return (
           <>

                <ModuleItem euid={this.props.euid} classID={this.props.classID}></ModuleItem>
     
           </>
          


            );
        
    }
}
