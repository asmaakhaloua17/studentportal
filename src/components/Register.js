import { React, Component } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../firebase";
import { getDatabase, set, ref } from "firebase/database";
import { Link } from 'react-router-dom';
import logo from "../img/logo001a.png";
import bcrypt from "bcryptjs";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
export default class Register extends Component {
  
  //Props
  constructor(props) {
    super(props);

    this.state = {
      uFullName: "",
      uEuid: "",
      uDateOfBirth: "",
      uPassword: "",
      uCPassword: "",
      formErrors: {
        dateOfBirth: "",
        password: "",
        passwordConfirm: "",
        fullName: "",
        euid: "",
        role:"student"
      },
      dateOfBirthValid: false,
      passwordValid: false,
      formValid: false,
    };
  }

  handleAddUser = () => {
 let errorlist ="";
    //validate
    if (this.state.uEuid.length < 6) {
     
      errorlist += "\n Please enter euid : it is too short.";
     
    }
    if (this.state.uFullName.length === 0) {
    
      errorlist += "\n Please enter FullName : it is too short.";
    } else {
      const db = getDatabase();

      //check if the user is already in database, 
      
      bcrypt.hash(this.state.uPassword, 12).then((hashpassword) => {
        set(ref(db, "users/" + this.state.uEuid), {
          euid: this.state.uEuid,
          fullName: this.state.uFullName,
          dateofbirth: this.state.uDateOfBirth,
          password: hashpassword,
          role:"student"
        })
          .then(() => {
          
            this.props.history.push("/",{ state: 'pass'});
          })
          .catch((error) => {
            console.log("Data failed!" + error);
          });
      });
    }
    var error = document.getElementById("errorMessage");
    error.textContent = errorlist;
  };
  handleUserInput = (e) => {
    const name = e.target.name;

    const value = e.target.value;
    // console.log("name" +name + value);
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let dbValid = this.state.uDateOfBirth;
    let passwordValid = this.state.uPassword;
    let fullNameValid = this.state.uFullName;
    let euidValid = this.state.uEuid;

    switch (fieldName) {
      case "uDateOfBirth":
        dbValid = value.match(
          /^(((19|20)\d\d))-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/
        );

        fieldValidationErrors.dateOfBirth = dbValid ? "" : " is invalid";

        this.setState({
          dateOfBirthValid: fieldValidationErrors.dateOfBirth.length === 0,
        });
        console.log("dateOfBirthValid :" + this.state.dateOfBirthValid);
        break;
      case "uCPassword":
        passwordValid = this.state.uPassword === value;

        fieldValidationErrors.passwordConfirm = passwordValid
          ? ""
          : " password not match";
        this.setState({ passwordValid: passwordValid });
        break;
      case "uPassword":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "uFullName":
        fullNameValid = value.length > 0;

        fieldValidationErrors.fullName = fullNameValid
          ? ""
          : " can not be empty";
        break;
      case "uEuid":
        euidValid = value.length >= 6;
       // console.log("euidValid" + euidValid);
        fieldValidationErrors.euid = euidValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState({ formErrors: fieldValidationErrors }, this.validateForm);
  }
  validateForm() {
   // console.log( "validate : " + this.state.dateOfBirthValid && this.state.passwordValid );
    this.setState({
      formValid: this.state.dateOfBirthValid && this.state.passwordValid,
    });
  }
  errorClass(error) {
    // console.log(error);
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    return (
     <div>
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
                  <h1 Style="font-size:26px">Register</h1>
                </div>
                <div className="body">
                <div className="w-100 text-center mt-2 text-danger" id="errorMessage" ></div>
                  <Form>
                    <Form.Group
                      id="fullName"
                      className={`${this.errorClass(
                        this.state.formErrors.fullName
                      )}`}
                    >
                      <Form.Label for="uFullName">Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="uFullName"
                        name="uFullName"
                        required
                        onChange={this.handleUserInput}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      id="euid"
                      className={`${this.errorClass(
                        this.state.formErrors.euid
                      )}`}
                    >
                      <Form.Label for="uEuid">EUID</Form.Label>
                      <Form.Control
                        type="text"
                        id="uEuid"
                        name="uEuid"
                        required
                        onChange={this.handleUserInput}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      id="date-of-birth"
                      className={`${this.errorClass(
                        this.state.formErrors.dateOfBirth
                      )}`}
                    >
                      <Form.Label for="uDateOfBirth">Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        id="uDateOfBirth"
                        name="uDateOfBirth"
                        required
                        onChange={this.handleUserInput}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      id="password"
                      className={`${this.errorClass(
                        this.state.formErrors.password
                      )}`}
                    >
                      <Form.Label for="uPassword">Password</Form.Label>
                      <Form.Control
                        type="password"
                        id="uPassword"
                        name="uPassword"
                        required
                        onChange={this.handleUserInput}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      id="password-confirm"
                      className={`${this.errorClass(
                        this.state.formErrors.passwordConfirm
                      )}`}
                    >
                      <Form.Label for="uCPassword">Password Confirmation</Form.Label>
                      <Form.Control
                        type="password"
                        id="uCPassword"
                        name="uCPassword"
                        required
                        onChange={this.handleUserInput}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group id="action">
                  
                      <Button
                        className="w-100 btn-secondary"
                        size="lm"
                        type="Button"
                        onClick={this.handleAddUser}
                        disabled={!this.state.formValid}
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
          </div>
        </Container>
    </div>
    );
  }
}
