import React from "react";
export const UsersCard = ({ user }) => {
  return (
    <div className="card">
      <div className="content">
        <span>{user.accountId}</span>
        <span>{user.firstName}</span>
        <span>{user.lastName}</span>
        <span>{user.age}</span>
      </div>
    </div>
  );
};
export default UsersCard;
