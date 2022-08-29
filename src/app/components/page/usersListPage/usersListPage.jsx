import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import API from "../../../api";
import GroupList from "../../common/groupList";
import SearchStatus from "../../UI/searchStatus";
import UsersTable from "../../UI/usersTable";
import { orderBy } from "lodash";
import LoaderR from "../../UI/Loader/LoaderR";
import Search from "../../search";
import PropTypes from "prop-types";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState(null);
    const [selectedProf, setSelectedProf] = useState(null);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState(null);

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    const clearFilter = () => {
        setSelectedProf(null);
    };

    // Поиск

    const [data, setData] = useState({ finder: "" });

    const handleChange = ({ target }) => {
        clearFilter();
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const clearSearchValue = () => {
        setData({ finder: "" });
    };

    const filterFinder =
        users &&
        users.filter((user) => {
            return user.name.toLowerCase().includes(data.finder.toLowerCase());
        });
    // __________________________________________________________________________

    const pageSize = 8;

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    const handleProfessionSelect = (item) => {
        clearSearchValue();
        setSelectedProf(item);
        setCurrentPage(1);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers = selectedProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : users;

    const getSearchedAndFiltered = () => {
        if (selectedProf) {
            return filteredUsers;
        } else if (data) {
            return filterFinder;
        } else {
            return users;
        }
    };

    if (users) {
        const searchedAndFilteredUsers = getSearchedAndFiltered();
        const count = searchedAndFilteredUsers.length;
        const sortedUsers = orderBy(
            searchedAndFilteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <div>
                        <Search
                            labelValue="Поиск"
                            name="finder"
                            handleChange={handleChange}
                            data={data}
                            clearFilter={clearFilter}
                        />
                    </div>

                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <LoaderR />
        </div>
    );
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
