import React from "react";

const Bookmark = ({ user, handleChangeBookmark }) => {
    return (
        <i
            className={user.bookmark ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
            onClick={() => handleChangeBookmark(user._id)}
        ></i>
    );
};

export default Bookmark;
