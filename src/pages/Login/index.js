import React, { useState, useContext } from "react";

import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import api from "../../services/api";
import { UserContext } from "../../context";

export default function Login({ history }) {
  const { setIsLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/login", {
      email,
      password,
    });

    const user_id = response.data.user_id || false;
    const user = response.data.user || false;
    const role = response.data.role || false;

    try {
      if (user && user_id) {
        localStorage.setItem("user", user);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("role", role);
        setIsLoggedIn(true);
        history.push("/");
      } else {
        console.log(response);
        const { message } = response.data;
        setError(true);
        setErrMessage(message);
        setTimeout(() => {
          setError(false);
          setErrMessage("");
        }, 5000);
      }
    } catch (error) {
      setError(true);
      setErrMessage(`Error, the server returned an error`);
    }
  };
  return (
    <Container>
      <h4>
        <strong>Login</strong>
      </h4>

      <h6>Continue your journey</h6>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </div>
        <FormGroup>
          {" "}
          <Button className="submit-btn">Login</Button>
        </FormGroup>{" "}
        <p>
          Don't have an account?{" "}
          <span className="sign-up" onClick={() => history.push("/register")}>
            Sign up here!
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
