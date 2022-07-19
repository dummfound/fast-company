import React, { useState } from "react";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginat } from "../app/utils/paginat";

const Users = ({
  users,
  setUsers,
  handleUsersChange,
  handleChangeBookmark,
}) => {
  let count = users.length;
  const pageSize = 4;

  const [currentPage, setCurrentPage] = useState(1);

  if (pageSize === 1) return null;
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginat(users, currentPage, pageSize);

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
            {userCrop.map((user) => (
              <User
                key={user._id}
                user={user}
                handleUsersChange={handleUsersChange}
                setUsers={setUsers}
                handleChangeBookmark={handleChangeBookmark}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </React.Fragment>
  );
};

export default Users;
