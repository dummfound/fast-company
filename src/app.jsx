import React, {useState} from 'react';
import Users from './components/users';
import api from "./api";


const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());


    // Изменяем bookmark
    const handleChangeBookmark = (id) => {
        
        const newUsers = users.map((user) => {
           if (user._id === id) {
                user.bookmark = !user.bookmark
           }
           return user
        })
            setUsers(newUsers)
    }

    // Фильтруем (удаляем) массив с нодами на повторение по id
    const handleUsersChange = (id) => {
    setUsers((prevState) => prevState.filter((user) => id !== user._id));
  };


    return(
    <Users 
    users = {users} 
    onDelete = {handleUsersChange} 
    onChangeBookmark = {handleChangeBookmark} />
    )

}

export default App