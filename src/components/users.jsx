import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [word, setWord] = useState("человек");

  let count = users.length;

  const getBageContent = () => {
    let humanStatus = "";
    count % 10 > 2 && count % 10 <= 4
      ? (humanStatus = "Человека")
      : (humanStatus = "Человек");
    return count
      ? `${count} ${humanStatus} тусанет с тобой сегодня`
      : "Ни кто с тобой не тусанет";
  };

  // Меняем цвет заголовку
  const getBageClasses = () => {
    let classes = "badge ";
    classes += count === 0 ? "bg-danger" : "bg-primary";
    return classes;
  };

  // Фильтруем (удаляем) массив с нодами на повторение по id
  const handleUsersChange = (id) => {
    setUsers((prevState) => prevState.filter((user) => id !== user._id));
  };

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
          </tr>
        </thead>
      )
    );
  };

  return (
    <React.Fragment>
      <h1 className={getBageClasses()}>{getBageContent()}</h1>
      <div className="table-container">
        <table className="table">
          {renderHeadTable()}
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>
                  {
                    <ul>
                      {user.qualities.map((item) => (
                        <span className={`badge m-1 bg-${item.color}`}>
                          {item.name}
                        </span>
                      ))}
                    </ul>
                  }
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleUsersChange(user._id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Users;
