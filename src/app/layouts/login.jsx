import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email is required!"
            },
            isEmail: {
                message: "Email is not valid!"
            }
        },
        password: {
            isRequired: {
                message: "Password is required!"
            },
            isCapitalSymbol: {
                message: "Password must contain a minimum of 1 upper case letter!"
            },
            isContainDigit: {
                message: "Password must contain a minimum of 1 digit!"
            },
            min: {
                message: "Passwords must be at least 8 characters!",
                value: 8
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        console.log(data);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            label="Email"
                            error={errors.email}
                        />
                        <TextField
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            type="password"
                            label="password"
                            error={errors.password}
                        />
                        <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
