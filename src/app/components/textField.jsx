import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    console.log(error);
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group">
                <input
                    className={getInputClasses()}
                    type={showPassword ? "text" : type}
                    id={name}
                    value={value}
                    name={name}
                    onChange={onChange}
                />
                {type === "password" && (
                    <button
                        onClick={toggleShowPassword}
                        className="btn btn-outline-secondary"
                        type="button"
                    >
                        <i
                            className={
                                showPassword ? "bi bi-eye-slash" : "bi bi-eye"
                            }
                        ></i>
                    </button>
                )}
                {error && (
                    <div
                        id="validationServer05Feedback"
                        className="invalid-feedback"
                    >
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
