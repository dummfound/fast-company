import React, { useState, useEffect } from "react";
import API from "../../../api";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import LoaderR from "../../UI/Loader/LoaderR";

const UserPage = ({ id }) => {
    const [user, setUser] = useState(null);
    const history = useHistory();
    const { replace } = history;
    useEffect(() => {
        API.users.getById(id).then((data) => {
            setUser(data);
        });
    }, []);

    const handleAllUsers = () => {
        replace("/users");
    };

    if (user) {
        return (
            <div className="d-flex flex-column flex-shrink-0 p-2">
                <h1>{user.name}</h1>
                <h3>{`Профессия: ${user.profession.name}`}</h3>
                <h6>
                    {user.qualities.map((item) => (
                        <span
                            key={item._id}
                            className={
                                "badge rounded-pill text-bg-" + item.color
                            }
                        >
                            {item.name}
                        </span>
                    ))}
                </h6>
                <h6>{`completedMeetings: ${user.completedMeetings}`}</h6>
                <h2>{`rate: ${user.rate}`}</h2>
                <h2>
                    <button
                        onClick={handleAllUsers}
                        type="button"
                        className="btn btn-outline-dark"
                    >
                        Все пользователи
                    </button>
                </h2>
            </div>
        );
    }

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <LoaderR />
        </div>
    );
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};

export default UserPage;
