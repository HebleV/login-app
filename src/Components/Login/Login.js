import React, {useState} from "react";

import { Col, Row } from "reactstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const Login = () => {
    const [userid, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const handleUsername = (e) => {
        let loginVal = e.target.value;
        setUserId(loginVal);
    }

    const handlePassword = (e) => {
        let passwordVal = e.target.value;
        setPassword(passwordVal);
    }

  return (
    <Form>
      <Form.Row>
        <Form.Label column lg={1}>
          Username
        </Form.Label>
        <Col lg={5}>
          <Form.Control type="text" placeholder="Username" onChange={handleUsername} />
        </Col>
      </Form.Row>{" "}
      <br />
      <Form.Row>
        <Form.Label column lg={1}>
          Password
        </Form.Label>
        <Col lg={5}>
          <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
        </Col>
      </Form.Row>{" "}
      <br />
      <Form.Group as={Row}>
        <Col sm={{ span: 1, offset: 1 }}>
          <Button type="submit">Sign in</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default Login;
