import React, { useEffect, useState } from "react";
import TextField from "./textField";

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
        const errors = {};
        for (const fieldName in data) {
            if (data[fieldName] === "") {
                errors[fieldName] = `${fieldName} is required`;
            }
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;
