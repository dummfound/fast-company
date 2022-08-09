import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserPage = ({ id, posts }) => {
    const history = useHistory();
    const getUserById = (id) => {
        return posts.find(post => post.id.toString() === id);
    };
    const handleSave = () => {
        history.push("/users");
    };
    const user = getUserById(id);
    return (
        <>
            <h2>{user
                ? user.label
                : `User with id:${id} not found`}
            </h2>
            <button onClick={() => handleSave()}>Сохранить</button>
        </>
    );
};

UserPage.propTypes = {
    posts: PropTypes.array,
    id: PropTypes.string
};

export default UserPage;
