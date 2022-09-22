import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    value={value}
                    onChange={handleChange}
                    name={name}
                    className="form-control"
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextAreaField.defaultProps = {
    type: "text"
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
