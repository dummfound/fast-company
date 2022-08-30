import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
const RegisterForm = () => {
    const [professions, setProfession] = useState(null);
    const [data, setData] = useState({ email: "", password: "", profession: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

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
        },
        profession: {
            isRequired: {
                message: "Profession is required"
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
            <SelectField
                value={data.profession}
                label="Выбирите вашу профессию"
                defaultOption="Choose..."
                onChange={handleChange}
                options={professions}
                error={errors.profession}
            />
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
