import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    const handleChangeBookmark = (id) => {
        const updateUsers = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });

        setUsers(updateUsers);
    };

    // Фильтруем (удаляем) массив с нодами на повторение по id
    const handleUsersChange = (id) => {
        setUsers((prevState) => prevState.filter((user) => id !== user._id));
    };

    return (
        users && (
            <Users
                users={users}
                setUsers={setUsers}
                handleUsersChange={handleUsersChange}
                handleChangeBookmark={handleChangeBookmark}
            />
        )
    );
};

export default App;
