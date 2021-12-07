import { React, useState, Component }  from "react";
import Sidenav from "../Sidenav";
import Footer from "../Footer";
import ClassNav from "../Classes/ClassNav";
import { Container, Row, Col , Table, Card, ProgressBar} from "react-bootstrap";
import { getDatabase, ref, get, child } from "firebase/database";
import "../../firebase";
import "../../css/style.css";
import GradesTableRows from "./GradesTableRows";
let numA = 0;
let numB = 0;
let numC = 0;
let numF = 0;
let gradesCount = 0;

export default class Grades extends Component {
    constructor(props) {
        super(props);
        this.state = { classTitle: "" ,classSection :"" };
        this.state = { gradesList : [] };
        
    }
      componentDidMount() {
        const dbRef = ref(getDatabase());
        let gradeList = [];
        
    
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

          // get grades
          get(child(dbRef, "grades/" + this.props.match.params.classId + "/" + this.props.match.params.euid))
            .then(grade => {
                if (grade.exists()) {
                  numA = 0;
                  numB = 0;
                  numC = 0;
                  numF = 0;
                  gradesCount = 0;
                    grade.forEach(item => {
                        let itemVal = item.val();
                        gradeList.push(itemVal);
                        console.log(itemVal.title);
                        console.log(itemVal.dueDate);
                        console.log(itemVal.points);
                        if(itemVal.points >= 90 ){ 
                          numA++;
                        }
                        else if (itemVal.points >= 80){
                          numB++;
                        }
                        else if(itemVal.points >= 70)
                        {
                          numC++;
                        }
                        else if(itemVal.points < 70)
                        {
                          numF++;
                        }
                        gradesCount++;
                    });
                    
                    this.setState({ gradesList: gradeList });
                } 
                else {
                    console.log("No grades found");
                }
            }, {
                onlyOnce: true
            }).catch(error => {
                console.log(error);
            });
      }

    render() {
    return(
        <>
        <Sidenav euid={this.props.match.params.euid} isActive="2"/>
        <Container>

          <Row className="theme_body">

            <Col xs lg="2">
            <ClassNav   euid={this.props.match.params.euid} classId={this.props.match.params.classId} isActive="2"></ClassNav>
            </Col>

            <Col>
            <h3 className="big_title"> Grades for {this.state.classTitle} Section {this.state.classSection}</h3>
            <Row>
            <Col lg= {6} md ={12}>
              
            <Table striped hover size ="sm" className="gradesTable">
                    <thead>
                        <tr>
                            <th>Assignment Name</th>
                            <th>Due Date</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                      <GradesTableRows classID={this.props.match.params.classId} euid={this.props.match.params.euid}></GradesTableRows>
                    </tbody>
            </Table>

            </Col>
            <Col lg={{ span: 4 , offset: 1 }} md={12}>
                <Card>
                <h4 className="mb-2 mt-2">Grade Distribution</h4>
                  <h5>A</h5>
                  <ProgressBar now={(numA/gradesCount) * 100} label={numA} className="mb-2"/>
                  <h5>B</h5>
                  <ProgressBar now={(numB/gradesCount) * 100} label={numB} className="mb-2"/>
                  <h5>C</h5>
                  <ProgressBar now={(numC/gradesCount) * 100} label={numC} className="mb-2"/>
                  <h5>F</h5>
                  <ProgressBar now={(numF/gradesCount) * 100} label={numF} className="mb-4"/>
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