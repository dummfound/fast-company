import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const UsersTable = ({ users, onSort, selectedSort, ...rest }) => {

    const columns = {
        name: { path: "name", name: "Имя"},
        qualities: { name: "Качества"},
        professions: { path: "profession.name", name: "Профессии"},
        completedMeetings: { path: "completedMeetings", name: "Встретилсяб раз"},
        rate: { path: "rate", name: "Оценка"},
        bookmark: { path: "bookmark", name: "Избранное"},
        delete: {}
    }

    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }}/>
            <TableBody {...{ columns, data: users }}/>
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
}

export default UsersTable;