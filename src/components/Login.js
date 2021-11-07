import { React, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { getDatabase, get, ref, child } from "firebase/database";
import logo from "../img/logo001a.png";
import bcrypt from "bcryptjs";

export default function LogIn() {
  const [uEuid, setuEuid] = useState("");
  const [uPassword, setuPassword] = useState("");
  const history = useHistory();

  function clearError() {
    var error = document.getElementById("errorMessage");
    error.textContent = "";
  }

  function invalidLoginMessage(){
    var error = document.getElementById("errorMessage");
    error.textContent = "Invalid Login";
    console.log("Invalid Login");
  }

  function handleLoginUser() {
    const dbRef = ref(getDatabase());
   
    get(child(dbRef, "users/" + uEuid))
      .then((snapshot) => {
        // checks if euid is in database
        if (snapshot.exists()) {
          // checks password match, if true then redirects to dashboard
          bcrypt.compare(
            uPassword,
            snapshot.child("password").val(),
            function (err, result) {
              if (result) {
                const role = snapshot.child("role").val();
                const fName = snapshot.child("firstname").val();
                console.log("password same " + result + role );
                
                // redirects to either student or teacher dashboard based on role
                if (role == "student" )
                {
                  history.push("/Dashboard/"+ uEuid);
                }
                else if (role == "teacher")
                {
                  history.push("DashboardTeacher/" + fName+ "/" + uEuid);
                }
                
              }// if(result)
              // if password does not match, error messages displayed
              else {
                invalidLoginMessage();
              }
            }
          );
          if (snapshot.child("password").val() === uPassword) {
            history.push("/Dashboard");
            console.log("Correct password");
          }
        }
        // if euid is not found in database, error message is displayed
        else {
          invalidLoginMessage();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } //function handleLoginUser()

  return (

    <>
    {}
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
                      clearError();
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
                      clearError();
                    }}
                  ></Form.Control>
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button
                    className="w-75 mt-2"
                    type="Button"
                    onClick={handleLoginUser}
                  >
                    Submit
                  </Button>
                </div>

                <div className="w-100 text-center mt-2">
                  Don't have an account?
                  <Link to="/Register"> Register </Link>
                </div>

                <div
                  className="w-100 text-center mt-2 text-danger"
                  id="errorMessage"
                ></div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
