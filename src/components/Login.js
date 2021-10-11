import { React, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function LogIn() {

    const [uEuid, setuEuid] = useState("");
    const [uPassword, setuPassword] = useState("");

    return(
    <>
    <div className="w-100" style={{maxWidth: "400px"}}>
    <img src="logo512.png" class="rounded mx-auto d-block mb-3 mt-3" alt="tempImage" width = "100px"></img>
    <Card>
        <Card.Body>
            <div class="shadow p-2 mb-3 bg-primary rounded text-center text-white">
              <h2>Login</h2>
            </div>

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
            
            <div class="d-flex justify-content-center">
              <Button className="w-75 mt-2" type="Button">
                Login
              </Button>
            </div>
        </Card.Body>

    </Card>
    

    <div className="w-100 text-center mt-2">
            Don't have an account?
            <Link to="/Register"> Register </Link>
    </div>
    </div>
    </>
    )
}