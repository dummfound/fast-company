import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ user, handleChangeBookmark }) => {
    return (
        <i
            className={user.bookmark ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
            onClick={() => handleChangeBookmark(user._id)}
        ></i>
    );
};

Bookmark.propTypes = {
    user: PropTypes.object.isRequired,
    handleChangeBookmark: PropTypes.func.isRequired
};

export default Bookmark;
