import { React, useState } from "react";
import { Form, Button, Card,Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import logo from "../img/logo001a.png"

export default function LogIn() {

    const [uEuid, setuEuid] = useState("");
    const [uPassword, setuPassword] = useState("");

    return(
    <>
    <Container className="d-flex align-item-center justify-content-center">
    <div className="w-100" style={{maxWidth: "400px"}}>
    <img src={logo} class="rounded mx-auto d-block mb-3 mt-3" alt="tempImage" ></img>
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
                /*onChange={(e) => {
                  setuEuid(e.target.value);
                }}*/
              ></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                /*onChange={(e) => {
                  setuPassword(e.target.value);
                }}*/
              ></Form.Control>
            </Form.Group>
            
            <div className="d-flex justify-content-center">
              <Button className="w-75 mt-2" type="Button">
                Submit
              </Button>
              
            </div>
            <div className="w-100 text-center mt-2">
            Don't have an account?
            <Link to="/Register"> Register </Link>
    </div>
            </div>
        </Card.Body>

    </Card>
    

   
    </div>
    </Container>
    </>
    )
}