import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer";
import Sidenav from "../Sidenav";
import ClassNav from "../Classes/ClassNav";
import { getDatabase, ref, get, child } from "firebase/database";

export default class AssignmentDetails extends Component {
    constructor(props) {
        super(props);

        this.state = { classTitle: "", assignemntTitle: "", dueDate: "", classSection: "" }
    }

    componentDidMount() {
        const dbRef = ref(getDatabase());

        get(child(dbRef, "assignments/" + this.props.match.params.assignmentID))
            .then(assignment => {
                if (assignment.exists()) {
                    if (this.props.match.params.assignmentID == assignment.child("assignmentID").val()) {
                        this.setState({ assignmentTitle: assignment.child("title").val() });
                        this.setState({ dueDate: assignment.child("dueDate").val() });
                        this.setState({ classTitle: assignment.child("className").val() });
                    }
                } else {
                    console.log("No data avaialble");
                }
            }, {
                //onlyOnce: true,
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="assignmentDetails">
                <Sidenav />
                <Container>
                    <Row className="theme_body">
                        <Col xs lg="2">
                            <ClassNav></ClassNav>
                        </Col>
                        <Col>
                            <h3 className="bit_title">{this.state.classTitle} - {this.state.assignmentTitle}</h3>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                    <Row>
                        <Footer></Footer>
                    </Row>
                </Container>

            </div>
        )
    }
}