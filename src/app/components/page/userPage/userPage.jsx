import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import api from "../../../api";
import Quality from "../../UI/qualities/quality";
import Loader from "../../UI/Loader/Loader";

const UserPage = () => {
    const [user, setUser] = useState(undefined);
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const history = useHistory();

    const handleSave = () => {
        history.replace("/users");
    };

    return (
        <>
            {user
                ? (
                    <div className="d-flex flex-column w-25 p-3">
                        <ul className="list-group">
                            <li className="list-group-item" role="button">{user.name}</li>
                            <li className="list-group-item" role="button">{user.profession.name}</li>
                            <li className="list-group-item" role="button">{user.qualities.map(qual => <Quality color={qual.color} name={qual.name} _id={qual._id} key={qual._id}/>)}</li>
                            <li className="list-group-item" role="button">Встретился, раз: {user.completedMeetings}</li>
                            <li className="list-group-item" role="button">Оценка: {user.rate}</li>
                        </ul>
                        <button className="btn btn-primary mt-2" onClick={() => handleSave()}>Все пользователи</button>
                    </div>
                )
                : <div className="d-flex justify-content-center align-items-center w-100 vh-100">
                    <Loader/>
                </div>
            }
        </>
    );
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
