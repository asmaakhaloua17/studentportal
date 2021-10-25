import { React, useState, Component }  from "react";
import Sidenav from "../Sidenav";
import Footer from "../Footer";
import ClassNav from "../Classes/ClassNav";
import { Container, Row, Col , Table, Card} from "react-bootstrap";
import { getDatabase, ref, get, child } from "firebase/database";
//import { Link, useHistory } from "react-router-dom";
import "../../css/style.css";


export default class Grades extends Component {
    constructor(props) {
        super(props);
        this.state = { classTitle: "" ,classSection :"" };
      }
      componentDidMount() {
        const dbRef = ref(getDatabase());
    
        //get  class title
        get(child(dbRef, "classes/" + this.props.match.params.classId))
          .then(
            (snapshot) => {
              if (snapshot.exists()) {
              
                if (
                  this.props.match.params.classId == snapshot.child("classID").val()
                ) {
                  this.setState({ classTitle: snapshot.child("name").val() });
                  this.setState({ classSection: snapshot.child("section").val() });
                }
              } else {
                console.log("No data available");
              }
            },
            {
              onlyOnce: true,
            }
          )
          .catch((error) => {
            console.error(error);
          });
      }

    render() {
    return(
        <>
        <Sidenav />

        <Container>

          <Row className="theme_body">

            <Col xs lg="2">
            <ClassNav></ClassNav>
            </Col>

            <Col>
            <h3 className="big_title">{this.state.classTitle} Section {this.state.classSection}</h3>
            <Row>
            <Col lg= {6} md ={12}>
                <Table striped hover size ="sm" className="gradesTable">
                    <thead>
                        <tr>
                            <th>Assignment Name</th>
                            <th>Due Date</th>
                            <th>Score</th>
                            <th>Out of</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>One</td>
                            <td>12/12/1212</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Two</td>
                            <td>temp</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Three</td>
                            <td>temp</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
            <Col lg={{ span: 4 , offset: 1 }} md={12}>
                <Card>
                <h4>Grade Distribution</h4>
                
                </Card>
            </Col>
            </Row>
            
            </Col>

          </Row>

          <Row>
            <Footer></Footer>
          </Row>

        </Container>
        
        </>
    );
    }
}