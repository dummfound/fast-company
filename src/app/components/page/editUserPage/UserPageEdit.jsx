import React, { useEffect, useState } from "react";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultySelectField from "../../common/form/multySelectField";
import * as yup from "yup";
import { useHistory, useParams } from "react-router-dom";

const UserPageEdit = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const history = useHistory();
    const params = useParams();
    const { userId } = params;

    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);

    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validateScheme = yup.object().shape({
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .matches(/(?=.*[@])/, "Электронная почта должна содержать @"),
        name: yup
            .string()
            .required("Имя обязательно для заполнения")
            .matches(
                /(?=.*[A-Z])/,
                "Имя должно содержать хотя бы одну заглавную букву"
            )
    });

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        history.replace(`/users`);
    };
    return (
        <div className="ms-3 me-3">
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <SelectField
                    label="Выбери свою профессию"
                    defaultOption="Choose..."
                    options={professions}
                    name="profession"
                    onChange={handleChange}
                    value={data.profession}
                    error={errors.profession}
                />
                <RadioField
                    options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" },
                        { name: "Other", value: "other" }
                    ]}
                    value={data.sex}
                    name="sex"
                    onChange={handleChange}
                    label="Выберите ваш пол"
                />
                <MultySelectField
                    options={qualities}
                    onChange={handleChange}
                    defaultValue={data.qualities}
                    name="qualities"
                    label="Выберите ваши качества"
                />
                <button
                    className="btn btn-primary w-100 mx-auto"
                    type="submit"
                    disabled={!isValid}
                >
                    Обновить
                </button>
            </form>
        </div>
    );
};

export default UserPageEdit;
