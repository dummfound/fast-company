import React, { useState } from "react";
import User from "./user"
import SearchStatus from "./searchStatus"

const Users = ({users, onDelete, onChangeBookmark }) => {

  const renderrHeadTable = () => {

    return users.length !== 0 &&         
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
        
  }

  return (
    <React.Fragment>
      
      <div className="table-container">
        <SearchStatus length = {users.length}/>
        <table className="table">
            {renderrHeadTable()}
            <tbody>
            {users.map((user) => (        
                <User 
                key = {user._id}
                user = {user} 
                onDelete = {onDelete} 
                onChangeBookmark = {onChangeBookmark} 
                />
            ))}
            </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Users;
