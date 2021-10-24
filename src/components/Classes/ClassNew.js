import React, { Component } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../Footer";
import Sidenav from "../Sidenav";
import ManageClasses from "./ManageClasses";

export default class ClassNew extends Component {

  render() {
    return (
      <div>
        <Sidenav />
        <Container>
          <Row className="theme_body">
            <Col>
              {" "}
              <div className="big-title">
                <h3 className="big_title">Classes</h3>

                <div> <ManageClasses></ManageClasses></div>
              </div>
            </Col>
            <Col>
              {" "}
              <div className="big-title">
                <h3 className="big_title">New Classes</h3>

                <Form>
                  <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      required
                      onChange={this.handleClassnput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="section">
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                      type="text"
                      name="section"
                      required
                      onChange={this.handleClassnput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="session">
                    <Form.Label>Session</Form.Label>
                    <Form.Control
                      type="text"
                      name="session"
                      required
                      onChange={this.handleClassnput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="roomNumber">
                    <Form.Label>Room Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="roomNumber"
                      required
                      onChange={this.handleClassnput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="seats">
                    <Form.Label>Seats</Form.Label>
                    <Form.Control
                      type="text"
                      name="seats"
                      required
                      onChange={this.handleClassnput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="meetingDates">
                    <Form.Label>Meeting Day</Form.Label>
                    <Form.Control
                      type="text"
                      name="meetingDay"
                      required
                      onChange={this.handleClassInput}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group id="action">
                    <Button
                      className="w-100 btn-secondary"
                      size="lm"
                      type="Button"
                      onClick={this.handleAddClass}
                    >
                      Save
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
          <Row>
            <Footer></Footer>
          </Row>
        </Container>
      </div>
    );
  }
}
