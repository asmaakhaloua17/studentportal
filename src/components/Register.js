import { React, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../firebase";
import { getDatabase, set, ref } from "firebase/database";
import { Link } from "react-router-dom";
import logo from "../img/logo001a.png";
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
      <Container className="d-flex align-item-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <img
            src={logo}
            className="logo mx-auto d-block mb-3 mt-3"
            alt="Portal logo"
          ></img>
          <Card className="login">
            <Card.Body>
              <div class="shadow p-2 mb-3 bg-primary text-center text-white">
                <h2>Register</h2>
              </div>
              <div className="body">
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
                  <Form.Group id="action">
                  <Button
                    
                    type="Button" variant="secondary"  size="sm"
                    onClick={handleAddUser}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn-secondary"  size="sm"
                    type="Button"
                    onClick={handleAddUser}
                  >
                    Sign Up
                  </Button>
                  </Form.Group>
                </Form>
                <div className="w-100 text-center mt-2">
                  Already have an account?
                  <Link to="/"> Log In </Link>
                </div>
              </div>
            </Card.Body>
          </Card>

          <div className="w-100 text-center mt-2">
            test Dashboard
            <Link to="/Dashboard"> Dashboard </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
