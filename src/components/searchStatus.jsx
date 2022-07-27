import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const count = length;
    const getBageContent = () => {
        let humanStatus = "";
        count % 10 > 2 && count % 10 <= 4
            ? (humanStatus = "Человека")
            : (humanStatus = "Человек");
        return count
            ? `${count} ${humanStatus} тусанет с тобой сегодня`
            : "Ни кто с тобой не тусанет";
    };

    // Меняем цвет заголовку
    const getBageClasses = () => {
        let classes = "badge ";
        classes += count === 0 ? "bg-danger" : "bg-primary";
        return classes;
    };
    return <h1 className={getBageClasses()}>{getBageContent()}</h1>;
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;
