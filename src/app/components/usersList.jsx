import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const UsersList = ({ posts }) => {
    return (
        <>
            {posts.map(post => (
                <Link key={post.id} to={`users/${post.id}`} >
                    <h3>{post.label}</h3>
                </Link>
            ))}
        </>
    );
};

UsersList.propTypes = {
    posts: PropTypes.array
};

export default UsersList;
