import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ name, handleChange, data, clearFilter }) => {
    return (
        <div className="mb-4">
            <form>
                <label htmlFor={name}></label>
                <input
                    onFocus={clearFilter}
                    onChange={handleChange}
                    className="w-100"
                    name={name}
                    id={name}
                    type="text"
                    value={data.finder}
                    placeholder="Введите имя пользователя.."
                />
            </form>
        </div>
    );
};
Search.propTypes = {
    name: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    clearFilter: PropTypes.func.isRequired
};

export default Search;
