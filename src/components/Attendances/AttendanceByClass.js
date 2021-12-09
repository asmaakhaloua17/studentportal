import React, { Component } from "react";
import { Container, Row, Col, Table, Card, ProgressBar } from "react-bootstrap";
import Footer from "../Footer";
import Sidenav from "../Sidenav";
import ClassNav from "../Classes/ClassNav";
import { getDatabase, ref, get, child } from "firebase/database";
import AttendancesTableRows from "./AttendancesTableRows";
let pres = 0;
let abs = 0;
let rec = 0;

export default class AttendanceByClass extends Component {
  constructor(props) {
    super(props);
    this.state = { classTitle: "" ,classSection :"" };
    this.state = { attendsList : [] };
  }
  componentDidMount() {
    const dbRef = ref(getDatabase());
    let attendList = [];

    //get  classe title
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

      // get attendances
      get(child(dbRef, "attendances/" + this.props.match.params.classId + "/" + this.props.match.params.euid))
      .then(attend => {
          if (attend.exists()) {
              pres = 0;
              abs = 0;
              rec = 0;
              attend.forEach(item => {
                  let itemVal = item.val();
                  attendList.push(itemVal);
                  console.log(itemVal);
                  
                  if(itemVal.status == "Present" ){ 
                    pres++;
                  }
                  else{
                    abs++;
                  }
                  rec++;
              });
              
              this.setState({ attendsList: attendList });
          } 
          else {
              console.log("No attendances found");
          }
      }, {
          onlyOnce: true
      }).catch(error => {
          console.log(error);
      });
  }

  render() {
    return (
      <>
    
       <Sidenav euid={this.props.match.params.euid}/>
        <Container>
          <Row className="theme_body">
            <Col xs lg="2">
          
              <ClassNav classId={this.props.match.params.classId} euid={this.props.match.params.euid} isActive="4"></ClassNav>
            </Col>
            <Col> <h3 className="big_title">Attendances for {this.state.classTitle} Section {this.state.classSection}</h3>
           
            <Row>
            <Col lg= {6} md ={12}>
                <Table striped hover size ="sm" className="gradesTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AttendancesTableRows classID={this.props.match.params.classId} euid={this.props.match.params.euid}></AttendancesTableRows>
                    </tbody>
                </Table>
            </Col>
            <Col lg={{ span: 4 , offset: 1 }} md={12}>
                <Card  style={{'padding': '0px 10px'}}>
                <h4 className="mb-2 mt-2">Attendance Count</h4>
                  <h5>Present</h5>
                  <ProgressBar now={(pres/rec) * 100} label={pres} className="mb-2"/>
                  <h5>Absent</h5>
                  <ProgressBar now={(abs/rec) * 100} label={abs} className="mb-2"/>
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
