import React, { Component } from 'react'
import { CardGroup} from "react-bootstrap";
import   "../../firebase";

import ClassItem from './ClassItem';
export default class ListClasses extends Component {

    render() {
        
       
        return (
            <CardGroup>
                <ClassItem></ClassItem>
            </CardGroup>


            );
        
    }
}
