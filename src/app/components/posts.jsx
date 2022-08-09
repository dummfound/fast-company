import React from "react";
import UserPage from "./userPage";
import UsersList from "./usersList";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Posts = () => {
    const params = useParams();
    const posts = [
        { id: 1, label: "post 1" },
        { id: 2, label: "post 2" },
        { id: 3, label: "post 3" }
    ];

    const { userId } = params;

    return (
        <>
            {userId
                ? <UserPage posts={posts} id={userId} history={history} />
                : <UsersList posts={posts} />
            }
        </>
    );
};

Posts.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
};

export default Posts;
