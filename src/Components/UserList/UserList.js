import React, { useEffect, useState } from "react";
import { AppContext } from "../../App";
import { getUserList } from "../../api";
import UsersCard from "./UsersCard";

export const UserList = () => {
  const { state: authState } = React.useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const handleFilter = () => {
    const filteredUsersList = users.filter((user) => {
      return (
        user.age >= 20 &&
        user.age < 30 &&
        (user.firstName + user.lastName).length >= 10
      );
    });
    setIsFilter(true);
    setFilteredUsers(filteredUsersList);
  };

  const removeFilter = () => {
    setFilteredUsers([]);
    setIsFilter(false);
  };
  useEffect(() => {
    const fetchUser = async () => {
      setIsFetching(true);
      const response = await getUserList(authState.jwt);
      console.log({ response });
      setIsFetching(false);
      if (response.users) {
        setUsers(response.users);
      } else {
        setHasError(true);
      }
    };
    fetchUser();
  }, [authState.jwt]);
  const usersList = filteredUsers.length > 0 ? filteredUsers : users;
  return (
    <div className="home">
      {isFetching ? (
        <span className="loader">LOADING...</span>
      ) : hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) : (
        <>
          {usersList.length > 0 && (
            <>
              {usersList.map((user) => (
                <UsersCard key={user.accountId} user={user} />
              ))}
              {!isFilter ? (
                <button onClick={handleFilter}>Filter</button>
              ) : (
                <button onClick={removeFilter}>UnFilter</button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default UserList;
