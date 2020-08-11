// import React from 'react';
// import './App.css';
// import Login from './Components/Login/Login.js';
// import UserList from './Components/UserList/UserList.js';
// function App() {
//   return (
//     <div className="App">
//       <Login />
//       <UserList />
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import UserList from "./Components/UserList/UserList";
export const AppContext = React.createContext(); // added this
const initialState = {
  isAuthenticated: false,
  message: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        message: action.payload.message,
        jwt: action.payload.jwt,
      };
    case "LOGOUT":
      sessionStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        message: null,
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="App">
        {!state.isAuthenticated ? <Login /> : <UserList />}
      </div>
    </AppContext.Provider>
  );
}
export default App;
