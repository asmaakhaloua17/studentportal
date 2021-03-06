import React, { Component } from "react";
import { Container, Row, Col,Alert,Button } from "react-bootstrap";
import Footer from "./Footer";
import Sidenav from "./Sidenav";
import ListClasses from "./Classes/ListClasses";
import { Link } from "react-router-dom";
export default class DashboardTeacher extends Component {
  render() {
    return (
      <div>
             <Sidenav  role="teacher" euid={this.props.match.params.euid} />
        <Container>
        
        
        
          <Row className="theme_body">
            <div>
            <Col className="welcome_box">
<Alert key="welcome" variant="secondary">
<h1  Style="font-size:20px">Welcome</h1>
<p>

Aww yeah, you successfully read this important alert message.
</p>
<hr/>
<div className="d-flex justify-content-end">
<Button variant="primary"><Link to={`/rollCall/${this.props.match.params.euid}`}  className="white">
<i class="fa fa-hand-paper-o"></i> Roll Call
          </Link></Button> <Button variant="primary"><Link className="white" to={`/newClass/${this.props.match.params.euid}`}>
          <i class="fa fa-plus-circle" ></i> Manage Classes
          </Link></Button>
          <Button variant="primary"><Link className="white" to={`/manageAssignment/${this.props.match.params.euid}`}>
          <i class="fa fa-plus-circle" ></i> Manage Assignments
          </Link></Button>
        </div>

  </Alert>

</Col>

              </div>
          <div className="big-title">
		      <h1 className="big_title">Classes</h1>
			
                <div> <ListClasses role="teacher" euid={this.props.match.params.euid}></ListClasses></div>
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
