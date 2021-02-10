import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
} from "reactstrap";
import api from "../../services/api";
import { UserContext } from "../../context";
export default function Register({ history }) {
  const { setIsLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      const response = await api.post("/user/register", {
        email,
        password,
        firstName,
        lastName,
      });

      console.log(response);
      const user = response.data.user || false;
      const user_id = response.data.user_id || false;
      const role = response.data.role || false;

      if (user && user_id) {
        setIsLoggedIn(true);
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("role", role);
        history.push("/");
      } else {
        const message = response.data.message;
        console.log(message);
        setError(true);
        setErrMessage(message);
        setTimeout(() => {
          setError(false);
          setErrMessage("");
        }, 5000);
      }
    } else {
      setError(true);
      setErrMessage("Please fill in all input fields");
      setTimeout(() => {
        setError(false);
        setErrMessage("");
      }, 2000);
    }
  };
  return (
    <Container>
      {" "}
      <h4>
        <strong>Register</strong>
      </h4>
      <h6>Start your journey</h6>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Choose a Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </div>
        <Button className="submit-btn">Register</Button>
        <p>
          Already registered?{" "}
          <span className="sign-up" onClick={() => history.push("/login")}>
            Log in here
          </span>{" "}
        </p>
      </Form>
      {error ? (
        <Alert className="event-validation" color="danger">
          {errMessage}
        </Alert>
      ) : (
        ""
      )}
    </Container>
  );
}
