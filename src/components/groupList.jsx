import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    return (
        <>
            <ul className="list-group">
                {items.map((item) => (
                    <li
                        onClick={() => {
                            onItemSelect(item);
                        }}
                        key={item[valueProperty]}
                        className={
                            "list-group-item" +
                            (item === selectedItem ? " active" : "")
                        }
                        role="button"
                    >
                        {item[contentProperty]}
                    </li>
                ))}
            </ul>
        </>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onItemSelect: PropTypes.func.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    selectedItem: PropTypes.object
};
export default GroupList;
