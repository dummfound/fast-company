import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  // console.log(users);
  let count = users.length;

  // Меняем контент в заголовке
  const getBageContent = () => {
    return count ? `${count} тусанет с тобой сегодня` : "Ни кто с тобой не тусанет"
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

  const renderrHeadTable = () => {
    return users.length !== 0 ?         
        (<thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качество</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился раз</th>
              <th scope="col">Оценка</th>
            </tr>
        </thead>) 
        : "";
  }

  return (
    <React.Fragment>
      <h1 className={getBageClasses()}>{getBageContent()}</h1>
      <div className="table-container">
        <table className="table">
            {renderrHeadTable()}
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
