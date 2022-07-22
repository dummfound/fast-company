import React from "react";
import Bookmark from "./bookmark";
import Qualities from "./qualitie";

const User = ({ user, handleUsersChange, handleChangeBookmark }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {
                    <ul>
                        {user.qualities.map((qualitie) => (
                            <Qualities key={qualitie._id} qualitie={qualitie} />
                        ))}
                    </ul>
                }
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <Bookmark
                    user={user}
                    handleChangeBookmark={handleChangeBookmark}
                />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleUsersChange(user._id)}
                >
                    Удалить
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    handleUsersChange : prototype.func.isRequired,
    handleChangeBookmark: prototype.func.isRequired,
    user: prototype.object.isRequired   
}
export default User;
