import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ searchQuery, handleChangeValue }) => {
    return (
        <div className="input-group mb-3 w-100 position-relative">
            <input
                className="w-100"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleChangeValue(e)}
            />
        </div>
    );
};

SearchInput.propTypes = {
    searchQuery: PropTypes.string,
    handleChangeValue: PropTypes.func
};

export default SearchInput;
