import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import CommentsList from "../common/comments/commentsList";
import { orderBy } from "lodash";
import AddCommentForm from "../common/comments/addCommentForm";

const Comments = ({ userId }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const handleRemove = (id) => {
        api.comments
            .remove(id)
            .then(() =>
                setComments(comments.filter((comm) => comm._id !== id))
            );
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <CommentsList
                        onRemove={handleRemove}
                        comments={sortedComments}
                        userId={userId}
                    />
                </div>
            </div>
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;
