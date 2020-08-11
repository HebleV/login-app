import React, { useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getUserList } from '../../api';
import Card from "./Card";
const initialState = {
  users: [],
  isFetching: false,
  hasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        isFetching: false,
        users: action.payload.users,
      };
    case "FETCH_USER_ERROR":
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    default:
      return state;
  }
};
export const UserList = () => {
  const { state: authState } = React.useContext(AppContext);
  console.log({authState});
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);;
  useEffect(() => {
      const fetchUser = async () => {
        // dispatch({
        //     type: "FETCH_USER_REQUEST",
        // })
        setIsFetching(true);
        const response = await getUserList(authState.jwt);
        console.log({response});
        setIsFetching(false);
        if(response.users){
            // dispatch({
            //     type: "FETCH_USER_SUCCESS",
            //     payload: response
            // })
            setUsers(response.users);
        } else {
            // dispatch({
            //     type: "FETCH_USER_ERROR",
            // })
            setHasError(true);
        }
      }
      fetchUser();
  },[authState.jwt])
  return (
    <div className="home">
      {state.isFetching ? (
        <span className="loader">LOADING...</span>
      ) : state.hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) : (
        <>
          {state.users.length > 0 &&
            state.users.map((user) => (
              <Card key={user.accountId} user={user} />
            ))}
        </>
      )}
    </div>
  );
};
export default UserList;
