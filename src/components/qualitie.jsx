import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ qualitie }) => {
    return (
        <span className={`badge m-1 bg-${qualitie.color}`}>
            {qualitie.name}
        </span>
    );
};

Qualities.propTypes = {
    qualitie: PropTypes.object.isRequired
};

export default Qualities;
