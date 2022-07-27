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
                {Object.keys(items).map((item) => (
                    <li
                        onClick={() => {
                            onItemSelect(items[item]);
                        }}
                        key={items[item][valueProperty]}
                        className={
                            "list-group-item" +
                            (items[item] === selectedItem ? " active" : "")
                        }
                        role="button"
                    >
                        {items[item][contentProperty]}
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
    items: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    selectedItem: PropTypes.object.isRequired
};
export default GroupList;
