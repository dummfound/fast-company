import React, { useState, useEffect } from "react";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginat } from "../app/utils/paginat";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";

const Users = ({ users, handleUsersChange, handleChangeBookmark }) => {
    const count = users.length;
    const pageSize = 4;

    const [professions, setProfessions] = useState();
    const [selectedProfession, setSelectedProdession] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const handleProfessionSelect = (item) => {
        setSelectedProdession(item);
    };

    if (pageSize === 1) return null;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginat(users, currentPage, pageSize);

    const renderHeadTable = () => {
        return (
            count !== 0 && (
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качество</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                    </tr>
                </thead>
            )
        );
    };

    return (
        <React.Fragment>
            <SearchStatus
                length={users.length}
                onItemSelect={handleProfessionSelect}
            />
            {professions && (
                <GroupList
                    items={professions}
                    onItemSelect={handleProfessionSelect}
                    selectedItem={selectedProfession}
                />
            )}

            <div className="table-container">
                <table className="table">
                    {renderHeadTable()}
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                user={user}
                                handleUsersChange={handleUsersChange}
                                handleChangeBookmark={handleChangeBookmark}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </React.Fragment>
    );
};

Users.propTypes = {
    users: PropTypes.object.isRequired,
    handleUsersChange: PropTypes.func.isRequired,
    handleChangeBookmark: PropTypes.func.isRequired
};

export default Users;
