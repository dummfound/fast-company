import React from 'react';

const Bookmark = ({status, onChangeBookmark, user }) => {
    return (
    <i className={!status ? "bi bi-bookmark" : "bi bi-bookmark-fill"} onClick={() => onChangeBookmark(user._id)}></i>
    )
}

export default Bookmark;