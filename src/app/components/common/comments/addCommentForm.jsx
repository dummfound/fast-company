import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";
const AddCommentForm = ({ onSubmit }) => {
    const [users, setUsers] = useState(null);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        userId: "",
        content: ""
    });

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const usersName = Object.keys(data).map((userName) => ({
                label: data[userName].name,
                value: data[userName]._id
            }));
            setUsers(usersName);
        });
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
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

    const validatorConfig = {
        userId: {
            isRequired: {
                message:
                    "Выбирите пользователя от чьего имени хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Cообщение не должно быть пустым"
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <SelectField
                value={data.userId}
                label="Выбирите вашу профессию"
                defaultOption="Choose..."
                name="userId"
                onChange={handleChange}
                options={users}
                error={errors.userId}
            />
            <TextAreaField
                name="content"
                onChange={handleChange}
                value={data.content}
                label="Имя"
                error={errors.content}
            />
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary">Опубликовать</button>
            </div>
        </form>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
