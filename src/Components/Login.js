import React from "react";
import { AppContext } from "../App";
import { login } from "../api";
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
              Password&nbsp;&nbsp;
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
