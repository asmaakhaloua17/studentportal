import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "./Footer";
import Sidenav from "./Sidenav";
import ListClasses from "./Classes/ListClasses";
export default class Dashboard extends Component {
  render() {
    return (
      <div>
             <Sidenav />
        <Container>
        
          
        
          <Row className="theme_body">
          <div class="big-title">
		      <h3 class="big_title">Classes</h3>
			
                <div> <ListClasses></ListClasses></div>
</div>
<div class="big-title">
		      <h3 class="big_title">Assignments</h3>
			
                <div> assignment component</div>
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
