import React, { useState } from "react";
import TextField from "./textField";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    return (
        <form>
            <TextField
                name="email"
                onChange={handleChange}
                value={data.email}
                label="Email"
            />
            <TextField
                name="password"
                onChange={handleChange}
                value={data.password}
                type="password"
                label="password"
            />
        </form>
    );
};

export default Login;
