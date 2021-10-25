import React, { Component } from "react";
import ListGroup from "react-bootstrap/Accordion";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../firebase";
//import "font-awesome/css/font-awesome.min.css";
import { getDatabase, ref, get, child } from "firebase/database";
import { Link } from "react-router-dom";

export default class RessourceItem extends Component {
  constructor(props) {
    super(props);
    this.state = { ressourceList: [] };
  }
  componentDidMount() {
    const dbRef = ref(getDatabase());
    let ressourceList = [];

    //get list of ressources
    get(child(dbRef, `ressources`))
      .then(
        (snapshot) => {
          let moduleID = this.props.moduleID;
          console.log("searching for ressources" + moduleID);
          if (snapshot.exists()) {
            snapshot.forEach(function (item) {
              var itemVal = item.val();
              // console.log("found 1"+itemVal.moduleID);
              if (itemVal.moduleID == moduleID) {
                console.log("found :" + moduleID);
                ressourceList.push(itemVal);
              }
            });
            this.setState({ ressourceList: ressourceList });
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
    return this.state.ressourceList.map((ressource_item) => (
      <div className="ressources">
        <ListGroup>
          <ListGroup.Item>
            {" "}
            <i
              className={`fa fa-${
                ressource_item.typeID === 1 ? "file" : "external-link"
              }`}
            ></i>
           {/*if the ressource type is file */}

            {ressource_item.typeID === 1 ? (
              <Link
                to={`/ressourceDetails/${ressource_item.ressourceID}/${this.props.moduleID}/${this.props.classID}`}
              >
                {ressource_item.title}{" "}
              </Link>
            ) : (
                /*if the ressource type is external link */
              <a href={ressource_item.description} target="_blank" rel="noreferrer">
                {ressource_item.title}{" "}
              </a>
            )}
          </ListGroup.Item>
        </ListGroup>
      </div>
    ));
  }
}
