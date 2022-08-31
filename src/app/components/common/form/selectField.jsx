import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, options, error, name }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const optionsArray = options &&
    !Array.isArray(options) && typeof options === "object"
        ? Object.values(options)
        : options;

    // const optionsArray = options && !Array.isArray(options) && typeof (options) === "object"
    //     ? Object.keys(options).map(optionsName =>
    //         ({
    //             name: options[optionsName].name,
    //             value: options[optionsName]._id
    //         }))
    //     : options;
    return (
        <div className="mb-4">
            <label
                htmlFor={name}
                className="form-label"
            >
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option
                    selected={options && options.profession === ""}
                    disabled
                    value=""
                >
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string,
    name: PropTypes.string
};

export default SelectField;
