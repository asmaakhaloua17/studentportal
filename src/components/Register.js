import { React, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import   "../firebase";
import { getDatabase, set, ref } from "firebase/database";
import { Link } from 'react-router-dom';

export default function Register() {
    
  //Props
  const [uFirstName, setuFirstName] = useState("");
  const [uEuid, setuEuid] = useState("");
  const [uDateOfBirth, setuDateOfBirth] = useState("");
  const [uPassword, setuPassword] = useState("");

  function handleAddUser() {
    const db = getDatabase();
    set(ref(db, "users/" + uEuid), {
      euid: uEuid,
      firstname: uFirstName,
      dateofbirth: uDateOfBirth,
      password: uPassword,
    })
      .then(() => {
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.log("Data failed!" + error);
      });
  }

  return (
    <>
    <div className="w-100" style={{maxWidth: "400px"}}>
      <Card>
        <Card.Body>
          <h2>Register</h2>
          <Form>
            <Form.Group id="firstname">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={uFirstName}
                required
                onChange={(e) => {
                  setuFirstName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>
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
            <Form.Group id="date-of-birth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => {
                  setuDateOfBirth(e.target.value);
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" required></Form.Control>
            </Form.Group>
            <Button className="w-100" type="Button" onClick={handleAddUser}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? 
        <Link to="/"> Log In </Link>
      </div>
    </div>
    </>
  );
}
