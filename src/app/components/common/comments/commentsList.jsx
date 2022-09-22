import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments, userId, onRemove }) => {
    console.log("comments", comments);
    return (
        comments &&
        comments.map((comment) => (
            <Comment
                key={comment._id}
                onRemove={onRemove}
                comment={comment}
                userId={userId}
                comentId={comment._id}
            />
        ))
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};

export default CommentsList;
