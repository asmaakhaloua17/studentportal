import { React, useState } from "react";
import { Form, Button, Card,Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { getDatabase, get, ref , child} from "firebase/database";
import logo from "../img/logo001a.png";
import { Redirect, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";

export default function LogIn() {

    const [uEuid, setuEuid] = useState("");
    const [uPassword, setuPassword] = useState("");

    function handleLoginUser() 
    {
      const dbRef = ref(getDatabase());

      get(child(dbRef, "users/" + uEuid)).then((snapshot) => {
        if (snapshot.exists()) 
        {
          if ( snapshot.child("password").val() == uPassword)
          {
            <Route exact path="/">
            <Redirect to="/Dashboard" component={Dashboard}/>
            </Route>
            console.log("Correct password");
          }
          else
          {
            console.log("Incorrect password");
            var error = document.getElementById("incorrectPassword");
            error.textContent = "Incorrect Password. Please try again.";
          }
        } 
        else 
        {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

    }//function handleLoginUser()

    return(
    <>
    <Container className="d-flex align-item-center justify-content-center">
    <div className="w-100" style={{maxWidth: "400px"}}>
    <img  src={logo} className="logo mx-auto d-block mb-3 mt-3" alt="Portal logo" ></img>
    <Card className="login">
     
        <Card.Body>
            <div class="shadow p-2 mb-3 bg-primary text-center text-white">
              <h2>Login</h2>
            </div>
<div className="body">
            <Form.Group id="euid">
              <Form.Label>EUID</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => {
                  setuEuid(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => {
                  setuPassword(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
            
            <div className="d-flex justify-content-center">
              <Button className="w-75 mt-2" type="Button" onClick={handleLoginUser}>
                Submit
              </Button>
              
            </div>
            <div className="w-100 text-center mt-2">
            Don't have an account?
            <Link to="/Register"> Register </Link>
            </div>

            <div className="w-100 text-center mt-2 text-danger" id="incorrectPassword" ></div>
            
  </div>
        </Card.Body>

    </Card>
    

   
    </div>
    </Container>
    </>
    )
}