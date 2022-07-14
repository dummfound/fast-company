import React, { useState } from "react";
import User from "./user";
import SearchStatus from "./searchStatus";

const Users = ({
  users,
  setUsers,
  handleUsersChange,
  handleChangeBookmark,
}) => {
  let count = users.length;

  const renderHeadTable = () => {
    return (
      count !== 0 && (
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
          </tr>
        </thead>
      )
    );
  };

  return (
    <React.Fragment>
      <SearchStatus length={users.length} />
      <div className="table-container">
        <table className="table">
          {renderHeadTable()}
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                user={user}
                handleUsersChange={handleUsersChange}
                users={users}
                setUsers={setUsers}
                handleChangeBookmark={handleChangeBookmark}
              />
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Users;
