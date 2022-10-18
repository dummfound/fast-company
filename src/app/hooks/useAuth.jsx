import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService from "../services/localStorageServices";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthContex = React.createContext();

export const useAuth = () => {
    return useContext(AuthContex);
};

const randomizer = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function logout() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.push("/");
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function loginUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.patch(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            console.log(data);
            localStorageService.setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (
                    message === "EMAIL_NOT_FOUND" ||
                    message === "INVALID_PASSWORD"
                ) {
                    const errorObject = {
                        email: "Неверный логин или пароль"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function update({ name, email, profession, sex, qualities }) {
        const tokenId = localStorageService.getAccessToken();
        try {
            const { data } = await httpAuth.post("accounts:update", {
                email: email,
                idToken: tokenId,
                returnSecureToken: true,
                displayName: name
            });
            localStorageService.setTokens(data);
            createUser({
                ...currentUser,
                name,
                email,
                profession,
                sex,
                qualities
            });
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setTokens(data);
            createUser({
                _id: data.localId,
                email,
                rate: randomizer(1, 10),
                completeMeetings: randomizer(1, 100),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
            console.log(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUsers();
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContex.Provider
            value={{ signUp, currentUser, loginUp, logout, update }}
        >
            {!isLoading ? children : "Loading"}
        </AuthContex.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
