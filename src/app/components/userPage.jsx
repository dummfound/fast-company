import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../api";
import Quality from "./quality";
import Loader from "./UI/Loader/Loader";

const UserPage = ({ id, users }) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);

    const history = useHistory();

    const handleSave = () => {
        history.replace("/users");
    };

    return (
        <>
            {user
                ? (
                    <>
                        <ul className="d-flex flex-column align-items-start mt-2 mx-3 w-25 list-unstyled">
                            <li className="border border-primary py-2 px-3 w-100" >{user.name}</li>
                            <li className="border border-primary py-2 px-3 w-100" >Профессия: {user.profession.name}</li>
                            <li className="border border-primary py-2 px-3 w-100" >{user.qualities.map(qual => <Quality color={qual.color} name={qual.name} _id={qual._id} key={qual._id}/>)}</li>
                            <li className="border border-primary py-2 px-3 w-100" >Встретился, раз: {user.completedMeetings}</li>
                            <li className="border border-primary py-2 px-3 w-100" >Оценка: {user.rate}</li>
                        </ul>
                        <button className="mx-3" onClick={() => handleSave()}>Все пользователи</button>
                    </>
                )
                : <div className="d-flex justify-content-center align-items-center w-100 vh-100">
                    <Loader/>
                </div>
            }
        </>
    );
};

UserPage.propTypes = {
    id: PropTypes.string,
    users: PropTypes.array
};

export default UserPage;
