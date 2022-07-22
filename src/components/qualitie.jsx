import React from "react";

const Qualities = ({ qualitie }) => {
    return (
        <span className={`badge m-1 bg-${qualitie.color}`}>
            {qualitie.name}
        </span>
    );
};

Qualities.prototype = {
    qualitie: PropTypes.object.isRequired
}

export default Qualities;
