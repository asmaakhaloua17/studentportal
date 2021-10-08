import React,{useRef} from 'react'
import {Form, Button,Card} from 'react-bootstrap'
export default function Register() {
    const emailRef = useRef();
    const euidRef = useRef();
    const dateofbirthRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    return (
        <>
          <Card>
           <Card.Body>
             <h2>Register</h2>  
             <Form>
<Form.Group id="email">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email"  ref={emailRef} required></Form.Control>
</Form.Group>
<Form.Group id="euid">
    <Form.Label>EUID</Form.Label>
    <Form.Control type="text"  ref={euidRef} required></Form.Control>
</Form.Group>
<Form.Group id="date-of-birth">
    <Form.Label>Date of Birth</Form.Label>
    <Form.Control type="text"  ref={dateofbirthRef} required></Form.Control>
</Form.Group>
<Form.Group id="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password"  ref={passwordRef} required></Form.Control>
</Form.Group>
<Form.Group id="password-confirm">
    <Form.Label>Password Confirmation</Form.Label>
    <Form.Control type="password"  ref={passwordConfirmRef} required></Form.Control>
</Form.Group>
<Button type="submit" className="w-100">Sign Up</Button>
             </Form>
               </Card.Body>   
           </Card>  
          <div className = "w-100 text-center mt-2">
              Already have an account? Log In
          </div>
        </>
    )
}
