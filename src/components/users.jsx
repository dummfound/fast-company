import React, { useState, useEffect } from "react";
import User from "./user";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginat } from "../app/utils/paginat";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
// import _ from "lodash";

const Users = ({
    users: allUsers,
    handleUsersChange,
    handleChangeBookmark
}) => {
    const pageSize = 2;

    const [professions, setProfessions] = useState();
    const [selectedProfession, setSelectedProdession] = useState();

    useEffect(() => {
        api.fetchAllProfessions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    const clearFilter = () => {
        setSelectedProdession(null);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const handleProfessionSelect = (item) => {
        setSelectedProdession(item);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProfession]);

    if (pageSize === 1) return null;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProfession
        ? allUsers.filter(
              (user) =>
                  //   _.isEqual(user.profession, selectedProfession) ИМБА!!!!!
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProfession)
          )
        : allUsers;
    const count = filteredUsers.length;
    const userCrop = paginat(filteredUsers, currentPage, pageSize);

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
        <div className="d-flex">
            <div className="d-flex flex-column flex-shrink-0 p-3">
                {professions && (
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProfession}
                    />
                )}
                <button className="btn btn-dark mt-2" onClick={clearFilter}>
                    Сбросить
                </button>
            </div>

            <div className="d-flex flex-column">
                <SearchStatus
                    length={count}
                    onItemSelect={handleProfessionSelect}
                />
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    handleUsersChange: PropTypes.func.isRequired,
    handleChangeBookmark: PropTypes.func.isRequired
};

export default Users;
