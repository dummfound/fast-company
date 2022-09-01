import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../UI/qualities";
import { useHistory, useParams } from "react-router-dom";
import LoaderR from "../../UI/Loader/LoaderR";

const UserPage = () => {
    const history = useHistory();
    const [user, setUser] = useState();

    const params = useParams();
    const { userId } = params;

    console.log(userId);

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push(`/users/${userId}/edit`);
    };
    if (user) {
        return (
            <div className="ms-3 me-3">
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <p>Email: {user.email}</p>
                <p>Sex: {user.sex}</p>
                <h2>Rate: {user.rate}</h2>
                <button
                    className="btn btn-outline-success"
                    onClick={handleClick}
                >
                    Изменить
                </button>
            </div>
        );
    } else {
        return (
            <div className="vh-100 d-flex align-items-center justify-content-center">
                <LoaderR />
            </div>
        );
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
