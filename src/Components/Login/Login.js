// import React, {useState} from "react";
// import { login } from '../../api';
// import { Col, Row } from "reactstrap";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// const Login = () => {
//     const [userid, setUserId] = useState('');
//     const [password, setPassword] = useState('');
//     const handleUsername = (e) => {
//         let loginVal = e.target.value;
//         setUserId(loginVal);
//     }

//     const handlePassword = (e) => {
//         let passwordVal = e.target.value;
//         setPassword(passwordVal);
//     }

//     const handleClick = async () => {
//       await login();
//       await getUserList();
//     }

//   return (
//     <Form>
//       <Form.Row>
//         <Form.Label column lg={1}>
//           Username
//         </Form.Label>
//         <Col lg={5}>
//           <Form.Control type="text" placeholder="Username" onChange={handleUsername} />
//         </Col>
//       </Form.Row>{" "}
//       <br />
//       <Form.Row>
//         <Form.Label column lg={1}>
//           Password
//         </Form.Label>
//         <Col lg={5}>
//           <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
//         </Col>
//       </Form.Row>{" "}
//       <br />
//       <Form.Group as={Row}>
//         <Col sm={{ span: 1, offset: 1 }}>
//           <Button onClick={handleClick}>Sign in</Button>
//         </Col>
//       </Form.Group>
//     </Form>
//   );
// };

// export default Login;

import React from "react";
import { AppContext } from "../../App";
import { login } from "../../api";
export const Login = () => {
  const { dispatch } = React.useContext(AppContext);
  const initialState = {
    accountId: "",
    pswd: "",
    errorMessage: null,
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await login(data.accountId,data.pswd);
    if(response.status === true){
      dispatch({
        type: "LOGIN",
        payload: response
    })
    } else {
      setData({
        ...data,
        errorMessage: response.error.message || response.error.statusText
      });
    }
  };
  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form>
            <h1>Login</h1>

            <label htmlFor="accountId">
              Account ID
              <input
                type="text"
                name="accountId"
                value={data.accountId}
                onChange={handleInputChange}
                id="accountId"
              />
            </label>

            <label htmlFor="pswd">
              Password
              <input
                type="password"
                value={data.pswd}
                name="pswd"
                onChange={handleInputChange}
                id="password"
              />
            </label>
            {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

            <button 
              disabled={!(data.accountId && data.pswd)}
              onClick={handleFormSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
