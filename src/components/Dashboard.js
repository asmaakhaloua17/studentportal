import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "./Footer";
import Sidenav from "./Sidenav";
import ListClasses from "./Classes/ListClasses";
import Assignments from "./assignments/Assignments";
export default class Dashboard extends Component {
  render() {
    return (
      <div>
            <Sidenav euid={this.props.match.params.euid}/>
        <Container>
        
          
        
          <Row className="theme_body">
          <div className="big-title">
		      <h3 className="big_title">Classes</h3>
     
                <div> <ListClasses role="student" euid= {this.props.match.params.euid}></ListClasses></div>
</div>
<div className="big-title">
		      <h3 className="big_title">Assignments</h3>
			
                <div className="assignment-cards"> <Assignments euid= {this.props.match.params.euid} /></div>
</div>
          </Row>
          <Row>
              <Footer></Footer>
          </Row>
        </Container>
      </div>
    );
  }
}
