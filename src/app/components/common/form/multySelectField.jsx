import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultySelectField = ({ options, onChange, name, label }) => {
    const handleChange = (event) => {
        onChange({ name: name, value: event });
    };
    const optionsArray =
        options && !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((option) => ({
                  label: options[option].name,
                  value: options[option]._id
              }))
            : options;

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                options={optionsArray}
                name={name}
                closeMenuOnSelect={false}
            />
        </div>
    );
};

MultySelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string
};

export default MultySelectField;
